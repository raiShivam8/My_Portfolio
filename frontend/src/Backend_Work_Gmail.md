# PORTFOLIO CONTACT FORM — GMAIL EMAIL INTEGRATION

## Objective

I have a React/Vite portfolio frontend and an existing Node.js/Express backend.

I want the portfolio Contact Form to work like this:

Visitor fills in:

* Name
* Email
* Subject
* Message

When the visitor submits the form:

1. React sends the form data to the Express backend.
2. Express validates the data.
3. Express sends an email to my Gmail inbox.
4. The email should contain the visitor's name, email, subject, and message.
5. The visitor should receive a clear success or error message on the portfolio.
6. Gmail credentials/API secrets must NEVER be exposed in the React frontend.

---

# IMPORTANT — INSPECT THE EXISTING PROJECT FIRST

Before changing anything:

1. Inspect the existing React/Vite portfolio project.
2. Inspect the existing Node.js/Express backend.
3. Find the existing Contact component/form.
4. Find the existing `/contact` API endpoint if it already exists.
5. Check the current frontend API configuration.
6. Check the current backend environment configuration.
7. Reuse existing functionality wherever possible.
8. Do NOT create duplicate backend servers or duplicate contact endpoints.
9. Do NOT unnecessarily rewrite existing React components.

Existing backend information:

* Backend repository: `raiShivam8/portfolio-backend-render`
* Backend technology: Node.js + Express.js
* Database: MongoDB/Mongoose may already be configured.
* Existing contact endpoint: `POST /contact`
* Existing contact fields:

  * Name
  * Phone
  * Email
  * Subject
  * Message

The current portfolio contact form may only need:

* Name
* Email
* Subject
* Message

If the existing backend supports Phone, preserve it if appropriate, but do not make the frontend unnecessarily complicated.

---

# REQUIRED EMAIL FLOW

Implement this architecture:

```text
Visitor
   ↓
React Contact Form
   ↓
POST /contact
   ↓
Express Backend
   ↓
Validate Input
   ↓
Send Email
   ↓
Gmail SMTP
   ↓
My Gmail Inbox
```

The visitor's email should NOT be used as the SMTP username.

The portfolio owner's Gmail account should be used as the sender/authentication account.

---

# EMAIL PROVIDER

Use Gmail SMTP with Nodemailer.

Install/use:

```bash
npm install nodemailer
```

Do not use the Gmail password directly.

Use a Gmail App Password or another secure Gmail authentication method supported by the implementation.

---

# ENVIRONMENT VARIABLES

All email credentials must be stored in the backend `.env`.

Example:

```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USER=your-gmail@gmail.com
MAIL_PASS=your-gmail-app-password
MAIL_TO=your-gmail@gmail.com
```

Important:

* `MAIL_USER` = Gmail account used to send the email.
* `MAIL_PASS` = Gmail App Password.
* `MAIL_TO` = Gmail inbox where portfolio messages should be received.

Never put these variables in React/Vite frontend environment variables.

Do NOT use:

```env
VITE_MAIL_USER=
VITE_MAIL_PASS=
VITE_GMAIL_PASSWORD=
```

because Vite frontend variables can become publicly accessible.

---

# BACKEND EMAIL IMPLEMENTATION

Create/reuse a mail utility such as:

```text
utils/mailer.js
```

or an appropriate existing backend structure.

Use Nodemailer.

Example architecture:

```js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE === "true",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export default transporter;
```

Adapt this to the existing backend's module system if it uses CommonJS.

---

# CONTACT API

Reuse the existing:

```text
POST /contact
```

endpoint.

The endpoint should:

1. Receive the form data.
2. Validate required fields.
3. Sanitize/normalize the input where appropriate.
4. Send the email.
5. Return a JSON response.

Expected successful response:

```json
{
  "success": true,
  "message": "Your message has been sent successfully."
}
```

Expected error response:

```json
{
  "success": false,
  "message": "Unable to send your message. Please try again."
}
```

Use appropriate HTTP status codes.

For validation errors use:

```text
400
```

