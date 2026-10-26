const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "src/data/caseStudies.ts"), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const context = { exports: {} };
vm.runInNewContext(compiled, context, { timeout: 1000 });
const { CASE_STUDIES } = context.exports;

test("project notes have unique, stable identities", () => {
  assert.ok(CASE_STUDIES.length > 0);
  assert.equal(new Set(CASE_STUDIES.map(study => study.id)).size, CASE_STUDIES.length);
});

for (const study of CASE_STUDIES) {
  test(`${study.title}: project-specific repository, source and local visual`, () => {
    const repository = new URL(study.github);
    assert.equal(repository.protocol, "https:");
    assert.equal(repository.hostname, "github.com");
    assert.match(repository.pathname, /^\/vishu1803\/[^/]+\/?$/);
    const sourceUrl = new URL(study.sourceUrl);
    assert.equal(sourceUrl.hostname, repository.hostname);
    assert.ok(sourceUrl.pathname.startsWith(repository.pathname.replace(/\/$/, "") + "/blob/"));
    assert.ok(["resume", "repository"].includes(study.sourceKind));
    assert.ok(study.sourceLabel.trim());
    assert.match(study.image, /^\/[a-zA-Z0-9._/-]+$/);
    const image = path.resolve(root, "public", study.image.slice(1));
    assert.ok(image.startsWith(path.join(root, "public") + path.sep));
    assert.ok(fs.statSync(image).size > 0);
    if (study.liveDemo) {
      const live = new URL(study.liveDemo);
      assert.equal(live.protocol, "https:");
      assert.notEqual(live.hostname, "github.com", "A repository is not a live demo");
    }
  });
}
