import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
export const SOURCE = {
  repository: "https://github.com/kernlai/agents-vs-wall-street-starter",
  commit: "b28967472354c5b3839e2ae6689fe68320d6bee9",
  frozenAt: "2026-08-14",
};
export const EXPECTED_COUNTS = { HD: 319, ADI: 271, "LSE:HAS": 239, DE: 310 };

export function isDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && Number.isFinite(Date.parse(`${value}T00:00:00Z`))
    && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
}

export function parseHeader(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
  if (!match) throw new Error("Missing document provenance header");
  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator < 1) throw new Error("Malformed provenance field");
    const key = line.slice(0, separator).trim();
    if (Object.hasOwn(metadata, key)) throw new Error(`Duplicate provenance field: ${key}`);
    metadata[key] = JSON.parse(line.slice(separator + 1).trim());
  }
  return { metadata, body: text.slice(match[0].length), bodyStartLine: match[0].split("\n").length };
}

export async function listDocuments(directory) {
  const result = [];
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, "en"))) {
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Corpus symlinks are not allowed: ${path}`);
    if (entry.isDirectory()) result.push(...await listDocuments(path));
    else if (entry.isFile() && entry.name.endsWith(".md") && !["INDEX.md", "README.md"].includes(entry.name)) result.push(path);
  }
  return result;
}

export async function buildManifest(root = ROOT) {
  const documents = [];
  for (const path of await listDocuments(join(root, "challenge", "offline-data"))) {
    const bytes = await readFile(path);
    const { metadata } = parseHeader(bytes.toString("utf8"));
    if (!metadata.company || !metadata.ticker || !metadata.document_type
      || !isDate(metadata.published_at) || metadata.corpus_frozen_at !== SOURCE.frozenAt
      || metadata.published_at > SOURCE.frozenAt) throw new Error(`Invalid metadata: ${path}`);
    documents.push({
      path: relative(root, path).split("\\").join("/"),
      sha256: createHash("sha256").update(bytes).digest("hex"),
      bytes: bytes.length,
      company: metadata.company,
      ticker: metadata.ticker,
      publishedAt: metadata.published_at,
      documentType: metadata.document_type,
      period: metadata.period ?? null,
      sourceUrl: metadata.source_url ?? null,
    });
  }
  documents.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  return { schemaVersion: 1, source: SOURCE, documentCount: documents.length, documents };
}

export function checkExpectedCounts(manifest) {
  const counts = {};
  for (const document of manifest.documents) counts[document.ticker] = (counts[document.ticker] || 0) + 1;
  if (Object.keys(counts).length !== Object.keys(EXPECTED_COUNTS).length
    || Object.entries(EXPECTED_COUNTS).some(([ticker, count]) => counts[ticker] !== count)) {
    throw new Error(`Unexpected corpus counts: ${JSON.stringify(counts)}`);
  }
  return counts;
}

export async function verifyManifest(root = ROOT) {
  const saved = JSON.parse(await readFile(join(root, "challenge", "manifest.json"), "utf8"));
  const actual = await buildManifest(root);
  if (JSON.stringify(saved) !== JSON.stringify(actual)) throw new Error("Corpus differs from its saved manifest (files, hashes or metadata).");
  return actual;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const command = process.argv[2];
    if (!["build", "verify"].includes(command) || process.argv.length !== 3) throw new Error("Usage: node scripts/corpus.mjs build|verify");
    const manifest = command === "build" ? await buildManifest() : await verifyManifest();
    const counts = checkExpectedCounts(manifest);
    if (command === "build") await writeFile(join(ROOT, "challenge", "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(JSON.stringify({ ok: true, command, documents: manifest.documentCount, counts, source: SOURCE }));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
