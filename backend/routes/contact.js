const express = require("express");
const mongoose = require("mongoose");
const { sendContactEmail } = require("../utils/mailer");

const router = express.Router();

// Strict email regex (RFC 5322 compatible basic check)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Ensure schema matches existing database structure for backwards compatibility
let Userdata;
try {
  Userdata = mongoose.model("Userdata");
} catch (e) {
  const userSchema = new mongoose.Schema({
    Name: { type: String, trim: true },
    Phone: { type: Number },
    Email: { type: String, trim: true, lowercase: true },
    Subject: { type: String, trim: true },
    Message: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
  });
  Userdata = mongoose.model("Userdata", userSchema);
}

/**
 * Validates incoming contact form submission.
 * Returns an error message string if invalid, or null if valid.
 */
function validateContactInput({ name, email, subject, message, phone }) {
  if (!name || typeof name !== "string" || !name.trim()) {
    return "Please provide your name.";
  }
  if (name.trim().length > 100) {
    return "Name cannot exceed 100 characters.";
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    return "Please provide your email address.";
  }
  if (email.trim().length > 254) {
    return "Email address cannot exceed 254 characters.";
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return "Please provide a valid email address.";
  }

  if (!subject || typeof subject !== "string" || !subject.trim()) {
    return "Please provide a subject.";
  }
  if (subject.trim().length > 200) {
    return "Subject cannot exceed 200 characters.";
  }

  if (!message || typeof message !== "string" || !message.trim()) {
    return "Please provide a message.";
  }
  if (message.trim().length < 10) {
    return "Message must be at least 10 characters long.";
  }
  if (message.trim().length > 5000) {
    return "Message cannot exceed 5000 characters.";
  }

  if (phone && String(phone).trim().length > 30) {
    return "Phone number is too long.";
  }

  return null;
}

/**
 * POST /contact
 * Handles contact form submissions:
 * 1. Validates input
 * 2. Optionally stores message in MongoDB (if connected)
 * 3. Sends notification email via Gmail SMTP
 * 4. Returns standardized JSON response
 */
router.post("/", async (req, res) => {
  // Support both lowercase and capitalized property names for compatibility
  const rawBody = req.body || {};
  const name = typeof rawBody.name === "string" ? rawBody.name.trim() : typeof rawBody.Name === "string" ? rawBody.Name.trim() : "";
  const email = typeof rawBody.email === "string" ? rawBody.email.trim() : typeof rawBody.Email === "string" ? rawBody.Email.trim() : "";
  const subject = typeof rawBody.subject === "string" ? rawBody.subject.trim() : typeof rawBody.Subject === "string" ? rawBody.Subject.trim() : "";
  const message = typeof rawBody.message === "string" ? rawBody.message.trim() : typeof rawBody.Message === "string" ? rawBody.Message.trim() : "";
  const phone = rawBody.phone !== undefined ? rawBody.phone : rawBody.Phone !== undefined ? rawBody.Phone : undefined;

  // 1. Validation
  const validationError = validateContactInput({ name, email, subject, message, phone });
  if (validationError) {
    return res.status(400).json({
      success: false,
      message: validationError,
    });
  }

  // 2. Database persistence (preserves existing MongoDB functionality)
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    try {
      const parsedPhone = phone ? Number(String(phone).replace(/\D/g, "")) || undefined : undefined;
      await Userdata.create({
        Name: name,
        Phone: parsedPhone,
        Email: email,
        Subject: subject,
        Message: message,
      });
    } catch (dbErr) {
      // Log DB error for internal review without breaking email delivery
      console.error("[MongoDB Warning] Failed to save message to database:", dbErr.message);
    }
  }

  // 3. Send email via Nodemailer Gmail SMTP
  try {
    await sendContactEmail({ name, email, subject, message, phone });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (mailErr) {
    // Log internal error on server side
    console.error("[Email Error] Failed to send contact email:", mailErr.message);

    return res.status(500).json({
      success: false,
      message: "Unable to send your message right now. Please try again later.",
      errorDetails: mailErr.message,
    });
  }
});

/**
 * GET /contact/diagnose
 * Diagnostic endpoint to check environment variables and SMTP status.
 */
router.get("/diagnose", async (req, res) => {
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  const host = process.env.MAIL_HOST || "smtp.gmail.com";
  const port = Number(process.env.MAIL_PORT) || 465;

  const status = {
    hasMailUser: Boolean(user),
    mailUserMasked: user ? `${user.substring(0, 3)}...${user.slice(-10)}` : null,
    hasMailPass: Boolean(pass),
    mailPassLength: pass ? pass.length : 0,
    mailHost: host,
    mailPort: port,
    nodeEnv: process.env.NODE_ENV,
    frontendUrl: process.env.FRONTEND_URL,
    timestamp: new Date().toISOString(),
  };

  if (!user || !pass) {
    return res.status(500).json({
      success: false,
      diagnostic: status,
      error: "Missing MAIL_USER or MAIL_PASS in environment variables.",
    });
  }

  try {
    const { createTransporter } = require("../utils/mailer");
    const transporter = createTransporter();
    await transporter.verify();
    return res.status(200).json({
      success: true,
      diagnostic: status,
      smtpConnection: "Connected successfully to Gmail SMTP!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      diagnostic: status,
      smtpConnectionError: err.message,
      code: err.code,
    });
  }
});

module.exports = router;
