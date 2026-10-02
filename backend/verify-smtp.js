require("dotenv").config();
const { createTransporter } = require("./utils/mailer");

async function verifySmtpConnection() {
  console.log("\n==========================================");
  console.log("GMAIL SMTP CREDENTIALS & CONNECTION VERIFIER");
  console.log("==========================================\n");

  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  const host = process.env.MAIL_HOST || "smtp.gmail.com";
  const port = process.env.MAIL_PORT || 465;

  console.log(`Checking configuration:`);
  console.log(`- MAIL_HOST : ${host}`);
  console.log(`- MAIL_PORT : ${port}`);
  console.log(`- MAIL_USER : ${user ? user : "[NOT SET]"}`);
  console.log(`- MAIL_PASS : ${pass ? (pass.includes("your-") ? "[PLACEHOLDER DETECTED]" : "[CONFIGURED]") : "[NOT SET]"}`);
  console.log(`- MAIL_TO   : ${process.env.MAIL_TO || "[NOT SET]"}\n`);

  if (!user || !pass || pass.includes("your-") || pass.includes("mock-")) {
    console.warn("⚠️  WARNING: MAIL_USER or MAIL_PASS contains a placeholder or is missing in .env.");
    console.warn("👉 To fix this:");
    console.warn("   1. Open Google Account Security: https://myaccount.google.com/security");
    console.warn("   2. Ensure 2-Step Verification is turned ON.");
    console.warn("   3. Go to 'App passwords' (search for 'App passwords' in the search bar if not visible).");
    console.warn("   4. Create an App password for 'Portfolio Backend'.");
    console.warn("   5. Copy the 16-character code into backend/.env as MAIL_PASS=xxxx xxxx xxxx xxxx");
    console.warn("   6. Run this command again: npm run verify\n");
    process.exit(1);
  }

  try {
    const transporter = createTransporter();
    console.log("Testing connection to Gmail SMTP server...");
    await transporter.verify();
    console.log("✅ SUCCESS! Gmail SMTP credentials are valid and ready to send emails.");
    process.exit(0);
  } catch (error) {
    console.error("❌ SMTP Verification Failed!");
    console.error("Error message:", error.message);
    if (error.message.includes("BadCredentials") || error.message.includes("Username and Password not accepted") || error.code === "EAUTH") {
      console.error("\n👉 Tip: Google rejected the credentials.");
      console.error("   Ensure you are using a 16-character Google App Password, NOT your regular Gmail account password.");
      console.error("   Generate one at: https://myaccount.google.com/apppasswords");
    }
    process.exit(1);
  }
}

verifySmtpConnection();
