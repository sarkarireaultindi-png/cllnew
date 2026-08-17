import express from "express";
import QualificationDetails from "../models/QualificationDetails.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| SAVE / UPDATE QUALIFICATION DETAILS
|--------------------------------------------------------------------------
| POST /api/qualification-details
|--------------------------------------------------------------------------
*/

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      education,
      otherDetails,
      examDetails,
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    if (!Array.isArray(education)) {
      return res.status(400).json({
        success: false,
        message: "Education details are required.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Validate education rows
    |--------------------------------------------------------------------------
    */

    for (const row of education) {
      if (!row.qualification) {
        return res.status(400).json({
          success: false,
          message: "Qualification is missing.",
        });
      }

      if (
        row.passingYear &&
        !/^\d{4}$/.test(String(row.passingYear))
      ) {
        return res.status(400).json({
          success: false,
          message: `Invalid passing year for ${row.qualification}.`,
        });
      }

      if (
        row.percentage &&
        !/^\d+(\.\d+)?$/.test(
          String(row.percentage)
        )
      ) {
        return res.status(400).json({
          success: false,
          message: `Invalid percentage for ${row.qualification}.`,
        });
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Create or update
    |--------------------------------------------------------------------------
    */

    const qualificationDetails =
      await QualificationDetails.findOneAndUpdate(
        { userId },

        {
          userId,

          education,

          otherDetails: {
            domicileCertificateNumber:
              otherDetails?.domicileCertificateNumber ||
              "",

            casteCertificateNumber:
              otherDetails?.casteCertificateNumber ||
              "",

            disabilityDetailsNumber:
              otherDetails?.disabilityDetailsNumber ||
              "",

            employmentDetailsNumber:
              otherDetails?.employmentDetailsNumber ||
              "",
          },

          examDetails: {
            postPreference:
              examDetails?.postPreference || "",

            examCentrePreference:
              examDetails?.examCentrePreference ||
              "",
          },
        },

        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );

    return res.status(200).json({
      success: true,
      message:
        "Qualification details saved successfully.",
      qualificationDetails,
    });
  } catch (error) {
    console.error(
      "Save qualification details error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to save qualification details.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET QUALIFICATION DETAILS
|--------------------------------------------------------------------------
| GET /api/qualification-details/:userId
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

    const qualificationDetails =
      await QualificationDetails.findOne({
        userId,
      });

    /*
    |--------------------------------------------------------------------------
    | No data yet
    |--------------------------------------------------------------------------
    */

    if (!qualificationDetails) {
      return res.status(200).json({
        success: true,
        qualificationDetails: null,
      });
    }

    return res.status(200).json({
      success: true,
      qualificationDetails,
    });
  } catch (error) {
    console.error(
      "Get qualification details error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch qualification details.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| DELETE QUALIFICATION DETAILS
|--------------------------------------------------------------------------
| Optional
|--------------------------------------------------------------------------
*/

router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    await QualificationDetails.findOneAndDelete({
      userId,
    });

    return res.status(200).json({
      success: true,
      message:
        "Qualification details deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete qualification details error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to delete qualification details.",
    });
  }
});

export default router;