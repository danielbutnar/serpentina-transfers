import type { Dictionary } from "@/i18n/dictionaries";
import { SectionBar } from "./SectionBar";
import { VehicleDrawing, type VehicleKind } from "./VehicleDrawing";

const KINDS: VehicleKind[] = ["sedan", "estate", "minibus"];

export function Fleet({ t }: { t: Dictionary }) {
  return (
    <section id="fleet" aria-labelledby="fleet-title" className="scroll-mt-4">
      <SectionBar id="fleet" number={2} title={t.fleet.title} />
      <ul className="flex flex-col gap-4.5 px-5 pt-4.5 pb-7 md:grid md:grid-cols-3 md:gap-0 md:p-0">
        {t.fleet.items.map((vehicle, i) => (
          <li
            key={vehicle.name}
            className="grid grid-cols-fleet items-center gap-3.5 md:flex md:flex-col md:items-stretch md:border-ink md:px-8 md:pt-8 md:pb-12 md:not-first:border-l lg:px-12"
          >
            <div className="flex h-21 items-center justify-center border-2 border-ink bg-stripes px-1.5 md:h-50 md:px-6">
              <VehicleDrawing kind={KINDS[i]} className="w-full" />
            </div>
            <div className="flex flex-col gap-1 md:gap-3.5">
              <h3 className="text-lead font-black md:text-2xl">{vehicle.name}</h3>
              <p className="font-mono text-xs leading-spec uppercase md:text-sm">{vehicle.spec}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
