# Vishwanath Nishad — Portfolio

A modern, animated portfolio website built with **Next.js**, **Framer Motion**, and **Three.js**. Features Google-style smooth animations, scroll-linked effects, and a fully responsive design.
🔗 **Live**: [vishwanath-nishad.vercel.app](https://vishwanath-nishad.vercel.app)
---
## ✨ Highlights
- **Typewriter name animation** with gradient blinking cursor
- **Dynamic role descriptions** — content changes based on active role (Full Stack / Backend / Software Dev)
- **Scroll progress bar** — spring-based gradient indicator
- **Scroll-linked header** — background blur and opacity transition as you scroll
- **Active section tracking** — nav pill follows current section via IntersectionObserver
- **Parallax backgrounds** — subtle scroll-driven glow movement
- **Section fade-in** — sections smoothly reveal on scroll
- **Stagger grid animations** — cards animate in sequence
- **Tab transitions** — blur crossfade with spring-based pill indicator
- **Particle stars** — lazy-loaded Three.js background (desktop only)
- **Magnetic buttons** — spring-physics hover attraction effect
- **Fully responsive** — optimized for mobile, tablet, and desktop

---

## 🛠 Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Next.js 16, React 19 |
| **Animation** | Framer Motion (scroll, springs, layout animations) |
| **3D** | Three.js, React Three Fiber, Drei |
| **Styling** | Tailwind CSS, Inter font |
| **Email** | EmailJS (contact form) |
| **Deployment** | Vercel |
---
## 📁 Project Structure
```
src/
├── app/
│   ├── globals.css          # Global styles, custom scrollbar, CSS variables
│   ├── layout.tsx           # Root layout with SEO metadata
│   └── page.tsx             # Entry point → renders App
├── components/
│   ├── MagneticButton.tsx   # Spring-physics hover button
│   ├── ParticleBackground.tsx # Three.js star field
│   ├── ScrollProgress.tsx   # Scroll progress gradient bar
│   └── SectionWrapper.tsx   # Scroll-linked parallax/fade wrapper
├── App.tsx                  # Main app shell
├── Header.tsx               # Scroll-linked header + mobile nav
├── Home.tsx                 # Hero with typewriter + role descriptions
├── Features.tsx             # Services grid with stagger
├── Projects.tsx             # Project cards with hover effects
├── Resume.tsx               # Tabbed resume with AnimatePresence
├── Contact.tsx              # Email form with glassmorphism
└── Footer.tsx               # Minimal footer with gradient divider
```

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/vishu1803/my-portfolio.git
cd my-portfolio

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build
```

---

## 📱 Mobile Optimization

- Hamburger menu with fullscreen overlay and body scroll lock
- Responsive text sizing across all breakpoints
- Reduced blur and glow sizes on small screens
- Touch-friendly tap targets (`active:` states)
- Hidden scroll indicator on mobile
- Stacked layout with proper spacing

---

## 👤 Author

**Vishwanath Nishad**
- GitHub: [@vishu1803](https://github.com/vishu1803)
- LinkedIn: [Vishwanath Nishad](https://www.linkedin.com/in/vishwanath-nishad-69b047233/)

## 📝 License

MIT
