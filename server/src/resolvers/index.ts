import { readdirSync } from "node:fs";
import { dirname } from "node:path"
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const loadAddResolvers = async () => {
  const resolversMap: Record<string, any> = {};

  const files = readdirSync(__dirname).filter(
    (file) => file.endsWith('.ts') && !file.startsWith('index')
  )

  await Promise.all(
    files.map(async (file) => {
      try {
        const name = file.replace('.ts', '');
        const mod = await import(`./${file}`);

        if (!mod.resolvers) throw new Error();
        resolversMap[name] = mod.resolvers
      } catch {
        console.error('Failed to load the ', file, ' resolver');
      }
    })
  )

  return resolversMap;
}

const ResolversCollection = await loadAddResolvers();
export default ResolversCollection;
