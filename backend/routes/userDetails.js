import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/UserDetails.js";

const router = express.Router();

// ======================================================
// Generate Unique Registration Number
// ======================================================

const generateRegistrationNumber = () => {
  const year = new Date().getFullYear();

  const random = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase();

  return `REG${year}${random}`;
};

// ======================================================
// Generate Temporary Password
// ONLY CAPITAL LETTERS + NUMBERS
// ======================================================

const generatePassword = () => {
  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let password = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = crypto.randomInt(
      0,
      characters.length
    );

    password += characters[randomIndex];
  }

  return password;
};

// ======================================================
// Gmail Transporter
// ======================================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ======================================================
// Verify Gmail SMTP
// ======================================================

transporter.verify((error) => {
  if (error) {
    console.error("❌ Gmail SMTP Error:");
    console.error(error.message);
  } else {
    console.log("✅ Gmail SMTP server is ready");
  }
});

// ======================================================
// Register User
// ======================================================

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      aadhaar,
      dob,
      mobile,
      email,
    } = req.body;

    // --------------------------------------------------
    // Required fields
    // --------------------------------------------------

    if (
      !name ||
      !aadhaar ||
      !dob ||
      !mobile ||
      !email
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // --------------------------------------------------
    // Clean values
    // --------------------------------------------------

    const cleanName = String(name).trim();

    const cleanAadhaar = String(aadhaar)
      .replace(/\s/g, "")
      .trim();

    const cleanMobile = String(mobile)
      .replace(/\D/g, "")
      .trim();

    const cleanEmail = String(email)
      .trim()
      .toLowerCase();

    // --------------------------------------------------
    // Validate name
    // --------------------------------------------------

    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid name.",
      });
    }

    // --------------------------------------------------
    // Validate Aadhaar
    // --------------------------------------------------

    if (!/^\d{12}$/.test(cleanAadhaar)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid 12-digit Aadhaar number.",
      });
    }

    // --------------------------------------------------
    // Validate mobile
    // --------------------------------------------------

    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid 10-digit mobile number.",
      });
    }

    // --------------------------------------------------
    // Validate email
    // --------------------------------------------------

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        cleanEmail
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    // ==================================================
    // Check Existing Mobile
    // ==================================================

    const existingMobile = await User.findOne({
      mobile: cleanMobile,
    });

    if (existingMobile) {
      return res.status(409).json({
        success: false,
        message:
          "This mobile number is already registered.",
      });
    }

    // ==================================================
    // Check Existing Email
    // ==================================================

    const existingEmail = await User.findOne({
      email: cleanEmail,
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message:
          "This email address is already registered.",
      });
    }

    // ==================================================
    // Generate Unique Registration Number
    // ==================================================

    let registrationNumber;
    let registrationExists = true;

    while (registrationExists) {
      registrationNumber =
        generateRegistrationNumber();

      const existingRegistration =
        await User.findOne({
          registrationNumber,
        });

      registrationExists =
        !!existingRegistration;
    }

    // ==================================================
    // Generate Temporary Password
    // ==================================================

    const temporaryPassword =
      generatePassword();

    console.log(
      "Generated Registration Number:",
      registrationNumber
    );

    // Don't log the password in production.

    // ==================================================
    // Hash Password
    // ==================================================

    const hashedPassword =
      await bcrypt.hash(
        temporaryPassword,
        12
      );

    // ==================================================
    // Save User
    // ==================================================

    const user = await User.create({
      registrationNumber,

      name: cleanName,

      aadhaar: cleanAadhaar,

      dob,

      mobile: cleanMobile,

      email: cleanEmail,

      password: hashedPassword,
    });

    console.log(
      "✅ User saved:",
      user.registrationNumber
    );

    // ==================================================
    // Send Registration Email
    // ==================================================

    try {
      const mailInfo =
        await transporter.sendMail({
          from: `"CCL Portal" <${process.env.EMAIL_USER}>`,

          to: cleanEmail,

          subject:
            "Registration Successful - Login Details",

          html: `
            <!DOCTYPE html>

            <html>
              <head>
                <meta charset="UTF-8" />
                <title>
                  Registration Successful
                </title>
              </head>

              <body
                style="
                  margin:0;
                  padding:20px;
                  background:#f3f4f6;
                  font-family:Arial,sans-serif;
                "
              >

                <div
                  style="
                    max-width:600px;
                    margin:auto;
                    background:white;
                    border-radius:10px;
                    overflow:hidden;
                    border:1px solid #ddd;
                  "
                >

                  <!-- Header -->

                  <div
                    style="
                      background:#ab183d;
                      color:white;
                      padding:22px;
                    "
                  >

                    <h2
                      style="
                        margin:0;
                        font-size:22px;
                      "
                    >
                      Registration Successful
                    </h2>

                    <p
                      style="
                        margin:6px 0 0;
                        opacity:.85;
                      "
                    >
                      Application Portal
                    </p>

                  </div>


                  <!-- Content -->

                  <div
                    style="
                      padding:25px;
                      color:#333;
                    "
                  >

                    <p>
                      Dear
                      <strong>
                        ${cleanName}
                      </strong>,
                    </p>

                    <p>
                      Your registration has been
                      successfully completed.
                    </p>


                    <!-- Credentials -->

                    <div
                      style="
                        background:#f5f5f5;
                        border:1px solid #ddd;
                        border-radius:8px;
                        padding:20px;
                        margin:20px 0;
                      "
                    >

                      <p
                        style="
                          margin:0 0 12px;
                        "
                      >
                        <strong>
                          Registration Number:
                        </strong>
                        <br />

                        <span
                          style="
                            font-size:18px;
                            color:#ab183d;
                            font-weight:bold;
                          "
                        >
                          ${registrationNumber}
                        </span>
                      </p>


                      <p
                        style="
                          margin:0;
                        "
                      >
                        <strong>
                           Password:
                        </strong>
                        <br />

                        <span
                          style="
                            font-size:18px;
                            color:#ab183d;
                            font-weight:bold;
                            letter-spacing:2px;
                          "
                        >
                          ${temporaryPassword}
                        </span>
                      </p>

                    </div>


                    <p>
                      Please use your registration
                      number and password
                      to log in.
                    </p>

                    <p
                      style="
                        color:#666;
                        font-size:14px;
                      "
                    >
                      Please keep your login
                      credentials secure.
                    </p>

                    <p>
                      Regards,<br />
                      <strong>
                        Central Coalfields Limited <br /> 
                        Government of india
                      </strong>
                    </p>

                  </div>

                </div>

              </body>
            </html>
          `,
        });

      console.log(
        "✅ Email sent successfully"
      );

      console.log(
        "Message ID:",
        mailInfo.messageId
      );

      // ==================================================
      // Registration + Email Success
      // ==================================================

      return res.status(201).json({
        success: true,

        emailSent: true,

        message:
          "Registration successful. Login details have been sent to your email.",

        registrationNumber:
          user.registrationNumber,
      });

    } catch (emailError) {

      console.error(
        "❌ Email sending error:"
      );

      console.error(
        emailError.message
      );

      // User has already been saved.
      // We don't delete the account.

      return res.status(201).json({
        success: true,

        emailSent: false,

        message:
          "Registration successful, but the login email could not be sent. Please contact support.",

        registrationNumber:
          user.registrationNumber,
      });
    }

  } catch (error) {

    console.error(
      "❌ Registration error:"
    );

    console.error(error);

    // ==================================================
    // MongoDB Duplicate Key
    // ==================================================

    if (error.code === 11000) {

      const duplicateField =
        Object.keys(
          error.keyPattern || {}
        )[0];

      let message =
        "This information is already registered.";

      if (
        duplicateField === "mobile"
      ) {
        message =
          "This mobile number is already registered.";
      }

      if (
        duplicateField === "email"
      ) {
        message =
          "This email address is already registered.";
      }

      if (
        duplicateField ===
        "registrationNumber"
      ) {
        message =
          "Registration number conflict. Please try again.";
      }

      return res.status(409).json({
        success: false,
        message,
      });
    }

    // ==================================================
    // Server Error
    // ==================================================

    return res.status(500).json({
      success: false,

      message:
        "Server error. Please try again later.",
    });
  }
});

export default router;