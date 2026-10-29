const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const scope={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/caseRail.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,scope);
const {caseRailStops:stops,activeCase:active}=scope.exports;
test('case jumps use measured panel offsets, including unequal widths',()=>{
  assert.deepEqual(Array.from(stops([0,870,1970,2780],2780)),[0,870,1970,2780]);
  assert.equal(active([0,870,1970,2780],1950),2);
});
test('last panel is clamped to the available rail distance',()=>{
  assert.deepEqual(Array.from(stops([0,900,1800,2700],2450)),[0,900,1800,2450]);
  assert.equal(active([0,900,1800,2450],2450),3);
});
test('active case follows reverse scrolling rather than retaining the furthest panel',()=>{
  assert.equal(active([0,900,1800],1780),2);
  assert.equal(active([0,900,1800],920),1);
  assert.equal(active([0,900,1800],5),0);
});
test('midpoint ties retain the preceding case to avoid a flickering step',()=>{
  assert.equal(active([0,1000,2000],500),0);
  assert.equal(active([0,1000,2000],501),1);
});
test('zero-distance layouts and an empty list are safe',()=>{
  assert.deepEqual(Array.from(stops([0,900,1800],0)),[0,0,0]);
  assert.equal(active([],0),0);
});
