import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/UserDetails.js";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Generate 6-digit email OTP
const generateOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { userId, password } = req.body;

    console.log("Login request:", {
      userId,
      passwordProvided: !!password,
    });

    // Validation
    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: "Registration number/mobile number and password are required.",
      });
    }

    const cleanUserId = userId.trim();

    // Find by registration number OR mobile
    const user = await User.findOne({
      $or: [
        { registrationNumber: cleanUserId },
        { mobile: cleanUserId },
      ],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid registration number/mobile number or password.",
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid registration number/mobile number or password.",
      });
    }

    // Generate OTP
    const otp = generateOtp();

    // Store temporary OTP information in memory
    // This is NOT suitable for production/multiple servers.
    global.loginOtps = global.loginOtps || {};

    global.loginOtps[user._id.toString()] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    // Send OTP
    try {
      await transporter.sendMail({
        from: `"Application Portal" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Login OTP - Application Portal",

        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
            
            <div style="
              background:#ab183d;
              color:white;
              padding:20px;
              border-radius:8px 8px 0 0;
            ">
              <h2 style="margin:0;">
                Login Verification
              </h2>
            </div>

            <div style="
              padding:25px;
              border:1px solid #ddd;
              border-top:none;
            ">

              <p>
                Dear <strong>${user.name}</strong>,
              </p>

              <p>
                Your login verification OTP is:
              </p>

              <div style="
                background:#f5f5f5;
                padding:20px;
                text-align:center;
                border-radius:8px;
                margin:20px 0;
              ">
                <strong style="
                  font-size:28px;
                  letter-spacing:6px;
                ">
                  ${otp}
                </strong>
              </div>

              <p>
                This OTP is valid for 5 minutes.
              </p>

              <p style="color:#777;">
                If you did not attempt to login, please ignore this email.
              </p>

            </div>
          </div>
        `,
      });

      console.log("Login OTP sent to:", user.email);

    } catch (emailError) {
      console.error("OTP email error:", emailError);

      return res.status(500).json({
        success: false,
        message: "Unable to send login OTP. Please try again later.",
      });
    }

    // Don't create JWT yet.
    // JWT should be created only AFTER OTP verification.

    return res.status(200).json({
      success: true,
      otpRequired: true,
      message: "Login verified. OTP has been sent to your registered email.",
      userId: user._id,
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});


// VERIFY LOGIN OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: "User ID and OTP are required.",
      });
    }

    global.loginOtps = global.loginOtps || {};

    const storedOtp = global.loginOtps[userId];

    if (!storedOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found. Please login again.",
      });
    }

    if (Date.now() > storedOtp.expiresAt) {
      delete global.loginOtps[userId];

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please login again.",
      });
    }

    if (storedOtp.otp !== otp.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // OTP correct
    delete global.loginOtps[userId];

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Create JWT only after OTP verification
    const token = jwt.sign(
      {
        userId: user._id,
        registrationNumber: user.registrationNumber,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        registrationNumber: user.registrationNumber,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("OTP verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});


export default router;