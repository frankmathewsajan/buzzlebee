*This is a submission for the [New Year, New You Portfolio Challenge Presented by Google AI](https://dev.to/challenges/newyear2026)*

## About Me

I am **Frank Mathew Sajan**, a Computer Science undergraduate at VIT-AP University specializing in Artificial Intelligence and Deep Learning. While my academic focus centers on AI, I maintain a deep passion for building **clean, performant web experiences** that balance technical excellence with aesthetic appeal.

I believe great software should be efficient, scalable, and beautiful—principles that guided every decision in this portfolio.

## Portfolio

{% embed https://itzfrank-250384070377.us-central1.run.app %}

**Live on Google Cloud Run**: [https://itzfrank-250384070377.us-central1.run.app](https://itzfrank-250384070377.us-central1.run.app)

## How I Built It

### The Tech Stack

I architected this portfolio using **Next.js** with a pure **client-side component** approach. This decision was intentional—for a portfolio site, I prioritized:
- **Blazing-fast performance** with static HTML/CSS/JS output
- **Zero server-side overhead** for instant page loads
- **Simplified architecture** that's easier to reason about and maintain

### Standout Features

**Interactive Portfolio Map**
The centerpiece of my portfolio is an **interactive project visualization map** built with `react-d3-tree`. Instead of a boring list of projects, visitors can explore my work through an interactive tree diagram that shows:
- **Progress tracking** for each project (complete, in-progress, planned)
- **Visual hierarchy** of skills and technologies
- **Interactive nodes** that reveal project details on click
- **Smooth animations** powered by Framer Motion

**Dynamic Resume Generation**
I built a complete **LaTeX-to-PDF resume system** directly in the browser. The resume isn't just a static PDF—it's dynamically generated from React components and rendered in real-time. This means I can update my resume by simply editing React code, and it automatically compiles to a professional PDF format.

**Delightful Micro-interactions**
- **Lottie animations** throughout the site for smooth, lightweight visual feedback
- **External link modal** that warns users before navigating away (better UX)
- **Smooth page transitions** using Framer Motion
- **Responsive navigation** that adapts elegantly across devices
- **Glassmorphism effects** for modern, premium aesthetics

**Firebase Analytics Integration**
Implemented smart client-side Firebase Analytics with conditional loading to track visitor engagement without impacting build performance or bundle size.

### The Technical Challenge: Firebase → Cloud Run Migration

The most significant technical achievement was migrating the deployment infrastructure from Firebase Hosting to **Google Cloud Run** while maintaining the static site architecture.

**The Solution:**
1. **Multi-stage Docker Build**
   - Stage 1: Node.js container builds the Next.js static export
   - Stage 2: Lightweight Nginx Alpine container serves the static files
   - Final result: A compact, production-ready container

2. **Smart Containerization**
   - Nginx configuration optimized for:
     - Gzip compression for faster load times
     - Aggressive caching for static assets
     - Client-side routing support
     - Security headers out of the box

3. **Serverless Deployment**
   - Deployed to Cloud Run with `dev-tutorial=devnewyear2026` label
   - Auto-scaling from 0 to handle traffic spikes
   - Pay-per-request pricing (essentially free for a portfolio)
   - Global CDN distribution

### Development Workflow

Using **Project IDX** (Google's next-gen AI-powered development environment), I streamlined the entire containerization and deployment process. What typically requires manual Dockerfile crafting, image building, registry pushing, and Cloud Run configuration was handled efficiently with modern tooling.

The result: a **production-grade, containerized frontend** deployed to serverless infrastructure—all while maintaining the simplicity of a static site.

## What I'm Most Proud Of

**1. The Portfolio Map Experience**
Creating an intuitive, interactive project visualization that's both informative and engaging. The progress tracking feature lets visitors see my journey at a glance—what I've built, what I'm working on, and what's coming next.

**2. Infrastructure Without Complexity**
Most developers see a dichotomy between "simple static hosting" and "powerful cloud infrastructure." This project proves you can have both.

By containerizing a Next.js static export with Nginx and deploying it to Cloud Run, I achieved:
- ✅ **Serverless scalability** (0 to millions of requests)
- ✅ **Static site simplicity** (no server-side code to maintain)
- ✅ **Enterprise-grade infrastructure** (Google's global network)
- ✅ **Developer-friendly workflow** (single command deployment)
- ✅ **Blazing-fast performance** across all devices

**3. Attention to Detail**
Every interaction, every animation, every transition was intentionally designed. From the subtle Lottie animations to the external link warning modal, I focused on creating a **premium user experience** that feels polished and professional.

## Technical Highlights

**Smart Firebase Analytics Integration**
One challenge was maintaining Firebase Analytics in a static build. I solved this with conditional imports—analytics only loads client-side via dynamic imports, avoiding SSR build errors while preserving functionality.

**Optimized Build Pipeline**
The Dockerfile leverages layer caching intelligently:
- Dependencies layer cached unless package.json changes
- Build artifacts optimized for minimal image size
- Multi-stage builds eliminate build-time dependencies from production

**One-Command Deployment**
Created automated deployment scripts (PowerShell & Bash) that:
- Build the Docker image
- Push to Google Container Registry
- Deploy to Cloud Run with proper labels
- Verify deployment and output the live URL

## Lessons Learned

1. **Containerization ≠ Complexity**: Docker can simplify deployments, not complicate them
2. **Interactive visualizations matter**: The portfolio map gets more engagement than traditional project lists
3. **Micro-interactions elevate UX**: Small animations and transitions make a huge difference in perceived quality
4. **Modern tooling accelerates development**: Project IDX and AI-assisted development significantly speed up complex tasks

## Future Enhancements

- [ ] Custom domain mapping for cleaner URLs
- [ ] Cloud CDN integration for even faster global delivery
- [ ] GitHub Actions CI/CD for automated deployments
- [ ] More interactive visualizations and animations
- [ ] Dark mode toggle with smooth transitions

---

**Tech Stack Summary:**
- **Frontend**: Next.js 16, React 19, Tailwind CSS, Framer Motion
- **Deployment**: Google Cloud Run, Docker, Nginx
- **Visualizations**: react-d3-tree, Lottie animations
- **Analytics**: Firebase Analytics
- **Development**: Project IDX (Antigravity)

This portfolio represents my philosophy: **technical excellence doesn't require over-engineering**. Sometimes the best solution is the elegant one that delights users while being simple under the hood.
