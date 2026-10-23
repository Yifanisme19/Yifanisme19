const img = (n) => `/images/${n}.webp`;

export const content = {
  nav: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
  },
  hero: {
    badge: "Open to full-time opportunities",
    hi: "Hi, I'm",
    name: "Yifan Lee",
    role: "Full Stack Developer · AI Automation",
    loc: "Johor, Malaysia",
    lead: "I build AI automations and business systems that handle the repetitive work, so people can focus on the decisions that matter.",
    cta1: "View projects",
    cta2: "Get in touch",
    tools: "AI tools I build with",
    words: ["AI agents", "business systems", "automations", "clean APIs"],
    build: "I build",
    run: "agent run · auto-upload",
    log: [
      "Task assigned: 48 products from client PDF",
      "Reading PDF, Word & old website…",
      "Drafting products + SEO content",
      "Generating & optimizing images",
      "Uploading via internal API",
      "Ready for human review",
    ],
    live: "Running 24/7",
  },
  stats: [
    { n: 500, s: "+", l: "reports generated live at one seminar" },
    { n: 10000, s: "+", l: "customers on a platform I cut AI costs for" },
    { n: 10, p: "~", s: "s", l: "per product upload, from ~half a month" },
    { n: 6, p: "1 → ", s: "", l: "websites checked per 30 min" },
  ],
  bring: {
    stack: "Core stack",
  },
  projects: {
    title: "Featured projects",
    sub: "Problem → solution → result. Real systems running in production.",
    filters: { all: "All", ai: "AI Automation", biz: "Business Systems" },
    labels: {
      problem: "Problem",
      solution: "Solution",
      result: "Result",
      role: "Role",
    },
    items: [
      {
        cat: "ai",
        title: "Auto Product Upload",
        role: "Led the whole project",
        tags: ["PHP", "Codex", "CLIProxyAPI", "Agentic Browser"],
        imgs: [
          img("auto-upload-queue"),
          img("auto-upload-setup"),
          img("auto-upload-progress"),
        ],
        metric: "~10s / product",
        problem:
          "Client product data arrived as PDFs, Word files, old websites and messy spreadsheets — copied by hand, about half a month per customer.",
        solution:
          "An AI pipeline reads the material, drafts products, generates SEO content and images, and uploads via the system API — running 24/7 on Mac minis.",
        result:
          "One product takes ~10 seconds. The team now spends its time on creative work and review.",
      },
      {
        cat: "ai",
        title: "AI Website QA & Pre-Launch Checker",
        role: "Whole project",
        tags: ["Python", "FastAPI", "OpenClaw", "Human-in-the-loop"],
        imgs: [img("website-checker")],
        metric: "1 → 6 sites / 30 min",
        problem:
          "Every website was checked by hand before launch, one at a time.",
        solution:
          "A FastAPI service hands sites to an OpenClaw agent that walks the ISO-aligned checklist in an agentic browser: layout, grammar, typos, business info.",
        result:
          "Reports land in the internal system for a person to approve. 3 sites in parallel on an entry-level Mac mini.",
      },
      {
        cat: "ai",
        title: "Competitor Research Automation",
        role: "Built the full workflow",
        tags: ["OpenClaw", "SEO", "GEO", "AEO"],
        metric: "500+ reports",
        problem:
          "Small business owners can’t easily see how they compare online or which keywords to target.",
        solution:
          "End-to-end workflow from competitor data collection to finished report, with custom comparison rules, site analysis and AI-suggested SEO/GEO keywords.",
        result:
          "Run live at the company booth: 500+ reports delivered in a single seminar.",
      },
      {
        cat: "ai",
        title: "CLIProxyAPI: Subscription-Based AI Billing",
        role: "Proposed, researched, deployed",
        tags: ["API", "Cost Control", "REST"],
        imgs: [img("cliproxyapi-demo-3x2")],
        metric: "Fixed monthly AI cost",
        problem:
          "Pay-per-use API billing meant AI and image-generation costs grew with every request and were hard to forecast as usage scaled.",
        solution:
          "Evaluated and deployed CLIProxyAPI to route company tools through subscription-based AI accounts instead of metered API keys, connected via internal REST integrations.",
        result:
          "AI spend moved from unpredictable per-token billing to a fixed subscription cost, supporting higher-volume image generation for a platform serving 10,000+ customers.",
      },
      {
        cat: "ai",
        title: "Lead Qualification Automation",
        role: "Whole project",
        tags: ["OpenClaw", "Skills"],
        problem:
          "Sales spent hours researching prospects before knowing if they were worth contacting.",
        solution:
          "An OpenClaw workflow researches prospects and checks each against the sales team’s criteria.",
        result: "Sales receives pre-checked leads instead of raw research.",
      },
      {
        cat: "ai",
        title: "Google Reviews Monitoring",
        role: "Whole project",
        tags: ["OpenClaw", "Scheduled Runs"],
        problem:
          "Teams needed to react quickly to reviews without checking sites by hand.",
        solution:
          "Collects Google reviews, alerts on negative feedback, and turns positive ones into scheduled news articles.",
        result:
          "Faster response to unhappy customers and a self-refreshing news section.",
      },
      {
        cat: "biz",
        title: "Employee Reward Shop",
        role: "Entire backend",
        tags: ["PHP 8.1", "MariaDB", "Custom MVC"],
        imgs: [img("rewards-hub")],
        problem:
          "Reward requests lived in PDFs and Excel with no systematic approval.",
        solution:
          "Designed the database and built all server logic and the request-and-approval workflow.",
        result: "Manual PDF/Excel handling replaced company-wide.",
      },
      {
        cat: "biz",
        title: "CustomGPT Library",
        role: "Entire backend",
        tags: ["PHP", "Custom MVC"],
        imgs: [img("ai-workspace-3x2")],
        problem:
          "Prompts, skills, CustomGPTs and tools were scattered across platforms.",
        solution:
          "One internal system with a shared structure — database and all server-side logic.",
        result: "Staff find AI resources in one place.",
      },
      {
        cat: "biz",
        title: "Online Admission System",
        role: "Full-stack developer",
        tags: ["Laravel 8", "Livewire", "MySQL"],
        imgs: [img("online-admission")],
        problem:
          "A university needed to move admissions from manual to online.",
        solution:
          "Gathered requirements from departments and built programme selection and applicant tracking end to end.",
        result: "Admissions digitized with a workflow shaped by its users.",
      },
      {
        cat: "biz",
        title: "Legacy Systems: Leave & Calendar Email",
        role: "Module owner",
        tags: ["Custom MVC", "Cron Jobs"],
        imgs: [img("leave-calendar-3x2")],
        problem:
          "Daily-use systems were old and gave no overview of who was away.",
        solution:
          "Maintain Leave & Announcements, migrated code from PHP 5.6 to 8.1, built a daily calendar email cron.",
        result:
          "Reliable daily operations; staff know who’s in each morning.",
      },
    ],
  },
  work: {
    title: "Ways to work with me",
    sub: "Hire me full-time, or bring me in for a specific job — from AI advice to a finished system.",
    best: "Best for",
    get: "You get",
    proof: "Done before",
    items: [
      [
        "Full-time AI & Automation Engineer",
        "Teams that want AI workflows in production, not just prototypes",
        "End-to-end ownership: design, build, deploy and maintain agents, internal APIs and review flows.",
        "hire",
      ],
      [
        "AI Integration Consulting",
        "Companies that want AI in their workflow but don’t know where to start",
        "A review of your processes, which steps AI can safely take over, the right tools and a cost estimate — with a clear plan to roll it out.",
        "",
        "Advice · Roadmap",
      ],
      [
        "AI Automation Development",
        "Teams buried in repetitive research, data entry, checking or reporting",
        "AI agents and pipelines that run 24/7 and hand finished work to a person for approval.",
        "",
        "Auto Product Upload · Website QA · Competitor Research",
      ],
      [
        "Business System Development",
        "Teams still managing work in Excel, PDFs or aging systems",
        "Custom internal platforms, approval workflows, admin tools and APIs — from database to deployment, plus upgrades for legacy PHP.",
        "",
        "Reward Shop · Admission System · PHP 5.6 → 8.1",
      ],
      [
        "AI Tools Training",
        "Teams that want to use ChatGPT, Claude and other AI tools in their daily work",
        "Hands-on sessions built around your real tasks: practical prompts, ready-to-use workflows and habits that save hours every week.",
        "",
        "ChatGPT · Claude · Codex · OpenClaw",
      ],
    ],
  },
  exp: {
    title: "Experience",
    items: [
      [
        "Full Stack Developer",
        "NewPages Network",
        "Oct 2026 – Present",
        "Promoted. AI integration & automation on OpenClaw; Website Checker, Competitor Research, CLIProxyAPI, Auto Product Upload.",
      ],
      [
        "PHP Developer",
        "NewPages Network",
        "Jul 2025 – Sep 2026",
        "Internal platforms & CMS plugins; Reward Shop and CustomGPT Library backends; legacy modernization and security fixes.",
      ],
      [
        "iOS App Developer (Intern)",
        "Alva Production",
        "Mar – May 2025",
        "Modular Flutter planning app for film-production teams; reusable widgets, clean state, tests.",
      ],
      [
        "PHP Developer",
        "Southern University College",
        "Jun 2022 – Jul 2023",
        "Online Admission and Open Day systems; university website redesign and migration.",
      ],
    ],
  },
  edu: {
    title: "Education",
    items: [
      [
        "Bachelor of Software Engineering (Hons)",
        "Southern University College · 2023 – 2025",
        "First Class Honours · 3.82 CGPA · Dean’s List",
      ],
      [
        "Diploma in Information Technology",
        "Southern University College · 2020 – 2022",
        "3.61 CGPA · Dean’s List",
      ],
    ],
  },
  think: {
    title: "How I think about AI",
    quote: "Writing code is the easy part now. The real work is making sure it’s reliable and secure.",
    body: "I use AI for the jobs that take the most time, repeat every day, or are easy to get wrong by hand — so people can focus on the decisions that matter.",
  },
  contact: {
    title: "Let’s talk",
    body: "Hiring for an AI or full-stack role, or have a repetitive process eating your team’s time? Tell me what slows you down.",
    email: "Email me",
  },
  footer: "Designed & built by Yifan Lee",
};

// display order: indices into the list above
const order = [0, 1, 3, 6, 7, 9, 8, 2, 4, 5];
content.projects.items = order.map((i) => content.projects.items[i]);
