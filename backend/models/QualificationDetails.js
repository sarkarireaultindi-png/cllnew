import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    qualification: {
      type: String,
      required: true,
    },

    boardUniversity: {
      type: String,
      trim: true,
      default: "",
    },

    passingYear: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["", "Passed", "Appearing"],
      default: "",
    },

    marks: {
      type: String,
      trim: true,
      default: "",
    },

    percentage: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const qualificationDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    education: {
      type: [educationSchema],
      default: [],
    },

    otherDetails: {
      domicileCertificateNumber: {
        type: String,
        trim: true,
        default: "",
      },

      casteCertificateNumber: {
        type: String,
        trim: true,
        default: "",
      },

      disabilityDetailsNumber: {
        type: String,
        trim: true,
        default: "",
      },

      employmentDetailsNumber: {
        type: String,
        trim: true,
        default: "",
      },
    },

    examDetails: {
      postPreference: {
        type: String,
        trim: true,
        default: "",
      },

      examCentrePreference: {
        type: String,
        trim: true,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "QualificationDetails",
  qualificationDetailsSchema
);