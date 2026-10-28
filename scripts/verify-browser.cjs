// npm run build && npx playwright install chromium && npm run test:browser
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const path = require("node:path");
const { chromium } = require("playwright");
let server, browser, desktop;
const errors = [];
const base = "http://127.0.0.1:3194";
const triggerName = "Let’s collaborate — open contact details";
const wait = (page, ms = 1400) => page.waitForTimeout(ms);
async function openPage(options = {}) {
  const { lowPower = false, settle = 2400, ...pageOptions } = options;
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, ...pageOptions });
  await page.addInitScript(({lowPower}) => {
    Object.defineProperty(Navigator.prototype, "hardwareConcurrency", { configurable: true, get: () => lowPower ? 2 : 8 });
    Object.defineProperty(Navigator.prototype, "deviceMemory", { configurable: true, get: () => lowPower ? 2 : 8 });
  }, {lowPower});
  page.on("pageerror", (error) =>
    errors.push(
      `[${options.viewport?.width || 1440}/${options.reducedMotion || "normal"}] ${error.message}`,
    ),
  );
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await wait(page, settle);
  return page;
}
async function scroll(page, top) {
  await page.evaluate((top) => {
    const event = new CustomEvent("portfolio:scroll", {
      detail: { top },
      cancelable: true,
    });
    if (window.dispatchEvent(event))
      window.scrollTo({ top, behavior: "instant" });
  }, top);
  await wait(page);
}
async function section(page, id) {
  const top = await page
    .locator("#" + id)
    .evaluate((el) =>
      el.dataset.pinStart
        ? Number(el.dataset.pinStart)
        : el.getBoundingClientRect().top + scrollY - 86,
    );
  await scroll(page, top);
}
async function contact(page) {
  await section(page, "contact");
  await page.getByRole("button", { name: triggerName, exact: true }).click();
  const dialog = page.getByRole("dialog", {
    name: "Vishwanath Nishad",
    exact: true,
  });
  await dialog.waitFor({ state: "visible", timeout: 15000 });
  await wait(page, 1500);
  return dialog;
}
async function cords(page) {
  const points = await page.evaluate(() => {
    const box = document
      .querySelector(".collaborate-pill")
      .getBoundingClientRect();
    return [...document.querySelectorAll(".tension-string")].map((path) => {
      const p = path.getPointAtLength(path.getTotalLength());
      const q = new DOMPoint(p.x, p.y).matrixTransform(path.getScreenCTM());
      return {
        x: q.x - box.left,
        y: q.y - box.top,
        w: box.width,
        h: box.height,
      };
    });
  });
  for (const p of points) {
    assert.ok(p.x >= -5 && p.x < p.w * 0.15, JSON.stringify(p));
    assert.ok(p.y >= -5 && p.y < p.h + 5, JSON.stringify(p));
  }
}
before(async () => {
  server = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "-p",
      "3194",
      "-H",
      "127.0.0.1",
    ],
    { cwd: path.resolve(__dirname, ".."), stdio: ["ignore", "pipe", "pipe"] },
  );
  await new Promise((resolve, reject) => {
    let output = "";
    const timer = setTimeout(() => reject(new Error(output)), 20000);
    server.stdout.on("data", (b) => {
      output += b;
      if (output.includes("Ready")) {
        clearTimeout(timer);
        resolve();
      }
    });
    server.stderr.on("data", (b) => (output += b));
    server.on("error", reject);
  });
  browser = await chromium.launch({
    headless: true,
    ...(process.env.BROWSER_EXECUTABLE_PATH
      ? { executablePath: process.env.BROWSER_EXECUTABLE_PATH }
      : {}),
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-zygote",
    ],
  });
  desktop = await openPage();
});
after(async () => {
  await browser?.close();
  server?.kill();
});
test("identity, SEO, next/font variables, content and navigation remain intact", async () => {
  assert.equal(await desktop.locator("h1").count(), 1);
  assert.match(await desktop.locator("h1").textContent(), /Vishwanath.*Nishad/);
  assert.match(await desktop.title(), /Vishwanath Nishad/);
  assert.ok(
    await desktop.locator("meta[name=description]").getAttribute("content"),
  );
  const fonts = await desktop.evaluate(() => ({
    display: getComputedStyle(document.documentElement).getPropertyValue(
      "--font-gothic",
    ),
    serif: getComputedStyle(document.documentElement).getPropertyValue(
      "--font-garamond",
    ),
    computed: getComputedStyle(document.querySelector("h1")).fontFamily,
  }));
  assert.ok(fonts.display.length > 2);
  assert.ok(fonts.serif.length > 2);
  assert.ok(
    fonts.computed.includes(
      fonts.display.split(",")[0].replaceAll('"', "").trim(),
    ),
    JSON.stringify(fonts),
  );
  for (const href of await desktop
    .locator('nav a[href^="#"]')
    .evaluateAll((els) => els.map((el) => el.getAttribute("href"))))
    assert.equal(await desktop.locator(href).count(), 1);
  assert.equal(
    await desktop
      .locator(".monogram-preloader")
      .evaluate((el) => getComputedStyle(el).visibility),
    "hidden",
  );
});
test("first intro curtains finish before the hero entrance and repeat visits skip them", async () => {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype,"hardwareConcurrency",{configurable:true,get:()=>8});
    Object.defineProperty(Navigator.prototype,"deviceMemory",{configurable:true,get:()=>8});
    window.__earlyHero = false;
    new MutationObserver(() => {
      const phase = document
        .querySelector("[data-intro-state]")
        ?.getAttribute("data-intro-state");
      const style = document
        .querySelector(".hero-name-line")
        ?.getAttribute("style");
      if (
        (phase === "playing" || phase === "checking") &&
        style?.includes("transform")
      )
        window.__earlyHero = true;
    }).observe(document, {
      subtree: true,
      attributes: true,
      attributeFilter: ["style"],
    });
  });
  await page.goto(base, { waitUntil: "networkidle" });
  await page
    .locator('[data-intro-state="done"]')
    .waitFor({ state: "attached" });
  assert.equal(await page.evaluate(() => window.__earlyHero), false);
  assert.equal(
    await page.evaluate(() => sessionStorage.getItem("portfolio-intro-seen")),
    "1",
  );
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(
    await page.locator("html").getAttribute("data-intro-skip"),
    "true",
  );
  assert.equal(
    await page
      .locator(".monogram-preloader")
      .evaluate((el) => getComputedStyle(el).visibility),
    "hidden",
  );
  await page.close();
});
test("torch starts dim and reveals the supplied artwork with a real mask", async () => {
  const torch = desktop.locator("[data-torch]");
  assert.equal(
    await torch
      .locator(".torch-subject")
      .evaluate((el) => getComputedStyle(el).opacity),
    "0",
  );
  const box = await desktop.locator(".torch-dim .hero-photo").boundingBox();
  await desktop.mouse.move(box.x + box.width * 0.55, box.y + box.height * 0.4);
  await wait(desktop, 650);
  assert.equal(await torch.getAttribute("data-active"), "true");
  assert.match(
    await torch
      .locator(".torch-subject")
      .evaluate((el) => getComputedStyle(el).maskImage),
    /radial-gradient/,
  );
  assert.equal(
    await torch
      .locator(".torch-subject img")
      .evaluate((el) => el.complete && el.naturalWidth > 0),
    true,
  );
  assert.equal(await torch.locator(".torch-subject .anime-image").count(), 1);
  assert.equal(await torch.locator(".torch-dim").evaluate(el=>getComputedStyle(el).opacity), "0.35");
  assert.equal(await torch.locator(".torch-subject").getAttribute("aria-hidden"), "true");
  assert.equal(await torch.locator(".torch-ambient").evaluate(el=>getComputedStyle(el).opacity), "1");
  await desktop.waitForFunction(()=>Number(getComputedStyle(document.querySelector(".torch-instruction")).opacity)<.01,{},{timeout:15000});
  assert.ok(Number(await desktop.locator(".torch-instruction").evaluate(el=>getComputedStyle(el).opacity))<0.01);
});
test("keyboard lights-on reveals permanently and finishes the drawn annotation", async () => {
  const button = desktop.locator(".torch-inspect");
  await button.focus(); await desktop.keyboard.press("Enter");
  await desktop.waitForFunction(()=>document.querySelector("[data-torch]").dataset.revealComplete === "true");
  await desktop.mouse.move(10, 90);
  assert.equal(await desktop.locator("#home").getAttribute("data-lit"), "true");
  assert.equal(await desktop.locator(".torch-subject").evaluate(el=>getComputedStyle(el).maskImage), "none");
  await desktop.waitForFunction(()=>[...document.querySelectorAll(".hero-ink-path")].every(el=>parseFloat(getComputedStyle(el).strokeDashoffset)===0));
  assert.equal(await button.getAttribute("aria-disabled"), "true");
});
test("cursor dot is immediate while its ring lags and hero actions are magnetic", async () => {
  const state = await desktop.evaluate(() => {
    document.body.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: 300,
        clientY: 300,
        pointerType: "mouse",
        bubbles: true,
      }),
    );
    document.body.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: 500,
        clientY: 400,
        pointerType: "mouse",
        bubbles: true,
      }),
    );
    return {
      dot: document.querySelector(".cursor-dot").style.transform,
      ring: document.querySelector(".cursor-trail").style.transform,
    };
  });
  assert.match(state.dot, /500px, 400px/);
  assert.doesNotMatch(state.ring, /500px, 400px/);
  const magnet = desktop.locator(".hero-actions .magnetic > span").first();
  const box = await magnet.boundingBox();
  await desktop.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.7);
  await wait(desktop, 350);
  assert.notEqual(
    await magnet.evaluate((el) => getComputedStyle(el).transform),
    "none",
  );
});
test("drawn hero annotations use the owner-updated 600+ count rather than reference CGPA", async () => {
  assert.equal(await desktop.locator(".hero-ink-path").count(), 2);
  for (const path of await desktop.locator(".hero-ink-path").all())
    assert.ok(
      Math.abs(
        await path.evaluate((el) =>
          parseFloat(getComputedStyle(el).strokeDashoffset),
        ),
      ) < 0.1,
    );
  assert.match(await desktop.locator(".hero-practice").innerText(), /600/);
  assert.doesNotMatch(
    await desktop.locator("#home").innerText(),
    /9\.10|9\.24|465%/,
  );
});
test("Lenis anchors, active chapter underline and reading progress follow navigation", async () => {
  assert.equal(
    await desktop.locator("html").getAttribute("data-scroll-engine"),
    "lenis",
  );
  await desktop.getByRole("link", { name: "01 Subject", exact: true }).click();
  await desktop.waitForFunction(()=>Math.abs(document.querySelector("#subject").getBoundingClientRect().top-88)<5,{},{timeout:15000});
  const top = await desktop
    .locator("#subject")
    .evaluate((el) => el.getBoundingClientRect().top);
  assert.ok(Math.abs(top - 88) < 5, top);
  assert.equal(
    await desktop
      .getByRole("link", { name: "01 Subject", exact: true })
      .getAttribute("aria-current"),
    "location",
  );
  assert.equal(await desktop.locator(".nav-underline").count(), 1);
  assert.ok(
    (await desktop
      .locator(".nav-reading-progress>span")
      .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m11)) > 0,
  );
});
test("subject scene has the duotone portrait, word reveal, marker sweeps and factual specs", async () => {
  assert.equal(await desktop.locator(".subject-spec-row").count(), 4);
  assert.match(
    await desktop
      .locator(".subject-portrait img")
      .evaluate((el) => getComputedStyle(el).filter),
    /grayscale/,
  );
  assert.equal(
    await desktop
      .locator(".subject-portrait img")
      .evaluate((el) => getComputedStyle(el).mixBlendMode),
    "multiply",
  );
  await desktop.locator(".subject-bio").scrollIntoViewIfNeeded();
  await wait(desktop, 1600);
  for (const marker of await desktop.locator(".marker-sweep").all())
    assert.equal(
      await marker
        .locator(".reveal-marker-ink")
        .evaluate(
          (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).a,
        ),
      1,
    );
  assert.match(
    await desktop.locator(".subject-specs").innerText(),
    /Rajkiya Engineering College/,
  );
});
test("desktop case files pin and progress horizontally with one active case", async () => {
  await section(desktop, "case-studies");
  const range = await desktop.locator("#case-studies").evaluate((el) => ({
    start: Number(el.dataset.pinStart),
    end: Number(el.dataset.pinEnd),
  }));
  assert.ok(range.end - range.start > 2000, JSON.stringify(range));
  await scroll(desktop, range.start + (range.end - range.start) * 0.55);
  assert.ok(
    (await desktop
      .locator(".case-files-track")
      .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41)) <
      -1000,
  );
  assert.equal(
    await desktop.locator(".case-file[data-active=true]").count(),
    1,
  );
  assert.ok(
    (await desktop
      .locator(".case-track-progress>span")
      .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m11)) >
      0.4,
  );
  assert.equal(await desktop.locator("[data-case-id]").count(), 6);
});
test("keyboard focus scrolls the pinned case into view and its image/links are real", async () => {
  const cards = desktop.locator(".case-file");
  for (let index = 0; index < 6; index++) {
    const card = cards.nth(index);
    const button = card.getByRole("button", { name: /View case file/ });
    await button.focus();
    await wait(desktop, 1300);
    const box = await button.boundingBox();
    assert.ok(box.x >= -3 && box.x < 1440, JSON.stringify(box));
    assert.match(
      await card
        .getByRole("link", { name: /source code on GitHub/ })
        .getAttribute("href"),
      /^https:\/\/github.com\/vishu1803\//,
    );
    assert.equal(
      await card
        .locator("img")
        .evaluate((el) => el.complete && el.naturalWidth > 0),
      true,
    );
  }
});
test("case visual tilts on pointer movement with independent depth labels", async () => {
  await desktop
    .locator(".case-file")
    .first()
    .getByRole("button", { name: /View case file/ })
    .focus();
  await wait(desktop, 1300);
  const visual = desktop.locator(".case-file-visual").first();
  const box = await visual.boundingBox();
  await desktop.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.3);
  await wait(desktop, 450);
  assert.ok(
    await visual.evaluate((el) =>
      el.style.getPropertyValue("--glow-x").endsWith("px"),
    ),
  );
  assert.notEqual(
    await visual
      .locator(".case-tilt-frame")
      .evaluate((el) => getComputedStyle(el).transform),
    "none",
  );
  assert.match(
    await visual
      .locator(".case-depth-tag")
      .evaluate((el) => getComputedStyle(el).transform),
    /matrix3d/,
  );
  await desktop.mouse.move(10, 90);
});
test("project notes and project index dialogs escape the pin and preserve focus", async () => {
  const trigger = desktop
    .getByRole("button", { name: /View case file/ })
    .first();
  await trigger.focus();
  await wait(desktop, 1200);
  await desktop.keyboard.press("Enter");
  await desktop.getByRole("dialog").waitFor({state:"visible",timeout:12000});
  assert.equal(await desktop.getByRole("dialog").isVisible(), true);
  assert.match(
    await desktop.getByRole("dialog").innerText(),
    /Collaborative Task Manager/i,
  );
  await desktop.keyboard.press("Escape");
  await desktop.getByRole("dialog").waitFor({state:"hidden",timeout:12000});
  assert.equal(
    await trigger.evaluate((el) => el === document.activeElement),
    true,
  );
  await desktop
    .getByRole("button", { name: "Project index / 06", exact: true })
    .click();
  await desktop.getByRole("dialog").waitFor({state:"visible",timeout:12000});
  const box = await desktop.getByRole("dialog").boundingBox();
  assert.equal(box.x, 0);
  assert.equal(box.y, 0);
  await desktop.keyboard.press("Escape");
  await wait(desktop, 500);
});
test("toolkit preserves real skill groups and a short accent band", async () => {
  await section(desktop, "toolkit");
  assert.equal(await desktop.locator(".toolkit-row").count(), 4);
  assert.equal(
    await desktop.locator(".lead-skill").textContent(),
    "TypeScript",
  );
  const bandTop = await desktop
    .locator("#toolkit")
    .evaluate(
      (el) => el.getBoundingClientRect().bottom + scrollY - innerHeight * 0.5,
    );
  await scroll(desktop, bandTop);
  assert.ok(
    (await desktop
      .locator(".toolkit-yellow-rise")
      .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m22)) >
      0.5,
  );
  assert.equal(await desktop.locator(".certification-block").count(), 0);
});
test("evidence ledger keeps the real internship, academic dates and verified count-up", async () => {
  await section(desktop, "about");
  assert.equal(await desktop.locator(".evidence-row").count(), 3);
  assert.match(
    await desktop.locator(".evidence-ledger").innerText(),
    /FTV Saloon/i,
  );
  const row = desktop.locator(".evidence-row").last();
  await row.scrollIntoViewIfNeeded();
  await wait(desktop, 1600);
  assert.match(await row.locator(".count-up").innerText(), /600\+/);
  for (const rule of await desktop.locator(".evidence-rule").all())
    assert.ok(
      (await rule.evaluate(
        (el) => new DOMMatrix(getComputedStyle(el).transform).m11,
      )) > 0.99,
    );
});
test("the interlude pins on desktop and the following white scene remains above it", async () => {
  await desktop.locator(".contact-prelude").evaluate((el) => {
    const top = el.getBoundingClientRect().top + scrollY - 84;
    const e = new CustomEvent("portfolio:scroll", {
      detail: { top },
      cancelable: true,
    });
    if (window.dispatchEvent(e)) scrollTo(top, 0);
  });
  await wait(desktop);
  assert.ok(
    await desktop
      .locator(".contact-prelude")
      .evaluate((el) => el.parentElement.className.includes("pin-spacer")),
  );
  assert.ok(
    (await desktop
      .locator("#contact")
      .evaluate((el) => Number(getComputedStyle(el).zIndex))) >
      (await desktop
        .locator(".contact-prelude")
        .evaluate((el) => Number(getComputedStyle(el).zIndex))),
  );
});
test("existing tug continues, fingers have individual paths and cords remain attached", async () => {
  await section(desktop, "contact");
  await desktop.mouse.move(10, 90);
  assert.equal(await desktop.locator(".pulling-hand [data-finger]").count(), 5);
  assert.equal(await desktop.locator(".tension-string").count(), 5);
  const before = await desktop
    .locator(".collab-button-wrapper")
    .getAttribute("style");
  await wait(desktop, 1100);
  assert.notEqual(
    await desktop.locator(".collab-button-wrapper").getAttribute("style"),
    before,
  );
  await cords(desktop);
});
test("Pause tug stops the idle cycle while pointer tension remains usable", async () => {
  await desktop.getByRole("button", { name: "Pause tug", exact: true }).click();
  await desktop.mouse.move(10, 90);
  await wait(desktop, 600);
  const d = await desktop.locator(".tension-string").first().getAttribute("d");
  await wait(desktop, 300);
  const settled=await desktop.locator(".tension-string").first().getAttribute("d");
  const startNumbers=d.match(/-?\d+(?:\.\d+)?/g).map(Number);
  const endNumbers=settled.match(/-?\d+(?:\.\d+)?/g).map(Number);
  assert.ok(startNumbers.every((n,i)=>Math.abs(n-endNumbers[i])<0.15),`${d} -> ${settled}`);
  const box = await desktop.locator(".collab-stage").boundingBox();
  await desktop.mouse.move(box.x + box.width * 0.9, box.y + 20);
  await wait(desktop, 600);
  assert.notEqual(
    await desktop.locator(".tension-string").first().getAttribute("d"),
    d,
  );
  await cords(desktop);
  await desktop.mouse.move(10, 90);
  await desktop
    .getByRole("button", { name: "Resume tug", exact: true })
    .click();
});
test("dragging the pill springs back without triggering the burst", async () => {
  const button = desktop.getByRole("button", {
    name: triggerName,
    exact: true,
  });
  await button.hover();
  await wait(desktop, 400);
  const box = await button.boundingBox();
  await desktop.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await desktop.mouse.down();
  await desktop.mouse.move(box.x + box.width / 2 + 22, box.y + box.height / 2, {
    steps: 8,
  });
  await wait(desktop, 100);
  await cords(desktop);
  await desktop.mouse.up();
  await wait(desktop, 700);
  assert.equal(await desktop.locator(".physics-burst").count(), 0);
  assert.equal(await desktop.getByRole("dialog").count(), 0);
  assert.ok(
    Math.abs(
      await button.evaluate(
        (el) => new DOMMatrix(getComputedStyle(el).transform).m41,
      ),
    ) < 1,
  );
});
test("Enter starts six actual Matter.js word bodies; Escape cancels without late contact", async () => {
  const page=await openPage();
  await section(page,"contact");
  await page.evaluate(()=>{
    document.addEventListener("click",event=>{
      const pill=document.querySelector(".collaborate-pill");
      if(pill){const rect=pill.getBoundingClientRect();window.__pillClickX=rect.left+rect.width/2;}
    },{capture:true,once:true});
    const observer=new MutationObserver(()=>{
      const surface=document.querySelector('.physics-surface[data-physics="running"]');
      const word=surface?.querySelector('.physics-word');
      if(word){
        window.__burstInitialFocus=document.activeElement?.getAttribute('aria-label')==='Cancel word animation';
        word.focus(); observer.disconnect();
      }
    });
    observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['data-physics']});
  });
  const button = page.getByRole("button", {
    name: "Play with words",
    exact: true,
  });
  await button.focus();
  const origin = await button.boundingBox();
  await page.keyboard.press("Enter");
  await page
    .locator(".physics-surface[data-physics=running]")
    .waitFor({ state: "visible", timeout: 15000 });
  const state=await page.evaluate(()=>{
    const words=[...document.querySelectorAll(".physics-word")];
    const close=document.querySelector('[aria-label="Cancel word animation"]');
    const result={count:words.length,x:parseFloat(document.querySelector(".physics-burst").style.getPropertyValue("--burst-x")),focused:window.__burstInitialFocus,expectedX:window.__pillClickX};
    words[0].focus();
    document.addEventListener("keydown",event=>{window.__nudgeHandled=event.defaultPrevented;},{once:true});
    return result;
  });
  assert.equal(state.count,6);
  assert.ok(Math.abs(state.x-state.expectedX)<1);
  assert.equal(state.focused,true);
  await page.keyboard.press("ArrowLeft");
  assert.equal(await page.evaluate(()=>window.__nudgeHandled),true);
  const before = await page
    .locator(".physics-word")
    .first()
    .getAttribute("style");
  await wait(page,180);
  assert.notEqual(
    await page.locator(".physics-word").first().getAttribute("style"),
    before,
  );
  await page.keyboard.press("Escape");
  await page.waitForFunction(()=>!document.querySelector("[role=dialog]"),{},{timeout:15000});
  await wait(page,1600);
  assert.equal(await page.getByRole("dialog").count(), 0);
  assert.equal(
    await button.evaluate((el) => el === document.activeElement),
    true,
  );
  await page.close();
});
test("primary collaboration action opens ink contact directly with word burst off", async () => {
  const dialog = await contact(desktop);
  assert.equal(await desktop.locator(".physics-burst").count(), 0);
  assert.equal(
    await dialog
      .locator(".terminal-contact-panel")
      .evaluate((el) => getComputedStyle(el).backgroundColor),
    "rgb(11, 11, 12)",
  );
  assert.match(
    await dialog.locator(".terminal-heading").innerText(),
    /Let’s talk about what we can build/,
  );
  assert.match(await dialog.locator(".terminal-stats").innerText(), /600\+/);
  assert.equal(
    await desktop.locator("header").evaluate((el) => !!el.closest("[inert]")),
    true,
  );
  assert.equal(
    await desktop.locator(".collab-stage").getAttribute("data-motion"),
    "paused",
  );
});
test("contact preserves verified links, labels, keyboard trap and email-draft form", async () => {
  const dialog = desktop.getByRole("dialog");
  for (const name of [
    "Your Name",
    "Your Email",
    "Inquiry Type",
    "Message / Details",
  ])
    assert.equal(await dialog.getByLabel(name, { exact: true }).count(), 1);
  assert.equal(
    await dialog.locator('a[href="mailto:vishwanatnishad@gmail.com"]').count(),
    2,
  );
  assert.equal(
    await dialog.locator('a[href="https://github.com/vishu1803"]').count(),
    1,
  );
  assert.equal(
    await dialog
      .locator('a[href="https://linkedin.com/in/vishwanath-nishad"]')
      .count(),
    1,
  );
  const close = dialog.getByRole("button", {
    name: "Close dialog",
    exact: true,
  });
  await close.focus();
  await desktop.keyboard.press("Shift+Tab");
  assert.equal(
    await dialog
      .getByRole("button", { name: "Start a Project" })
      .evaluate((el) => el === document.activeElement),
    true,
  );
  await desktop.keyboard.press("Tab");
  assert.equal(
    await close.evaluate((el) => el === document.activeElement),
    true,
  );
});
test("contact copy micro-interaction writes the real email to the clipboard", async () => {
  await desktop
    .context()
    .grantPermissions(["clipboard-read", "clipboard-write"], { origin: base });
  await desktop
    .getByRole("dialog")
    .getByTitle("Copy Email to Clipboard")
    .click();
  await desktop
    .getByRole("status")
    .filter({ hasText: "Email copied" })
    .waitFor({ state: "visible" });
  assert.match(await desktop.getByRole("status").innerText(), /Email copied/);
  assert.equal(
    await desktop.evaluate(() => navigator.clipboard.readText()),
    "vishwanatnishad@gmail.com",
  );
});
test("nested resume preserves the parent contact dialog and Escape order", async () => {
  await desktop
    .getByRole("dialog")
    .getByRole("button", { name: "View résumé", exact: true })
    .click();
  await desktop.waitForFunction(()=>document.querySelectorAll("[role=dialog]").length===2,{},{timeout:15000});
  assert.equal(await desktop.locator("[role=dialog]").count(), 2);
  await desktop.keyboard.press("Escape");
  await desktop.waitForFunction(()=>document.querySelectorAll("[role=dialog]").length===1,{},{timeout:10000});
  assert.equal(await desktop.locator("[role=dialog]").count(), 1);
  assert.equal(
    await desktop
      .getByRole("dialog")
      .getByRole("button", { name: "View résumé", exact: true })
      .evaluate((el) => el === document.activeElement),
    true,
  );
});
test("Escape restores the original CTA focus and resumes scrolling", async () => {
  await desktop.keyboard.press("Escape");
  await desktop.waitForFunction(()=>!document.querySelector("[role=dialog]"),{},{timeout:15000});
  assert.equal(await desktop.locator("[role=dialog]").count(), 0);
  assert.equal(
    await desktop.locator("header").evaluate((el) => !!el.closest("[inert]")),
    false,
  );
  assert.equal(
    await desktop
      .getByRole("button", { name: triggerName, exact: true })
      .evaluate((el) => el === document.activeElement),
    true,
  );
  assert.notEqual(
    await desktop.evaluate(() => document.body.style.overflow),
    "hidden",
  );
  assert.equal(
    await desktop
      .locator("html")
      .evaluate((el) => el.classList.contains("lenis-stopped")),
    false,
  );
});
for (const width of [1440, 390])
  test(`${width}px: every scene fits, mobile cases stack and touch torch drifts`, async () => {
    const page = await openPage({
      viewport: { width, height: width === 1440 ? 1000 : 844 },
      isMobile: width < 768,
      hasTouch: width < 768,
    });
    if (width === 390) {
      await page.waitForFunction(()=>document.querySelector("[data-torch]").dataset.revealComplete === "true");
      assert.equal(await page.locator(".torch-subject").evaluate(el=>getComputedStyle(el).maskImage), "none");
    }
    for (const id of [
      "home",
      "subject",
      "case-studies",
      "toolkit",
      "about",
      "contact",
    ]) {
      await section(page, id);
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        id + " overflow",
      );
    }
    if (width === 390) {
      assert.equal(
        await page
          .locator("#case-studies")
          .evaluate((el) => el.parentElement.className.includes("pin-spacer")),
        false,
      );
      const cards = await page
        .locator(".case-file")
        .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().top));
      assert.ok(cards[5] > cards[0] + 1000);
    }
    await cords(page);
    await page.close();
  });
