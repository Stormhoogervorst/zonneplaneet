import { existsSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = new URL("../", import.meta.url);

function metTsExtensie(pad) {
  return existsSync(`${pad}.ts`) ? `${pad}.ts` : pad;
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const bestand = fileURLToPath(new URL(specifier.slice(2), root));
      return nextResolve(pathToFileURL(metTsExtensie(bestand)).href, context);
    }

    if (
      (specifier.startsWith("./") || specifier.startsWith("../")) &&
      context.parentURL
    ) {
      const bestand = fileURLToPath(new URL(specifier, context.parentURL));
      if (existsSync(`${bestand}.ts`)) {
        return nextResolve(pathToFileURL(`${bestand}.ts`).href, context);
      }
    }

    return nextResolve(specifier, context);
  },
});
