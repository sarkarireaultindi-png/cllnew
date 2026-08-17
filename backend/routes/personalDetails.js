import express from "express";
import PersonalDetails from "../models/PersonalDetails.js";
import Registration from "../models/UserDetails.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| GET PERSONAL DETAILS
|--------------------------------------------------------------------------
| Fetch registration name + DOB automatically and existing personal details
|--------------------------------------------------------------------------
*/

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find registration user
    const registration = await Registration.findById(userId).select(
      "name dob"
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration record not found.",
      });
    }

    // Find previously saved personal details
    const personalDetails = await PersonalDetails.findOne({
      userId,
    });

    return res.status(200).json({
      success: true,

      user: {
        name: registration.name,
        dob: registration.dob,
      },

      personalDetails: personalDetails || null,
    });
  } catch (error) {
    console.error("Get personal details error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching personal details.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| POST / CREATE OR UPDATE PERSONAL DETAILS
|--------------------------------------------------------------------------
*/

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      gender,
      category,
      fatherName,
      motherName,
      nationality,
      maritalStatus,
      permanentAddress,
      sameAddress,
      correspondenceAddress,
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // Find registration record
    const registration = await Registration.findById(userId).select(
      "name dob"
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration record not found.",
      });
    }

    // Create/update personal details
    const personalDetails = await PersonalDetails.findOneAndUpdate(
      { userId },

      {
        userId,

        // Always take these from Registration
        name: registration.name,
        dob: registration.dob,

        gender,
        category,
        fatherName,
        motherName,
        nationality: nationality || "Indian",
        maritalStatus,

        permanentAddress,

        sameAddress: Boolean(sameAddress),

        correspondenceAddress: sameAddress
          ? permanentAddress
          : correspondenceAddress,
      },

      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Personal details saved successfully.",
      personalDetails,
    });
  } catch (error) {
    console.error("Save personal details error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while saving personal details.",
    });
  }
});

export default router;