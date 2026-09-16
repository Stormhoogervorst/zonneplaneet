type IconProps = { className?: string };

/*
 * Iconen voor de rijenlijsten. Zelfde scherpe, isometrische lijnstijl als de
 * salderingssectie: viewBox 72x72, projectie op 30 graden, streekdikte 1.25.
 * De vorm erft currentColor, dus de tekstkleur van het vlak bepaalt de kleur.
 * Gebruik: <IconEnvelop className="size-16 text-navy" />
 * Altijd aria-hidden; de rijtitel draagt de betekenis.
 */
const svgProps = {
  "aria-hidden": true,
  viewBox: "0 0 72 72",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.25",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Eén nieuwsbrief: een dichte envelop, plat liggend, met de flapnaad. */
export function IconEnvelop({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M32 21 55.4 34.5 39.8 43.5 16.4 30Z" />
      <path d="M16.4 30 34.34 27.75 55.4 34.5" />
      <path d="M16.4 30v6M39.8 43.5v6M55.4 34.5v6" />
      <path d="M16.4 36 39.8 49.5 55.4 40.5" />
    </svg>
  );
}

/** Een poster: staand blad met de QR-code erin verwerkt, dus één beeld. */
export function IconPosterQr({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M23 14 49 29 49 59 23 44Z" />
      <path d="M23 14 25.2 12.7 51.2 27.7 49 29" />
      <path d="M51.2 27.7 51.2 57.7 49 59" />
      <path d="M26.9 20.8 34.2 25 34.2 33.4 26.9 29.2Z" />
      <path d="M37.8 27.1 45.1 31.3 45.1 39.7 37.8 35.5Z" />
      <path d="M26.9 33.4 34.2 37.6 34.2 46 26.9 41.8Z" />
      <path d="M34.2 41.8 37.8 43.9 37.8 48.1 34.2 46Z" />
      <path d="M37.8 39.7 41.5 41.8 41.5 46 37.8 43.9Z" />
      <path d="M41.5 46 45.1 48.1 45.1 52.3 41.5 50.2Z" />
    </svg>
  );
}

/** Geen ledengegevens: een hangslot met beugel en sleutelgat. */
export function IconSlot({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M36 22 54 32.4 36 42.8 18 32.4Z" />
      <path d="M18 32.4v12M36 42.8v12M54 32.4v12" />
      <path d="M18 44.4 36 54.8 54 44.4" />
      <path d="M29 32.4V21a7 7 0 0 1 14 0v11.4" />
      <path d="M32.5 32.4V21a3.5 3.5 0 0 1 7 0v11.4" />
      <path d="M41.5 43.5 46.7 40.5 46.7 46.5 41.5 49.5Z" />
    </svg>
  );
}

/** Eigen showrooms: een gebouw met een etalageruit op de voorzijde. */
export function IconShowroom({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M36 16 54 26.4 36 36.8 18 26.4Z" />
      <path d="M18 26.4v20M36 36.8v20M54 26.4v20" />
      <path d="M18 46.4 36 56.8 54 46.4" />
      <path d="M20.9 30.5 33.1 37.5 33.1 49.1 20.9 42.1Z" />
      <path d="M27 34v11.6" />
      <path d="M20.9 35.1 33.1 42.1" />
    </svg>
  );
}

/** Geen kosten, geen risico: een stapel euromunten, zonder ontkennend teken. */
export function IconMunten({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <ellipse cx="36" cy="26" rx="16" ry="8" />
      <path d="M20 26v5a16 8 0 0 0 32 0v-5" />
      <path d="M20 31v5a16 8 0 0 0 32 0v-5" />
      <path d="M20 36v5a16 8 0 0 0 32 0v-5" />
      <path d="M40 21a6.5 6.5 0 1 0 0 10" />
      <path d="M28 24.5h11M28 28h10" />
    </svg>
  );
}
