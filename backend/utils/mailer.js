const nodemailer = require("nodemailer");

/**
 * Creates and configures the Nodemailer transport for Gmail SMTP.
 * Credentials and settings are loaded from backend environment variables.
 */
function createTransporter() {
  const host = process.env.MAIL_HOST || "smtp.gmail.com";
  const port = Number(process.env.MAIL_PORT) || 465;
  const isSecure = process.env.MAIL_SECURE !== "false" && port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure, // true for port 465, false for 587
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    // Reasonable timeouts
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Helper to escape HTML characters in untrusted visitor input.
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Sends a portfolio contact message to the owner's Gmail inbox.
 *
 * @param {Object} options
 * @param {string} options.name - Visitor name
 * @param {string} options.email - Visitor email address
 * @param {string} options.subject - Message subject
 * @param {string} options.message - Message body
 * @param {string|number} [options.phone] - Optional phone number
 * @returns {Promise<Object>} Nodemailer send result
 */
async function sendContactEmail({ name, email, subject, message, phone }) {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error(
      "Missing email credentials. Please configure MAIL_USER and MAIL_PASS in backend .env."
    );
  }

  const transporter = createTransporter();
  const recipient = process.env.MAIL_TO || process.env.MAIL_USER;
  const sanitizedName = escapeHtml(name);
  const sanitizedEmail = escapeHtml(email);
  const sanitizedSubject = escapeHtml(subject);
  const sanitizedMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  const phoneText = phone ? `Phone: ${phone}\n` : "";
  const phoneHtml = phone
    ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 100px;">Phone:</td><td style="padding: 8px 0; color: #1e293b;">${escapeHtml(
        phone
      )}</td></tr>`
    : "";

  // Plain-text format matching the specification
  const textContent = [
    "New Portfolio Contact Message",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    phoneText,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
    "",
    "---",
    `Sent from Portfolio Contact Form at ${new Date().toUTCString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  // Rich HTML template with clean modern aesthetic
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <!-- Header -->
    <tr>
      <td style="padding: 28px 32px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #ffffff;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; opacity: 0.9;">Portfolio Inquiry</span>
        <h1 style="margin: 6px 0 0 0; font-size: 22px; font-weight: 700; line-height: 1.3; color: #ffffff;">New Contact Message</h1>
      </td>
    </tr>
    <!-- Sender Metadata -->
    <tr>
      <td style="padding: 24px 32px 16px 32px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 14px; line-height: 1.5;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 100px;">From:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${sanitizedName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${sanitizedEmail}" style="color: #2563eb; text-decoration: none;">${sanitizedEmail}</a></td>
          </tr>
          ${phoneHtml}
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Subject:</td>
            <td style="padding: 8px 0; color: #0f172a;">${sanitizedSubject}</td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- Divider -->
    <tr>
      <td style="padding: 0 32px;"><hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 0;" /></td>
    </tr>
    <!-- Message Body -->
    <tr>
      <td style="padding: 24px 32px;">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; margin-bottom: 12px;">Message Content</div>
        <div style="padding: 18px 20px; background-color: #f8fafc; border-left: 4px solid #2563eb; border-radius: 6px; font-size: 15px; line-height: 1.7; color: #334155; white-space: pre-wrap; font-family: inherit;">${sanitizedMessage}</div>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
        Tip: Hit <strong>Reply</strong> in Gmail to respond directly to <strong>${sanitizedEmail}</strong>.
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  // Send mail options
  const mailOptions = {
    // Show visitor's name in sender header, authenticate using portfolio owner's Gmail
    from: `"${name}" <${process.env.MAIL_USER}>`,
    to: recipient,
    // Crucial requirement: Reply goes directly to the visitor
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    text: textContent,
    html: htmlContent,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

module.exports = {
  createTransporter,
  sendContactEmail,
};
