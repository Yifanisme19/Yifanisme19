// English (default). Add a new language by copying this file and translating every value.
export default {
  "lang": "en",
  "htmlLang": "en",
  "ui": {
    "meta": {
      "title": "Yifan Lee — Full Stack Developer Malaysia | PHP & AI",
      "description": "Yifan Lee is a full stack developer in Johor, Malaysia. He builds internal business systems, PHP and Laravel web applications, and AI-assisted workflows used company-wide and by customers."
    },
    "nav": {
      "work": "Work",
      "experience": "Experience",
      "about": "About",
      "contact": "Contact",
      "talk": "Let's talk"
    },
    "hero": {
      "role": "Full Stack Developer",
      "status": "Available for opportunities",
      "title": "I build the systems companies rely on.<br><em>AI helps them move faster.</em>",
      "lead": "I'm Yifan Lee, a full stack developer in Johor, Malaysia. I build business platforms and AI-assisted workflows with PHP, Laravel and MySQL, used company-wide and by customers.",
      "ctaWork": "See my work",
      "ctaLinkedIn": "LinkedIn",
      "ring": "PHP · LARAVEL · MYSQL · OPENCLAW · AI AUTOMATION · WORKFLOWS"
    },
    "work": {
      "eyebrow": "// 01 · selected work",
      "title": "Systems built for <em>real operations.</em>",
      "sub": "Select a project to see the problem, my role and the result.",
    },
    "filters": {
      "all": "All work",
      "php": "PHP systems",
      "ai": "AI automation",
      "tools": "Tools & internal systems"
    },
    "experience": {
      "eyebrow": "// 02 · experience",
      "title": "Building across <em>the full stack.</em>",
      "sub": "Four roles across education, business software, mobile apps and AI automation, with the results of each role listed below."
    },
    "about": {
      "eyebrow": "// 03 · engineering view",
      "quote": "AI changes how we build. <strong>It does not remove the need to <em>build responsibly.</em></strong>",
      "body": "Code is easier to produce than ever. Reliable products are not. Strong engineering judgment is still required across system design, maintenance, security, usability, and review. I use AI to attack the three costly problems (time, repetition, and error) while keeping human accountability at the center.",
      "skillsEyebrow": "// skills · evidence",
      "skillsTitle": "Skills, and <em>where I used them.</em>",
      "eduEyebrow": "// education",
      "eduTitle": "Built on <em>strong foundations.</em>"
    },
    "contact": {
      "eyebrow": "// get in touch",
      "title": "Let's build something <em>worth relying on.</em>",
      "sub": "Open to new opportunities in full stack, PHP or AI automation. Email is the fastest way to reach me.",
      "linkedin": "LinkedIn"
    },
    "footer": {
      "copy": "© 2026 YIFAN",
      "role": "FULL STACK DEVELOPER · JOHOR, MALAYSIA",
      "top": "BACK TO TOP ↑"
    },
    "modal": {
      "label": "PROJECT {n} / CASE STUDY",
      "close": "Close ×",
      "impact": "Impact",
      "role": "Role",
      "scale": "Scale",
      "output": "Output",
      "flow": "Flow",
      "stack": "Stack",
      "problem": "The problem",
      "idea": "The idea",
      "myRole": "My role",
      "how": "How it works",
      "built": "What I built",
      "result": "Result",
      "tech": "Tech in context",
      "screens": "Screens"
    },
    "lightbox": {"label":"Image preview","close":"Close preview","prev":"Previous image","next":"Next image","zoomIn":"Zoom in","zoomOut":"Zoom out"},
    "misc": {
      "cgpa": "CGPA",
      "langLabel": "Language",
      "sound": "Zen sound",
      "menu": "Menu",
      "top": "Back to top"
    }
  },
  "projects": {
    "website-qa": {
      "title": "AI Website QA & Operations",
      "meta": "Website quality · Business operations · 2026",
      "summary": "An AI reviewer that checks websites in the background before launch. A person only reviews the finished reports instead of checking every site by hand.",
      "scale": "One entry-level Mac mini · 3 sites in parallel · API-triggered",
      "role": "Core research team member · built the skills and integrations",
      "intro": {
        "q": "What is OpenClaw?",
        "a": "An AI agent platform. It follows written instructions (\"skills\") and uses tools such as a web browser to complete tasks on its own."
      },
      "problem": "Before every launch, a person had to open each website and repeat the same checks by hand: wording, layout, mobile responsiveness and business information. It was slow, and the quality of the check depended on who did it and how tired they were.",
      "myRole": "Member of the company's early core OpenClaw research team. I wrote the review skills, set up the browser automation and connected the workflow to the internal system through its API.",
      "how": [
        [
          "Request",
          "the internal system sends a website to review through an API call."
        ],
        [
          "Queue",
          "reviews run in the background, up to 3 at a time on one Mac mini, so nobody waits at a screen."
        ],
        [
          "AI review",
          "an OpenClaw agent follows the team's checklist in a real browser. It checks copy, layout, responsiveness and business information. One report takes about 10 to 12 minutes."
        ],
        [
          "Report",
          "findings return to the internal system."
        ],
        [
          "Human decision",
          "a reviewer reads the report and makes the final call."
        ]
      ],
      "built": [
        "Turned the team's pre-launch checklist into custom OpenClaw skills that the agent follows on every site.",
        "Set up browser automation to check copy, layout, responsiveness and business information.",
        "Integrated the workflow with the internal system through its API, so reviews run automatically in the background.",
        "Also connected OpenClaw to internal APIs for website backend tasks such as uploading products and services.",
        "Kept API tokens out of prompts, skills and outputs, so credentials are never exposed."
      ],
      "note": {
        "q": "Why a human stays in the loop",
        "a": "The AI does the repetitive checking. A person stays as the reviewer and approves the result. This keeps accountability with people, and cuts the time spent opening and checking each website one by one."
      },
      "result": "Review throughput rose from 1 website to 6 in 30 minutes (6×, a +500% increase). That comes from 3 parallel workers, each finishing a report in about 10 to 12 minutes, on the lowest-spec Mac mini M4. Reviewers now check finished reports instead of every website. This figure applies specifically to website QA.",
      "tech": "OpenClaw with custom skills holds the review rules. Browser automation performs the checks. Internal REST APIs trigger reviews and return reports. The whole setup runs on an entry-level Mac mini, so the cost to run it is low, and more machines could add capacity.",
      "metricText": "websites reviewed per 30 minutes (1 → 6), on the lowest-spec Mac mini M4 (16 GB RAM, 256 GB storage).",
      "captions": [
        "Website Checker · Pre-launch review workflow"
      ]
    },
    "auto-upload": {
      "title": "Auto Upload Products",
      "meta": "Business operations · AI automation · 2026",
      "summary": "An AI workflow that reads a customer's website or documents, drafts the product listings and uploads them to the system, replacing weeks of copying by hand.",
      "scale": "About 10 seconds per product · runs on one Mac mini",
      "role": "Project owner · in charge of the whole project",
      "problem": "Customers often send their products as a website or a set of documents. The internal team had to copy each product by hand, then write the design and content for it. Setting up one customer's products could take about half a month.",
      "myRole": "I was the person in charge of the whole project: how it should work, how it is built, how it is hosted and how it connects to the internal system.",
      "how": [
        [
          "Source",
          "the team gives the workflow the customer's website or documents."
        ],
        [
          "Collect",
          "an agent-friendly browser visits the website and gathers the product information."
        ],
        [
          "Analyse and draft",
          "Codex reads the data and documents and generates the product draft."
        ],
        [
          "Upload",
          "the draft goes straight into the system through its API."
        ]
      ],
      "built": [
        "Led the project end to end as the owner.",
        "Connected Codex through a bridge, so it analyses data and documents and writes the product drafts.",
        "Set up an agent-friendly browser that collects product data from customer websites.",
        "Integrated the drafts with the internal system's API, so products upload without manual entry.",
        "Hosted the whole workflow on a single Mac mini.",
        "Designed the team-facing screens: a six-step setup, a task queue and a live progress page."
      ],
      "note": {
        "q": "Set up in six steps",
        "a": "The team chooses the workspace, languages, source, catalogue and writing guidelines, then launches the workflow, which runs in the background. Each run shows its steps and recent activity, so the team can see progress without waiting at a screen."
      },
      "result": "One product now takes about 10 seconds, from the customer's source to the system. Work that used to take the team about half a month per customer is handled by the workflow, and nobody copies products one by one.",
      "tech": "Codex analyses the data and writes the drafts. An agent-friendly browser collects product information from websites. The internal system's REST API receives the finished products. One Mac mini hosts everything, so the running cost stays low.",
      "metricText": "per product, from the customer's source to the system. Previously about half a month per customer.",
      "captions": [
        "Task queue · Recreated with demo data",
        "Setup flow · Recreated with demo data.",
        "Run details · Recreated with demo data."
      ]
    },
    "reward-shop": {
      "title": "Employee Reward Shop",
      "meta": "Internal platform · Employee rewards · 2025–2026",
      "summary": "One system for requesting, managing and approving employee rewards, replacing PDFs and Excel files.",
      "scale": "Company-wide internal platform",
      "role": "Backend developer · owned the entire backend",
      "problem": "Reward requests were tracked through PDFs and Excel records, with no single place to manage them and no systematic approval process.",
      "myRole": "I was responsible for the entire backend: the database, the application logic and the approval flow. The interface was built by another team member on top of my backend.",
      "built": [
        "Designed the database in MariaDB for rewards, requests and approvals.",
        "Built the request and approval workflow, so administrators approve or reject requests inside the system instead of across PDFs and Excel.",
        "Wrote all server-side logic in PHP 8.1 on a custom MVC structure, so the interface can rely on it."
      ],
      "result": "Replaced manual PDF and Excel handling across the company. Administrators now manage and approve requests in one system.",
      "tech": "PHP 8.1 and a custom MVC framework run the application logic. MariaDB stores request and approval data.",
      "metricText": "company reward requests now handled in one system instead of PDF and Excel.",
      "captions": [
        "Rewards hub · Recreated with demo data"
      ]
    },
    "customgpt-library": {
      "title": "CustomGPT Library",
      "meta": "Knowledge system · Internal AI tools · 2025–2026",
      "summary": "One internal home for the company's AI prompts, skills, CustomGPTs and tools.",
      "scale": "Company-wide internal system",
      "role": "Backend developer · owned the entire backend",
      "problem": "Prompts, skills, CustomGPTs and tools were scattered across different platforms, so staff could not easily find what already existed.",
      "myRole": "I was responsible for the entire backend: the database design and all server-side logic. The interface was built by another team member on top of my backend.",
      "built": [
        "A single internal system that gathers prompts, skills, CustomGPTs and tools under a shared structure.",
        "Wrote the backend in PHP 8.1 and MariaDB, deployed for the whole company."
      ],
      "result": "Employees can find AI resources suited to their needs in one place instead of searching across platforms.",
      "tech": "PHP 8.1 runs the application. MariaDB stores the resource catalogue.",
      "metricText": "place to find prompts, skills, CustomGPTs and tools, instead of many platforms.",
      "captions": [
        "AI workspace · Recreated with demo data"
      ]
    },
    "google-reviews": {
      "title": "Google Reviews Monitoring",
      "meta": "Customer feedback · Client confidential",
      "summary": "Keep track of business reviews and turn feedback into timely action.",
      "scale": "Client details confidential",
      "role": "Built the workflow and rules myself",
      "flow": [
        "Collect reviews",
        "Evaluate feedback",
        "Alert / Publish"
      ],
      "output": "Negative-review alerts and scheduled website news content.",
      "problem": "Teams needed to react quickly to customer reviews without checking review sites by hand.",
      "myRole": "I configured the OpenClaw workflow and wrote the business rules behind it.",
      "built": [
        "Collects Google reviews and flags negative feedback with an alert to the team.",
        "Turns positive reviews into reflection-style copy, published on a schedule to the business website's news section."
      ],
      "result": "The team is alerted to negative reviews, and the website news section is refreshed on a schedule. Client details and figures are confidential.",
      "tech": "OpenClaw with custom rules for classifying reviews, and scheduled runs for publishing."
    },
    "lead-qualification": {
      "title": "Lead Qualification Automation",
      "meta": "Sales research · Client confidential",
      "summary": "Find potential customers that match the sales team's criteria.",
      "scale": "Client details confidential",
      "role": "Built the workflow and rules myself",
      "flow": [
        "Research",
        "Check criteria",
        "Qualify leads"
      ],
      "output": "Relevant leads for the sales team.",
      "problem": "Sales teams spent time researching prospects by hand before knowing whether they were worth contacting.",
      "myRole": "I configured the OpenClaw workflow and defined the business rules for qualifying leads.",
      "built": [
        "Researches potential customers on the internet.",
        "Checks each one against the sales team's criteria.",
        "Passes only qualified leads to the sales team."
      ],
      "result": "The sales team receives pre-checked leads instead of raw research. Client details and figures are confidential.",
      "tech": "OpenClaw with custom rules for evaluating and qualifying leads."
    },
    "competitor-research": {
      "title": "Competitor Research Automation",
      "meta": "Customer-facing · Company seminar 2026",
      "summary": "Turn competitor research into a report customers can use.",
      "scale": "500+ reports generated at one seminar",
      "role": "Built the whole workflow myself",
      "flow": [
        "Research",
        "Compare",
        "Recommend"
      ],
      "output": "Competitor comparisons and SEO & GEO keyword suggestions.",
      "problem": "Small business owners found it hard to see how they compared with competitors online and which keywords to target.",
      "myRole": "I built and configured the full workflow, from data collection to the customer report.",
      "built": [
        "Configured OpenClaw to gather competitor information from the web.",
        "Defined the comparison rules that assess each competitor's strengths and weaknesses against the customer's business.",
        "Generated a customer report with a competitor comparison, website analysis, and AI-suggested SEO and GEO keywords.",
        "Ran the workflow live at the company booth, so participants received a report during the event."
      ],
      "result": "More than 500 reports generated at one event, helping small business owners understand their competitors and keyword opportunities.",
      "tech": "OpenClaw for research and report generation, with custom rules for comparison. GEO means optimizing content so AI assistants can find and recommend it.",
      "metricText": "reports generated live at one company seminar."
    },
    "cliproxyapi": {
      "title": "CLIProxyAPI Integration",
      "meta": "AI infrastructure · Cost control",
      "summary": "A cost-control layer between internal tools and AI services.",
      "scale": "Supports AI features in a system serving 10,000+ customers",
      "role": "Researched, set up and integrated it",
      "flow": [
        "AI services",
        "API relay",
        "Internal tools"
      ],
      "output": "An API integration supporting internal AI use and image generation.",
      "problem": "Pay-per-use API billing made AI and image-generation costs hard to control as usage grew.",
      "myRole": "I researched the option, set up the relay and integrated it with the internal tools.",
      "built": [
        "Evaluated CLIProxyAPI as an API relay for internal AI workflows.",
        "Deployed and configured the relay, and connected internal tools to it."
      ],
      "result": "Reduced AI usage cost, saving roughly the cost of one ChatGPT Pro account compared with pay-per-use billing, while supporting higher-volume image generation. Capacity remains subject to the underlying services' usage limits and terms.",
      "tech": "CLIProxyAPI is the relay layer. Internal REST integrations connect it to the company tools.",
      "metricText": "customers on the system whose AI cost was reduced.",
      "captions": [
        "Recreated interface with fictional demo data"
      ]
    },
    "internal-system": {
      "title": "Internal System: Leave, Announcement, Daily Calendar Email",
      "meta": "Business operations · Legacy modernization",
      "summary": "Maintaining and upgrading the company's Leave and Announcement systems, plus a daily calendar email.",
      "short": "Leave, Announcement & Daily Calendar",
      "scale": "Used daily by all staff · PHP 5.6 codebase, partly upgraded to 8.1",
      "role": "Full stack · front end and back end, built solo",
      "problem": "The existing Leave and Announcement systems were old, needed fixes and daily upkeep, and gave staff no daily overview of who was away.",
      "myRole": "I maintain these systems, handling improvements, bug fixes and upgrades on the legacy codebase.",
      "built": [
        "Maintain and improve the Leave System and Announcement System that the whole company uses every day.",
        "Built a cron job that emails a daily calendar summary to staff.",
        "Moved parts of the legacy PHP 5.6 codebase to PHP 8.1."
      ],
      "result": "Keeps daily company operations running, and staff now receive a calendar summary by email every day.",
      "tech": "PHP 5.6 and 8.1 on a custom MVC framework, MariaDB for data, and a scheduled cron job for the daily email.",
      "metricText": "used by all staff, with a calendar summary emailed every day.",
      "captions": [
        "Leave calendar · Recreated with demo data"
      ]
    },
    "online-admission": {
      "title": "Online Admission System",
      "meta": "Web application · Education · 2022–2023",
      "summary": "A website where applicants apply to a university online, replacing a manual process.",
      "scale": "End-to-end admissions workflow, built from scratch",
      "role": "Full stack · front end and back end, built solo",
      "problem": "University admissions needed to move from a manual process to an online system, and the workflow needed to improve.",
      "myRole": "I worked as the full stack developer: I wrote both the front end and the back end, and worked with the relevant departments to agree requirements and workflow.",
      "built": [
        "Gathered requirements from the departments involved and turned them into the application flow.",
        "Built the programme application and programme selection interface, with progress tracking for applicants.",
        "Built the system with Laravel 8, Livewire and MySQL using an MVC structure."
      ],
      "result": "Digitized the admission process and improved the workflow with input from the departments involved.",
      "tech": "Laravel handles routing, validation and business rules. Livewire powers the interactive application pages. MySQL stores applicant and programme data.",
      "captions": [
        "Programme application interface preview"
      ]
    },
    "banner-studio": {
      "title": "Social Banner Studio",
      "meta": "Creative tool · Personal project",
      "summary": "Create animated social overlays without starting from a blank timeline.",
      "scale": "Personal project",
      "role": "Designed and built it solo",
      "problem": "Common social animations should be quick to make. I built a template-based editor for follow banners, subscribe buttons, profile cards, comments, chat conversations, and push notifications.",
      "how": [
        [
          "Choose",
          "Instagram, YouTube, or WhatsApp and pick a template."
        ],
        [
          "Customize",
          "the text, avatar, theme, and background."
        ],
        [
          "Preview",
          "pause, replay, or scrub through the animation."
        ],
        [
          "Export",
          "a PNG frame or choose MP4, MOV, or WebM video."
        ]
      ],
      "note": {
        "q": "Built for repeat use",
        "a": "Save projects, create copies, and return to a local draft. WhatsApp conversation templates include group conversations, sender details, and large emoji replies. Export is 30 fps video, or PNG of the complete view or current frame. PNG supports transparency; video uses a green screen when a transparent background is selected."
      },
      "metricText": "templates across 3 platforms, exporting PNG and video.",
      "captions": [
        "Platform templates, live preview & export"
      ]
    }
  },
  "experience": [
    {
      "period": "OCT 2026 — PRESENT",
      "company": "NewPages Network Sdn Bhd",
      "title": "Full Stack Developer",
      "summary": "Build full-stack business systems across frontend, backend, database and deployment, and design AI automations on OpenClaw.",
      "wins": [
        "Part of the early core OpenClaw research team, writing custom skills and tool integrations.",
        "Built the pre-launch Website Checker: it runs in the background through the internal system's API, 3 sites at a time on an entry-level Mac mini, raising throughput from 1 to 6 websites per 30 minutes and leaving people to review the reports.",
        "Delivered the Competitor Research workflow used at the 2026 company seminar, generating 500+ reports for small businesses.",
        "Integrated CLIProxyAPI to cut AI usage cost for the company system serving 10,000+ customers.",
        "Led the Auto Upload Products project: Codex drafts product listings from a customer's website or documents and uploads them through the system's API. One product takes about 10 seconds, replacing about half a month of manual copying per customer."
      ]
    },
    {
      "period": "JUL 2025 — SEP 2026",
      "company": "NewPages Network Sdn Bhd",
      "title": "PHP Developer",
      "summary": "Delivered internal platforms and CMS plugins using PHP, JavaScript, MySQL and custom MVC.",
      "wins": [
        "Built the entire backend of the Employee Reward Shop (PHP 8.1, MariaDB), replacing PDF and Excel reward handling company-wide.",
        "Built the entire backend of the CustomGPT Library, bringing scattered prompts, skills, CustomGPTs and tools into one internal system.",
        "Maintained and modernized legacy PHP 5.6 / 8.1 systems (Leave and Announcement) and added a daily calendar email.",
        "Optimized database queries and fixed SQL injection and XSS risks in legacy modules."
      ]
    },
    {
      "period": "MAR 2025 — MAY 2025",
      "company": "Alva Production",
      "title": "iOS App Developer (Internship)",
      "summary": "Developed a modular Flutter planning app for film-production teams.",
      "wins": [
        "Created reusable widgets and organised app state cleanly.",
        "Wrote tests, debugged issues and collaborated remotely with the team."
      ]
    },
    {
      "period": "JUN 2022 — JUL 2023",
      "company": "Southern University College",
      "title": "PHP → Full Stack Developer",
      "summary": "Built web systems for the university while completing my studies.",
      "wins": [
        "Built the Online Admission System from scratch with the departments involved.",
        "Built the Open Day system, and redesigned and migrated the university website.",
        "Maintained WordPress sites and supported campus technology and major events."
      ]
    }
  ],
  "skills": [
    {
      "group": "Backend & systems",
      "items": [
        [
          "PHP 5.6 / 8+",
          "Reward Shop and Library backends, Leave system"
        ],
        [
          "Laravel 8 · Livewire",
          "Online Admission System"
        ],
        [
          "Custom MVC",
          "Company internal systems"
        ],
        [
          "MySQL · MariaDB",
          "All PHP projects"
        ],
        [
          "RESTful API",
          "OpenClaw and CLIProxyAPI integrations"
        ],
        [
          "WordPress",
          "University websites and CMS plugins"
        ]
      ]
    },
    {
      "group": "Interfaces & applications",
      "items": [
        [
          "HTML · CSS · JavaScript",
          "Admission System, Internal System, side project, this site"
        ],
        [
          "Flutter",
          "Alva Production planning app"
        ]
      ]
    },
    {
      "group": "AI & automation",
      "items": [
        [
          "OpenClaw · AI Agents",
          "Website Checker, Competitor Research, Reviews, Leads"
        ]
      ]
    },
    {
      "group": "Reliability & operations",
      "items": [
        [
          "Secure Coding",
          "SQL injection and XSS fixes in legacy systems"
        ],
        [
          "Database Optimization",
          "Query tuning in internal systems"
        ],
        [
          "IIS / Windows Server",
          "Deployment"
        ]
      ]
    }
  ],
  "education": [
    {
      "period": "2023 — 2025",
      "level": "Degree",
      "name": "Bachelor of Software Engineering (Hons)",
      "school": "Southern University College",
      "cgpa": "3.82",
      "honours": "First Class Honours · Dean's List 2024/2025"
    },
    {
      "period": "2020 — 2022",
      "level": "Diploma",
      "name": "Diploma in Information Technology",
      "school": "Southern University College",
      "cgpa": "3.61",
      "honours": "Dean's List 2022/2023"
    }
  ]
};
