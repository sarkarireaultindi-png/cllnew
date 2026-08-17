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

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userDetailsRoutes);
app.use("/api/auth", loginRoutes);

app.use(
  "/api/fee-details",
  feeDetailsRouter
);

app.use("/api/auth", authRouter);

app.use(
  "/api/document-upload",
  documentUploadRouter
);
app.use(
  "/uploads",
  express.static("uploads")
);

app.use(
  "/api/qualification-details",
  qualificationDetailsRoutes
);

app.use(
  "/api/personal-details",
  personalDetailsRoutes
);

console.log("Email:", process.env.EMAIL_USER);
console.log(
  "Email password configured:",
  !!process.env.EMAIL_PASSWORD
);

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});