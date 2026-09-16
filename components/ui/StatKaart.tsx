type StatKaartProps = {
  getal: string;
  label: string;
};

export function StatKaart({ getal, label }: StatKaartProps) {
  return (
    <div className="rounded-3xl bg-keuzekaart p-8">
      <p className="text-[clamp(2.25rem,3.5vw,3.5rem)] leading-none font-normal text-navy">
        {getal}
      </p>
      <p className="mt-5 font-mono text-[0.8125rem] tracking-[0.08em] text-body-donker uppercase">
        {label}
      </p>
    </div>
  );
}
