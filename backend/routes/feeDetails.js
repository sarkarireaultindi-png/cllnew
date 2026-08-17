import express from "express";
import PersonalDetails from "../models/PersonalDetails.js";
import FeeDetails from "../models/FeeDetails.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| GET FEE DETAILS
|--------------------------------------------------------------------------
| GET /api/fee-details/:userId
|--------------------------------------------------------------------------
*/

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | FIND PERSONAL DETAILS
    |--------------------------------------------------------------------------
    */

    const personalDetails = await PersonalDetails.findOne({
      userId,
    }).select("category name");

    if (!personalDetails) {
      return res.status(404).json({
        success: false,
        message:
          "Personal details not found. Please complete your personal details first.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | GET CATEGORY
    |--------------------------------------------------------------------------
    */

    const category = personalDetails.category;

    /*
    |--------------------------------------------------------------------------
    | CALCULATE FEE
    |--------------------------------------------------------------------------
    */

    let amount;

    if (
      category === "UR" ||
      category === "EWS" ||
      category === "OBC"
    ) {
      amount = 400;
    } else if (
      category === "SC" ||
      category === "ST"
    ) {
      amount = 250;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid category.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | SAVE / UPDATE FEE DETAILS
    |--------------------------------------------------------------------------
    */

    const feeDetails = await FeeDetails.findOneAndUpdate(
      { userId },
      {
        userId,
        category,
        amount,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({
      success: true,
      message: "Fee details fetched successfully.",
      feeDetails: {
        userId: feeDetails.userId,
        category: feeDetails.category,
        amount: feeDetails.amount,
        paymentStatus: feeDetails.paymentStatus,
      },
    });
  } catch (error) {
    console.error("Fee details error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch fee details.",
    });
  }
});

export default router;