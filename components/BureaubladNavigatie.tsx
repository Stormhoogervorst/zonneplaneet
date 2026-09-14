"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  heeftKinderen,
  type NavigatieItem,
  type NavigatieLink,
} from "@/lib/navigatie";

const itemClass =
  "inline-flex items-center gap-1 whitespace-nowrap opacity-90 transition-opacity duration-200 hover:opacity-100";

function isHuidig(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function kanHoveren() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`size-3 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
    >
      <path
        d="M2 4.25 6 8.25 10 4.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

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

function NavItemMetKinderen({
  item,
}: {
  item: NavigatieItem & { kinderen: NavigatieLink[] };
}) {
  const pathname = usePathname();
  const wortelRef = useRef<HTMLLIElement>(null);
  const knopRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [jsAan, setJsAan] = useState(false);
  const submenuId = useId();
  const huidig = isHuidig(item.href, pathname);

  useEffect(() => {
    setJsAan(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function sluit(terugNaarKnop = false) {
      setOpen(false);
      if (terugNaarKnop) {
        knopRef.current?.focus();
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (!wortelRef.current?.contains(event.target as Node)) {
        sluit();
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        sluit(true);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function openOpHover() {
    if (jsAan && kanHoveren()) {
      setOpen(true);
    }
  }

  function sluitOpHover() {
    if (jsAan && kanHoveren()) {
      setOpen(false);
    }
  }

  return (
    <li
      ref={wortelRef}
      className="nav-item-met-kinderen relative"
      data-js={jsAan ? "" : undefined}
      data-open={jsAan && open ? "" : undefined}
      onMouseEnter={openOpHover}
      onMouseLeave={sluitOpHover}
      onBlur={(event) => {
        const volgende = event.relatedTarget;
        if (volgende instanceof Node && wortelRef.current?.contains(volgende)) {
          return;
        }
        if (wortelRef.current?.contains(document.activeElement)) {
          return;
        }
        setOpen(false);
      }}
    >
      {jsAan ? (
        <button
          ref={knopRef}
          type="button"
          aria-expanded={open}
          aria-controls={submenuId}
          className={`${navItemClass(huidig)} cursor-pointer bg-transparent p-0 font-normal text-inherit`}
          onClick={() => setOpen((huidige) => !huidige)}
        >
          {item.label}
          <Chevron open={open} />
        </button>
      ) : (
        <Link href={item.href} className={navItemClass(huidig)}>
          {item.label}
          <Chevron open={false} />
        </Link>
      )}
      <div
        id={submenuId}
        className="nav-submenu absolute top-full left-0 z-20 min-w-56 pt-3"
      >
        <ul className="rounded-3xl bg-white p-2 text-navy">
          {item.kinderen.map((kind) => (
            <li key={kind.href}>
              <Link
                href={kind.href}
                aria-current={pathname === kind.href ? "page" : undefined}
                className="block rounded-xl px-4 py-3 hover:bg-vlak"
              >
                {kind.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function BureaubladNavigatie({ items }: { items: NavigatieItem[] }) {
  return (
    <nav
      aria-label="Hoofdnavigatie"
      className="hidden min-w-0 flex-1 justify-center lg:flex"
    >
      <ul className="flex flex-nowrap items-center gap-5 text-[0.9375rem] xl:gap-8 xl:text-[1.0625rem] [&_li:last-child_.nav-submenu]:right-0 [&_li:last-child_.nav-submenu]:left-auto">
        {items.map((item) =>
          heeftKinderen(item) ? (
            <NavItemMetKinderen key={item.href} item={item} />
          ) : (
            <li key={item.href}>
              <NavLink href={item.href} label={item.label} />
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
