import mongoose from "mongoose";

const fileSchema = {
  filename: {
    type: String,
  },

  originalName: {
    type: String,
  },

  /*
  |--------------------------------------------------------------------------
  | Cloudinary URL
  |--------------------------------------------------------------------------
  */

  cloudinaryUrl: {
    type: String,
  },

  url: {
    type: String,
  },

  /*
  |--------------------------------------------------------------------------
  | Cloudinary Public ID
  |--------------------------------------------------------------------------
  */

  publicId: {
    type: String,
  },

  /*
  |--------------------------------------------------------------------------
  | Cloudinary Resource Type
  |--------------------------------------------------------------------------
  */

  resourceType: {
    type: String,
    default: "image",
  },

  /*
  |--------------------------------------------------------------------------
  | Old path field
  |--------------------------------------------------------------------------
  */

  path: {
    type: String,
  },

  mimetype: {
    type: String,
  },

  size: {
    type: Number,
  },

  uploadedAt: {
    type: Date,
  },
};

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    /*
    |--------------------------------------------------------------------------
    | PHOTO
    |--------------------------------------------------------------------------
    */

    photo: {
      type: fileSchema,
      default: undefined,
    },

    /*
    |--------------------------------------------------------------------------
    | SIGNATURE
    |--------------------------------------------------------------------------
    */

    signature: {
      type: fileSchema,
      default: undefined,
    },

    /*
    |--------------------------------------------------------------------------
    | HIGH SCHOOL
    |--------------------------------------------------------------------------
    */

    highSchoolCertificate: {
      type: fileSchema,
      default: undefined,
    },

    /*
    |--------------------------------------------------------------------------
    | SENIOR SECONDARY
    |--------------------------------------------------------------------------
    */

    seniorSecondaryCertificate: {
      type: fileSchema,
      default: undefined,
    },

    /*
    |--------------------------------------------------------------------------
    | GRADUATION
    |--------------------------------------------------------------------------
    */

    graduationCertificate: {
      type: fileSchema,
      default: undefined,
    },

    /*
    |--------------------------------------------------------------------------
    | POST GRADUATION / DIPLOMA
    |--------------------------------------------------------------------------
    */

    postGraduationDiplomaCertificate: {
      type: fileSchema,
      default: undefined,
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