/**
 * Automated test suite for backend contact integration.
 * Tests input validation, error handling, Nodemailer configuration,
 * and security masking without requiring real SMTP credentials.
 */

const assert = require("assert");
const express = require("express");
const contactRouter = require("./routes/contact");
const { createTransporter } = require("./utils/mailer");

// Mock environment variables for testing
process.env.MAIL_USER = "portfolio.owner@gmail.com";
process.env.MAIL_PASS = "mock-app-password";
process.env.MAIL_TO = "portfolio.owner@gmail.com";

let testsPassed = 0;
let testsFailed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`✓ PASS: ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`✗ FAIL: ${name}`);
    console.error("  ", err.message);
    testsFailed++;
  }
}

async function runAsyncTest(name, fn) {
  try {
    await fn();
    console.log(`✓ PASS: ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`✗ FAIL: ${name}`);
    console.error("  ", err.message);
    testsFailed++;
  }
}

async function main() {
  console.log("\n==========================================");
  console.log("RUNNING BACKEND CONTACT FORM TEST SUITE");
  console.log("==========================================\n");

  // Setup Express server on ephemeral port
  const app = express();
  app.use(express.json());
  app.use("/contact", contactRouter);

  const server = await new Promise((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });

  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}/contact`;

  async function postJson(payload) {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.json();
    return { status: res.status, body };
  }

  try {
    // 1. Validation Tests
    await runAsyncTest("Rejects empty payload with HTTP 400", async () => {
      const res = await postJson({});
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.message, "Please provide your name.");
    });

    await runAsyncTest("Rejects missing name with HTTP 400", async () => {
      const res = await postJson({
        email: "test@example.com",
        subject: "Test Subject",
        message: "This is a valid message.",
      });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.message, "Please provide your name.");
    });

    await runAsyncTest("Rejects invalid email format with HTTP 400", async () => {
      const res = await postJson({
        name: "Shivam Rai",
        email: "not-an-email",
        subject: "Project Inquiry",
        message: "Hello, I want to discuss a project.",
      });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.message, "Please provide a valid email address.");
    });

    await runAsyncTest("Rejects missing subject with HTTP 400", async () => {
      const res = await postJson({
        name: "Shivam Rai",
        email: "visitor@example.com",
        subject: "   ",
        message: "Hello, I want to discuss a project.",
      });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.message, "Please provide a subject.");
    });

    await runAsyncTest("Rejects message shorter than 10 characters with HTTP 400", async () => {
      const res = await postJson({
        name: "Shivam Rai",
        email: "visitor@example.com",
        subject: "Inquiry",
        message: "Hi",
      });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.message, "Message must be at least 10 characters long.");
    });

    await runAsyncTest("Rejects oversized message (>5000 chars) with HTTP 400", async () => {
      const res = await postJson({
        name: "Shivam Rai",
        email: "visitor@example.com",
        subject: "Inquiry",
        message: "a".repeat(5001),
      });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.message, "Message cannot exceed 5000 characters.");
    });

    // 2. Transporter & Security Configuration Test
    runTest("Nodemailer transporter configures host, port, secure properly", () => {
      process.env.MAIL_HOST = "smtp.gmail.com";
      process.env.MAIL_PORT = "465";
      process.env.MAIL_SECURE = "true";
      process.env.MAIL_USER = "raishivamrai837@gmail.com";
      process.env.MAIL_PASS = "samplepassword12";

      const transporter = createTransporter();
      assert.strictEqual(transporter.options.host, "smtp.gmail.com");
      assert.strictEqual(transporter.options.port, 465);
      assert.strictEqual(transporter.options.secure, true);
      assert.strictEqual(transporter.options.auth.user, "raishivamrai837@gmail.com");
      assert.strictEqual(transporter.options.auth.pass, "samplepassword12");
    });

    // 3. Error Masking & Security Test
    await runAsyncTest("Masks internal SMTP error and returns generic HTTP 500 without leaking secrets", async () => {
      // Intentionally invalid credentials to test failure handling
      process.env.MAIL_USER = "test@gmail.com";
      process.env.MAIL_PASS = "invalid-pass";

      const res = await postJson({
        name: "John Doe",
        email: "john@example.com",
        subject: "Freelance Project",
        message: "I would like to discuss building a website for our business.",
      });

      assert.strictEqual(res.status, 500);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(
        res.body.message,
        "Unable to send your message right now. Please try again later."
      );
      // Ensure no secrets leaked
      const jsonStr = JSON.stringify(res.body);
      assert.ok(!jsonStr.includes("invalid-pass"));
      assert.ok(!jsonStr.includes("SMTP"));
    });

    // 4. Successful Delivery & Reply-To Verification Test
    await runAsyncTest("Successful send returns HTTP 200 and passes visitor email as replyTo", async () => {
      const nodemailer = require("nodemailer");
      const originalCreateTransport = nodemailer.createTransport;
      let capturedMailOptions = null;

      // Mock createTransport to capture sendMail options
      nodemailer.createTransport = () => ({
        sendMail: async (options) => {
          capturedMailOptions = options;
          return { messageId: "<test-id@domain.com>", response: "250 OK" };
        },
      });

      try {
        process.env.MAIL_USER = "owner@gmail.com";
        process.env.MAIL_PASS = "valid-app-pass";
        process.env.MAIL_TO = "owner@gmail.com";

        const res = await postJson({
          name: "Alice Johnson",
          email: "alice@company.com",
          subject: "Full-Stack Opportunity",
          message: "We loved your portfolio and would like to schedule an interview.",
        });

        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.success, true);
        assert.strictEqual(res.body.message, "Your message has been sent successfully.");

        assert.ok(capturedMailOptions, "sendMail should have been called");
        assert.strictEqual(capturedMailOptions.replyTo, "alice@company.com", "replyTo must be visitor's email");
        assert.strictEqual(capturedMailOptions.to, "owner@gmail.com");
        assert.strictEqual(capturedMailOptions.subject, "Portfolio Contact: Full-Stack Opportunity");
        assert.ok(capturedMailOptions.text.includes("Alice Johnson"));
        assert.ok(capturedMailOptions.text.includes("alice@company.com"));
        assert.ok(capturedMailOptions.html.includes("Alice Johnson"));
      } finally {
        nodemailer.createTransport = originalCreateTransport;
      }
    });

  } finally {
    server.close();
  }

  console.log("\n==========================================");
  console.log(`RESULTS: ${testsPassed} passed, ${testsFailed} failed`);
  console.log("==========================================\n");

  if (testsFailed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