For server/email failures use:

```text
500
```

---

# EMAIL CONTENT

The received Gmail email should be professional and easy to read.

Example:

```text
New Portfolio Contact Message

Name: John Smith
Email: john@example.com
Subject: Freelance Website Project

Message:
Hello Shivam,

I would like to discuss a website project.

Regards,
John
```

Email subject should preferably be:

```text
Portfolio Contact: {visitor subject}
```

For example:

```text
Portfolio Contact: Freelance Website Project
```

---

# REPLY-TO

Set the visitor's email as the email's `replyTo`.

Example:

```js
replyTo: visitorEmail
```

This is important because when I click Reply in Gmail, I should be able to reply directly to the person who submitted the portfolio form.

Do NOT set the visitor's email as the SMTP `from` address because Gmail may reject or alter it.

Use something like:

```js
from: process.env.MAIL_USER,
to: process.env.MAIL_TO,
replyTo: email,
```

---

# SECURITY

Implement basic security protections.

Requirements:

* Never expose Gmail credentials to React.
* Never log the Gmail password/app password.
* Do not return SMTP credentials in API responses.
* Validate email format.
* Validate required fields.
* Limit excessively large message input.
* Handle malformed requests safely.
* Do not expose internal SMTP errors to the visitor.
* Keep detailed errors in server logs only when appropriate.
* Do not commit `.env` to GitHub.

Make sure `.gitignore` contains:

```text
.env
.env.*
```

while preserving any existing safe environment files such as `.env.example`.

---

# FRONTEND CONTACT FORM

Inspect the existing Contact component.

Do not unnecessarily redesign it.

Connect the form submission to:

```text
POST /contact
```

The frontend should send JSON similar to:

```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "subject": "Freelance Website Project",
  "message": "I would like to discuss a website project."
}
```

Use the existing API configuration if one already exists.

Do not hardcode production API URLs throughout multiple components.

If the project already has an API utility/configuration, reuse it.

---

# FORM STATES

The Contact Form must have these states:

### Default

```text
Send Message
```

### Submitting

Disable the submit button and show:

```text
Sending...
```

Prevent duplicate submissions while the request is running.

### Success

Show a clear message such as:

```text
Message sent successfully! I'll get back to you soon.
```

Clear the form after a successful submission.

### Error

Show:

```text
Unable to send your message. Please try again.
```

Do not clear the user's form data when submission fails.

---

# FRONTEND VALIDATION

Validate:

### Name

Required.

### Email

Required and valid email format.

### Subject

Required.

### Message

Required.

Also enforce reasonable maximum lengths.

Show validation errors near the relevant fields.

Do not rely only on frontend validation. Backend validation is required as well.

---

# CORS

Inspect the existing Express CORS configuration.

Make sure the deployed portfolio frontend is allowed to call the backend.

Do not use:

```js
cors({ origin: "*" })
```

in production unless there is a specific reason.

Use the existing production frontend URL through an environment variable where appropriate.

Example:

```env
FRONTEND_URL=https://your-portfolio-domain.com
```

If the portfolio is hosted on GitHub Pages, configure the actual GitHub Pages URL.

Do not invent the URL. Inspect the existing project configuration.

---

# LOCAL DEVELOPMENT

Document the required `.env` configuration.

Example:

```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USER=your-gmail@gmail.com
MAIL_PASS=your-gmail-app-password
MAIL_TO=your-gmail@gmail.com
```

Then run the backend normally.

Do not include a real password or App Password anywhere in source code.

---

# GMAIL SETUP DOCUMENTATION

Create/update the project documentation with clear instructions explaining:

1. Enable 2-Step Verification on the Gmail account.
2. Create a Gmail App Password.
3. Use the generated App Password as `MAIL_PASS`.
4. Put the credentials in the backend `.env`.
5. Restart the backend after changing `.env`.

Never ask the user to put their normal Gmail password in `.env`.

---

# DEPLOYMENT

The backend is deployed separately from the React frontend.

Make sure the following environment variables are configured on the backend hosting platform:

