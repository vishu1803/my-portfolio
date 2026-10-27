/** Content checked against the supplied resume and linked public repository material.
 * No benchmark, deployment-success or independent skill-verification claim is inferred.
 */
export interface CaseStudy {
  id: string; title: string; chapter: string; category: string; focus: string;
  summary: string; imageAlt: string; image: string; github: string; liveDemo: string; tech: string[];
  problem: string; solution: string; highlights: string[];
  sourceLabel: string; sourceKind: string; sourceUrl: string; note: string;
}
export const CONTENT_REVIEW_DATE = "2026-10-26";
export const CASE_STUDIES: CaseStudy[] = [
  {
    "id": "collaborative-task-acid",
    "summary": "Helps teams assign tasks, track progress and control access to shared work.",
    "imageAlt": "Task dashboard with task counts, completion rate and a Create Task control.",
    "title": "Collaborative Task Manager",
    "chapter": "01 / WORKING TOGETHER",
    "category": "Full-stack development",
    "focus": "Shared work. Clear permissions.",
    "image": "/task-manager.png",
    "github": "https://github.com/vishu1803/Collaborative-task-manager",
    "liveDemo": "https://collaborative-task-manager-fc26.vercel.app/",
    "tech": [
      "TypeScript",
      "Next.js",
      "Express.js",
      "Prisma",
      "PostgreSQL",
      "Socket.io"
    ],
    "problem": "A team needs one place to assign work, track progress and keep access to shared tasks under control.",
    "solution": "Built a full-stack task-management platform with RESTful CRUD APIs, JWT authentication and role-based access control. The resume describes database-query optimization and a responsive interface for real-time updates.",
    "highlights": [
      "RESTful task APIs backed by Node.js, Prisma and PostgreSQL.",
      "JWT authentication and role-based permissions.",
      "Responsive task views and real-time updates."
    ],
    "sourceLabel": "Resume + repository documentation",
    "sourceKind": "resume",
    "sourceUrl": "https://github.com/vishu1803/Collaborative-task-manager/blob/main/README.md",
    "note": "The design question: how can a shared task stay understandable to everyone working on it?"
  },
  {
    "id": "ast-pr-analyzer",
    "summary": "Helps developers review GitHub pull requests with automated code-quality feedback.",
    "imageAlt": "Code review dashboard showing pull-request analysis and review feedback.",
    "title": "AI-Powered Code Review Assistant",
    "chapter": "02 / MAKING CODE LEGIBLE",
    "category": "Developer tools",
    "focus": "A second set of eyes for code.",
    "image": "/ai-code-review.png",
    "github": "https://github.com/vishu1803/Ai-powered-code-review-assistant",
    "liveDemo": "",
    "tech": [
      "Python",
      "FastAPI",
      "Flask",
      "PostgreSQL",
      "Redis",
      "OpenAI API"
    ],
    "problem": "Reviewing a pull request means finding actionable feedback inside a large amount of code and context.",
    "solution": "Developed an automated review system using the OpenAI API to analyze GitHub pull requests. The resume describes a Flask backend, asynchronous FastAPI endpoints and webhook integrations; the repository documents a review dashboard and background analysis.",
    "highlights": [
      "Automated pull-request analysis and code-quality suggestions.",
      "GitHub webhook integration with Python backend services.",
      "Review results organized for inspection in a dashboard."
    ],
    "sourceLabel": "Resume + repository documentation",
    "sourceKind": "resume",
    "sourceUrl": "https://github.com/vishu1803/Ai-powered-code-review-assistant/blob/main/README.md",
    "note": "The design question: how can automated feedback become useful input to a human reviewer?"
  },
  {
    "id": "object-detection",
    "summary": "Lets visitors upload images and inspect object-detection results in the browser.",
    "imageAlt": "Object detection screen with image input and model results.",
    "title": "Object Detection Web App",
    "chapter": "03 / SEEING THROUGH SOFTWARE",
    "category": "Browser experiments",
    "focus": "An image becomes an interface.",
    "image": "/object-detection.png",
    "github": "https://github.com/vishu1803/Object-detection-web-app",
    "liveDemo": "",
    "tech": [
      "React",
      "JavaScript",
      "TensorFlow.js",
      "COCO-SSD",
      "Vite"
    ],
    "problem": "Object-detection output needs an interface that makes model results visible and understandable.",
    "solution": "Created a React-based object-detection application. The public repository includes TensorFlow.js, COCO-SSD, image-drop and webcam dependencies; its documentation describes image input and detection-result views.",
    "highlights": [
      "React interface for image object detection.",
      "TensorFlow.js and COCO-SSD declared in the project dependencies.",
      "Image-upload and webcam interface packages."
    ],
    "sourceLabel": "Repository overview",
    "sourceKind": "repository",
    "sourceUrl": "https://github.com/vishu1803/Object-detection-web-app/blob/main/package.json",
    "note": "The design question: how can an unfamiliar model result become something a visitor can inspect?"
  },
  {
    "id": "ai-career-hub",
    "summary": "Helps candidates connect repository evidence, resume claims and job-fit analysis.",
    "imageAlt": "Career Hub interface for candidate profiles and repository evidence.",
    "title": "Career Hub",
    "chapter": "04 / EVIDENCE BEFORE ADVICE",
    "category": "Career intelligence",
    "focus": "Career stories with a source.",
    "image": "/ai-career-hub.png",
    "github": "https://github.com/vishu1803/Ai-job-mcp",
    "liveDemo": "",
    "tech": [
      "Node.js",
      "TypeScript",
      "Fastify",
      "PostgreSQL",
      "MCP"
    ],
    "problem": "Career tools can confuse a self-reported skill with evidence of work. Candidates need a way to keep those meanings separate.",
    "solution": "Built Career Hub around repository evidence, resume claims and job-fit analysis. The project documentation describes candidate profiles, tailored documents, application tracking and an MCP interface for AI clients, with human review before write operations.",
    "highlights": [
      "Repository evidence and uploaded resume claims kept distinct.",
      "Job-fit analysis and tailored career-document workflows.",
      "MCP integration with human approval for write operations."
    ],
    "sourceLabel": "Repository overview",
    "sourceKind": "repository",
    "sourceUrl": "https://github.com/vishu1803/Ai-job-mcp/blob/main/README.md",
    "note": "The design question: what changes when every recommendation can point back to its source?"
  },
  {
    "id": "product-explorer-canvas",
    "summary": "Helps readers browse, search and filter a book catalogue.",
    "imageAlt": "Book catalogue interface with browsing, search and filtering controls.",
    "title": "Product Data Explorer",
    "chapter": "05 / FROM DATA TO DISCOVERY",
    "category": "Full-stack exploration",
    "focus": "A catalogue worth exploring.",
    "image": "/product-explorer.png",
    "github": "https://github.com/vishu1803/Product-Data-Explorer",
    "liveDemo": "",
    "tech": [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "Redis",
      "Playwright"
    ],
    "problem": "A changing book catalogue needs a clear browsing experience and a reliable path from scraped data to the interface.",
    "solution": "Created a full-stack book-data explorer. The repository documents a NestJS API, PostgreSQL persistence, Redis caching and a Next.js frontend for categories, product details, search and filtering.",
    "highlights": [
      "NestJS API and PostgreSQL data model.",
      "Playwright/Cheerio scraping workflow documented in the repository.",
      "Next.js catalogue browsing and Redis caching."
    ],
    "sourceLabel": "Repository overview",
    "sourceKind": "repository",
    "sourceUrl": "https://github.com/vishu1803/Product-Data-Explorer/blob/main/README.md",
    "note": "The design question: how can the data pipeline stay out of the way of the browsing experience?"
  },
  {
    "id": "webgl-instanced-3d",
    "summary": "Introduces my work through an interactive portfolio with 3D assets.",
    "imageAlt": "Earlier portfolio page with a spatial composition and project navigation.",
    "title": "3D Portfolio",
    "chapter": "06 / A SPATIAL EXPLORATION",
    "category": "Creative development",
    "focus": "A portfolio with another dimension.",
    "image": "/portfolio.png",
    "github": "https://github.com/vishu1803/3-d-portfolio-website",
    "liveDemo": "https://3-d-portfolio-website-one.vercel.app/",
    "tech": [
      "React",
      "Vite",
      "Tailwind CSS",
      "3D models"
    ],
    "problem": "A portfolio can communicate through interaction and spatial composition as well as words and screenshots.",
    "solution": "Created an earlier interactive portfolio with React and Vite. Its repository documents 3D assets, animated sections and a responsive component structure. This case explores that earlier direction alongside the current editorial site.",
    "highlights": [
      "React/Vite portfolio with 3D assets and animations.",
      "Modular sections and responsive styling.",
      "A live version is available alongside the repository."
    ],
    "sourceLabel": "Repository overview",
    "sourceKind": "repository",
    "sourceUrl": "https://github.com/vishu1803/3-d-portfolio-website/blob/main/README.md",
    "note": "The design question: when does a spatial interaction help tell the story?"
  }
];
