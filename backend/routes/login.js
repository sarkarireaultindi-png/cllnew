import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";

import User from "../models/UserDetails.js";
import LoginOTP from "../models/LoginOTP.js";
import PasswordResetOTP from "../models/PasswordResetOTP.js";
const router = express.Router();

/*
|--------------------------------------------------------------------------
| RATE LIMITING
|--------------------------------------------------------------------------
*/

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many login attempts. Please try again later.",
  },
});

/*
|--------------------------------------------------------------------------
| CAPTCHA
|--------------------------------------------------------------------------
*/

const CAPTCHA_SECRET =
  (process.env.JWT_SECRET || "") + "_CAPTCHA";

const captchaStore = new Map();

/*
|--------------------------------------------------------------------------
| Generate CAPTCHA
|--------------------------------------------------------------------------
*/

const generateCaptcha = () => {
  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "";

  for (let i = 0; i < 6; i++) {
    code += characters.charAt(
      crypto.randomInt(0, characters.length)
    );
  }

  return code;
};

/*
|--------------------------------------------------------------------------
| Create CAPTCHA Token
|--------------------------------------------------------------------------
*/

const createCaptchaToken = (
  id,
  code,
  expiresAt
) => {
  const data = `${id}.${code}.${expiresAt}`;

  const signature = crypto
    .createHmac(
      "sha256",
      CAPTCHA_SECRET
    )
    .update(data)
    .digest("hex");

  return `${id}.${expiresAt}.${signature}`;
};

/*
|--------------------------------------------------------------------------
| GET CAPTCHA
|--------------------------------------------------------------------------
|
| GET /api/auth/captcha
|
*/

