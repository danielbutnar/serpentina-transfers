// Side views of the three vehicles, drawn instead of photos (the concept uses no stock images).
// Decorative: the vehicle name and capacity are in the text next to them. Each kind is drawn once per
// page, so the clip-path ids stay unique.

const BODY: Record<VehicleKind, string> = {
  sedan: "M14 74 V62 Q16 54 28 52 L64 48 L92 30 Q98 26 108 26 H152 Q162 26 170 32 L194 48 L224 54 Q234 56 234 66 V74 Z",
  estate: "M14 74 V60 Q16 52 28 50 L62 46 L88 28 Q94 24 104 24 H208 Q216 24 220 32 L228 50 Q234 54 234 64 V74 Z",
  minibus: "M14 76 V44 Q14 26 32 22 L62 16 H216 Q232 16 232 32 V76 Z",
};

const WINDOWS: Record<VehicleKind, string[]> = {
  sedan: ["M98 34 L108 32 H128 V47 H74 Z", "M136 32 H150 Q158 32 164 37 L178 47 H136 Z"],
  estate: ["M94 32 L104 30 H126 V46 H72 Z", "M134 30 H170 V46 H134 Z", "M178 30 H206 Q211 30 213 35 L218 46 H178 Z"],
  minibus: ["M34 30 Q36 26 42 25 L62 22 V44 H32 Z", "M72 22 H106 V44 H72 Z", "M114 22 H148 V44 H114 Z", "M156 22 H190 V44 H156 Z", "M198 22 H224 V44 H198 Z"],
};

const WHEELS: Record<VehicleKind, number[]> = { sedan: [66, 190], estate: [64, 194], minibus: [62, 196] };

export type VehicleKind = "sedan" | "estate" | "minibus";

export function VehicleDrawing({ kind, className }: { kind: VehicleKind; className?: string }) {
  return (
    <svg viewBox="0 0 248 100" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <clipPath id={`vehicle-body-${kind}`}>
          <path d={BODY[kind]} />
        </clipPath>
      </defs>
      <line x1="4" y1="90" x2="244" y2="90" stroke="#151515" strokeWidth="2" />
      <path d={BODY[kind]} fill="#FFFFFF" />
      {WINDOWS[kind].map((d) => (
        <path key={d} d={d} fill="#E9E6DE" stroke="#151515" strokeWidth="2" strokeLinejoin="round" />
      ))}
      <rect x="0" y={kind === "minibus" ? 56 : 60} width="248" height="5" fill="#E0A526" clipPath={`url(#vehicle-body-${kind})`} />
      <path d={BODY[kind]} fill="none" stroke="#151515" strokeWidth="3" strokeLinejoin="round" />
      {WHEELS[kind].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="76" r="14" fill="#151515" />
          <circle cx={cx} cy="76" r="5.5" fill="#F3F1EB" />
        </g>
      ))}
    </svg>
  );
}
