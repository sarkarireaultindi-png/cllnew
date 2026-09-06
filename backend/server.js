import "./config/env.js";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import userDetailsRoutes from "./routes/userDetails.js";
import loginRoutes from "./routes/login.js";
import personalDetailsRoutes from "./routes/personalDetails.js";
import qualificationDetailsRoutes from "./routes/qualificationDetails.js";
import documentUploadRouter from "./routes/documentUpload.js";
import feeDetailsRouter from "./routes/feeDetails.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/adminLogin.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

// ======================================================
// DATABASE
// ======================================================

connectDB();

// ======================================================
// EXPRESS APP
// ======================================================

const app = express();

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// ======================================================
// USER REGISTRATION
// ======================================================
// Payment Gateway ======================================================
app.use(
  "/api/payment",
  paymentRoutes
);


app.use(
  "/api/admin",
  adminRouter
);

app.use(
  "/api/users",
  userDetailsRoutes
);

// ======================================================
// AUTHENTICATION
// ======================================================

// login.js
app.use(
  "/api/auth",
  loginRoutes
);

// auth.js
app.use(
  "/api/auth",
  authRouter
);

// ======================================================
// FEE DETAILS
// ======================================================

app.use(
  "/api/fee-details",
  feeDetailsRouter
);

// ======================================================
// DOCUMENT UPLOAD
// ======================================================

app.use(
  "/api/document-upload",
  documentUploadRouter
);

// Uploaded files
app.use(
  "/uploads",
  express.static("uploads")
);

// ======================================================
// QUALIFICATION DETAILS
// ======================================================

app.use(
  "/api/qualification-details",
  qualificationDetailsRoutes
);

// ======================================================
// PERSONAL DETAILS
// ======================================================

app.use(
  "/api/personal-details",
  personalDetailsRoutes
);

// ======================================================
// RESEND CONFIGURATION CHECK
// ======================================================

console.log(
  "Resend API key configured:",
  !!process.env.RESEND_API_KEY
);

console.log(
  "Email sender:",
  process.env.EMAIL_FROM ||
    "Not configured"
);

// ======================================================
// ROOT
// ======================================================

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

// ======================================================
// SERVER
// ======================================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});