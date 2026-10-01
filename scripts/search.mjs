import { readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT, isDate, listDocuments, parseHeader } from "./corpus.mjs";

export function parseArgs(args) {
  const allowed = new Set(["--company", "--query", "--before", "--limit"]);
  const values = {};
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index];
    if (!allowed.has(key) || Object.hasOwn(values, key) || !args[index + 1] || args[index + 1].startsWith("--")) throw new Error("Invalid or duplicate search option");
    values[key] = args[index + 1];
  }
  if (!values["--query"]?.trim()) throw new Error("--query is required");
  if (values["--before"] && !isDate(values["--before"])) throw new Error("--before must be a valid YYYY-MM-DD date");
  const limit = Number(values["--limit"] ?? 5);
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) throw new Error("--limit must be an integer from 1 to 100");
  const company = values["--company"]?.toUpperCase();
  if (company && !["HD", "ADI", "DE", "HAS", "LSE:HAS"].includes(company)) throw new Error("Unknown company (HD, ADI, DE, HAS)");
  return { query: values["--query"].trim(), company: company === "HAS" ? "LSE:HAS" : company, before: values["--before"], limit };
}

export async function search(options, root = ROOT) {
  const terms = options.query.toLowerCase().match(/[a-z0-9]+/g) || [];
  if (!terms.length) throw new Error("Query must contain searchable terms");
  const results = [];
  for (const path of await listDocuments(join(root, "challenge", "offline-data"))) {
    const text = await readFile(path, "utf8");
    const { metadata, body, bodyStartLine } = parseHeader(text);
    // Exclude invalid/unknown dates rather than silently admitting future evidence.
    if (!isDate(metadata.published_at)) continue;
    if (options.company && metadata.ticker !== options.company) continue;
    if (options.before && metadata.published_at > options.before) continue;
    const lines = body.split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      const lower = lines[index].toLowerCase();
      if (!terms.every(term => lower.includes(term))) continue;
      results.push({ path: relative(root, path).split("\\").join("/"), line: bodyStartLine + index, ticker: metadata.ticker, publishedAt: metadata.published_at, sourceUrl: metadata.source_url ?? null, passage: lines[index].slice(0, 1400) });
      break;
    }
  }
  results.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.path.localeCompare(b.path));
  return results.slice(0, options.limit);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const options = parseArgs(process.argv.slice(2));
    console.log(JSON.stringify({ query: options.query, before: options.before ?? null, results: await search(options) }, null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
