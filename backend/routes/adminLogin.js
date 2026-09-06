import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| ADMIN LOGIN
|--------------------------------------------------------------------------
*/

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    const admin = await Admin.findOne({
      username: username.trim(),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE JWT
    |--------------------------------------------------------------------------
    */

    const token = jwt.sign(
      {
        id: admin._id.toString(),
        username: admin.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN || "1h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during admin login.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| CHECK ADMIN SESSION
|--------------------------------------------------------------------------
*/

router.get(
  "/me",
  adminAuth,
  async (req, res) => {
    return res.status(200).json({
      success: true,
      admin: {
        id: req.admin._id,
        username: req.admin.username,
      },
    });
  }
);

/*
|--------------------------------------------------------------------------
| CHANGE ADMIN PASSWORD
|--------------------------------------------------------------------------
|
| This route is protected.
|
| The currently logged-in admin must provide:
|
| currentPassword
| newPassword
|
| After changing the password:
|
| passwordChangedAt = current time
|
| Any JWT issued before this time becomes invalid.
|--------------------------------------------------------------------------
*/

router.post(
  "/change-password",
  adminAuth,
  async (req, res) => {
    try {
      const {
        currentPassword,
        newPassword,
      } = req.body;

      /*
      |--------------------------------------------------------------------------
      | VALIDATION
      |--------------------------------------------------------------------------
      */

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message:
            "Current password and new password are required.",
        });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          message:
            "New password must contain at least 8 characters.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | FIND ADMIN
      |--------------------------------------------------------------------------
      */

      const admin = await Admin.findById(
        req.admin._id
      );

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin account not found.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | CHECK CURRENT PASSWORD
      |--------------------------------------------------------------------------
      */

      const passwordMatch =
        await bcrypt.compare(
          currentPassword,
          admin.password
        );

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message:
            "Current password is incorrect.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | PREVENT SAME PASSWORD
      |--------------------------------------------------------------------------
      */

      const samePassword =
        await bcrypt.compare(
          newPassword,
          admin.password
        );

      if (samePassword) {
        return res.status(400).json({
          success: false,
          message:
            "New password must be different from the current password.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | HASH NEW PASSWORD
      |--------------------------------------------------------------------------
      */

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      /*
      |--------------------------------------------------------------------------
      | UPDATE PASSWORD
      |--------------------------------------------------------------------------
      */

      admin.password = hashedPassword;

      /*
      |--------------------------------------------------------------------------
      | IMPORTANT
      |--------------------------------------------------------------------------
      |
      | This timestamp is used by adminAuth middleware
      | to invalidate older JWT tokens.
      |
      */

      admin.passwordChangedAt =
        new Date();

      await admin.save();

      return res.status(200).json({
        success: true,
        message:
          "Password changed successfully. Previous sessions are now invalid.",
      });
    } catch (error) {
      console.error(
        "Change admin password error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Server error while changing password.",
      });
    }
  }
);

export default router;