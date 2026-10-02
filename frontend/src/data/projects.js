export const projects = [
  {
    slug: "ai-helpdesk",
    title: "AI Helpdesk & Ticket Management System",
    eyebrow: "Full Stack & AI Integration",
    shortDescription:
      "An AI-powered customer support platform that converts incoming customer emails into support tickets and uses AI to classify, prioritize, analyze, and assist with responses.",
    technologies: [
      "PHP",
      "Laravel",
      "PostgreSQL",
      "Gemini AI",
      "Redis",
      "Laravel Horizon",
      "Docker",
      "IMAP",
      "SMTP",
      "Tailwind CSS",
    ],
    github: "https://github.com/raiShivam8/AI-Helpdesk",
    liveDemo: "https://ai-helpdesk-36ef.onrender.com/login",
    featured: true,
    overview:
      "AI Helpdesk is a customer support and ticket management application designed to process incoming customer emails and turn them into structured support tickets.\n\nThe system uses AI to analyze ticket content and assist support agents with classification, priority detection, sentiment analysis, and suggested responses.",
    keyFeatures: [
      {
        title: "Email → Ticket",
        description: "Incoming customer emails are processed and converted into support tickets.",
      },
      {
        title: "AI Classification",
        description: "Gemini AI analyzes incoming ticket content.",
      },
      {
        title: "Priority Detection",
        description: "The system helps identify ticket priority.",
      },
      {
        title: "Sentiment Analysis",
        description: "AI analyzes customer sentiment.",
      },
      {
        title: "Suggested Replies",
        description: "AI assists support agents by generating suggested responses.",
      },
      {
        title: "Agent Dashboard",
        description: "Agents can view and manage tickets through the dashboard.",
      },
      {
        title: "Authentication & Authorization",
        description: "Role-based access and protected application areas.",
      },
      {
        title: "Background Processing",
        description: "Redis and Laravel Horizon are used for background processing.",
      },
      {
        title: "Email Integration",
        description: "IMAP is used for incoming email processing and SMTP for outgoing email functionality.",
      },
    ],
    workflowSteps: [
      { step: "01", name: "Customer Email", desc: "Customer sends support request via email" },
      { step: "02", name: "Email Server / IMAP", desc: "Incoming emails fetched securely via IMAP" },
      { step: "03", name: "Laravel Backend", desc: "Parses email metadata, sender identity, and message body" },
      { step: "04", name: "Ticket Creation", desc: "Structured ticket record initialized in PostgreSQL" },
      { step: "05", name: "Gemini AI Analysis", desc: "Executes automated classification, priority & sentiment detection" },
      { step: "06", name: "Suggested Reply", desc: "Contextual AI response drafted for review" },
      { step: "07", name: "Database Persistence", desc: "Stored with state tracking in PostgreSQL" },
      { step: "08", name: "Agent Dashboard", desc: "Support agents view ticket with AI insights" },
      { step: "09", name: "Agent Response", desc: "Agent approves or edits reply sent via SMTP" },
      { step: "10", name: "Customer Receives", desc: "Resolution delivered back to customer inbox" },
    ],
    contribution:
      "Worked on the full-stack functionality of the application, including Laravel backend development, database integration, authentication and authorization, email processing, AI/API integration, background processing, dashboard functionality, and deployment-related workflows.\n\nWorked with PostgreSQL, Redis, Laravel Horizon, IMAP, SMTP, Docker, and Gemini AI as part of the application architecture.",
    challenges: [
      {
        title: "Incoming Email Processing",
        description: "Handling customer emails and converting email content into structured tickets reliably.",
      },
      {
        title: "AI Integration",
        description: "Connecting application workflows with AI services and handling AI-generated classification and assistance.",
      },
      {
        title: "Background Processing",
        description: "Using queues/background processing to handle work outside the main request cycle.",
      },
      {
        title: "Production Deployment",
        description: "Managing environment configuration and deployment for a production-oriented application.",
      },
    ],
    learnings: [
      "Building production-oriented Laravel applications.",
      "Working with PostgreSQL in a real application.",
      "Integrating AI into application workflows.",
      "Working with IMAP and SMTP.",
      "Understanding background processing with Redis and Laravel Horizon.",
      "Managing deployment environments.",
      "Designing application workflows before implementation.",
    ],
    screenshots: [
      {
        title: "Company Dashboard (Admin)",
        caption: "Centralized support operations overview, volume trends, and ticket metrics",
        image: "/images/projects/ai-helpdesk/dashboard.png",
      },
      {
        title: "Agent Dashboard",
        caption: "Real-time agent support operations overview and queue monitoring",
        image: "/images/projects/ai-helpdesk/agent-dashboard.png",
      },
      {
        title: "Support Ticket Queue",
        caption: "Categorized, searchable, and filterable incoming support tickets queue",
        image: "/images/projects/ai-helpdesk/ticket-list.png",
      },
      {
        title: "Ticket Details & Thread",
        caption: "Complete customer conversation thread, ticket status, and AI resolution notes",
        image: "/images/projects/ai-helpdesk/ticket-details.png",
      },
      {
        title: "AI Ticket Summary & Analysis",
        caption: "AI-generated ticket summary, issue extraction, and suggested next steps",
        image: "/images/projects/ai-helpdesk/ai-analysis.png",
      },
      {
        title: "Authentication Portal",
        caption: "Secure role-protected entry point with quick-access demo login",
        image: "/images/projects/ai-helpdesk/authentication.png",
      },
      {
        title: "User Management & Permissions",
        caption: "Staff roles, permissions, customer directory, and access administration",
        image: "/images/projects/ai-helpdesk/users-management.png",
      },
    ],
  },
  {
    slug: "mycart",
    title: "MyCart — MERN Ecommerce Platform",
    eyebrow: "Full Stack Ecommerce",
    shortDescription:
      "A full-stack ecommerce application built with React, Node.js, Express.js, and MongoDB, featuring authentication, role-based access, product management, cart functionality, checkout, and email integration.",
    technologies: [
      "React",
      "Vite",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MongoDB Atlas",
      "JWT",
      "Context API",
      "Brevo",
      "Vercel",
      "Render",
    ],
    github: "https://github.com/raiShivam8/mycart-mern-ecommerce",
    liveDemo: "https://mycart-one.vercel.app/",
    backendUrl: "https://mycart-mern-ecommerce.onrender.com",
    featured: true,
    overview:
      "A full-stack ecommerce application built with React, Node.js, Express.js, and MongoDB, featuring authentication, role-based access, product management, cart functionality, checkout, and email integration.",
    keyFeatures: [
      {
        title: "Authentication",
        description: "JWT-based authentication.",
      },
      {
        title: "Role-Based Access",
        description: "Different access levels for users and administrators.",
      },
      {
        title: "Product Management",
        description: "Admin functionality for managing products.",
      },
      {
        title: "Shopping Cart",
        description: "Cart functionality using React state management.",
      },
      {
        title: "Checkout",
        description: "Order/checkout functionality.",
      },
      {
        title: "Email Integration",
        description: "Email functionality using Brevo.",
      },
      {
        title: "Responsive Interface",
        description: "Responsive ecommerce interface.",
      },
      {
        title: "Context API",
        description: "Used for cart and theme state management.",
      },
    ],
    workflowSteps: [
      { step: "01", name: "React Frontend", desc: "Interactive customer storefront & catalog built with React" },
      { step: "02", name: "REST API", desc: "Structured HTTP endpoints connecting frontend and backend" },
      { step: "03", name: "Node.js / Express", desc: "Server handling business logic, validation, and request routing" },
      { step: "04", name: "Authentication (JWT)", desc: "Role validation differentiating buyers from admin users" },
      { step: "05", name: "Products / Orders", desc: "Cart calculations, order creation, and stock updates" },
      { step: "06", name: "MongoDB Atlas", desc: "NoSQL document persistence for users, products, and orders" },
      { step: "07", name: "Email Service (Brevo)", desc: "Automated transaction receipts and order notifications" },
    ],
    contribution:
      "Worked across the frontend and backend of the ecommerce application, including React UI development, REST API integration, authentication, role-based access, database integration, cart functionality, checkout flow, email integration, and deployment.",
    challenges: [
      {
        title: "Authentication and authorization",
        description: "Implementing secure JWT authentication, session handling, and role validation.",
      },
      {
        title: "Frontend/backend integration",
        description: "Connecting asynchronous REST APIs with React client states and error boundaries.",
      },
      {
        title: "Context API state management",
        description: "Synchronizing cart items, user profile state, and persistent theme changes.",
      },
      {
        title: "Admin functionality",
        description: "Building protected routes and interfaces for inventory and product management.",
      },
      {
        title: "Checkout workflow",
        description: "Managing multi-step order flow, validation, and confirmation notifications.",
      },
      {
        title: "Deployment configuration",
        description: "Configuring CORS and hosting frontend on Vercel and backend on Render.",
      },
    ],
    learnings: [
      "Building a complete MERN application.",
      "Working with JWT authentication.",
      "Implementing role-based access.",
      "Managing application state with Context API.",
      "Integrating frontend and backend APIs.",
      "Working with MongoDB Atlas.",
      "Deploying frontend and backend separately.",
    ],
    screenshots: [
      {
        title: "Storefront & Products",
        caption: "Hero banner carousel with best deals and categorized product catalog with brand filter",
        image: "/images/projects/mycart/storefront-products-50-50.png",
        splitImages: [
          { image: "/images/projects/mycart/storefront-hero.png", label: "Storefront Hero" },
          { image: "/images/projects/mycart/products.png", label: "Products Catalog" },
        ],
      },
      {
        title: "Shopping Cart",
        caption: "Dynamic cart drawer with item quantity controls and real-time total calculation",
        image: "/images/projects/mycart/cart.png",
      },
      {
        title: "Checkout Flow",
        caption: "Customer shipping details, cash on delivery option, and instant order placement",
        image: "/images/projects/mycart/checkout.png",
      },
      {
        title: "Admin Management",
        caption: "Live ecommerce dashboard with revenue analytics, order stats, and user monitoring",
        image: "/images/projects/mycart/dashboard.png",
      },
      {
        title: "User Authentication",
        caption: "Secure credential authentication and customer registration with role verification",
        image: "/images/projects/mycart/authentication.png",
        splitImages: [
          { image: "/images/projects/mycart/login.png", label: "User Login" },
          { image: "/images/projects/mycart/register.png", label: "User Registration" },
        ],
      },
    ],
  },
];
