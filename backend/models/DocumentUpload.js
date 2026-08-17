import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    photo: {
      filename: String,
      originalName: String,
      path: String,
      mimetype: String,
      size: Number,
    },

    signature: {
      filename: String,
      originalName: String,
      path: String,
      mimetype: String,
      size: Number,
    },

    highSchoolCertificate: {
      filename: String,
      originalName: String,
      path: String,
      mimetype: String,
      size: Number,
    },

    seniorSecondaryCertificate: {
      filename: String,
      originalName: String,
      path: String,
      mimetype: String,
      size: Number,
    },

    graduationCertificate: {
      filename: String,
      originalName: String,
      path: String,
      mimetype: String,
      size: Number,
    },

    postGraduationDiplomaCertificate: {
      filename: String,
      originalName: String,
      path: String,
      mimetype: String,
      size: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "DocumentUpload",
  documentSchema
);