```text
MAIL_HOST
MAIL_PORT
MAIL_SECURE
MAIL_USER
MAIL_PASS
MAIL_TO
FRONTEND_URL
```

Do NOT put email credentials into the frontend hosting platform unless that platform is actually hosting the backend.

After deployment:

1. Verify backend starts successfully.
2. Verify SMTP configuration.
3. Open the live portfolio.
4. Submit a test contact form.
5. Verify the email arrives in Gmail.
6. Click Reply in Gmail and verify it targets the visitor's email.
7. Test validation.
8. Test server failure.
9. Test duplicate submission prevention.
10. Confirm no credentials appear in browser DevTools or frontend JavaScript.

---

# IMPORTANT: DO NOT CREATE FAKE SUCCESS

The frontend must show success ONLY after the backend confirms that the email was successfully accepted by the mail transport.

Do NOT do this:

```js
setSuccess(true);
```

before the API request finishes successfully.

The correct flow is:

```text
Submit
 ↓
API request
 ↓
Backend sends email
 ↓
Backend returns success
 ↓
Frontend displays success
```

---

# ERROR HANDLING

If Gmail/SMTP fails:

Backend should log an appropriate server-side error.

Frontend should receive a generic message:

```text
Unable to send your message right now. Please try again later.
```

Do not expose errors such as:

```text
Invalid login
535 Authentication failed
SMTP password incorrect
```

to portfolio visitors.

---

# DATABASE

If the existing `/contact` endpoint already stores contact messages in MongoDB, preserve that functionality.

The final flow can be:

```text
React
 ↓
POST /contact
 ↓
Validate
 ↓
Save contact message to MongoDB
 ↓
Send email using Nodemailer
 ↓
Return success
```

If MongoDB storage already exists, do not remove it.

If it does not exist and adding it would be unnecessary for the current implementation, do not introduce a database requirement just for email.

The primary requirement is receiving portfolio contact messages through Gmail.

---

# FILE STRUCTURE

Adapt to the existing project instead of blindly creating files.

A possible structure is:

```text
portfolio/
├── src/
│   └── components/
│       └── Contact.jsx
│
└── backend/
    ├── routes/
    │   └── contact.js
    ├── utils/
    │   └── mailer.js
    ├── server.js
    ├── .env
    └── .env.example
```

Use the existing structure if it differs.

---

# TESTING CHECKLIST

After implementation, verify all of these:

### Frontend

* [ ] Contact form renders correctly.
* [ ] Name validation works.
* [ ] Email validation works.
* [ ] Subject validation works.
* [ ] Message validation works.
* [ ] Submit button shows loading state.
* [ ] Duplicate submission is prevented.
* [ ] Success message appears only after successful API response.
* [ ] Form resets after successful submission.
* [ ] Form data remains after failed submission.

### Backend

* [ ] `POST /contact` works.
* [ ] Required fields are validated.
* [ ] Email format is validated.
* [ ] Nodemailer is configured correctly.
* [ ] Gmail SMTP works.
* [ ] Visitor email is used as `replyTo`.
* [ ] Gmail receives the message.
* [ ] SMTP credentials are stored only in `.env`.
* [ ] `.env` is not committed.

### Production

* [ ] CORS allows the portfolio frontend.
* [ ] Production environment variables are configured.
* [ ] Live portfolio can submit the form.
* [ ] Gmail receives live submissions.
* [ ] Reply from Gmail goes to the visitor.
* [ ] No secrets appear in frontend source or browser DevTools.
* [ ] No console errors.
* [ ] No duplicate API endpoints were created.

---

# FINAL IMPLEMENTATION RULE

Do not just explain how to implement this.

Inspect the existing project and implement the complete working integration.

Preserve existing functionality.

Make the smallest clean changes necessary.

After implementation, provide:

1. Files changed.
2. What was changed in each file.
3. Required `.env` variables.
4. Gmail App Password setup instructions.
5. Local testing instructions.
6. Production deployment instructions.
7. Final test results.
8. Any issue that still requires manual action.

Do not expose or print any real secret values.
