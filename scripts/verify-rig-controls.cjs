const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const scope={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/rigControls.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,scope);
const make=scope.exports.createRigControls;
const receiver=()=>{const state={};return {state,controls:{aim:(x,y)=>{state.aim=[x,y]},hover:v=>{state.hover=v},drag:v=>{state.drag=v},pause:v=>{state.paused=v}}}};
test('Pause tug before the lazy rig is ready is replayed on connection',()=>{
  const rig=make(),target=receiver();rig.controls.pause(true);rig.connect(target.controls);assert.equal(target.state.paused,true);
});
test('user pause survives reduced-motion teardown and reconstruction',()=>{
  const rig=make(),first=receiver(),next=receiver();rig.connect(first.controls);rig.controls.pause(true);rig.connect(null);rig.connect(next.controls);assert.equal(next.state.paused,true);
});
test('resume while disconnected is retained, with the latest pointer and drag intent',()=>{
  const rig=make(),target=receiver();rig.controls.pause(true);rig.controls.pause(false);rig.controls.aim(.2,-.3);rig.controls.drag(18);rig.controls.hover(true);rig.connect(target.controls);
  assert.equal(target.state.paused,false);assert.equal(target.state.drag,18);assert.equal(target.state.hover,true);assert.deepEqual(target.state.aim,[.2,-.3]);
});
