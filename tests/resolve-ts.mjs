// Hook de resolución para correr los tests con Node sin dependencias extra:
// permite importar módulos .ts sin extensión y con el alias "@/".
import { register } from "node:module";
import { pathToFileURL } from "node:url";

register(
  "data:text/javascript," +
    encodeURIComponent(`
      import { existsSync } from "node:fs";
      import { fileURLToPath, pathToFileURL } from "node:url";
      const SRC = ${JSON.stringify(pathToFileURL(process.cwd() + "/src/").href)};
      export async function resolve(specifier, context, next) {
        let target = specifier;
        if (target.startsWith("@/")) target = new URL(target.slice(2), SRC).href;
        const isRelative = target.startsWith("./") || target.startsWith("../") || target.startsWith("file:");
        if (isRelative && !/\\.[cm]?[jt]sx?$/.test(target)) {
          const base = new URL(target, context.parentURL);
          for (const ext of [".ts", "/index.ts"]) {
            const candidate = new URL(base.href + ext);
            if (existsSync(fileURLToPath(candidate))) return next(candidate.href, context);
          }
        }
        return next(target, context);
      }
    `),
  pathToFileURL("./"),
);
