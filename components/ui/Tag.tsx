import type { HTMLAttributes, ReactNode } from "react";

/**
 * De variant `navy` is de enige tag met een navy vulling; eyebrow-labels elders
 * blijven ijsblauw met navy tekst.
 */
type TagVariant = "ijsblauw" | "navy";

type TagProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
  variant?: TagVariant;
};

const variantClasses: Record<TagVariant, string> = {
  ijsblauw: "bg-tag px-3 py-1.5 text-xs text-navy",
  navy: "bg-navy px-4 py-2 font-mono text-[0.8125rem] text-white",
};

export function Tag({
  children,
  className = "",
  variant = "ijsblauw",
  ...props
}: TagProps) {
  return (
    <p
      className={`inline-block w-fit rounded-none whitespace-nowrap tracking-[0.08em] uppercase ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
