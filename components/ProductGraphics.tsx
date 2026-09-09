type GraphicProps = { className?: string };

/**
 * Productgraphics voor de sectie "Wat je kunt kopen" op /ledenvoordeel.
 * Zelfde familie als WaardeGraphics: gevulde vlakken, oranje #E94E12 met
 * slate #5A7180 als rustige tegenhanger. Werkt op licht en op navy.
 * Gebruik: <GraphicZonnepanelen className="size-28" />
 */
const basis = { viewBox: "0 0 120 120", "aria-hidden": true };

// Gekanteld raster van panelen
export function GraphicZonnepanelen({ className }: GraphicProps) {
  return (
    <svg {...basis} className={className}>
      <g transform="rotate(-12 60 60)"><rect x="18" y="32" width="26" height="26" rx="4" fill="#E94E12" opacity="1"/>\n      <rect x="48" y="32" width="26" height="26" rx="4" fill="#E94E12" opacity="1"/>\n      <rect x="78" y="32" width="26" height="26" rx="4" fill="#E94E12" opacity="1"/>\n      <rect x="18" y="62" width="26" height="26" rx="4" fill="#5A7180" opacity="0.45"/>\n      <rect x="48" y="62" width="26" height="26" rx="4" fill="#E94E12" opacity="1"/>\n      <rect x="78" y="62" width="26" height="26" rx="4" fill="#E94E12" opacity="1"/>\n      </g>
    </svg>
  );
}

// Omhulsel met laadniveau
export function GraphicThuisbatterij({ className }: GraphicProps) {
  return (
    <svg {...basis} className={className}>
      <rect x="42" y="18" width="36" height="10" rx="4" fill="#5A7180" opacity="0.45"/>\n      <rect x="32" y="30" width="56" height="76" rx="10" fill="none" stroke="#5A7180" strokeWidth="7" opacity="0.45"/>\n      <rect x="43" y="56" width="34" height="39" rx="5" fill="#E94E12"/>
    </svg>
  );
}

// Paal met kabel en stekker
export function GraphicLaadpaal({ className }: GraphicProps) {
  return (
    <svg {...basis} className={className}>
      <rect x="26" y="16" width="40" height="88" rx="10" fill="#5A7180" opacity="0.45"/>\n      <circle cx="46" cy="46" r="11" fill="#E94E12"/>\n      <path d="M64 72 C86 74 90 92 80 100" fill="none" stroke="#E94E12" strokeWidth="7" strokeLinecap="round"/>\n      <circle cx="80" cy="100" r="7" fill="#E94E12"/>
    </svg>
  );
}

