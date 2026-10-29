// Run after npm run build. These checks inspect emitted HTML, not component source.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const html=fs.readFileSync('.next/server/app/index.html','utf8').replace(/<script\b[\s\S]*?<\/script>/g,'');
const scope={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/data/caseStudies.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,scope);
const cases=scope.exports.CASE_STUDIES;
const section=id=>{
  const found=html.match(new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?<\\/section>`));
  assert.ok(found,`Missing ${id}`);return found[0];
};
test('Subject has one accessible title and hidden stable ghost copies at first paint',()=>{
  const s=section('subject');
  assert.equal((s.match(/class="sr-only">The subject\.<\/span>/g)||[]).length,1);
  assert.ok((s.match(/class="ghost-double" aria-hidden="true"/g)||[]).length>=10);
  assert.doesNotMatch(s,/style="[^"]*(?:opacity:0|filter:blur)/);
});
test('Subject statement is factual and no longer repeats the hero tagline',()=>{
  const s=section('subject');
  assert.match(s,/Connecting interfaces to the systems behind them\./);
  assert.match(s,/Authenticated APIs, relational data, interactive apps\./);
  assert.doesNotMatch(s,/Thoughtful interfaces|Reliable systems underneath/);
});
test('all six case actions have actual source URLs in emitted HTML',()=>{
  const s=section('case-studies');
  for(const study of cases){
    const article=s.match(new RegExp(`<article[^>]*data-case-id="${study.id}"[\\s\\S]*?<\\/article>`));
    assert.ok(article,study.id);
    const action=article[0].match(/<a\b[^>]*class="case-file-cta"[^>]*>/);
    assert.ok(action,study.title);
    assert.ok(action[0].includes(`href="${study.github}"`),study.title);
  }
});
test('portrait, four marker sweeps and all factual spec rows survive server rendering',()=>{
  const s=section('subject');
  assert.match(s,/alt="Portrait of Vishwanath Nishad"/);
  assert.equal((s.match(/class="text-reveal reveal-marker marker-sweep"/g)||[]).length,4);
  for(const label of ['Degree','College','Location','Focus'])assert.ok(s.includes(`>${label}</dt>`),label);
});
test('one real closing heading remains and every extrusion copy is hidden',()=>{
  const s=html.match(/<section[^>]*class="contact-prelude"[\s\S]*?<\/section>/)[0];
  assert.equal((s.match(/id="prelude-heading"/g)||[]).length,1);
  assert.equal((s.match(/<span aria-hidden="true">One last thing\.<\/span>/g)||[]).length,8);
});
test('normal production markup has no debug panel, and the preserved hero has one video and chapter number',()=>{
  assert.doesNotMatch(html,/class="scroll-debug"/);
  const hero=section('home');
  assert.equal((hero.match(/<video\b/g)||[]).length,1);
  assert.equal((hero.match(/N° 01/g)||[]).length,1);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
});
