// Run `npm run build && npm run test:browser` after `npx playwright install chromium`.
// BROWSER_EXECUTABLE_PATH optionally selects an already installed Chromium.
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const path = require("node:path");
const { chromium } = require("playwright");
let server, browser, desktop;
const errors = [];
const base = "http://127.0.0.1:3194";
const root = path.resolve(__dirname, "..");
const triggerName = "Let’s collaborate — open contact details";
const settle = (page) => page.waitForTimeout(1100);
async function openPage(options = {}) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    ...options,
  });
  page.on("pageerror", (e) =>
    errors.push(
      `[${options.viewport?.width || 1440}px; ${options.reducedMotion || "no-preference"}] ${e.message}`,
    ),
  );
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2300);
  await page.evaluate(() => document.fonts.ready);
  return page;
}
async function section(page, id) {
  await page
    .locator("#" + id)
    .evaluate((el) =>
      window.scrollTo({ top: el.offsetTop - 85, behavior: "instant" }),
    );
  await page.waitForTimeout(1500);
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
    { cwd: root, stdio: ["ignore", "pipe", "pipe"] },
  );
  await new Promise((resolve, reject) => {
    let output = "";
    const timer = setTimeout(
      () =>
        reject(new Error("Production server did not become ready: " + output)),
      20000,
    );
    server.stderr.on("data", (b) => (output += b));
    server.stdout.on("data", (b) => {
      output += b;
      if (output.includes("Ready")) {
        clearTimeout(timer);
        resolve();
      }
    });
    server.once("error", reject);
    server.once("exit", (code) => {
      clearTimeout(timer);
      reject(new Error("Server exited: " + code + output));
    });
  });
  const executablePath = process.env.BROWSER_EXECUTABLE_PATH;
  browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
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

test("opening: identity, bundled display font and real portrait render", async () => {
  assert.match(await desktop.locator("h1").innerText(), /VISHWANATH/);
  assert.match(await desktop.locator("h1").textContent(), /Nishad/);
  assert.equal(await desktop.locator("h1").count(), 1);
  assert.equal(
    await desktop.evaluate(() => document.fonts.check("100px Anton")),
    true,
  );
  assert.match(
    await desktop
      .locator("h1")
      .evaluate((el) => getComputedStyle(el).fontFamily),
    /Anton/,
  );
  const img = desktop.locator("#home img").first();
  assert.equal(
    await img.evaluate((el) => el.complete && el.naturalWidth > 0),
    true,
  );
  for (const href of await desktop
    .locator('nav a[href^="#"]')
    .evaluateAll((els) => els.map((el) => el.getAttribute("href")))) {
    assert.equal(await desktop.locator(href).count(), 1);
  }
});

test("hero captions remain separated at live and shorter laptop viewports", async () => {
  for (const viewport of [
    { width: 1363, height: 936 },
    { width: 1440, height: 800 },
    { width: 1280, height: 720 },
  ]) {
    const page = await openPage({ viewport });
    const bounds = await page.evaluate(() => ({
      note: document.querySelector(".hero-location").getBoundingClientRect()
        .bottom,
      byline: document.querySelector(".hero-byline").getBoundingClientRect()
        .top,
    }));
    assert.ok(
      bounds.byline - bounds.note > 12,
      JSON.stringify({ viewport, ...bounds }),
    );
    await page.close();
  }
});

test("flashlight: pointer reveals a masked photograph and resets on leave", async () => {
  const torch = desktop.locator("#home [data-flashlight]");
  const box = await torch.locator(".hero-photo").boundingBox();
  await desktop.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.4);
  await desktop.waitForTimeout(300);
  assert.equal(await torch.getAttribute("data-tracking"), "true");
  const mask = torch.locator(".flashlight-reveal-mask");
  assert.equal(await mask.locator("img").count(), 1);
  assert.match(
    await mask.evaluate((el) => getComputedStyle(el).maskImage),
    /radial-gradient/,
  );
  assert.match(await torch.getAttribute("style"), /--torch-x: [\d.]+px/);
  await desktop.mouse.move(10, 90);
  assert.equal(await torch.getAttribute("data-tracking"), "false");
});

