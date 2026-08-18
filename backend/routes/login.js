import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";

import User from "../models/UserDetails.js";
import LoginOTP from "../models/LoginOTP.js";
import PasswordResetOTP from "../models/PasswordResetOTP.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| RESEND
|--------------------------------------------------------------------------
*/

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_FROM =
  process.env.EMAIL_FROM || "Ccl Portal <onboarding@resend.dev>";

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
| GENERATE CAPTCHA
|--------------------------------------------------------------------------
*/

const generateCaptcha = () => {
  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "";

  for (let i = 0; i < 6; i++) {
    code += characters.charAt(
      crypto.randomInt(
        0,
        characters.length
      )
    );
  }

  return code;
};

/*
|--------------------------------------------------------------------------
| CREATE CAPTCHA TOKEN
|--------------------------------------------------------------------------
*/

const createCaptchaToken = (
  id,
  code,
  expiresAt
) => {
  const data =
    `${id}.${code}.${expiresAt}`;

  const signature =
    crypto
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

router.get(
  "/captcha",
  (req, res) => {
    try {
      const id =
        crypto.randomUUID();

      const code =
        generateCaptcha();

      const expiresAt =
        Date.now() +
        5 * 60 * 1000;

      captchaStore.set(
        id,
        {
          code,
          expiresAt,
        }
      );

      const captchaToken =
        createCaptchaToken(
          id,
          code,
          expiresAt
        );

      return res.status(200).json({
        success: true,

        captchaCode:
          code,

        captchaToken:
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
  }
);

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
    |--------------------------------------------------------------------------
    | EXPIRY
    |--------------------------------------------------------------------------
    */

    if (
      Date.now() >
      Number(expiresAt)
    ) {
      captchaStore.delete(id);

      return false;
    }

    /*
    |--------------------------------------------------------------------------
    | EXPECTED SIGNATURE
    |--------------------------------------------------------------------------
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
    |--------------------------------------------------------------------------
    | TIMING SAFE COMPARISON
    |--------------------------------------------------------------------------
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
    |--------------------------------------------------------------------------
    | CAPTCHA VALUE
    |--------------------------------------------------------------------------
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
    |--------------------------------------------------------------------------
    | ONE TIME USE
    |--------------------------------------------------------------------------
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
| GENERATE OTP
|--------------------------------------------------------------------------
*/

const generateOTP = () => {
  return crypto
    .randomInt(
      100000,
      1000000
    )
    .toString();
};

/*
|--------------------------------------------------------------------------
| SEND EMAIL USING RESEND
|--------------------------------------------------------------------------
*/

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is missing."
    );
  }

  const { data, error } =
    await resend.emails.send({
      from: EMAIL_FROM,
      to: [to],
      subject,
      html,
    });

  if (error) {
    console.error(
      "Resend API error:",
      error
    );

    throw new Error(
      error.message ||
      "Resend email failed."
    );
  }

  console.log(
    "✅ Email sent through Resend:",
    data?.id
  );

  return data;
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
      | VALIDATE INPUT
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
      | VERIFY CAPTCHA
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
      | CLEAN USER ID
      |--------------------------------------------------------------------------
      */

      const cleanUserId =
        userId.trim();

      /*
      |--------------------------------------------------------------------------
      | FIND USER
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
            "Invalid login credentials.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | PASSWORD
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
      | DELETE OLD LOGIN OTPS
      |--------------------------------------------------------------------------
      */

      await LoginOTP.deleteMany({
        userId:
          user._id,
      });

      /*
      |--------------------------------------------------------------------------
      | GENERATE OTP
      |--------------------------------------------------------------------------
      */

      const otp =
        generateOTP();

      /*
      |--------------------------------------------------------------------------
      | HASH OTP
      |--------------------------------------------------------------------------
      */

      const otpHash =
        await bcrypt.hash(
          otp,
          10
        );

      /*
      |--------------------------------------------------------------------------
      | EXPIRY
      |--------------------------------------------------------------------------
      */

      const expiresAt =
        new Date(
          Date.now() +
          5 * 60 * 1000
        );

      /*
      |--------------------------------------------------------------------------
      | SAVE OTP
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
      | LOGIN OTP EMAIL
      |--------------------------------------------------------------------------
      */

      try {
        await sendEmail({
          to: user.email,

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
                  Login Verification
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
                  Central Coalfields Limited <br/>
                  Government of India
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
          "❌ LOGIN OTP EMAIL ERROR:",
          emailError
        );

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
      | SUCCESS
      |--------------------------------------------------------------------------
      */

      return res.status(200).json({
        success: true,

        requiresOtp:
          true,

        message:
          "OTP sent to your registered email address.",

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

/*
|--------------------------------------------------------------------------
| FORGOT PASSWORD
|--------------------------------------------------------------------------
|
| POST /api/auth/forgot-password
|
*/

router.post(
  "/forgot-password",
  async (req, res) => {
    try {

      const {
        userId,
      } = req.body;

      /*
      |--------------------------------------------------------------------------
      | VALIDATE
      |--------------------------------------------------------------------------
      */

      if (!userId) {
        return res.status(400).json({
          success: false,
          message:
            "Registration number or mobile number is required.",
        });
      }

      const cleanUserId =
        userId.trim();

      /*
      |--------------------------------------------------------------------------
      | FIND USER
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
        return res.status(404).json({
          success: false,
          message:
            "No account was found with the provided Registration Number or Mobile Number.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | EMAIL CHECK
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
      | DELETE OLD RESET OTPS
      |--------------------------------------------------------------------------
      */

      await PasswordResetOTP.deleteMany({
        userId:
          user._id,
      });

      /*
      |--------------------------------------------------------------------------
      | GENERATE OTP
      |--------------------------------------------------------------------------
      */

      const otp =
        generateOTP();

      /*
      |--------------------------------------------------------------------------
      | HASH OTP
      |--------------------------------------------------------------------------
      */

      const otpHash =
        await bcrypt.hash(
          otp,
          10
        );

      /*
      |--------------------------------------------------------------------------
      | EXPIRY
      |--------------------------------------------------------------------------
      */

      const expiresAt =
        new Date(
          Date.now() +
          5 * 60 * 1000
        );

      /*
      |--------------------------------------------------------------------------
      | SAVE RESET OTP
      |--------------------------------------------------------------------------
      */

      await PasswordResetOTP.create({
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
      | SEND RESET EMAIL
      |--------------------------------------------------------------------------
      */

      try {

        await sendEmail({

          to:
            user.email,

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
                  We received a request
                  to reset your account password.
                </p>

                <p>
                  Your password reset
                  verification OTP is:
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
                  Do not share this OTP
                  with anyone.
                </p>

                <p>
                  If you did not request
                  a password reset, you can
                  safely ignore this email.
                </p>

                <p>
                  Regards,<br/>
                  Central CoalFields Limited <br/>
                  Government Of India
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

        console.error(
          "❌ PASSWORD RESET EMAIL ERROR:",
          emailError
        );

        await PasswordResetOTP.deleteMany({
          userId:
            user._id,
        });

        return res.status(500).json({
          success: false,
          message:
            "Unable to send password reset OTP. Please try again later.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | SUCCESS
      |--------------------------------------------------------------------------
      */

      return res.status(200).json({
        success: true,

        message:
          "Password reset OTP has been sent to your registered email address.",

        userId:
          cleanUserId,
      });

    } catch (error) {

      console.error(
        "❌ Forgot password error:",
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
| VERIFY FORGOT PASSWORD OTP
|--------------------------------------------------------------------------
|
| POST /api/auth/verify-forgot-password-otp
|
*/

router.post(
  "/verify-forgot-password-otp",
  async (req, res) => {

    try {

      const {
        userId,
        otp,
      } = req.body;

      /*
      |--------------------------------------------------------------------------
      | VALIDATE
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

      const cleanOTP =
        otp.trim();

      if (
        !/^\d{6}$/.test(
          cleanOTP
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "OTP must be 6 digits.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | FIND USER
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
            "Invalid password reset request.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | FIND OTP
      |--------------------------------------------------------------------------
      */

      const otpRecord =
        await PasswordResetOTP.findOne({
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
            "OTP expired or not found. Please request a new OTP.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | EXPIRY
      |--------------------------------------------------------------------------
      */

      if (
        !otpRecord.expiresAt ||
        new Date() >
        otpRecord.expiresAt
      ) {

        await otpRecord.deleteOne();

        return res.status(401).json({
          success: false,
          message:
            "OTP has expired. Please request a new OTP.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | ATTEMPTS
      |--------------------------------------------------------------------------
      */

      if (
        otpRecord.attempts >= 5
      ) {

        await otpRecord.deleteOne();

        return res.status(429).json({
          success: false,
          message:
            "Too many incorrect OTP attempts. Please request a new OTP.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | COMPARE OTP
      |--------------------------------------------------------------------------
      */

      const otpValid =
        await bcrypt.compare(
          cleanOTP,
          otpRecord.otpHash
        );

      if (!otpValid) {

        otpRecord.attempts += 1;

        await otpRecord.save();

        const remainingAttempts =
          Math.max(
            0,
            5 -
            otpRecord.attempts
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

      /*
      |--------------------------------------------------------------------------
      | CREATE RESET TOKEN
      |--------------------------------------------------------------------------
      */

      const resetToken =
        crypto
          .randomBytes(32)
          .toString("hex");

      /*
      |--------------------------------------------------------------------------
      | HASH RESET TOKEN
      |--------------------------------------------------------------------------
      */

      const resetTokenHash =
        crypto
          .createHash(
            "sha256"
          )
          .update(
            resetToken
          )
          .digest("hex");

      /*
      |--------------------------------------------------------------------------
      | MARK VERIFIED
      |--------------------------------------------------------------------------
      */

      otpRecord.verified =
        true;

      otpRecord.verifiedAt =
        new Date();

      otpRecord.resetTokenHash =
        resetTokenHash;

      otpRecord.resetTokenExpiresAt =
        new Date(
          Date.now() +
          10 * 60 * 1000
        );

      await otpRecord.save();

      /*
      |--------------------------------------------------------------------------
      | RETURN RESET TOKEN
      |--------------------------------------------------------------------------
      */

      return res.status(200).json({
        success: true,

        message:
          "OTP verified successfully.",

        userId:
          cleanUserId,

        resetToken:
          resetToken,
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
          userIdProvided:
            !!userId,

          resetTokenProvided:
            !!resetToken,

          newPasswordProvided:
            !!newPassword,
        }
      );

      /*
      |--------------------------------------------------------------------------
      | VALIDATE
      |--------------------------------------------------------------------------
      */

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

      /*
      |--------------------------------------------------------------------------
      | PASSWORD LENGTH
      |--------------------------------------------------------------------------
      */

      if (
        newPassword.length < 8
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Password must be at least 8 characters.",
        });
      }

      const cleanUserId =
        userId.trim();

      /*
      |--------------------------------------------------------------------------
      | FIND USER
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
            "Invalid password reset request.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | HASH RESET TOKEN
      |--------------------------------------------------------------------------
      */

      const resetTokenHash =
        crypto
          .createHash(
            "sha256"
          )
          .update(
            resetToken
          )
          .digest("hex");

      /*
      |--------------------------------------------------------------------------
      | FIND RESET RECORD
      |--------------------------------------------------------------------------
      */

      const resetRecord =
        await PasswordResetOTP.findOne({
          userId:
            user._id,

          verified:
            true,

          resetTokenHash,
        });

      if (!resetRecord) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid or expired password reset session. Please start again.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | RESET TOKEN EXPIRY
      |--------------------------------------------------------------------------
      */

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

      /*
      |--------------------------------------------------------------------------
      | HASH NEW PASSWORD
      |--------------------------------------------------------------------------
      */

      const passwordHash =
        await bcrypt.hash(
          newPassword,
          12
        );

      /*
      |--------------------------------------------------------------------------
      | UPDATE PASSWORD
      |--------------------------------------------------------------------------
      */

      user.password =
        passwordHash;

      await user.save();

      /*
      |--------------------------------------------------------------------------
      | DELETE USED RESET RECORD
      |--------------------------------------------------------------------------
      */

      await PasswordResetOTP.deleteOne({
        _id:
          resetRecord._id,
      });

      /*
      |--------------------------------------------------------------------------
      | SUCCESS
      |--------------------------------------------------------------------------
      */

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
      | VALIDATE
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

      const cleanOTP =
        otp.trim();

      if (
        !/^\d{6}$/.test(
          cleanOTP
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "OTP must be 6 digits.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | FIND USER
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
      | FIND LATEST LOGIN OTP
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
      | EXPIRY
      |--------------------------------------------------------------------------
      */

      if (
        !otpRecord.expiresAt ||
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
      | ATTEMPTS
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
      | COMPARE OTP
      |--------------------------------------------------------------------------
      */

      const otpValid =
        await bcrypt.compare(
          cleanOTP,
          otpRecord.otpHash
        );

      if (!otpValid) {

        otpRecord.attempts += 1;

        await otpRecord.save();

        const remainingAttempts =
          Math.max(
            0,
            5 -
            otpRecord.attempts
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

      /*
      |--------------------------------------------------------------------------
      | MARK VERIFIED
      |--------------------------------------------------------------------------
      */

      otpRecord.verified =
        true;

      await otpRecord.save();

      /*
      |--------------------------------------------------------------------------
      | JWT SECRET
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

      /*
      |--------------------------------------------------------------------------
      | CREATE JWT
      |--------------------------------------------------------------------------
      */

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
      | DELETE USED OTP
      |--------------------------------------------------------------------------
      */

      await LoginOTP.deleteOne({
        _id:
          otpRecord._id,
      });

      /*
      |--------------------------------------------------------------------------
      | SUCCESS
      |--------------------------------------------------------------------------
      */

      return res.status(200).json({

        success:
          true,

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