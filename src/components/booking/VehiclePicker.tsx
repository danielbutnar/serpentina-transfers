import { fill, formatPrice, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { VEHICLES, fitProblem, vehiclePrice, type Load, type VehicleId } from "@/lib/booking";
import type { AirportCode, DestinationId } from "@/lib/fares";
import { VehicleDrawing } from "../VehicleDrawing";

// Native radio buttons styled as cards. A vehicle that cannot take the group is disabled and says why.
export function VehiclePicker({
  value,
  onChange,
  load,
  from,
  to,
  locale,
  t,
}: {
  value: VehicleId;
  onChange: (v: VehicleId) => void;
  load: Load;
  from: AirportCode;
  to: DestinationId;
  locale: Locale;
  t: Dictionary;
}) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="mb-1.5 label-mono">{t.book.trip.vehicle}</legend>
      <div className="grid gap-2.5 md:grid-cols-3">
        {VEHICLES.map((id, i) => {
          const problem = fitProblem(id, load);
          const selected = value === id;
          const item = t.fleet.items[i];
          return (
            <label
              key={id}
              className={`relative flex cursor-pointer flex-col gap-2 border-2 border-ink p-3.5 has-[:disabled]:cursor-not-allowed has-[:disabled]:border-dashed has-[:disabled]:bg-paper has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${selected ? "bg-sign" : "bg-white"}`}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="vehicle"
                    value={id}
                    checked={selected}
                    disabled={problem !== null}
                    onChange={() => onChange(id)}
                    className="size-5 accent-ink focus-visible:outline-none"
                  />
                  <span className="text-lg font-black">{item.name}</span>
                </span>
                <span className="text-lg font-black">{formatPrice(vehiclePrice(from, to, id), locale)}</span>
              </span>
              <VehicleDrawing kind={id} className={`h-14 w-full ${problem ? "opacity-40" : ""}`} />
              <span className="font-mono text-xs uppercase">{item.spec}</span>
              {problem && (
                <span className="text-sm font-bold text-muted">
                  {problem === "passengers" ? fill(t.book.trip.tooSmall.passengers, { n: load.passengers }) : t.book.trip.tooSmall[problem]}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
