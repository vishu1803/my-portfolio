"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  image: string;
  category: string;
  githubRepo: string;
  liveDemo?: string;
  excerpt: string;
  codeSnippet?: string;
  architecturePoints: string[];
  content: string[];
}

export const JOURNAL_DATA: JournalArticle[] = [
  {
    id: "ast-pr-analyzer",
    title: "Deconstructing GitHub PR Diffs with Python AST & OpenAI",
    subtitle: "How we parsed git unified diffs into syntax trees in <1.2s to stop hallucinated reviews",
    readTime: "5 min read",
    date: "Feb 2026",
    image: "/ai-code-review.png",
    category: "AI & Compilers",
    githubRepo: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    liveDemo: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    excerpt:
      "Production findings from building the Ai-powered-code-review-assistant repository: using Python ast and tree-sitter to inspect control flow before LLM prompting.",
    codeSnippet: `@app.post("/webhook/github")
async def github_webhook_handler(request: Request, x_hub_signature_256: str = Header(None)):
    payload = await request.body()
    verify_hmac_signature(payload, x_hub_signature_256)
    
    # Parse diff hunks into deterministic AST nodes
    pr_diff = parse_git_diff(payload["pull_request"]["diff_url"])
    syntax_tree = ast.parse(pr_diff.modified_code)
    
    # Run deterministic vulnerability rules before LLM invocation
    anomalies = evaluate_ast_security_rules(syntax_tree)
    review_comments = await generate_llm_review(pr_diff, anomalies)
    return post_github_comments(payload, review_comments)`,
    architecturePoints: [
      "FastAPI asynchronous webhook listener with SHA256 HMAC authentication",
      "Python ast module parsing unified git diff hunks into syntax token trees",
      "Deterministic pre-filtering: catching SQL injections & raw evals before token consumption",
      "Automated Markdown PR review comment formatting with specific line annotations",
    ],
    content: [
      "When building our automated code review assistant on GitHub, initial testing with naive text prompts resulted in hallucinated syntax errors and high token costs. Git diff files contain surrounding context markers ('@@ -1,4 +1,5 @@') that confuse standard language models.",
      "To resolve this, we introduced an intermediate compiler pass using Python's native ast and tree-sitter. We isolate modified functions, extract the lexical scope, and inspect for common security vulnerabilities (such as CWE-89 SQL string interpolation) deterministically before constructing the prompt.",
      "The result was a 68% drop in token consumption and a median PR analysis turnaround under 1.2 seconds, transforming the tool into an indispensable daily developer tool.",
    ],
  },
  {
    id: "product-explorer-canvas",
    title: "Rendering 10,000 Records at 60 FPS: Next.js + Offscreen Canvas",
    subtitle: "Overcoming React DOM bottlenecks when plotting large e-commerce telemetry datasets",
    readTime: "6 min read",
    date: "Jan 2026",
    image: "/product-explorer.png",
    category: "Frontend Architecture",
    githubRepo: "https://github.com/vishu1803",
    liveDemo: "https://product-explorer-frontend-qp3m.onrender.com/",
    excerpt:
      "Lessons learned from the Product Data Explorer frontend: replacing 10,000 SVG DOM elements with a single hardware-accelerated Canvas framebuffer.",
    codeSnippet: `// Offscreen canvas render pass
function renderTelemetryBuffer(ctx: CanvasRenderingContext2D, records: ProductRecord[]) {
  ctx.clearRect(0, 0, width, height);
  
  // Spatial hash grid for O(1) hover lookups
  spatialGrid.clear();
  
  for (let i = 0; i < records.length; i++) {
    const r = records[i];
    const x = scaleX(r.timestamp);
    const y = scaleY(r.metricValue);
    
    spatialGrid.insert(x, y, r.id);
    
    ctx.fillStyle = r.isAnomaly ? "#F87171" : "#38BDF8";
    ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
  }
}`,
    architecturePoints: [
      "Next.js App Router for server-rendered page skeleton with client canvas islands",
      "Direct HTML5 Canvas 2D Context rendering 10,000+ data nodes without DOM overhead",
      "Spatial hashing grid for microsecond mouse hover coordinate collision detection",
      "Memoized debounce filter pipeline synchronizing URL parameters with state",
    ],
    content: [
      "In the Product Data Explorer project, our initial prototype rendered time-series charts using SVG path and circle elements. While visually sharp, manipulating 10,000+ SVG nodes in the DOM caused layout recalculations to choke, dropping frame rates to 8-12 FPS during live filtering.",
      "We re-architected the visualization layer onto a layered Canvas structure: a background bitmap for grid lines, a dynamic canvas for data points, and an interactive overlay for crosshairs and tooltip tooltips.",
      "By replacing DOM queries with a mathematical spatial hash grid, hover hit-testing dropped from O(n) array iteration to O(1) grid lookups, locking the browser at 60 FPS across all resolutions.",
    ],
  },
  {
    id: "collaborative-task-acid",
    title: "Ensuring ACID Consistency with Prisma & NextAuth RBAC Workflows",
    subtitle: "Architectural patterns for multi-tenant workspaces and zero-drift optimistic mutations",
    readTime: "5 min read",
    date: "Dec 2025",
    image: "/task-manager.png",
    category: "Distributed Backend",
    githubRepo: "https://github.com/vishu1803",
    liveDemo: "https://collaborative-task-manager-fc26.vercel.app/",
    excerpt:
      "Deep dive into the Collaborative Task Manager: balancing optimistic client responsiveness with atomic PostgreSQL transaction guarantees.",
    codeSnippet: `export async function updateTaskStatus(taskId: string, newStatus: TaskStatus) {
  const session = await auth();
  if (!session?.user?.id) throw new UnauthorizedError();

  return await prisma.$transaction(async (tx) => {
    // Row-level lock on task workspace to prevent race conditions
    const task = await tx.task.findUniqueOrThrow({
      where: { id: taskId },
      include: { workspace: true },
    });

    verifyUserWorkspaceRole(session.user.id, task.workspace.id, "EDITOR");

    const updated = await tx.task.update({
      where: { id: taskId },
      data: { status: newStatus, version: { increment: 1 } },
    });

    await tx.auditLog.create({
      data: { taskId, userId: session.user.id, action: "STATUS_UPDATE" },
    });

    return updated;
  });
}`,
    architecturePoints: [
      "Prisma ORM interactive transactions ($transaction) guaranteeing all-or-nothing execution",
      "NextAuth JWT token payload validation enforcing strict multi-tenant workspace boundaries",
      "Optimistic UI state rollbacks via client mutation queues upon network partition",
      "Strict schema validation on Server Actions preventing untrusted input tampering",
    ],
    content: [
      "Real-time collaborative applications face a fundamental tension: users demand instant feedback when dragging task cards, but database state must never drift into inconsistency if two team members edit concurrently.",
      "In the Collaborative Task Manager, we solved this with monotonic version counters and Prisma transactional isolation. Client interfaces update immediately with optimistic states while recording an undo-rollback closure.",
      "If the server transaction detects a concurrent modification version conflict, the server rejects the write and sends the latest authoritative snapshot, triggering a smooth client rollback.",
    ],
  },
  {
    id: "webgl-instanced-3d",
    title: "GPU Instanced Shaders & Camera Physics in React Three Fiber",
    subtitle: "Rendering thousands of interactive particles with a single GPU draw call",
    readTime: "7 min read",
    date: "Nov 2025",
    image: "/portfolio.png",
    category: "3D Graphics & WebGL",
    githubRepo: "https://github.com/vishu1803/3D-portfolio-website",
    liveDemo: "https://3-d-portfolio-website-one.vercel.app",
    excerpt:
      "Mathematical insights from the 3D Portfolio Website repository: combining Three.js instanced meshes with bespoke GLSL attenuation shaders.",
    codeSnippet: `// Custom GLSL particle attenuation vertex shader
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = uSize * (300.0 / -mvPosition.z) * aScale;
  gl_Position = projectionMatrix * mvPosition;
  vColor = aColor;
}

// Fragment shader
void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  float alpha = smoothstep(0.5, 0.1, dist);
  gl_FragColor = vec4(vColor, alpha * uOpacity);
}`,
    architecturePoints: [
      "Three.js instanced meshes collapsing 1,500 particles into 1 single GPU draw call",
      "Custom GLSL vertex and fragment shaders for circular soft-particle point rendering",
      "Framer Motion spring physics coupled with Three.js camera matrix spherical coordinates",
      "Dynamic DPR throttling scaling resolution adaptively based on device GPU performance",
    ],
    content: [
      "Rendering 3D web experiences without causing laptops to spin fans or mobile devices to stutter requires ruthless optimization of the WebGL draw call budget.",
      "For the 3D Portfolio Website, instead of creating individual Three.js Mesh instances, we consolidated thousands of celestial particles into a single InstancedMesh governed by custom GLSL shaders.",
      "By calculating point size attenuation directly inside the GPU vertex shader rather than passing matrices from JavaScript, we eliminated CPU garbage collection pauses and locked render times to 60 FPS.",
    ],
  },
  {
    id: "tensorflow-edge-vision",
    title: "Zero-Server Edge Vision: Browser-Native Inference with TensorFlow.js",
    subtitle: "Running neural object detection directly on client hardware without backend latency",
    readTime: "4 min read",
    date: "Oct 2025",
    image: "/object-detection.png",
    category: "Computer Vision",
    githubRepo: "https://github.com/vishu1803",
    liveDemo: "https://object-detection-web-app-indol.vercel.app/",
    excerpt:
      "Deep dive into the Object Detection Web App: executing quantized neural models directly in the user browser using WebGL shaders.",
    codeSnippet: `// Client-side WebGL accelerated inference loop
async function detectFrame(videoElement: HTMLVideoElement) {
  const model = await cocoSsd.load({ base: "mobilenet_v2" });
  
  const predict = async () => {
    // 100% Client-side GPU tensor execution
    const predictions = await model.detect(videoElement);
    renderBoundingBoxes(predictions);
    requestAnimationFrame(predict);
  };
  predict();
}`,
    architecturePoints: [
      "TensorFlow.js WebGL backend binding tensor operations to GPU fragment shaders",
      "Quantized MobileNet architecture maintaining sub-30ms inference on standard laptops",
      "Zero server data transmission ensuring 100% private on-device camera inference",
      "Direct canvas bounding box overlay synchronized with requestAnimationFrame",
    ],
    content: [
      "Sending high-resolution video streams to cloud servers for computer vision inference introduces significant network latency, high bandwidth costs, and privacy vulnerabilities.",
      "In the Object Detection Web App, we moved the entire inference pipeline directly to the client browser using TensorFlow.js with the WebGL hardware acceleration backend.",
      "By utilizing quantized neural model weights, modern client GPUs can classify common objects and render localized bounding boxes in real time with zero server infrastructure.",
    ],
  },
];