test("Space activates the pill and contact can return to the beginning through Lenis", async () => {
  await section(desktop, "contact");
  const pill = desktop.getByRole("button", { name: triggerName, exact: true });
  await pill.focus();
  await desktop.keyboard.press("Space");
  const dialog = desktop.getByRole("dialog", {
    name: "Vishwanath Nishad",
    exact: true,
  });
  await dialog.waitFor({ state: "visible", timeout: 15000 });
  await dialog.getByRole("button", { name: "Back to the beginning" }).click();
  await desktop.waitForFunction(()=>scrollY<5,{},{timeout:12000});
  await desktop.waitForFunction(()=>!document.querySelector("[role=dialog]"),{},{timeout:15000});
  assert.equal(await desktop.getByRole("dialog").count(), 0);
  assert.ok((await desktop.evaluate(() => scrollY)) < 5);
});
test("touch collaboration opens contact directly without a word burst", async () => {
  const page = await openPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await section(page, "contact");
  await page.getByRole("button", { name: triggerName, exact: true }).tap();
  assert.equal(await page.locator(".physics-surface").count(), 0);
  await page
    .getByRole("dialog", { name: "Vishwanath Nishad", exact: true })
    .waitFor({ state: "visible", timeout: 15000 });
  await wait(page);
  await page.keyboard.press("Escape");
  await wait(page, 600);
  assert.equal(await page.getByRole("dialog").count(), 0);
  await page.close();
});
test("reduced motion has native scrolling, static torch, vertical cases and direct contact", async () => {
  const page = await openPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  assert.equal(
    await page.locator("html").getAttribute("data-scroll-engine"),
    null,
  );
  assert.equal(
    await page
      .locator(".torch-subject")
      .evaluate((el) => getComputedStyle(el).maskImage),
    "none",
  );
  assert.equal(
    await page
      .locator(".torch-subject")
      .evaluate((el) => getComputedStyle(el).opacity),
    "1",
  );
  assert.equal(
    await page
      .locator("#case-studies")
      .evaluate((el) => el.parentElement.className.includes("pin-spacer")),
    false,
  );
  await section(page, "contact");
  assert.equal(
    await page.locator(".collab-stage").getAttribute("data-motion"),
    "reduced",
  );
  await page.getByRole("button", { name: triggerName, exact: true }).click();
  await wait(page, 500);
  assert.equal(await page.locator(".physics-burst").count(), 0);
  assert.equal(
    await page
      .getByRole("dialog", { name: "Vishwanath Nishad", exact: true })
      .isVisible(),
    true,
  );
  await page.keyboard.press("Escape");
  await page.close();
});
test("runtime reduced-motion changes clean up Lenis, pinned tracks and active rig resources", async () => {
  await desktop.emulateMedia({ reducedMotion: "reduce" });
  await desktop.waitForFunction(()=>!document.documentElement.dataset.scrollEngine,{},{timeout:10000});
  assert.equal(
    await desktop.locator("html").getAttribute("data-scroll-engine"),
    null,
  );
  assert.equal(
    await desktop
      .locator("#case-studies")
      .evaluate((el) => el.parentElement.className.includes("pin-spacer")),
    false,
  );
  assert.equal(
    await desktop.locator(".collab-stage").getAttribute("data-motion"),
    "reduced",
  );
  await desktop.emulateMedia({ reducedMotion: "no-preference" });
  await desktop.waitForFunction(()=>document.documentElement.dataset.scrollEngine==="lenis",{},{timeout:10000});
  assert.equal(
    await desktop.locator("html").getAttribute("data-scroll-engine"),
    "lenis",
  );
});
test("manual pause uses static end states and resumes the shared engine", async () => {
 const page=await openPage();
 await page.getByRole("button",{name:"Pause animations",exact:true}).click();
 await page.waitForFunction(()=>!document.documentElement.dataset.scrollEngine);
 assert.equal(await page.locator("html").getAttribute("data-motion-paused"),"true");
 assert.equal(await page.locator("#case-studies").getAttribute("data-pin-start"),null);
 assert.equal(await page.locator(".physics-burst").count(),0);
 assert.equal(await page.locator(".case-files-track").evaluate(el=>getComputedStyle(el).display),"block");
 await page.getByRole("button",{name:"Resume animations",exact:true}).click();
 await page.waitForFunction(()=>document.documentElement.dataset.scrollEngine==="lenis");
 await page.close();
});
test("normal-case headings, descriptive links and toolkit lists remain semantic", async()=>{
 assert.match(await desktop.locator("h1").textContent(),/Vishwanath/);
 assert.equal(await desktop.locator(".toolkit-words").first().evaluate(el=>el.tagName),"UL");
 assert.equal(await desktop.locator(".case-copy").first().getByRole("link",{name:/Collaborative Task Manager, source code/}).count(),1);
 assert.equal(await desktop.locator(".hero-outline").getAttribute("aria-hidden"),"true");
 assert.ok(await desktop.locator(".case-file-image img").first().getAttribute("alt").then(x=>x.includes("task counts")));
});

