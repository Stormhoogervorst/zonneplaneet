type PlausibleOpties = {
  props?: Record<string, string>;
  interactive?: boolean;
};

type PlausibleFunctie = {
  (event: string, opties?: PlausibleOpties): void;
  q?: Array<[string, PlausibleOpties?]>;
  init?: () => void;
};

declare global {
  interface Window {
    plausible?: PlausibleFunctie;
  }
}

function getPlausible(): PlausibleFunctie | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (!window.plausible) {
    const wachtrijFunctie: PlausibleFunctie = (event, opties) => {
      wachtrijFunctie.q ??= [];
      wachtrijFunctie.q.push([event, opties]);
    };
    window.plausible = wachtrijFunctie;
  }

  return window.plausible;
}

export function meetPlausibleEvent(
  event: string,
  props?: Record<string, string>,
) {
  getPlausible()?.(event, props ? { props } : undefined);
}

export function initialiseerPlausible() {
  getPlausible()?.init?.();
}
