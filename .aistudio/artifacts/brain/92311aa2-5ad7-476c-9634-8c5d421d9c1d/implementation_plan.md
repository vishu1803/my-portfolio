# Implementation Plan — Fresh Cinematic VOX-Inspired Editorial Portfolio

Completely rebuild Vishwanath Nishad's portfolio from a clean slate into an original, cinematic, VOX-inspired editorial experience. Purge all legacy styles, outdated layouts, and unused components. Ground every fact, project, metric, and link in the supplied resume (`software-vishu_1f0ccd66.pdf`) and authentic portrait (`WhatsApp_Image_2025-09-28_at_12.23.22_93935ef8_da581494.jpg`).

---

## 1. Clean Slate & Legacy Purge

- **Purge Obsolete Styles & Classes**: Strip out legacy classes from `globals.css` (old gradients, floating cards, unused animations).
- **Clean Component Directory**: Deprecate legacy mock cards, old hero elements, and redundant exploration widgets that clash with the editorial documentary visual language.
- **Unified Clean Slate Architecture**:
  - `src/App.tsx`: Pure, cohesive assembly of the editorial documentary flow.
  - `src/app/globals.css`: Streamlined editorial design tokens (near-black `#08090B`, warm ivory `#FAF8F5`, canary yellow highlighter `#FFE600`, archival red `#FF4B4B`, cyan accent `#38BDF8`, film grain, and torchlight CSS mask properties).

---

## 2. Visual System & Typography (VOX Documentary Atmosphere)

- **Palette**:
  - Canvas: Near-black deep carbon (`#08090B`, `#0E1015`) with subtle SVG film grain.
  - Typography: Warm ivory (`#FAF8F5`) for primary reading, muted titanium (`#A1A1AA`) for secondary narrative.
  - Accent Hierarchy:
    - Primary Accent: Investigative highlighter yellow (`#FFE600`) with high-contrast black text (`.vox-highlight`).
    - Secondary Accent: Archival verification red (`#FF4B4B`) for telemetry stamps and issue codes.
    - Data Tags: Cyan blue (`#38BDF8`) for latency benchmarks and tech stack nodes.
  - Signature Ivory Section: Warm paper limestone (`#EAE8E2`) for the standalone "LET'S COLLABORATE" section.
- **Typography Pairing**:
  - Display & Section Titles: High-contrast editorial serif (`Instrument Serif`) paired with outlined companion text (`.text-outline`).
  - Body & Architecture: Clean geometric sans (`Inter`) with comfortable leading.
  - Captions & Coordinates: Monospaced uppercase tracking (`[26.7606° N, 83.3732° E]`, `DOSSIER // VN-2026`).
- **Anti-Slop Discipline**: No static pill capsules, candy badges, or generic glassmorphism; all metadata presented as crisp unboxed typography separated by typographical bullets and thin hairline rules.

---

## 3. Signature Hardware-Accelerated Torchlight Reveal (`FlashlightReveal.tsx`)

- **Interactive Incandescent Beam**:
  - CSS `mask-image: radial-gradient(circle var(--torch-radius) at var(--torch-x) var(--torch-y), ...)` exposing the underlying schematic layer.
  - Realistic incandescent beam glow (`#FFF7C2` / `#FFE600`) with soft feathered falloff.
  - Pointer tracking powered by `requestAnimationFrame` writing directly to container CSS custom properties—**zero React state re-renders on mouse movement**.
- **Focal Integration**:
  1. **Art-Directed Portrait Plate**: Hovering/touching reveals secret circuit traces, LeetCode 300+ problem-solving radar, and verified academic credentials.
  2. **Case Study Schematics**: Revealing internal system architecture diagrams, AST diff pipeline flows, and ACID transaction locks.
- **Accessibility & Touch**: Autonomous gentle ambient drift on idle, touch tap/drag support on mobile, and static legible fallback when `prefers-reduced-motion` is active.

---

## 4. Architectural Sections & Case Studies (Resume Source of Truth)

### A. Editorial Hero (`EditorialHero.tsx`)
- Asymmetrical split layout with staggered GSAP timeline entrance.
- Massive display title: solid white `Vishwanath` + outlined `Nishad`.
- Investigative yellow highlighter tape: `FULL-STACK SOFTWARE ENGINEER · SCALABLE BACKEND APIS`.
- Professional summary from resume: TypeScript, React, Next.js, Node.js, daily algorithmic problem-solving.
- Real portrait art-directed with archival film registration marks, coordinate stamps, and torchlight inspection.

