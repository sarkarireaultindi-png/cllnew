import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    villageCityTown: {
      type: String,
      trim: true,
      default: "",
    },

    postOffice: {
      type: String,
      trim: true,
      default: "",
    },

    policeStation: {
      type: String,
      trim: true,
      default: "",
    },

    subDistrict: {
      type: String,
      trim: true,
      default: "",
    },

    district: {
      type: String,
      trim: true,
      default: "",
    },

    state: {
      type: String,
      trim: true,
      default: "",
    },

    pinCode: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const personalDetailsSchema = new mongoose.Schema(
  {
    // Registration user ID
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
      unique: true,
      index: true,
    },

    // These are copied from Registration for easy access.
    // They should NOT be edited from this form.
    name: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Transgender"],
      required: true,
    },

    category: {
      type: String,
      enum: ["UR", "EWS", "OBC", "SC", "ST"],
      required: true,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    motherName: {
      type: String,
      required: true,
      trim: true,
    },

    nationality: {
      type: String,
      default: "Indian",
      trim: true,
    },

    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
      required: true,
    },

    permanentAddress: {
      type: addressSchema,
      required: true,
    },

    sameAddress: {
      type: Boolean,
      default: false,
    },

    correspondenceAddress: {
      type: addressSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "PersonalDetails",
  personalDetailsSchema
);