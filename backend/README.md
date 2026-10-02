# Portfolio Backend — Contact API & Gmail SMTP Integration

Node.js / Express backend service handling contact form submissions for the portfolio with Nodemailer Gmail SMTP delivery and optional MongoDB persistence.

---

## Features

- **`POST /contact`**: Validates visitor submission (name, email, subject, message, optional phone).
- **Gmail SMTP Integration**: Direct email delivery using Nodemailer and Gmail App Password authentication.
- **Reply-To Direct Routing**: Automatically sets `replyTo` to the visitor's email so you can reply directly from your Gmail inbox.
- **Security & Privacy**:
  - Credentials remain strictly server-side in `.env` (never exposed to React/Vite).
  - Internal SMTP error codes are masked behind a friendly generic error message for visitors.
  - CORS strictly configured to whitelist your portfolio frontend.
- **Database Persistence (Optional)**: If `MONGO_URI` is provided, inquiries are also backed up in MongoDB Atlas (`Userdata` collection).

---

## Environment Variables Configuration

Create a `.env` file inside the `backend/` folder based on `.env.example`:

```env
# Server Configuration
PORT=1268
NODE_ENV=development

# Frontend Whitelist (No trailing slash)
FRONTEND_URL=https://raishivam8.github.io

# Optional MongoDB URI
# MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority

# Gmail SMTP Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USER=raishivamrai837@gmail.com
MAIL_PASS=your-16-character-gmail-app-password
MAIL_TO=raishivamrai837@gmail.com
```

> **IMPORTANT**: Never commit `.env` to GitHub. The `.gitignore` file is already set up to ignore `.env`.

---

## How to Generate a Gmail App Password

Google requires an **App Password** when sending emails through third-party servers like Nodemailer:

1. Go to your Google Account: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Under "How you sign in to Google", ensure **2-Step Verification** is turned **ON**.
3. In the search bar at the top of the Google Account page, search for **"App passwords"** (or visit [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)).
4. Enter an app name (e.g. `Portfolio Backend`) and click **Create**.
5. Google will display a **16-character password** (e.g. `abcd efgh ijkl mnop`).
6. Copy this 16-character password and paste it as `MAIL_PASS` in your `backend/.env` file:
   ```env
   MAIL_PASS=abcdefghijklmnop
   ```
   *(Spaces can be kept or removed; Nodemailer supports both).*
7. **Never share or commit this password.**

---

## Local Development & Testing

### 1. Install dependencies
```bash
npm install
```

### 2. Verify Gmail SMTP credentials
Before running the server, test if your Gmail App Password connects successfully:
```bash
npm run verify
```

### 3. Run automated tests (Unit & integration validation)
```bash
npm test
```

### 4. Start the backend server
```bash
# Production mode
npm start

# Development mode (with auto-restart)
npm run dev
```

The server will start at `http://localhost:1268`.

---

## Production Deployment (e.g. Render)

The backend is configured for deployment on platforms like Render (`raiShivam8/portfolio-backend-render`):

1. **Build Command**: `npm install`
2. **Start Command**: `node Server.js`
3. **Environment Variables**: Add all environment variables in your Render Service Dashboard:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (or leave default, Render sets `PORT` automatically)
   - `FRONTEND_URL` = `https://raishivam8.github.io`
   - `MAIL_HOST` = `smtp.gmail.com`
   - `MAIL_PORT` = `465`
   - `MAIL_SECURE` = `true`
   - `MAIL_USER` = `raishivamrai837@gmail.com`
   - `MAIL_PASS` = `<your-16-char-gmail-app-password>`
   - `MAIL_TO` = `raishivamrai837@gmail.com`
   - `MONGO_URI` = *(optional connection string if using MongoDB)*

---

## Post-Deployment Checklist

- [ ] Backend `/health` endpoint responds with `{ "status": "ok" }`.
- [ ] Submit a test message on your live portfolio at `https://raishivam8.github.io`.
- [ ] Check `raishivamrai837@gmail.com` to confirm email receipt.
- [ ] Hit **Reply** in Gmail and confirm the reply target is the visitor's email address.
