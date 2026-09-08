type GraphicProps = { className?: string };

/**
 * Abstracte graphics voor de sectie "Wat wij doen" op /partner.
 * Vlakken, geen lijnwerk — bewust een andere familie dan de isometrische
 * RijIconen. Werkt op #E6E6E4 en op navy.
 * Gebruik: <GraphicKlaargezet className="size-28" />
 */
const basis = { viewBox: "0 0 120 120", "aria-hidden": true };

// Alles staat klaar — drie vellen materiaal, het voorste af
export function GraphicKlaargezet({ className }: GraphicProps) {
  return (
    <svg {...basis} className={className}>
      <rect x="18" y="32" width="52" height="70" rx="6" transform="rotate(-8 44 67)" fill="#5A7180" opacity="0.45"/>\n      <rect x="32" y="26" width="52" height="70" rx="6" transform="rotate(-3 58 61)" fill="#5A7180" opacity="0.45"/>\n      <rect x="46" y="20" width="52" height="70" rx="6" transform="rotate(4 72 55)" fill="#E94E12" opacity="1"/>
    </svg>
  );
}

// Elke aanmelding gevolgd — voortgangsspoor met drie stappen gedaan
export function GraphicGevolgd({ className }: GraphicProps) {
  return (
    <svg {...basis} className={className}>
      <rect x="14" y="56" width="92" height="7" rx="3.5" fill="#5A7180" opacity="0.3"/>\n      <rect x="14" y="56" width="62" height="7" rx="3.5" fill="#E94E12"/>\n      <circle cx="14" cy="60" r="10" fill="#E94E12"/>\n      <circle cx="44" cy="60" r="10" fill="#E94E12"/>\n      <circle cx="74" cy="60" r="10" fill="#E94E12"/>\n      <circle cx="106" cy="60" r="9" fill="#E6E6E4" stroke="#5A7180" stroke-width="5" opacity="0.9"/>
    </svg>
  );
}

// De club blijft erbuiten — alles komt samen bij één punt
export function GraphicAanspreekpunt({ className }: GraphicProps) {
  return (
    <svg {...basis} className={className}>
      <path d="M30 26 C58 26 62 60 88 60" fill="none" stroke="#5A7180" stroke-width="5" stroke-linecap="round" opacity="0.45"/>\n      <path d="M30 60 C58 60 62 60 88 60" fill="none" stroke="#5A7180" stroke-width="5" stroke-linecap="round" opacity="0.45"/>\n      <path d="M30 94 C58 94 62 60 88 60" fill="none" stroke="#5A7180" stroke-width="5" stroke-linecap="round" opacity="0.45"/>\n      <circle cx="26" cy="26" r="10" fill="#5A7180" opacity="0.55"/>\n      <circle cx="26" cy="60" r="10" fill="#5A7180" opacity="0.55"/>\n      <circle cx="26" cy="94" r="10" fill="#5A7180" opacity="0.55"/>\n      <circle cx="94" cy="60" r="20" fill="#E94E12"/>
    </svg>
  );
}

