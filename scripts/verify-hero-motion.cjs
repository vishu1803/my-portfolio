const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const context = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/config/heroMotion.ts','utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, context);
const { heroMotionMode, HERO_MOTION } = context.exports;
for (const [name, reduced, paused, lowPower] of [['OS',true,false,false],['manual',false,true,false],['device',false,false,true],['all',true,true,true]]) {
  test(`${name}: static by default; only explicit session opt-in permits hero motion`, () => {
    assert.equal(heroMotionMode(reduced,paused,lowPower,false),'static');
    assert.equal(heroMotionMode(reduced,paused,lowPower,true),'running');
  });
}
test('ordinary devices are not accidentally gated', () => assert.equal(heroMotionMode(false,false,false,false),'running'));
test('expensive filter is capped independently and flashes remain infrequent', () => {
  assert.ok(HERO_MOTION.shadow.fps <= 30);
  assert.ok(HERO_MOTION.eye.flareDelay >= 5);
  assert.ok(HERO_MOTION.pulse.interval >= 12);
});
