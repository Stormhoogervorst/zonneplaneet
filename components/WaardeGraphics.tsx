type GraphicProps = { className?: string };

/**
 * Abstracte graphics voor de sectie "Wat wij doen" op /partner.
 * Vlakken, geen lijnwerk — bewust een andere familie dan de isometrische
 * RijIconen. Kleuren staan vast in de SVG omdat ze alleen op de grijze kaarten
 * van die sectie voorkomen.
 * Gebruik: <GraphicKlaargezet className="size-28" />
 */
const basis = { viewBox: "0 0 120 120", "aria-hidden": true };

export function GraphicKlaargezet({ className }: GraphicProps) {
  return (
    <svg {...basis} className={className}>
      <circle cx="34" cy="34" r="26" fill="#E94E12" />
      <circle cx="86" cy="34" r="26" fill="#E94E12" />
      <circle cx="34" cy="86" r="26" fill="#5A7180" />
      <circle cx="86" cy="86" r="26" fill="#E94E12" />
    </svg>
  );
}

export function GraphicGevolgd({ className }: GraphicProps) {
  return (
    <svg {...basis} className={className}>
      <rect
        x="12"
        y="20"
        width="6"
        height="80"
        rx="3"
        fill="#E94E12"
        opacity="1.00"
      />
      <rect
        x="27"
        y="20"
        width="6"
        height="80"
        rx="3"
        fill="#E94E12"
        opacity="1.00"
      />
      <rect
        x="42"
        y="20"
        width="6"
        height="80"
        rx="3"
        fill="#E94E12"
        opacity="1.00"
      />
      <rect
        x="57"
        y="20"
        width="6"
        height="80"
        rx="3"
        fill="#5A7180"
        opacity="0.67"
      />
      <rect
        x="72"
        y="20"
        width="6"
        height="80"
        rx="3"
        fill="#5A7180"
        opacity="0.61"
      />
      <rect
        x="87"
        y="20"
        width="6"
        height="80"
        rx="3"
        fill="#5A7180"
        opacity="0.55"
      />
      <rect
        x="102"
        y="20"
        width="6"
        height="80"
        rx="3"
        fill="#5A7180"
        opacity="0.49"
      />
    </svg>
  );
}

export function GraphicUitbetaald({ className }: GraphicProps) {
  return (
    <svg {...basis} className={className}>
      <circle
        cx="60"
        cy="60"
        r="40"
        fill="none"
        stroke="#5A7180"
        stroke-width="11"
      />
      <path
        d="M60.0 20.0 A40 40 0 0 1 92.8 82.9"
        fill="none"
        stroke="#E94E12"
        stroke-width="11"
        stroke-linecap="round"
      />
    </svg>
  );
}