interface JournalProps {
  onSelectArticle: (article: JournalArticle) => void;
}

export default function Journal({ onSelectArticle }: JournalProps) {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Centered Header pattern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
              Recent Thoughts
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight font-body">
            Architectural{" "}
            <span className="font-display italic text-text-primary">
              writings
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">
            Real engineering benchmarks, code diffs, and architectural insights from shipped GitHub repositories.
          </p>
        </motion.div>

        {/* Real technical articles */}
        <div className="space-y-4 md:space-y-5">
          {JOURNAL_DATA.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: idx * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() => onSelectArticle(article)}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-4 md:p-5 bg-surface/40 hover:bg-surface border border-stroke rounded-[32px] sm:rounded-full transition-all duration-300 cursor-pointer hover:border-white/20 hover:shadow-xl hover:shadow-black/20"
            >
              {/* Subtle hover gradient glow */}
              <div className="absolute inset-0 rounded-[32px] sm:rounded-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Left side: Thumbnail + Title + Subtitle */}
              <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                {/* Thumbnail */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 border border-white/10 bg-black/40">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="64px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono text-muted tracking-wider uppercase">
                      {article.category}
                    </span>
                    <span className="text-muted/40 text-xs hidden sm:inline">&bull;</span>
                    <span className="text-[11px] font-mono text-[#89AACC] hidden sm:inline">
                      {article.readTime}
                    </span>
                    <span className="text-muted/40 text-xs hidden md:inline">&bull;</span>
                    <span className="text-[11px] font-mono text-muted/70 hidden md:inline truncate">
                      {article.subtitle}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-medium text-text-primary group-hover:text-[#89AACC] transition-colors truncate">
                    {article.title}
                  </h3>
                </div>
              </div>

              {/* Right side: Date + Action arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-16 sm:pl-0">
                <span className="text-xs font-mono text-muted">
                  {article.date}
                </span>

                <div className="w-8 h-8 rounded-full border border-stroke bg-bg/80 flex items-center justify-center text-text-primary text-xs group-hover:border-white/30 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
