import { Kaart } from "./Kaart";

type StatKaartVariant = "navy" | "oranje";

type StatKaartProps = {
  getal: string;
  label: string;
  variant: StatKaartVariant;
};

const variantClasses: Record<StatKaartVariant, string> = {
  navy: "bg-navy text-white",
  oranje: "bg-oranje text-navy",
};

export function StatKaart({ getal, label, variant }: StatKaartProps) {
  return (
    <Kaart
      className={`flex min-h-52 flex-col justify-between gap-8 ${variantClasses[variant]}`}
    >
      <p className="text-display-m">{getal}</p>
      <p className="text-xl leading-tight font-semibold">{label}</p>
    </Kaart>
  );
}
