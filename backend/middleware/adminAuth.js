import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Admin authentication required.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    // Password-change security check
    if (admin.passwordChangedAt && decoded.iat) {
      const passwordChangedAt =
        new Date(admin.passwordChangedAt).getTime();

      const tokenIssuedAt =
        decoded.iat * 1000;

      console.log("========== ADMIN AUTH CHECK ==========");
      console.log("Token issued:", new Date(tokenIssuedAt));
      console.log("Password changed:", new Date(passwordChangedAt));
      console.log("Token issued timestamp:", tokenIssuedAt);
      console.log("Password changed timestamp:", passwordChangedAt);
      console.log("======================================");

      if (tokenIssuedAt <= passwordChangedAt) {
        return res.status(401).json({
          success: false,
          message:
            "Your session has expired because the password was changed.",
        });
      }
    }

    req.admin = admin;

    next();

  } catch (error) {
    console.error("Admin authentication error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin session.",
    });
  }
};