router.get("/captcha", (req, res) => {
  try {
    const id = crypto.randomUUID();

    const code = generateCaptcha();

    const expiresAt =
      Date.now() + 5 * 60 * 1000;

    captchaStore.set(id, {
      code,
      expiresAt,
    });

    const captchaToken =
      createCaptchaToken(
        id,
        code,
        expiresAt
      );

    return res.status(200).json({
      success: true,

      // Used by frontend to display CAPTCHA
      captchaCode: code,

      // Used by frontend when submitting login
      captchaToken,
    });

  } catch (error) {
    console.error(
      "CAPTCHA generation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to generate CAPTCHA.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| VERIFY CAPTCHA
|--------------------------------------------------------------------------
*/

const verifyCaptcha = (
  captchaToken,
  captchaValue
) => {
  try {
    if (
      !captchaToken ||
      !captchaValue
    ) {
      return false;
    }

    const parts =
      captchaToken.split(".");

    if (parts.length !== 3) {
      return false;
    }

    const [
      id,
      expiresAt,
      signature,
    ] = parts;

    const stored =
      captchaStore.get(id);

    if (!stored) {
      return false;
    }

    /*
    |----------------------------------------------------------------------
    | Expired
    |----------------------------------------------------------------------
    */

    if (
      Date.now() >
      Number(expiresAt)
    ) {
      captchaStore.delete(id);

      return false;
    }

    /*
    |----------------------------------------------------------------------
    | Create expected signature
    |----------------------------------------------------------------------
    */

    const expectedToken =
      createCaptchaToken(
        id,
        stored.code,
        expiresAt
      );

    const expectedSignature =
      expectedToken.split(".")[2];

    /*
    |----------------------------------------------------------------------
    | Prevent timing attack
    |----------------------------------------------------------------------
    */

    if (
      signature.length !==
      expectedSignature.length
    ) {
      return false;
    }

    const signatureValid =
      crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      );

    if (!signatureValid) {
      return false;
    }

    /*
    |----------------------------------------------------------------------
    | Compare CAPTCHA
    |----------------------------------------------------------------------
    */

    if (
      captchaValue
        .trim()
        .toUpperCase() !==
      stored.code.toUpperCase()
    ) {
      return false;
    }

    /*
    |----------------------------------------------------------------------
    | CAPTCHA can only be used once
    |----------------------------------------------------------------------
    */

    captchaStore.delete(id);

    return true;

  } catch (error) {
    console.error(
      "CAPTCHA verification error:",
      error
    );

    return false;
  }
};

/*
|--------------------------------------------------------------------------
| EMAIL TRANSPORTER
|--------------------------------------------------------------------------
*/
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,

  // Force IPv4 on Render
  family: 4,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

/*
|--------------------------------------------------------------------------
| Verify SMTP
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Generate OTP
|--------------------------------------------------------------------------
*/

const generateOTP = () => {
  return crypto
    .randomInt(100000, 1000000)
    .toString();
};

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
|
| POST /api/auth/login
|
*/

router.post(
  "/login",
  loginLimiter,
  async (req, res) => {
    try {
      const {
        userId,
        password,
        captcha,
        captchaToken,
      } = req.body;

      console.log(
        "Login request:",
        {
          userId,
          passwordProvided:
            !!password,
          captchaProvided:
            !!captcha,
          captchaTokenProvided:
            !!captchaToken,
        }
      );

      /*
      |--------------------------------------------------------------------------
      | Validate input
      |--------------------------------------------------------------------------
      */

      if (
        !userId ||
        !password ||
        !captcha ||
        !captchaToken
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Registration number/mobile number, password and CAPTCHA are required.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Verify CAPTCHA
      |--------------------------------------------------------------------------
      */

      const captchaValid =
        verifyCaptcha(
          captchaToken,
          captcha
        );

      if (!captchaValid) {
        return res.status(401).json({
          success: false,

          message:
            "Invalid or expired CAPTCHA.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Clean User ID
      |--------------------------------------------------------------------------
      */

      const cleanUserId =
        userId.trim();

      /*
      |--------------------------------------------------------------------------
      | Find User
      |--------------------------------------------------------------------------
      |
      | Login can use:
      |
      | Registration Number
      | OR
      | Mobile Number
      |
      */

      const user =
        await User.findOne({
          $or: [
            {
              registrationNumber:
                cleanUserId.toUpperCase(),
            },

            {
              mobile:
                cleanUserId,
            },
          ],
        });

      /*
      |--------------------------------------------------------------------------
      | Invalid User
      |--------------------------------------------------------------------------
      */

      if (!user) {
        return res.status(401).json({
          success: false,

          message:
            "Invalid login credentials.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Password Verification
      |--------------------------------------------------------------------------
      */

      const passwordValid =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!passwordValid) {
        return res.status(401).json({
          success: false,

          message:
            "Invalid login credentials.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Delete Previous OTPs
      |--------------------------------------------------------------------------
      */

      await LoginOTP.deleteMany({
        userId: user._id,
      });

      /*
      |--------------------------------------------------------------------------
      | Generate OTP
      |--------------------------------------------------------------------------
      */

      const otp =
        generateOTP();

      /*
      |--------------------------------------------------------------------------
      | Hash OTP
      |--------------------------------------------------------------------------
      */

      const otpHash =
        await bcrypt.hash(
          otp,
          10
        );

      /*
      |--------------------------------------------------------------------------
      | OTP Expiry
      |--------------------------------------------------------------------------
      */

      const expiresAt =
        new Date(
          Date.now() +
            5 * 60 * 1000
        );

      /*
      |--------------------------------------------------------------------------
      | Save OTP
      |--------------------------------------------------------------------------
      */

      await LoginOTP.create({
        userId:
          user._id,

        email:
          user.email,

        otpHash,

        expiresAt,

        verified:
          false,

        attempts:
          0,
      });

      /*
      |--------------------------------------------------------------------------
      | Send OTP Email
      |--------------------------------------------------------------------------
      */

      try {
        await transporter.sendMail({
          from:
            `"CCL Portal" <${process.env.EMAIL_USER}>`,

          to:
            user.email,

          subject:
            "Login Verification OTP",

          html: `
            <div style="
              font-family:Arial,sans-serif;
              max-width:600px;
              margin:auto;
              border:1px solid #ddd;
              border-radius:10px;
              overflow:hidden;
            ">

              <div style="
                background:#ab183d;
                color:white;
                padding:20px;
              ">

                <h2 style="
                  margin:0;
                ">
                  Login Verification
                </h2>

              </div>

              <div style="
                padding:25px;
              ">

                <p>
                  Dear
                  <strong>
                    ${user.name}
                  </strong>,
                </p>

                <p>
                  A login attempt was made
                  on your account.
                </p>

                <p>
                  Your One-Time Password is:
                </p>

                <div style="
                  background:#f5f5f5;
                  padding:20px;
                  text-align:center;
                  border-radius:8px;
                  font-size:30px;
                  font-weight:bold;
                  letter-spacing:8px;
                ">

                  ${otp}

                </div>

                <p>
                  This OTP is valid for
                  <strong>
                    5 minutes
                  </strong>.
                </p>

                <p style="
                  color:#777;
                ">
                  Do not share this OTP
                  with anyone.
                </p>

                <p>
                  If you did not attempt
                  to login, please ignore
                  this email.
                </p>

                <p>
                  Regards,<br/>
                   Central Coalfields Limited <br /> 
                        Government of india
                </p>

              </div>

            </div>
          `,
        });

        console.log(
          "✅ Login OTP sent to:",
          user.email
        );

      } catch (emailError) {

        console.error(
          "❌ OTP email error:",
          emailError
        );

        /*
        |----------------------------------------------------------------------
        | Remove OTP if email failed
        |----------------------------------------------------------------------
        */

        await LoginOTP.deleteMany({
          userId:
            user._id,
        });

        return res.status(500).json({
          success: false,

          message:
            "Unable to send verification OTP. Please try again later.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | DO NOT CREATE JWT HERE
      |--------------------------------------------------------------------------
      |
      | JWT is created only after OTP verification.
      |
      */

      return res.status(200).json({
        success: true,

        requiresOtp: true,

        message:
          "OTP sent to your registered email address.",

        /*
        |----------------------------------------------------------------------
        | Send the original login identifier back.
        | This is used by the OTP verification page.
        |----------------------------------------------------------------------
        */

        userId:
          cleanUserId,
      });

    } catch (error) {

      console.error(
        "❌ Login error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Server error. Please try again later.",
      });
    }
  }
);

router.post(
  "/forgot-password",
  async (req, res) => {
    try {
      const { userId } = req.body;

      /*
      |--------------------------------------------------------------------------
      | Validate
      |--------------------------------------------------------------------------
      */

      if (!userId) {
        return res.status(400).json({
          success: false,
          message:
            "Registration number or mobile number is required.",
        });
      }

      const cleanUserId = userId.trim();

      /*
      |--------------------------------------------------------------------------
      | Find User
      |--------------------------------------------------------------------------
      */

      const user = await User.findOne({
        $or: [
          {
            registrationNumber:
              cleanUserId.toUpperCase(),
          },
          {
            mobile:
              cleanUserId,
          },
        ],
      });

      /*
      |--------------------------------------------------------------------------
      | User Not Found
      |--------------------------------------------------------------------------
      */

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "No account was found with the provided Registration Number or Mobile Number.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Check Email
      |--------------------------------------------------------------------------
      */

      if (!user.email) {
        return res.status(400).json({
          success: false,
          message:
            "No registered email address is available for this account.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Delete Previous Password Reset OTPs
      |--------------------------------------------------------------------------
      */

      await PasswordResetOTP.deleteMany({
        userId: user._id,
      });

      /*
      |--------------------------------------------------------------------------
      | Generate OTP
      |--------------------------------------------------------------------------
      */

      const otp = generateOTP();

      /*
      |--------------------------------------------------------------------------
      | Hash OTP
      |--------------------------------------------------------------------------
      */

      const otpHash = await bcrypt.hash(
        otp,
        10
      );

      /*
      |--------------------------------------------------------------------------
      | OTP Expiry
      |--------------------------------------------------------------------------
      */

      const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
      );

      /*
      |--------------------------------------------------------------------------
      | Save OTP
      |--------------------------------------------------------------------------
      */

      await PasswordResetOTP.create({
        userId: user._id,

        email: user.email,

        otpHash,

        expiresAt,

        verified: false,

        attempts: 0,
      });

      /*
      |--------------------------------------------------------------------------
      | Send Email
      |--------------------------------------------------------------------------
      */

      try {
        await transporter.sendMail({
          from:
            `"Application Portal" <${process.env.EMAIL_USER}>`,

          to: user.email,

          subject:
            "Password Reset Verification OTP",

          html: `
            <div style="
              font-family:Arial,sans-serif;
              max-width:600px;
              margin:auto;
              border:1px solid #ddd;
              border-radius:10px;
              overflow:hidden;
              background:#ffffff;
            ">

              <div style="
                background:#ab183d;
                color:white;
                padding:20px;
              ">

                <h2 style="
                  margin:0;
                ">
                  Password Reset
                </h2>

              </div>

              <div style="
                padding:25px;
              ">

                <p>
                  Dear
                  <strong>
                    ${user.name || "User"}
                  </strong>,
                </p>

                <p>
                  We received a request to reset
                  your account password.
                </p>

                <p>
                  Your password reset verification
                  OTP is:
                </p>

                <div style="
                  background:#f5f5f5;
                  padding:20px;
                  text-align:center;
                  border-radius:8px;
                  font-size:30px;
                  font-weight:bold;
                  letter-spacing:8px;
                  color:#ab183d;
                ">

                  ${otp}

                </div>

                <p>
                  This OTP is valid for
                  <strong>
                    5 minutes
                  </strong>.
                </p>

                <p style="
                  color:#777;
                ">
                  Do not share this OTP with anyone.
                </p>

                <p>
                  If you did not request a password
                  reset, you can safely ignore this email.
                </p>

                <p>
                  Regards,<br/>
                  Application Portal
                </p>

              </div>

            </div>
          `,
        });

        console.log(
          "✅ Password reset OTP sent to:",
          user.email
        );

} catch (emailError) {
  console.error("=================================");
  console.error("❌ PASSWORD RESET OTP EMAIL ERROR");
  console.error("Message:", emailError.message);
  console.error("Name:", emailError.name);
  console.error("Code:", emailError.code);
  console.error("Command:", emailError.command);
  console.error("Response:", emailError.response);
  console.error("Response Code:", emailError.responseCode);
  console.error("Stack:", emailError.stack);
  console.error("=================================");

  // Remove OTP because email was not sent
  await PasswordResetOTP.deleteMany({
    userId: user._id,
  });

  return res.status(500).json({
    success: false,
    message:
      "Unable to send password reset OTP. Please try again later.",
  });
}
      /*
      |--------------------------------------------------------------------------
      | Success
      |--------------------------------------------------------------------------
      */

      return res.status(200).json({
        success: true,

        message:
          "Password reset OTP has been sent to your registered email address.",

        userId: cleanUserId,
      });

    } catch (error) {
  console.error("=================================");
  console.error("❌ FORGOT PASSWORD OTP ERROR");
  console.error("Message:", error.message);
  console.error("Name:", error.name);
  console.error("Code:", error.code);
  console.error("Stack:", error.stack);
  console.error("=================================");

  return res.status(500).json({
    success: false,
    message:
      "Server error. Please try again later.",
  });
}
  }
);

/*
|--------------------------------------------------------------------------
| VERIFY FORGOT PASSWORD OTP
|--------------------------------------------------------------------------
|
| POST /api/auth/verify-forgot-password-otp
|
|--------------------------------------------------------------------------
*/

router.post(
  "/verify-forgot-password-otp",
  async (req, res) => {
    try {
      const { userId, otp } = req.body;

      // --------------------------------------------
      // Validate input
      // --------------------------------------------

      if (!userId || !otp) {
        return res.status(400).json({
          success: false,
          message: "User ID and OTP are required.",
        });
      }

      const cleanUserId = userId.trim();
      const cleanOTP = otp.trim();

      if (!/^\d{6}$/.test(cleanOTP)) {
        return res.status(400).json({
          success: false,
          message: "OTP must be 6 digits.",
        });
      }

      // --------------------------------------------
      // Find user
      // --------------------------------------------

      const user = await User.findOne({
        $or: [
          {
            registrationNumber:
              cleanUserId.toUpperCase(),
          },
          {
            mobile: cleanUserId,
          },
        ],
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid password reset request.",
        });
      }

      // --------------------------------------------
      // Find latest password reset OTP
      // --------------------------------------------

      const otpRecord =
        await PasswordResetOTP.findOne({
          userId: user._id,
          verified: false,
        }).sort({
          createdAt: -1,
        });

      if (!otpRecord) {
        return res.status(401).json({
          success: false,
          message:
            "OTP expired or not found. Please request a new OTP.",
        });
      }

      // --------------------------------------------
      // Check OTP expiry
      // --------------------------------------------

      if (
        !otpRecord.expiresAt ||
        new Date() > otpRecord.expiresAt
      ) {
        await otpRecord.deleteOne();

        return res.status(401).json({
          success: false,
          message:
            "OTP has expired. Please request a new OTP.",
        });
      }

      // --------------------------------------------
      // Check attempts
      // --------------------------------------------

      if (otpRecord.attempts >= 5) {
        await otpRecord.deleteOne();

        return res.status(429).json({
          success: false,
          message:
            "Too many incorrect OTP attempts. Please request a new OTP.",
        });
      }

      // --------------------------------------------
      // Compare OTP
      // --------------------------------------------

      const otpValid = await bcrypt.compare(
        cleanOTP,
        otpRecord.otpHash
      );

      if (!otpValid) {
        otpRecord.attempts += 1;

        await otpRecord.save();

        const remainingAttempts = Math.max(
          0,
          5 - otpRecord.attempts
        );

        return res.status(401).json({
          success: false,
          message:
            remainingAttempts > 0
              ? `Invalid OTP. ${remainingAttempts} attempt${
                  remainingAttempts === 1
                    ? ""
                    : "s"
                } remaining.`
              : "Invalid OTP.",
        });
      }

      // --------------------------------------------
      // Generate reset token
      // --------------------------------------------

      const resetToken =
        crypto.randomBytes(32).toString("hex");

      // --------------------------------------------
      // Hash reset token before storing
      // --------------------------------------------

      const resetTokenHash =
        crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");

      // --------------------------------------------
      // Mark OTP as verified
      // --------------------------------------------

      otpRecord.verified = true;
      otpRecord.verifiedAt = new Date();

      otpRecord.resetTokenHash =
        resetTokenHash;

      otpRecord.resetTokenExpiresAt =
        new Date(
          Date.now() + 10 * 60 * 1000
        );

      await otpRecord.save();

      // --------------------------------------------
      // Return reset token to frontend
      // --------------------------------------------

      return res.status(200).json({
        success: true,

        message:
          "OTP verified successfully.",

        userId: cleanUserId,

        resetToken: resetToken,
      });

    } catch (error) {
      console.error(
        "❌ Forgot password OTP verification error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Server error. Please try again later.",
      });
    }
  }
);

/*
|--------------------------------------------------------------------------
| RESET PASSWORD
|--------------------------------------------------------------------------
|
| POST /api/auth/reset-password
|
|--------------------------------------------------------------------------
*/

router.post(
  "/reset-password",
  async (req, res) => {
    try {
      const {
        userId,
        resetToken,
        newPassword,
      } = req.body;

      console.log(
        "Reset password request:",
        {
          userIdProvided: !!userId,
          resetTokenProvided: !!resetToken,
          newPasswordProvided: !!newPassword,
        }
      );

      // --------------------------------------------
      // Validate
      // --------------------------------------------

      if (
        !userId ||
        !resetToken ||
        !newPassword
      ) {
        return res.status(400).json({
          success: false,

          message:
            "User ID, reset token and new password are required.",
        });
      }

      // --------------------------------------------
      // Password length
      // --------------------------------------------

      if (newPassword.length < 8) {
        return res.status(400).json({
          success: false,

          message:
            "Password must be at least 8 characters.",
        });
      }

      const cleanUserId = userId.trim();

      // --------------------------------------------
      // Find user
      // --------------------------------------------

      const user =
        await User.findOne({
          $or: [
            {
              registrationNumber:
                cleanUserId.toUpperCase(),
            },
            {
              mobile: cleanUserId,
            },
          ],
        });

      if (!user) {
        return res.status(401).json({
          success: false,

          message:
            "Invalid password reset request.",
        });
      }

      // --------------------------------------------
      // Hash reset token
      // --------------------------------------------

      const resetTokenHash =
        crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");

      // --------------------------------------------
      // Find verified reset request
      // --------------------------------------------

      const resetRecord =
        await PasswordResetOTP.findOne({
          userId: user._id,
          verified: true,
          resetTokenHash,
        });

      if (!resetRecord) {
        return res.status(401).json({
          success: false,

          message:
            "Invalid or expired password reset session. Please start again.",
        });
      }

      // --------------------------------------------
      // Check reset token expiry
      // --------------------------------------------

      if (
        !resetRecord.resetTokenExpiresAt ||
        new Date() >
          resetRecord.resetTokenExpiresAt
      ) {
        await resetRecord.deleteOne();

        return res.status(401).json({
          success: false,

          message:
            "Password reset session has expired. Please start again.",
        });
      }

      // --------------------------------------------
      // Hash new password
      // --------------------------------------------

      const passwordHash =
        await bcrypt.hash(
          newPassword,
          12
        );

      // --------------------------------------------
      // Update user password
      // --------------------------------------------

      user.password = passwordHash;

      await user.save();

      // --------------------------------------------
      // Delete used reset record
      // --------------------------------------------

      await PasswordResetOTP.deleteOne({
        _id: resetRecord._id,
      });

      // --------------------------------------------
      // Success
      // --------------------------------------------

      return res.status(200).json({
        success: true,

        message:
          "Password reset successfully. You can now login with your new password.",
      });

    } catch (error) {
      console.error(
        "❌ Password reset error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Server error. Please try again later.",
      });
    }
  }
);

/*
|--------------------------------------------------------------------------
| VERIFY LOGIN OTP
|--------------------------------------------------------------------------
|
| POST /api/auth/verify-otp
|
*/

router.post(
  "/verify-otp",
  loginLimiter,
  async (req, res) => {
    try {

      const {
        userId,
        otp,
      } = req.body;

      /*
      |--------------------------------------------------------------------------
      | Validate
      |--------------------------------------------------------------------------
      */

      if (
        !userId ||
        !otp
      ) {
        return res.status(400).json({
          success: false,

          message:
            "User ID and OTP are required.",
        });
      }

      const cleanUserId =
        userId.trim();

      /*
      |--------------------------------------------------------------------------
      | Find User
      |--------------------------------------------------------------------------
      */

      const user =
        await User.findOne({
          $or: [
            {
              registrationNumber:
                cleanUserId.toUpperCase(),
            },

            {
              mobile:
                cleanUserId,
            },
          ],
        });

      if (!user) {
        return res.status(401).json({
          success: false,

          message:
            "Invalid verification request.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Find Latest OTP
      |--------------------------------------------------------------------------
      */

      const otpRecord =
        await LoginOTP.findOne({
          userId:
            user._id,

          verified:
            false,
        }).sort({
          createdAt:
            -1,
        });

      if (!otpRecord) {
        return res.status(401).json({
          success: false,

          message:
            "OTP expired or not found. Please login again.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Expiry Check
      |--------------------------------------------------------------------------
      */

      if (
        new Date() >
        otpRecord.expiresAt
      ) {

        await otpRecord.deleteOne();

        return res.status(401).json({
          success: false,

          message:
            "OTP has expired. Please login again.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Attempt Limit
      |--------------------------------------------------------------------------
      */

      if (
        otpRecord.attempts >= 5
      ) {

        await otpRecord.deleteOne();

        return res.status(429).json({
          success: false,

          message:
            "Too many incorrect OTP attempts. Please login again.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | OTP Validation
      |--------------------------------------------------------------------------
      */

      const otpValid =
        await bcrypt.compare(
          otp.trim(),
          otpRecord.otpHash
        );

      if (!otpValid) {

        otpRecord.attempts += 1;

        await otpRecord.save();

        return res.status(401).json({
          success: false,

          message:
            "Invalid OTP.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Mark OTP Verified
      |--------------------------------------------------------------------------
      */

      otpRecord.verified =
        true;

      await otpRecord.save();

      /*
      |--------------------------------------------------------------------------
      | Create JWT
      |--------------------------------------------------------------------------
      */

      if (
        !process.env.JWT_SECRET
      ) {
        console.error(
          "JWT_SECRET is missing."
        );

        return res.status(500).json({
          success: false,

          message:
            "Server authentication configuration error.",
        });
      }

      const token =
        jwt.sign(
          {
            userId:
              user._id.toString(),

            registrationNumber:
              user.registrationNumber,
          },

          process.env.JWT_SECRET,

          {
            expiresIn:
              process.env.JWT_EXPIRES_IN ||
              "1h",
          }
        );

      /*
      |--------------------------------------------------------------------------
      | Delete Used OTP
      |--------------------------------------------------------------------------
      */

      await LoginOTP.deleteOne({
        _id:
          otpRecord._id,
      });

      /*
      |--------------------------------------------------------------------------
      | Login Success
      |--------------------------------------------------------------------------
      */

      return res.status(200).json({
        success: true,

        message:
          "Login successful.",

        token,

        user: {
          id:
            user._id,

          registrationNumber:
            user.registrationNumber,

          name:
            user.name,

          mobile:
            user.mobile,

          email:
            user.email,
        },
      });

    } catch (error) {

      console.error(
        "❌ OTP verification error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Server error. Please try again later.",
      });
    }
  }
);

export default router;