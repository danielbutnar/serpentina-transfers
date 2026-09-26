import { AIRPORTS, DESTINATIONS, DESTINATION_NAMES, type AirportCode, type DestinationId } from "@/lib/fares";
import { MOUNTAIN_POINTS, NODES, ROUTES, labelSide, project, routePoints, routeViewBox } from "@/lib/route-map";

// Central Romania with the Carpathian arc, the airports and the destinations, framed on the chosen
// route. The route redraws itself when it changes (key), unless reduced motion is set.
export function RouteMap({
  from,
  to,
  label,
  mountainsLabel,
  className,
}: {
  from: AirportCode;
  to: DestinationId;
  label: string;
  mountainsLabel: string;
  className?: string;
}) {
  const vb = routeViewBox(from, to);
  const k = vb.k;
  const path = ROUTES[from][to];
  const a = project(NODES[from]);
  const d = project(NODES[to]);
  const aSide = labelSide(a, project(NODES[path[1]]));
  const dSide = labelSide(d, project(NODES[path[path.length - 2]]));
  const points = routePoints(from, to);
  const inView = (x: number, y: number, width: number) => x > vb.x && x + width < vb.x + vb.w && y > vb.y + 8 * k && y < vb.y + vb.h;
  // Candidate spots just south of the band; the first one that fits the frame gets the label.
  const mountainLabel = [
    { lon: 24.35, lat: 45.33 },
    { lon: 25.0, lat: 45.2 },
    { lon: 24.9, lat: 45.47 },
  ]
    .map(project)
    .find((p) => inView(p.x, p.y, mountainsLabel.length * 4.2 * k));
  // Close-up frames also name the other destinations, for orientation.
  const nameOthers = k < 0.6;

  return (
    <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} role="img" aria-label={label} className={className}>
      <polyline points={MOUNTAIN_POINTS} fill="none" className="stroke-paper-2" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={MOUNTAIN_POINTS} fill="none" className="stroke-ink/25" strokeWidth={0.8 * k} strokeDasharray={`${2 * k} ${3 * k}`} />
      {mountainLabel && (
        <text x={mountainLabel.x} y={mountainLabel.y} fontSize={6.5 * k} className="fill-label font-mono uppercase">
          {mountainsLabel}
        </text>
      )}

      {DESTINATIONS.map((id) => {
        const p = project(NODES[id]);
        return (
          <g key={id}>
            <circle cx={p.x} cy={p.y} r={2.4 * k} className="fill-white stroke-ink" strokeWidth={k} />
            {nameOthers && id !== to && (
              <text x={p.x + 5 * k} y={p.y + 2.5 * k} fontSize={6.5 * k} paintOrder="stroke" strokeWidth={2.5 * k} className="fill-label stroke-paper">
                {DESTINATION_NAMES[id]}
              </text>
            )}
          </g>
        );
      })}
      {AIRPORTS.map((code) => {
        const p = project(NODES[code]);
        return (
          <g key={code}>
            <rect
              x={p.x - 3.5 * k}
              y={p.y - 3.5 * k}
              width={7 * k}
              height={7 * k}
              className={code === from ? "fill-ink stroke-ink" : "fill-white stroke-ink"}
              strokeWidth={k}
            />
            {code !== from && (
              <text x={p.x + 6 * k} y={p.y + 2.5 * k} fontSize={6.5 * k} className="fill-label font-mono">
                {code}
              </text>
            )}
          </g>
        );
      })}

      <g key={`${from}-${to}`}>
        <polyline
          points={points}
          pathLength={1}
          className="route-draw stroke-sign"
          fill="none"
          strokeWidth={7 * k}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points={points}
          pathLength={1}
          className="route-draw stroke-ink"
          fill="none"
          strokeWidth={2.5 * k}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <circle cx={d.x} cy={d.y} r={4.2 * k} className="fill-sign stroke-ink" strokeWidth={1.5 * k} />

      <text
        x={aSide === "left" ? a.x - 7 * k : a.x + 7 * k}
        y={a.y + 3.2 * k}
        fontSize={9 * k}
        fontWeight="700"
        textAnchor={aSide === "left" ? "end" : "start"}
        paintOrder="stroke"
        strokeWidth={3 * k}
        className="fill-ink stroke-paper font-mono"
      >
        {from}
      </text>
      <text
        x={dSide === "left" ? d.x - 8 * k : d.x + 8 * k}
        y={d.y + 3.2 * k}
        fontSize={9.5 * k}
        fontWeight="800"
        textAnchor={dSide === "left" ? "end" : "start"}
        paintOrder="stroke"
        strokeWidth={3 * k}
        className="fill-ink stroke-paper"
      >
        {DESTINATION_NAMES[to]}
      </text>
    </svg>
  );
}
