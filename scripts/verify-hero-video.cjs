const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const out={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/heroVideoPlayback.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,out);
const {heroVideoPlayback:play,shouldStartHeroVideo:start}=out.exports;
test('initial viewport is a poster, including wheel noise under 8px',()=>{assert.equal(play(false,false,true,false,0),'poster');assert.equal(start(4,-4,920,false),false)});
test('scrolling inside the hero starts animation',()=>{assert.equal(start(20,-20,916,false),true);assert.equal(play(true,false,true,false,20),'play')});
test('deep linking beyond the hero cannot start a hidden background download',()=>assert.equal(start(2500,-2500,-1564,false),false));
test('pause and reduced motion preserve the poster',()=>{assert.equal(play(true,true,true,false,40),'poster');assert.equal(start(20,-20,916,true),false)});
test('offscreen and hidden tabs pause; returning can resume',()=>{assert.equal(play(true,false,false,false,40),'paused');assert.equal(play(true,false,true,true,40),'paused');assert.equal(play(true,false,true,false,40),'play')});
test('returning to the top restores the first frame',()=>assert.equal(play(true,false,true,false,0),'poster'));

test('a Subject anchor just under the fixed header does not start the video',()=>assert.equal(start(848,-848,88.1,false),false));
