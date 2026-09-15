"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type NavigatieLink } from "@/lib/navigatie";

const itemClass =
  "inline-flex items-center gap-1 whitespace-nowrap opacity-90 transition-opacity duration-200 hover:opacity-100";

function navItemClass(huidig: boolean) {
  return `${itemClass} ${
    huidig
      ? "opacity-100 underline decoration-oranje decoration-2 underline-offset-4"
      : ""
  }`;
}

function NavLink({ href, label }: NavigatieLink) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      className={navItemClass(pathname === href)}
    >
      {label}
    </Link>
  );
}

export function BureaubladNavigatie({ items }: { items: NavigatieLink[] }) {
  return (
    <nav
      aria-label="Hoofdnavigatie"
      className="hidden min-w-0 flex-1 justify-center lg:flex"
    >
      <ul className="flex flex-nowrap items-center gap-5 text-[0.9375rem] xl:gap-8 xl:text-[1.0625rem]">
        {items.map((item) => (
          <li key={item.href}>
            <NavLink href={item.href} label={item.label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
