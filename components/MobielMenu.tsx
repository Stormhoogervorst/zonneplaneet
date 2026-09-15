"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Knop } from "@/components/ui";
import { type NavigatieLink } from "@/lib/navigatie";

const FOCUS_SELECTOR =
  'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

function focusbareElementen(wortel: HTMLElement) {
  return [...wortel.querySelectorAll<HTMLElement>(FOCUS_SELECTOR)].filter(
    (el) => el.getClientRects().length > 0,
  );
}

function sluitFocusOp(event: KeyboardEvent, wortel: HTMLElement) {
  const items = focusbareElementen(wortel);
  if (items.length === 0) {
    return;
  }

  const eerste = items[0];
  const laatste = items[items.length - 1];
  const actief = document.activeElement;

  if (event.shiftKey && actief === eerste) {
    event.preventDefault();
    laatste.focus();
    return;
  }

  if (!event.shiftKey && actief === laatste) {
    event.preventDefault();
    eerste.focus();
  }
}

function HamburgerIcoon() {
  return (
    <span
      aria-hidden="true"
      className="flex flex-col gap-2 group-open/menu:hidden"
    >
      <span className="block h-0.5 w-10 bg-current" />
      <span className="block h-0.5 w-10 bg-current" />
      <span className="block h-0.5 w-10 bg-current" />
    </span>
  );
}

function KruisIcoon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="hidden size-10 group-open/menu:block"
      fill="none"
    >
      <path
        d="M5 5l14 14M19 5 5 19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function MobielLink({ href, label }: NavigatieLink) {
  const pathname = usePathname();
  const huidig = pathname === href;

  return (
    <Link
      href={href}
      aria-current={huidig ? "page" : undefined}
      className={`block text-[1.5rem] leading-tight ${
        huidig
          ? "underline decoration-oranje decoration-2 underline-offset-4"
          : ""
      }`}
    >
      {label}
    </Link>
  );
}

export function MobielMenu({
  contact,
  items,
}: {
  contact: NavigatieLink;
  items: NavigatieLink[];
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();

  useEffect(() => {
    const el = detailsRef.current;
    if (el?.open) {
      el.open = false;
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const wortel = detailsRef.current;
    if (!wortel) {
      return;
    }

    wortel.querySelector("summary")?.focus();

    const vorigeOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function sluit() {
      if (detailsRef.current) {
        detailsRef.current.open = false;
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        sluit();
        return;
      }

      if (event.key === "Tab" && wortel) {
        sluitFocusOp(event, wortel);
      }
    }

    function onResize() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        sluit();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = vorigeOverflow;
    };
  }, [open]);

  return (
    <details
      ref={detailsRef}
      className="group/menu relative ml-auto shrink-0 lg:hidden"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary
        aria-controls={menuId}
        aria-expanded={open}
        aria-label={open ? "Sluit het menu" : "Open het menu"}
        className="relative z-[60] flex size-11 cursor-pointer list-none items-center justify-center group-open/menu:fixed group-open/menu:top-0 group-open/menu:right-0 group-open/menu:h-[var(--hoogte-headerbalk)] group-open/menu:w-auto group-open/menu:px-8 group-open/menu:text-white [&::-webkit-details-marker]:hidden [&::marker]:hidden"
      >
        <HamburgerIcoon />
        <KruisIcoon />
      </summary>
      <div
        id={menuId}
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-label="Menu"
        className="fixed inset-0 z-50 overflow-y-auto bg-navy text-white"
      >
        <nav className="px-8 pt-[var(--hoogte-headerbalk)] pb-16">
          <ul className="flex flex-col gap-6">
            {items.map((item) => (
              <li key={item.href}>
                <MobielLink href={item.href} label={item.label} />
              </li>
            ))}
            <li className="pt-4">
              <Knop href={contact.href} variant="wit">
                {contact.label}
              </Knop>
            </li>
          </ul>
        </nav>
      </div>
    </details>
  );
}
