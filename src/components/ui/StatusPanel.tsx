import { StatusChip } from "./Pill";

/**
 * The "Panel del cliente" mock from the 1b hero.
 *
 * The canvas version names an invented client ("Distribuidora San Roque
 * S.R.L.") and an invented accountant ("Lic. R. Cáceres"). Neither ships
 * (plan.md §1.4): the labels here are generic and describe the service, not a
 * real account. It is decorative — screen readers get one summary instead of
 * the whole grid.
 */
const tiles = [
  { label: "IVA mensual", value: "Presentado en fecha" },
  { label: "Nómina e IPS", value: "Liquidada" },
  { label: "Comprobantes del mes", value: "Registrados" },
] as const;

export function StatusPanel() {
  return (
    <div
      role="img"
      aria-label="Ejemplo del resumen mensual que recibe cada cliente: IVA presentado en fecha, nómina liquidada, comprobantes registrados y el próximo vencimiento a la vista."
      className="flex flex-col gap-4 rounded-t-card bg-white p-7 text-ink shadow-panel"
    >
      <div aria-hidden="true" className="flex items-center justify-between gap-3">
        <span className="text-[15px] font-semibold">Resumen mensual del cliente</span>
        <StatusChip>Al día</StatusChip>
      </div>
      <div aria-hidden="true" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="flex flex-col gap-1 rounded-tile bg-surface p-3.5"
          >
            <span className="text-xs text-muted">{tile.label}</span>
            <span className="text-[15px] font-semibold">{tile.value}</span>
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3.5 text-[13px] text-muted"
      >
        <span>Próximo vencimiento a la vista</span>
        <span className="font-semibold text-ink">Contador asignado</span>
      </div>
    </div>
  );
}