test("flashlight: keyboard opens and closes static inspection details", async () => {
  const torch = desktop.locator("#home [data-flashlight]");
  const control = torch.getByRole("button", { name: "Inspect details" });
  await control.focus();
  await desktop.keyboard.press("Enter");
  assert.equal(
    await torch.getByRole("region", { name: "Inspection details" }).isVisible(),
    true,
  );
  assert.equal(
    await torch
      .getByRole("button", { name: "Hide details" })
      .getAttribute("aria-expanded"),
    "true",
  );
  await torch.getByRole("button", { name: "Hide details" }).press("Enter");
  assert.equal(
    await torch.getByRole("region", { name: "Inspection details" }).isVisible(),
    false,
  );
});

test("projects: all six source-backed visuals load and preserve repository links", async () => {
  const items = desktop.locator("[data-case-id]");
  assert.equal(await items.count(), 6);
  for (const item of await items.all()) {
    await item.scrollIntoViewIfNeeded();
    await settle(desktop);
    assert.equal(
      await item
        .locator(".project-visual img")
        .evaluate((el) => el.complete && el.naturalWidth > 0),
      true,
    );
    assert.match(
      await item
        .getByRole("link", { name: "Repository ↗" })
        .getAttribute("href"),
      /^https:\/\/github.com\/vishu1803\//,
    );
  }
});

test("project notes: existing notes dialog opens and Escape restores its trigger", async () => {
  const trigger = desktop
    .getByRole("button", { name: "Read the story" })
    .first();
  await trigger.click();
  await settle(desktop);
  const dialog = desktop.getByRole("dialog");
  assert.equal(await dialog.isVisible(), true);
  assert.match(await dialog.innerText(), /Collaborative Task Manager/);
  await desktop.keyboard.press("Escape");
  await settle(desktop);
  assert.equal(await desktop.getByRole("dialog").count(), 0);
  assert.equal(
    await trigger.evaluate((el) => el === document.activeElement),
    true,
  );
});

test("project index: existing six-project source index remains available", async () => {
  await desktop.getByRole("button", { name: /Project index/ }).click();
  await settle(desktop);
  assert.equal(await desktop.getByRole("dialog").isVisible(), true);
  assert.match(
    await desktop.getByRole("dialog").innerText(),
    /Project notes & sources/,
  );
  await desktop.keyboard.press("Escape");
  await settle(desktop);
});

test("resume: viewer opens, receives focus and links to an available PDF", async () => {
  await desktop.locator(".nav-resume").click();
  await settle(desktop);
  const dialog = desktop.getByRole("dialog");
  assert.equal(await dialog.isVisible(), true);
  assert.equal(
    await desktop
      .getByRole("button", { name: "Close resume dialog" })
      .evaluate((el) => el === document.activeElement),
    true,
  );
  const href = await dialog
    .locator('a[href$=".pdf"]')
    .first()
    .getAttribute("href");
  const response = await desktop.request.get(base + href);
  assert.equal(response.status(), 200);
  assert.match(response.headers()["content-type"], /pdf/);
  await desktop.keyboard.press("Escape");
  await settle(desktop);
});

test("contact: five independent strings finish drawing; SVG hand and pill are visible", async () => {
  await section(desktop, "contact");
  assert.equal(await desktop.locator(".tension-string").count(), 5);
  for (const path of await desktop.locator(".tension-string").all()) {
    assert.ok(
      Math.abs(
        await path.evaluate((el) =>
          parseFloat(getComputedStyle(el).strokeDashoffset),
        ),
      ) < 0.1,
    );
  }
  assert.equal(await desktop.locator(".pulling-hand").isVisible(), true);
  assert.equal(
    await desktop.getByRole("button", { name: triggerName }).isVisible(),
    true,
  );
  assert.equal(
    await desktop
      .getByRole("button", { name: triggerName })
      .evaluate((el) => getComputedStyle(el).opacity),
    "1",
  );
});

