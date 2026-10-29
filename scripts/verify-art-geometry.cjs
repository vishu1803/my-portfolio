const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const vm = require("node:vm");
const sharp = require("sharp");
const root = path.resolve(__dirname, "..");
const compiled = ts.transpileModule(fs.readFileSync(path.join(root, "src/lib/artGeometry.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const context = { exports: {} };
vm.runInNewContext(compiled, context);
const { coverFrame } = context.exports;

for (const width of [430, 300, 165, 140]) {
  test(`${width}px art slot: cover never exposes an edge and both eyes remain visible`, () => {
    const height = width * 4.7 / 4;
    const frame = coverFrame(width, height, 2048, 1151);
    assert.ok(frame.left <= 0 && frame.top <= 0);
    assert.ok(frame.left + frame.width >= width - .001);
    assert.ok(frame.top + frame.height >= height - .001);
    assert.ok(Math.abs(frame.width / frame.height - 2048 / 1151) < .000001);
    for (const eye of [{ x: 967, y: 300 }, { x: 1070, y: 307 }]) {
      const x = frame.left + eye.x / 2048 * frame.width;
      const y = frame.top + eye.y / 1151 * frame.height;
      assert.ok(x > width * .3 && x < width * .7, `eye x=${x}`);
      assert.ok(y > height * .15 && y < height * .4, `eye y=${y}`);
    }
  });
}
test("art positioning changes the crop without distorting the source", () => {
  const left = coverFrame(430, 505.25, 2048, 1151, 0, 0);
  const right = coverFrame(430, 505.25, 2048, 1151, 1, 1);
  assert.ok(Math.abs(left.left) < .001);
  assert.ok(Math.abs(right.left + right.width - 430) < .001);
  assert.equal(left.width, right.width);
});
test("the optimized supplied artwork has the declared dimensions", async () => {
  const image = path.join(root, "public/hero/art.webp");
  assert.ok(fs.statSync(image).size > 0);
  const metadata = await sharp(image).metadata();
  assert.equal(metadata.format, "webp");
  assert.equal(metadata.width, 2048);
  assert.equal(metadata.height, 1151);
});

for (const [viewport, width, height, left] of [[1440, 950.4, 900, 489.6], [390, 522.6, 628, -23.4]]) {
  test(`${viewport}px viewport: CSS cover fallback matches measured geometry before hydration`, () => {
    const frame = coverFrame(width, height, 2048, 1151);
    const cssWidth = Math.max(width, height * 2048 / 1151);
    const cssHeight = Math.max(height, width * 1151 / 2048);
    assert.ok(Math.abs(frame.width - cssWidth) < .001);
    assert.ok(Math.abs(frame.height - cssHeight) < .001);
    assert.ok(Math.abs(frame.left - (width - cssWidth) / 2) < .001);
    const faceX = left + frame.left + frame.width * .4975;
    if (viewport === 1440) assert.ok(faceX / viewport >= .62 && faceX / viewport <= .7);
    else assert.ok(faceX > 0 && faceX < viewport);
  });
}
