import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import yaml from "yaml";


export async function resolve(specifier, context, nextResolve) {
    if (specifier.endsWith('.yml') || specifier.endsWith('.yaml')) {
        const resolved = await nextResolve(specifier, context);

        return {
            url: resolved.url,
            format: 'module',
            shortCircuit: true,
        };
    }

    return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
    if (url.endsWith('.yml') || url.endsWith('.yaml')) {
        const filepath = fileURLToPath(url);

        const content = await fs.readFile(filepath, 'utf8');

        const data = yaml.parse(content.toString());

        const code = `export default ${JSON.stringify(data)}`;

        return {
            format: 'module',
            source: code,
            shortCircuit: true,
        };
    }

    return nextLoad(url, context);
}