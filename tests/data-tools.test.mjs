import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { buildManifest, checkExpectedCounts, isDate, parseHeader, verifyManifest } from "../scripts/corpus.mjs";
import { parseArgs, search } from "../scripts/search.mjs";

function document(date = "2026-01-01", body = "Revenue increased.", ticker = "HD") {
  return `---\ncompany: "Example"\nticker: "${ticker}"\npublished_at: "${date}"\ndocument_type: "FILING"\nperiod: "Q1 2026"\nsource_url: null\ncorpus_frozen_at: "2026-08-14"\n---\n\n# Report\n${body}\n`;
}

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "primer-eval-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const directory = join(root, "challenge", "offline-data", "example");
  await mkdir(directory, { recursive: true });
  return { root, directory };
}

test("date validation rejects impossible dates", () => {
  assert.equal(isDate("2026-02-29"), false);
  assert.equal(isDate("2026-04-31"), false);
  assert.equal(isDate("2024-02-29"), true);
  assert.equal(isDate("unknown"), false);
});

test("provenance parser preserves null and line citations", () => {
  const text = document();
  const parsed = parseHeader(text);
  assert.equal(parsed.metadata.source_url, null);
  assert.equal(text.split("\n")[parsed.bodyStartLine - 1], parsed.body.split("\n")[0]);
  assert.throws(() => parseHeader("no header"));
  assert.throws(() => parseHeader('---\ncompany: "A"\ncompany: "B"\n---\n'));
});

test("manifest is deterministic, excludes indexes, and verifies bytes", async t => {
  const { root, directory } = await fixture(t);
  const content = document();
  await writeFile(join(directory, "doc.md"), content);
  await writeFile(join(directory, "INDEX.md"), "# Index");
  const manifest = await buildManifest(root);
  assert.equal(manifest.documentCount, 1);
  assert.equal(manifest.documents[0].sha256, createHash("sha256").update(content).digest("hex"));
  assert.deepEqual(await buildManifest(root), manifest);
  await writeFile(join(root, "challenge", "manifest.json"), JSON.stringify(manifest));
  assert.deepEqual(await verifyManifest(root), manifest);
  await writeFile(join(directory, "doc.md"), document("2026-01-01", "Changed."));
  await assert.rejects(verifyManifest(root), /differs/);
});

test("unexpected additions and symlinks fail verification", async t => {
  const { root, directory } = await fixture(t);
  await writeFile(join(directory, "doc.md"), document());
  await writeFile(join(root, "challenge", "manifest.json"), JSON.stringify(await buildManifest(root)));
  await writeFile(join(directory, "extra.md"), document());
  await assert.rejects(verifyManifest(root), /differs/);
  await symlink(join(directory, "doc.md"), join(directory, "link.md"));
  await assert.rejects(buildManifest(root), /symlinks/);
});

test("corpus rejects post-freeze and missing dates", async t => {
  const { root, directory } = await fixture(t);
  await writeFile(join(directory, "doc.md"), document("2026-08-15"));
  await assert.rejects(buildManifest(root), /Invalid metadata/);
  await writeFile(join(directory, "doc.md"), document("unknown"));
  await assert.rejects(buildManifest(root), /Invalid metadata/);
});

test("search cutoff is inclusive, filters companies and returns exact line", async t => {
  const { root, directory } = await fixture(t);
  await writeFile(join(directory, "old.md"), document("2026-01-01"));
  await writeFile(join(directory, "future.md"), document("2026-02-01"));
  await writeFile(join(directory, "other.md"), document("2026-01-01", "Revenue increased.", "DE"));
  await writeFile(join(directory, "undated.md"), document("unknown"));
  const hits = await search(parseArgs(["--query", "revenue", "--company", "HD", "--before", "2026-01-01"]), root);
  assert.equal(hits.length, 1);
  assert.ok(hits[0].path.endsWith("old.md"));
  const lines = (await readFile(join(root, hits[0].path), "utf8")).split("\n");
  assert.equal(lines[hits[0].line - 1], hits[0].passage);
});

test("argument validation and expected inventory are fail-closed", () => {
  assert.throws(() => parseArgs(["--query", "sales", "--before", "2026-02-30"]));
  assert.throws(() => parseArgs(["--query", "sales", "--company", "unknown"]));
  assert.throws(() => parseArgs(["--query", "sales", "--limit", "0"]));
  assert.throws(() => parseArgs(["--query", "sales", "--query", "profit"]));
  assert.throws(() => parseArgs(["--query"]));
  assert.equal(parseArgs(["--query", "fees", "--company", "HAS"]).company, "LSE:HAS");
  assert.throws(() => checkExpectedCounts({ documents: [] }), /Unexpected corpus counts/);
});
