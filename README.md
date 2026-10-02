# Shivam Rai — Portfolio Website

A personal portfolio built with React, Vite, Tailwind CSS, Lucide Icons, and an Express.js backend for contact form message delivery via Gmail SMTP.

---

## Architecture Overview

```text
Visitor on React Portfolio
         ↓
  [Contact Form]
         ↓
POST /contact (Express.js)
         ↓
Input Validation & Security Checks
         ↓
   ┌─────┴─────────────────────────┐
   ↓                               ↓
Nodemailer (Gmail SMTP)      MongoDB Atlas (Optional)
   ↓                               ↓
Email to Gmail Inbox          Record saved
```

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express, Nodemailer (Gmail SMTP), Mongoose (optional)
- **Deployment**:
  - Frontend: GitHub Pages ([https://raishivam8.github.io](https://raishivam8.github.io))
  - Backend: Render (`raiShivam8/portfolio-backend-render`)

---

## Project Structure

```text
portfolio/
├── frontend/                 # React + Vite + Tailwind CSS frontend
│   ├── src/
│   │   ├── components/       # React UI components (Contact, Hero, Projects, etc.)
│   │   ├── config/
│   │   │   └── api.js        # Frontend API client & base URL configuration
│   │   ├── App.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/                  # Express.js backend API
│   ├── routes/
│   │   └── contact.js        # POST /contact endpoint with validation
│   ├── utils/
│   │   └── mailer.js         # Nodemailer Gmail transport utility
│   ├── Server.js             # Main server entrypoint
│   ├── test-contact.js       # Test suite for contact API
│   ├── verify-smtp.js        # Gmail SMTP credentials connection checker
│   ├── package.json
│   ├── .env.example          # Sample environment variables
│   └── README.md             # Backend & Gmail setup documentation
├── package.json              # Root workspace convenience scripts
└── README.md
```

---

## Getting Started

### 1. Frontend Setup
From inside the `frontend/` directory (or use `npm run dev:frontend` from root):
```bash
cd frontend
npm install
npm run dev      # Vite dev server on http://localhost:5173
npm run build    # Production build
```

### 2. Backend Setup
See [backend/README.md](file:///d:/portfolio/backend/README.md) for full setup instructions:
```bash
cd backend
npm install
npm run dev     # Runs on http://localhost:1268 (or node Server.js)
npm test
npm run verify  # Verifies Gmail App Password
```

### 3. Root Workspace Commands
You can also run commands directly from the root `portfolio/` folder:
```bash
npm run dev            # Starts frontend
npm run dev:frontend   # Starts frontend
npm run dev:backend    # Starts backend
npm run install:all    # Installs dependencies for both frontend and backend
```

---

## Gmail Integration Setup

For detailed instructions on generating a **Google App Password** and configuring `.env`, refer to [backend/README.md](file:///d:/portfolio/backend/README.md).
