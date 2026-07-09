"use client";

/**
 * Horizontally scrollable filter chip row. On mobile it shows a partial
 * next chip as the scroll affordance. Chips are real buttons with
 * aria-pressed; the active chip gets the chartreuse fill.
 */
export function FilterChips({
  options,
  active,
  onChange,
  allLabel = "All",
}: {
  options: readonly string[];
  active: string | null;
  onChange: (value: string | null) => void;
  allLabel?: string;
}) {
  return (
    <div className="-mx-gutter flex gap-2 overflow-x-auto px-gutter pb-2 lg:mx-0 lg:flex-wrap lg:px-0">
      <Chip label={allLabel} active={active === null} onClick={() => onChange(null)} />
      {options.map((opt) => (
        <Chip
          key={opt}
          label={opt}
          active={active === opt}
          onClick={() => onChange(active === opt ? null : opt)}
        />
      ))}
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 shrink-0 whitespace-nowrap rounded-pill border px-6 text-body-sm font-medium transition-colors duration-micro ease-out-quad ${
        active
          ? "border-chartreuse bg-chartreuse text-black"
          : "border-gray-300 text-gray-700 hover:border-gray-900"
      }`}
    >
      {label}
    </button>
  );
}
