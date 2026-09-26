import { fill, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { VEHICLES } from "@/lib/booking";
import { DRIVER_LANGUAGES, rideStatus, type Ride, type RideStatus } from "@/lib/dashboard";
import { DESTINATION_NAMES } from "@/lib/fares";

const GLYPH: Record<RideStatus, string> = { unassigned: "!", scheduled: "○", enRoute: "→", waiting: "■", onBoard: "▶", completed: "✓" };
const STYLE: Record<RideStatus, string> = {
  unassigned: "border-2 border-dashed border-ink font-bold",
  scheduled: "",
  enRoute: "font-bold",
  waiting: "bg-sign font-bold",
  onBoard: "bg-ink font-bold text-sign",
  completed: "text-muted",
};

function Status({ status, t }: { status: RideStatus; t: Dictionary }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-sm whitespace-nowrap ${STYLE[status]}`}>
      <span aria-hidden="true">{GLYPH[status]}</span>
      {status === "unassigned" ? t.admin.noDriver : t.admin.status[status]}
    </span>
  );
}

function Delay({ minutes, t }: { minutes: number; t: Dictionary }) {
  return (
    <span className="mt-1 inline-flex items-center gap-1.5 bg-ink px-2 py-0.5 text-xs font-bold text-sign">
      <span aria-hidden="true">!</span>
      {fill(t.admin.delayed, { minutes })}
    </span>
  );
}

function DriverCell({ ride, t, onAssign }: { ride: Ride; t: Dictionary; onAssign: (ride: Ride, driver: string) => void }) {
  if (ride.driver) return <span className="font-bold">{ride.driver}</span>;
  return (
    <select
      aria-label={fill(t.admin.assignLabel, { passenger: ride.passenger, time: ride.pickup })}
      value=""
      onChange={(e) => e.target.value && onAssign(ride, e.target.value)}
      className="h-11 w-full min-w-40 border-2 border-dashed border-ink bg-white px-2 font-bold"
    >
      <option value="" disabled>
        {t.admin.choose}
      </option>
      {Object.keys(DRIVER_LANGUAGES).map((d) => (
        <option key={d} value={d}>
          {d} ({DRIVER_LANGUAGES[d].join(", ")})
        </option>
      ))}
    </select>
  );
}

// Today's rides: a table from md up, cards on phones. Unassigned rides get a driver select.
export function RideBoard({
  rides,
  now,
  t,
  caption,
  onAssign,
}: {
  rides: Ride[];
  now: Date;
  t: Dictionary;
  locale: Locale;
  caption: string;
  onAssign: (ride: Ride, driver: string) => void;
}) {
  const c = t.admin.cols;
  const vehicle = (r: Ride) => t.fleet.items[VEHICLES.indexOf(r.vehicle)].name;
  const route = (r: Ride) => `${r.from} → ${DESTINATION_NAMES[r.to]}`;

  return (
    <>
      <table className="hidden w-full border-collapse border-3 border-ink bg-white text-left lg:table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b-3 border-ink font-mono text-xs tracking-widest uppercase">
            {[c.pickup, c.passenger, c.route, c.flight, c.vehicle, c.driver, c.status].map((h) => (
              <th key={h} scope="col" className="px-3 py-3 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rides.map((r) => {
            const status = rideStatus(r, now);
            return (
              <tr key={r.id} className={`border-b border-ink last:border-b-0 ${!r.driver ? "bg-sign-soft" : ""}`}>
                <td className="px-3 py-3 font-mono text-lg font-bold">{r.pickup}</td>
                <th scope="row" className="px-3 py-3 font-bold">
                  {r.passenger}
                  <span className="block text-sm font-normal text-muted">
                    {t.book.summary.passengers}: {r.passengers}
                  </span>
                </th>
                <td className="px-3 py-3">{route(r)}</td>
                <td className="px-3 py-3 font-mono text-sm">
                  {r.flight ?? "–"}
                  {r.delayMinutes ? (
                    <>
                      <br />
                      <Delay minutes={r.delayMinutes} t={t} />
                    </>
                  ) : null}
                </td>
                <td className="px-3 py-3">{vehicle(r)}</td>
                <td className="px-3 py-3">
                  <DriverCell ride={r} t={t} onAssign={onAssign} />
                </td>
                <td className="px-3 py-3">
                  <Status status={status} t={t} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ul className="grid gap-2.5 sm:grid-cols-2 lg:hidden" aria-label={caption}>
        {rides.map((r) => (
          <li key={r.id} className={`flex flex-col gap-2 border-2 border-ink p-3.5 ${!r.driver ? "bg-sign-soft" : "bg-white"}`}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-2xl font-bold">{r.pickup}</span>
              <Status status={rideStatus(r, now)} t={t} />
            </div>
            <p className="font-black">{r.passenger}</p>
            <p className="text-sm">
              {route(r)} · {vehicle(r)} · {r.passengers}
            </p>
            {r.flight && (
              <p className="font-mono text-sm">
                {r.flight}
                {r.delayMinutes ? (
                  <>
                    {" "}
                    <Delay minutes={r.delayMinutes} t={t} />
                  </>
                ) : null}
              </p>
            )}
            <DriverCell ride={r} t={t} onAssign={onAssign} />
          </li>
        ))}
      </ul>
    </>
  );
}