async function verifyCordAnchors(page) {
  const attachments = await page.evaluate(() => {
    const button = document
      .querySelector(".collaborate-pill")
      .getBoundingClientRect();
    return [...document.querySelectorAll(".tension-string")].map((path) => {
      const endpoint = path.getPointAtLength(path.getTotalLength());
      const point = new DOMPoint(endpoint.x, endpoint.y).matrixTransform(
        path.getScreenCTM(),
      );
      return {
        x: point.x - button.left,
        y: point.y - button.top,
        width: button.width,
        height: button.height,
      };
    });
  });
  for (const point of attachments) {
    assert.ok(
      point.x >= -3 && point.x <= point.width * 0.13,
      "Cord detached horizontally: " + JSON.stringify(point),
    );
    assert.ok(
      point.y >= -3 && point.y <= point.height + 3,
      "Cord detached vertically: " + JSON.stringify(point),
    );
  }
}

test("contact: tug keeps moving after entrance and all five cords remain attached", async () => {
  await desktop.mouse.move(10, 90);
  const before = await desktop
    .locator(".collab-button-wrapper")
    .evaluate((el) => el.getBoundingClientRect().x);
  await desktop.waitForTimeout(1200);
  const after = await desktop
    .locator(".collab-button-wrapper")
    .evaluate((el) => el.getBoundingClientRect().x);
  assert.ok(Math.abs(after - before) > 3, "Tug became static after entrance");
  await verifyCordAnchors(desktop);
});

test("contact: pause stops the loop; pointer updates the attached rig", async () => {
  await desktop.getByRole("button", { name: "Pause tug", exact: true }).click();
  await desktop.mouse.move(10, 90);
  await desktop.waitForTimeout(650);
  const before = await desktop
    .locator(".tension-string")
    .first()
    .getAttribute("d");
  await desktop.waitForTimeout(300);
  assert.equal(
    await desktop.locator(".tension-string").first().getAttribute("d"),
    before,
  );
  const stage = await desktop.locator(".collab-stage").boundingBox();
  await desktop.mouse.move(stage.x + stage.width * 0.92, stage.y + 22);
  await desktop.waitForTimeout(650);
  assert.notEqual(
    await desktop.locator(".tension-string").first().getAttribute("d"),
    before,
  );
  await verifyCordAnchors(desktop);
  await desktop.mouse.move(10, 90);
  await desktop.waitForTimeout(650);
  assert.equal(
    await desktop.locator(".tension-string").first().getAttribute("d"),
    before,
  );
  await desktop
    .getByRole("button", { name: "Resume tug", exact: true })
    .click();
});

test("contact: hover words reveal and dragging springs back without opening contact", async () => {
  const button = desktop.getByRole("button", { name: triggerName });
  await button.hover();
  await desktop.waitForTimeout(450);
  assert.equal(await desktop.locator(".collab-word").count(), 4);
  for (const word of await desktop.locator(".collab-word").all())
    assert.equal(
      await word.evaluate((el) => getComputedStyle(el).opacity),
      "1",
    );
  const box = await button.boundingBox();
  await desktop.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await desktop.mouse.down();
  await desktop.mouse.move(box.x + box.width / 2 + 22, box.y + box.height / 2, {
    steps: 10,
  });
  await desktop.waitForTimeout(150);
  await verifyCordAnchors(desktop);
  await desktop.mouse.up();
  await desktop.waitForTimeout(650);
  assert.equal(
    await desktop.getByRole("dialog").count(),
    0,
    "Drag accidentally opened contact",
  );
  const translated = await button.evaluate(
    (el) => new DOMMatrix(getComputedStyle(el).transform).m41,
  );
  assert.ok(Math.abs(translated) < 1, "Button did not spring back");
});

test("contact: leaving the viewport pauses and reentering resumes the rig", async () => {
  await section(desktop, "home");
  assert.equal(
    await desktop.locator(".collab-stage").getAttribute("data-motion"),
    "paused",
  );
  const before = await desktop
    .locator(".tension-string")
    .first()
    .getAttribute("d");
  await desktop.waitForTimeout(300);
  assert.equal(
    await desktop.locator(".tension-string").first().getAttribute("d"),
    before,
  );
  await section(desktop, "contact");
  assert.equal(
    await desktop.locator(".collab-stage").getAttribute("data-motion"),
    "running",
  );
});

