import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import Link from "next/link";

type KnopVariant =
  "primair" | "donker" | "wit" | "groot" | "grootDonker" | "stil" | "extern";

type GedeeldeKnopProps = {
  children: ReactNode;
  className?: string;
  metPijl?: boolean;
  variant?: KnopVariant;
};

type KnopAlsLinkProps = GedeeldeKnopProps &
  Omit<ComponentProps<typeof Link>, "children" | "className" | "href"> & {
    href: ComponentProps<typeof Link>["href"];
  };

type KnopAlsButtonProps = GedeeldeKnopProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: never;
  };

type KnopProps = KnopAlsLinkProps | KnopAlsButtonProps;

const variantClasses: Record<KnopVariant, string> = {
  primair: "bg-oranje text-navy",
  donker: "bg-navy text-white",
  /* Alleen op donkere vlakken; op een licht vlak valt een witte knop weg. */
  wit: "bg-white text-navy",
  groot: "",
  grootDonker: "",
  stil: "px-0 text-navy underline decoration-oranje decoration-2 underline-offset-4",
  extern: "",
};

function Pijl({ variant }: { variant: KnopVariant }) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
        variant === "stil" ? "bg-oranje text-navy" : "bg-white text-navy"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <path
          d="M5 12h14m-5-5 5 5-5 5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
}

/**
 * De cirkel van de variant `groot` staat los naast de pil, niet erin.
 */
function LosseSchuinePijl() {
  return (
    <span
      aria-hidden="true"
      className="flex size-14 shrink-0 items-center justify-center rounded-full bg-oranje text-navy md:size-[72px]"
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-5 md:size-6">
        <path
          d="M7 17 17 7m0 0H9m8 0v8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
}

/**
 * Ook hier staat de cirkel los naast de pil, in navy in plaats van oranje.
 */
function LosseDonkereSchuinePijl() {
  return (
    <span
      aria-hidden="true"
      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy text-white md:size-14"
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <path
          d="M7 17 17 7m0 0H9m8 0v8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
}

function CompacteExternePijl() {
  return (
    <span
      aria-hidden="true"
      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-oranje text-navy"
    >
      <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
        <path
          d="M4 14 14 4m0 0H6m8 0v8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
        />
      </svg>
    </span>
  );
}

export function Knop(props: KnopProps) {
  const {
    children,
    className = "",
    metPijl = false,
    variant = "primair",
  } = props;
  const isGroot = variant === "groot";
  const isGrootDonker = variant === "grootDonker";
  const isExtern = variant === "extern";
  const classes = (
    isGroot || isGrootDonker || isExtern
      ? [
          "inline-flex items-center",
          isGroot ? "gap-4" : isGrootDonker ? "gap-2 md:gap-3" : "gap-2",
          className,
        ]
      : [
          "inline-flex min-h-12 items-center justify-center gap-3 rounded-full font-semibold",
          variant === "primair" ? "text-xl" : "text-body",
          metPijl && variant !== "stil" ? "py-1 pr-1 pl-6" : "px-6 py-3",
          variantClasses[variant],
          className,
        ]
  )
    .filter(Boolean)
    .join(" ");
  const inhoud = isGroot ? (
    <>
      <span className="flex min-h-14 flex-1 items-center justify-center rounded-full bg-oranje px-5 py-3 text-center text-xl leading-tight font-semibold text-navy md:min-h-[72px] md:flex-none md:px-10">
        {children}
      </span>
      {metPijl ? <LosseSchuinePijl /> : null}
    </>
  ) : isGrootDonker ? (
    <>
      <span className="flex h-13 items-center rounded-full bg-navy px-6 text-xl font-semibold text-white md:h-14 md:px-8">
        {children}
      </span>
      {metPijl ? <LosseDonkereSchuinePijl /> : null}
    </>
  ) : isExtern ? (
    <>
      <span className="flex h-12 items-center justify-center rounded-full bg-oranje px-6 text-xl font-semibold text-navy">
        {children}
      </span>
      {metPijl ? <CompacteExternePijl /> : null}
    </>
  ) : (
    <>
      <span>{children}</span>
      {metPijl ? <Pijl variant={variant} /> : null}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const linkProps: Partial<KnopAlsLinkProps> = { ...props };
    delete linkProps.children;
    delete linkProps.className;
    delete linkProps.metPijl;
    delete linkProps.variant;

    return (
      <Link {...linkProps} href={props.href} className={classes}>
        {inhoud}
      </Link>
    );
  }

  const buttonProps: Partial<KnopAlsButtonProps> = { ...props };
  delete buttonProps.children;
  delete buttonProps.className;
  delete buttonProps.metPijl;
  delete buttonProps.variant;
  delete buttonProps.type;

  return (
    <button {...buttonProps} type={props.type ?? "button"} className={classes}>
      {inhoud}
    </button>
  );
}