### B. Project Case Studies (`ProjectCaseStudies.tsx`)
Documentary chapter storytelling featuring verified repositories:
1. **Chapter 01: Collaborative Task Manager** — High-performance RESTful CRUD APIs using Node.js & Prisma ORM, complex PostgreSQL queries, JWT auth, and fine-grained RBAC.
2. **Chapter 02: AI-Powered Code Review Assistant** — Flask backend with asynchronous FastAPI webhook endpoints, Python AST parsing, and OpenAI API integration in <1.2s.
3. **Chapter 03: AI Context Tracker** — Chrome Extension MV3, in-browser WebAssembly BPE tokenization, 128k context telemetry, and drift detection.
4. **Chapter 04: AI Career Hub & Workspace Copilot** — Job Fit Radar, high-dimensional vector embeddings, and asynchronous resume parsing into PostgreSQL.
5. **Chapter 05: Product Data Explorer & Analytics** — 10,000+ records at 60 FPS via dual-layer offscreen canvas buffers and O(1) spatial hashing.
6. **Chapter 06: 3D Spatial Studio & WebGL Experience** — Collapsing 1,500 particles into a single GPU draw call with bespoke GLSL shaders.
- **Full Architecture Compendium Modal**: Dedicated trigger button opening a scrollable, full-screen blueprint window with complete source code excerpts, architecture pillars, and repository links.

### C. Personnel Dossier & Verified Skills (`EditorialAbout.tsx`)
- **Experience**: Full Stack Developer Intern at **FTV Saloon** (Jun 2024 – Sep 2024, Remote): RESTful APIs, RBAC auth, 40% page load optimization, Agile & Git workflows.
- **Algorithmic Discipline**: 300+ LeetCode problems solved across DP, Graphs, Trees, Arrays, and Binary Search (`leetcode.com/u/vishwanatnishad`).
- **Education**: Bachelor of Technology in Electronics Engineering (2021 – 2025) at Rajkiya Engineering College.
- **Structured Skills Matrix**: Backend & APIs (FastAPI, Fastify, Flask, Node.js), Databases (PostgreSQL, Prisma, Drizzle, Redis), Languages (Python, TypeScript, JavaScript, C), Cloud/DevOps (GitHub Actions, Docker Compose, Git, Linux).

---

## 5. Signature Ivory Collaborate Section (`CollaborateSection.tsx`)

- **Warm Ivory Environment**: `#EAE8E2` paper tone creating a high-contrast editorial shift.
- **Glossy Jet-Black Pill Button**: Specular top highlight, 3D reflection, sheen sweep on hover, and Framer Motion spring physics.
- **Hand-Drawn Vector Illustration**: Authentic inline SVG illustration of a human hand positioned below and to the left of the button.
- **Tensioned String Physics**:
  - GSAP ScrollTrigger draws the strings with `strokeDashoffset` upon entering viewport.
  - Strings pull the button with dynamic bezier curves that react subtly to pointer position.
  - Hand illustration sways with natural pulling movements.
- **Full-Screen Contact Dossier Overlay**:
  - Direct verified channels: email (`vishwanatnishad@gmail.com`), phone (`+91 7905087928`), location (`Gorakhpur, India`), LinkedIn, GitHub, LeetCode, and resume download.
  - One-click copy buttons and prefilled mailto dispatcher.
  - Accessible focus management, backdrop dismiss, and `Escape` key listener.

---

## 6. Colophon & Station Telemetry (`EditorialFooter.tsx`)

- Live local time clock synchronized to Gorakhpur, India (`Asia/Kolkata` time zone, IST).
- Direct access to verified profiles, resume download, and return-to-top button.
- Editorial metadata and clean typography.

---

## 7. Motion Stack Architecture & Verification Plan

- **GSAP + ScrollTrigger**: Scoped with `gsap.context()` inside client-side `useEffect` (registered safely in browser lifecycle to avoid SSR/Turbopack evaluation issues). Used for opening timelines, scroll reveals, and string tension physics.
- **Framer Motion**: Button hover/tap states, modal and overlay spring animations, and state transitions. No overlapping animated properties.
- **Verification Steps**:
  1. Run `lint_applet` to ensure zero syntax or type warnings.
  2. Run `compile_applet` to guarantee complete Next.js Turbopack production build.
  3. Verify HTTP 200 on `localhost:3000` and test responsive viewport scaling across mobile, tablet, and desktop.
  4. Test keyboard accessibility (`Escape` key modal dismiss, focus rings) and reduced-motion mode.