test("contact: keyboard opening focuses close, labels fields and isolates background", async () => {
  const trigger = desktop.getByRole("button", { name: triggerName });
  await trigger.focus();
  await desktop.keyboard.press("Enter");
  await settle(desktop);
  const dialog = desktop.getByRole("dialog");
  assert.equal(await dialog.isVisible(), true);
  assert.equal(
    await desktop.locator(".collab-stage").getAttribute("data-motion"),
    "paused",
  );
  assert.equal(
    await dialog
      .getByRole("button", { name: "Close dialog", exact: true })
      .evaluate((el) => el === document.activeElement),
    true,
  );
  assert.equal(
    await desktop.locator("header").evaluate((el) => el.inert),
    true,
  );
  assert.equal(
    await dialog.getByLabel("Your Name", { exact: true }).count(),
    1,
  );
  assert.equal(
    await dialog.getByLabel("Your Email", { exact: true }).count(),
    1,
  );
  assert.equal(
    await dialog.getByLabel("Inquiry Type", { exact: true }).inputValue(),
    "Full-Stack Web Application",
  );
  assert.equal(
    await dialog.getByLabel("Message / Details", { exact: true }).count(),
    1,
  );
  assert.equal(
    await dialog.locator('a[href="mailto:vishwanatnishad@gmail.com"]').count(),
    1,
  );
  assert.equal(
    await dialog
      .locator('a[href="https://linkedin.com/in/vishwanath-nishad"]')
      .count(),
    1,
  );
  assert.equal(
    await dialog.locator('a[href="https://github.com/vishu1803"]').count(),
    1,
  );
});

