const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contactRouter = require("./routes/contact");

const app = express();
const port = process.env.PORT || 1268;

// Allowed Origins for CORS
const allowedOrigins = [
  "https://raishivam8.github.io",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

if (process.env.FRONTEND_URL) {
  // Normalize by stripping trailing slash
  const customFrontend = process.env.FRONTEND_URL.replace(/\/+$/, "");
  if (!allowedOrigins.includes(customFrontend)) {
    allowedOrigins.push(customFrontend);
  }
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    // In development mode, allow localhost and any local origins
    if (process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes(origin.replace(/\/+$/, ""))) {
      return callback(null, true);
    }

    return callback(new Error("CORS policy: Not allowed by CORS for origin " + origin));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

// MongoDB Connection (preserves existing database functionality if URI is provided)
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✓ Connected to MongoDB Atlas"))
    .catch((err) => console.error("✗ MongoDB connection error:", err.message));
} else {
  console.log("ℹ No MONGO_URI provided; running without database persistence.");
}

// Health Check Endpoint (useful for Render deployment & uptime monitoring)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "portfolio-backend",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Portfolio Backend API is running.",
    contactEndpoint: "POST /contact",
  });
});

// Routes
app.use("/contact", contactRouter);

// Global Error Handler for JSON parsing or uncaught request errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Malformed JSON payload.",
    });
  }

  if (err.message && err.message.startsWith("CORS policy")) {
    return res.status(403).json({
      success: false,
      message: "Origin not allowed by CORS.",
    });
  }

  console.error("Unhandled Server Error:", err.message);
  return res.status(500).json({
    success: false,
    message: "An internal server error occurred.",
  });
});

// Start Server (only if not imported as a test module)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`✓ Server running on port ${port}`);
    console.log(`✓ Ready to handle POST /contact`);
  });
}

module.exports = app;