test("touch beam drifts then lights on permanently after three visible seconds", async () => {
  const page = await openPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,settle:50});
  const torch=page.locator("[data-torch]");
  await page.waitForFunction(()=>document.querySelector("[data-torch]").dataset.active==="true");
  const before=await torch.getAttribute("style"); await wait(page,250);
  assert.notEqual(await torch.getAttribute("style"),before);
  await page.waitForFunction(()=>document.querySelector("[data-torch]").dataset.revealComplete==="true",{},{timeout:7000});
  await page.close();
});
test("low-power devices use the immediate lit portrait and no idle tug", async () => {
  const page=await openPage({lowPower:true});
  assert.equal(await page.locator("[data-torch]").getAttribute("data-quality"),"static");
  assert.equal(await page.locator(".torch-subject").evaluate(el=>getComputedStyle(el).maskImage),"none");
  assert.equal(await page.locator(".torch-ambient").evaluate(el=>getComputedStyle(el).display),"none");
  await section(page,"contact"); await wait(page,1800);
  const hand=await page.locator(".pulling-hand").getAttribute("transform"); await wait(page,350);
  assert.equal(await page.locator(".pulling-hand").getAttribute("transform"),hand);
  await page.close();
});
test("ghost copies, reusable masks and interlude extrusion exist without changing accessible copy", async () => {
  await section(desktop,"subject");
  await desktop.waitForFunction(()=>document.querySelectorAll(".subject-title .ghost-double").length>0);
  assert.ok(await desktop.locator("[data-clip-reveal]").count()>=7);
  assert.equal(await desktop.locator(".prelude-extrusion > span").count(),8);
  assert.equal(await desktop.locator("#about").getAttribute("data-scene"),"#e9e2d0");
  assert.equal((await desktop.locator(".collaborate-pill").textContent()).trim(),"Let’s collaborate");
});




test("portrait coverage triggers lights-on without needing a click", async () => {
  const page = await openPage();
  const box = await page.locator("[data-torch]").boundingBox();
  for (let row=0;row<5;row++) for(let col=0;col<6;col++) {
    await page.mouse.move(box.x+box.width*(col+.5)/6,box.y+box.height*(row+.5)/5,{steps:3});
    await wait(page,45);
  }
  await page.waitForFunction(()=>document.querySelector("#home").dataset.lit==="true",{},{timeout:8000});
  await page.waitForFunction(()=>document.querySelector("[data-torch]").dataset.revealComplete==="true");
  await page.close();
});

test("production console and page exception capture remains clean", () =>
  assert.deepEqual(errors, []));