test("contact: Tab and Shift+Tab stay inside the overlay", async () => {
  const dialog = desktop.getByRole("dialog");
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

test("contact: Escape restores focus, inertness and page scrolling", async () => {
  await desktop.keyboard.press("Escape");
  await settle(desktop);
  assert.equal(await desktop.getByRole("dialog").count(), 0);
  assert.equal(
    await desktop
      .getByRole("button", { name: triggerName })
      .evaluate((el) => el === document.activeElement),
    true,
  );
  assert.equal(
    await desktop.locator("header").evaluate((el) => el.inert),
    false,
  );
  assert.notEqual(
    await desktop.evaluate(() => document.body.style.overflow),
    "hidden",
  );
});

test("contact: visible close button dismisses the overlay", async () => {
  await desktop.getByRole("button", { name: triggerName }).click();
  await settle(desktop);
  await desktop
    .getByRole("button", { name: "Close dialog", exact: true })
    .click();
  await settle(desktop);
  assert.equal(await desktop.getByRole("dialog").count(), 0);
});

test("contact: clicking the backdrop dismisses the overlay", async () => {
  await desktop.getByRole("button", { name: triggerName }).click();
  await settle(desktop);
  await desktop.mouse.click(10, 100);
  await settle(desktop);
  assert.equal(await desktop.getByRole("dialog").count(), 0);
});

for (const width of [1440, 768, 390, 320]) {
  test(`responsive ${width}px: all chapters fit without horizontal scrolling`, async () => {
    const page = await openPage({
      viewport: { width, height: width === 768 ? 1024 : 844 },
      isMobile: width < 700,
      hasTouch: width < 700,
    });
    for (const id of ["home", "case-studies", "about", "toolkit", "contact"]) {
      await section(page, id);
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${id} overflows at ${width}`,
      );
    }
    const button = page.getByRole("button", { name: triggerName });
    const box = await button.boundingBox();
    assert.ok(box.x >= 0 && box.x + box.width <= width + 1);
    assert.ok(box.height >= 44);
    await button.click();
    await settle(page);
    assert.equal(await page.getByRole("dialog").isVisible(), true);
    const panel = await page.locator(".contact-overlay-panel").boundingBox();
    assert.ok(panel.x >= 0 && panel.x + panel.width <= width);
    await page.keyboard.press("Escape");
    await settle(page);
    assert.equal(await page.getByRole("dialog").count(), 0);
    await page.close();
  });
}

test("touch: drag reveals the underlying photograph; tap opens static details", async () => {
  const page = await openPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const torch = page.locator("#home [data-flashlight]");
  const box = await torch.locator(".hero-photo").boundingBox();
  const client = await page.context().newCDPSession(page);
  const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [point],
  });
  await client.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: point.x + 12, y: point.y + 2 }],
  });
  assert.equal(await torch.getAttribute("data-tracking"), "true");
  await client.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  assert.equal(await torch.getAttribute("data-tracking"), "false");
  await torch.getByRole("button", { name: "Inspect details" }).tap();
  assert.equal(
    await torch.getByRole("region", { name: "Inspection details" }).isVisible(),
    true,
  );
  await torch.getByRole("button", { name: "Hide details" }).tap();
  await page.close();
});

test("touch: dragging the collaborate pill tensions the cords without opening contact", async () => {
  const page = await openPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await section(page, "contact");
  const button = page.getByRole("button", { name: triggerName });
  const box = await button.boundingBox();
  const client = await page.context().newCDPSession(page);
  const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [point],
  });
  for (let x = 4; x <= 20; x += 4) {
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: point.x + x, y: point.y }],
    });
    await page.waitForTimeout(30);
  }
  await verifyCordAnchors(page);
  await client.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await page.waitForTimeout(700);
  assert.equal(await page.getByRole("dialog").count(), 0);
  await button.tap();
  await settle(page);
  assert.equal(await page.getByRole("dialog").count(), 1);
  await page.keyboard.press("Escape");
  await settle(page);
  await page.close();
});

test("reduced motion: content is readable, torch tracking stops and contact works", async () => {
  const page = await openPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
    isMobile: true,
    hasTouch: true,
  });
  assert.equal(
    await page
      .locator(".hero-name-line")
      .evaluate((el) => getComputedStyle(el).opacity),
    "1",
  );
  assert.equal(
    await page
      .locator(".hero-portrait")
      .evaluate((el) => getComputedStyle(el).clipPath),
    "none",
  );
  const torch = page.locator("#home [data-flashlight]");
  await torch.getByRole("button", { name: "Inspect details" }).tap();
  assert.equal(
    await torch.getByRole("region", { name: "Inspection details" }).isVisible(),
    true,
  );
  await torch.getByRole("button", { name: "Hide details" }).tap();
  await section(page, "contact");
  assert.equal(
    await page.locator(".collab-stage").getAttribute("data-motion"),
    "reduced",
  );
  assert.equal(
    await page.locator(".pulling-hand").getAttribute("transform"),
    null,
  );
  assert.equal(await page.locator(".collaborate-pill").isVisible(), true);
  assert.equal(
    await page
      .locator(".collaborate-pill")
      .evaluate((el) => getComputedStyle(el).opacity),
    "1",
  );
  await page.getByRole("button", { name: triggerName }).tap();
  await settle(page);
  assert.equal(await page.getByRole("dialog").isVisible(), true);
  await page.keyboard.press("Escape");
  await settle(page);
  assert.equal(await page.getByRole("dialog").count(), 0);
  await page.close();
});

test("runtime motion preference changes reveal all GSAP-managed content", async () => {
  await desktop.emulateMedia({ reducedMotion: "reduce" });
  await section(desktop, "home");
  assert.equal(
    await desktop
      .locator(".hero-portrait")
      .evaluate((el) => getComputedStyle(el).transform),
    "none",
  );
  assert.equal(
    await desktop
      .locator(".hero-name-line")
      .evaluate((el) => getComputedStyle(el).opacity),
    "1",
  );
  await desktop.emulateMedia({ reducedMotion: "no-preference" });
  await settle(desktop);
});

test("production browser console has no errors", () =>
  assert.deepEqual(errors, []));
