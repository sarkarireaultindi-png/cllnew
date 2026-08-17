import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import DocumentUpload from "../models/DocumentUpload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| UPLOAD DIRECTORY
|--------------------------------------------------------------------------
*/

const uploadDir = "uploads/documents";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

/*
|--------------------------------------------------------------------------
| MULTER STORAGE
|--------------------------------------------------------------------------
*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path
      .extname(file.originalname)
      .toLowerCase();

    const filename =
      `${file.fieldname}-${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${ext}`;

    cb(null, filename);
  },
});

/*
|--------------------------------------------------------------------------
| FILE FILTER
|--------------------------------------------------------------------------
|
| Photo + Signature:
| JPG / JPEG / PNG
|
| Certificates:
| JPG / JPEG / PNG / PDF
|
|--------------------------------------------------------------------------
*/

const fileFilter = (req, file, cb) => {
  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const imageMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  const allowedImageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
  ];

  const certificateExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".pdf",
  ];

  const certificateMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  /*
  |--------------------------------------------------------------------------
  | PHOTO / SIGNATURE
  |--------------------------------------------------------------------------
  */

  if (
    file.fieldname === "photo" ||
    file.fieldname === "signature"
  ) {
    if (
      imageMimeTypes.includes(file.mimetype) &&
      allowedImageExtensions.includes(extension)
    ) {
      return cb(null, true);
    }

    return cb(
      new Error(
        "Photo and Signature must be JPG, JPEG or PNG files."
      ),
      false
    );
  }

  /*
  |--------------------------------------------------------------------------
  | CERTIFICATES
  |--------------------------------------------------------------------------
  */

  if (
    [
      "highSchoolCertificate",
      "seniorSecondaryCertificate",
      "graduationCertificate",
      "postGraduationDiplomaCertificate",
    ].includes(file.fieldname)
  ) {
    if (
      certificateMimeTypes.includes(file.mimetype) &&
      certificateExtensions.includes(extension)
    ) {
      return cb(null, true);
    }

    return cb(
      new Error(
        "Certificates must be JPG, JPEG, PNG or PDF files."
      ),
      false
    );
  }

  return cb(
    new Error("Invalid document field."),
    false
  );
};

/*
|--------------------------------------------------------------------------
| MULTER
|--------------------------------------------------------------------------
*/

const upload = multer({
  storage,
  fileFilter,

  limits: {
    // 2 MB maximum server-side limit
    fileSize: 2 * 1024 * 1024,
  },
});

/*
|--------------------------------------------------------------------------
| DOCUMENT FIELDS
|--------------------------------------------------------------------------
*/

const documentFields = [
  {
    name: "photo",
    maxCount: 1,
  },
  {
    name: "signature",
    maxCount: 1,
  },
  {
    name: "highSchoolCertificate",
    maxCount: 1,
  },
  {
    name: "seniorSecondaryCertificate",
    maxCount: 1,
  },
  {
    name: "graduationCertificate",
    maxCount: 1,
  },
  {
    name: "postGraduationDiplomaCertificate",
    maxCount: 1,
  },
];

/*
|--------------------------------------------------------------------------
| POST DOCUMENTS
|--------------------------------------------------------------------------
|
| IMPORTANT:
|
| If the user already has photo in MongoDB, they can upload only
| signature.
|
| If the user already has signature in MongoDB, they can upload only
| photo.
|
| If neither exists, both are required.
|
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  upload.fields(documentFields),

  async (req, res) => {
    try {
      const { userId } = req.body;

      /*
      |--------------------------------------------------------------------------
      | USER ID
      |--------------------------------------------------------------------------
      */

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | FIND EXISTING DOCUMENT
      |--------------------------------------------------------------------------
      */

      let existingDocument =
        await DocumentUpload.findOne({
          userId,
        });

      /*
      |--------------------------------------------------------------------------
      | CHECK WHAT WAS ACTUALLY UPLOADED
      |--------------------------------------------------------------------------
      */

      const hasNewPhoto =
        Boolean(
          req.files?.photo?.[0]
        );

      const hasNewSignature =
        Boolean(
          req.files?.signature?.[0]
        );

      /*
      |--------------------------------------------------------------------------
      | REQUIRED DOCUMENT CHECK
      |--------------------------------------------------------------------------
      |
      | A document can be satisfied by:
      |
      | 1. New uploaded file
      | OR
      | 2. Existing MongoDB file
      |
      |--------------------------------------------------------------------------
      */

      const hasPhoto =
        hasNewPhoto ||
        Boolean(
          existingDocument?.photo?.filename
        );

      const hasSignature =
        hasNewSignature ||
        Boolean(
          existingDocument?.signature?.filename
        );

      /*
      |--------------------------------------------------------------------------
      | PHOTO REQUIRED
      |--------------------------------------------------------------------------
      */

      if (!hasPhoto) {
        return res.status(400).json({
          success: false,
          message:
            "Please upload Passport Size Photo.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | SIGNATURE REQUIRED
      |--------------------------------------------------------------------------
      */

      if (!hasSignature) {
        return res.status(400).json({
          success: false,
          message:
            "Please upload Signature.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | PREPARE NEW DOCUMENT DATA
      |--------------------------------------------------------------------------
      */

      const documentData = {};

      for (
        const documentName of documentFields.map(
          (field) => field.name
        )
      ) {
        /*
        |--------------------------------------------------------------------------
        | Only update fields that were actually uploaded
        |--------------------------------------------------------------------------
        */

        if (
          req.files &&
          req.files[documentName] &&
          req.files[documentName][0]
        ) {
          const file =
            req.files[documentName][0];

          documentData[documentName] = {
            filename: file.filename,

            originalName:
              file.originalname,

            path: file.path,

            mimetype:
              file.mimetype,

            size: file.size,

            uploadedAt: new Date(),
          };
        }
      }

      /*
      |--------------------------------------------------------------------------
      | CREATE NEW RECORD
      |--------------------------------------------------------------------------
      */

      if (!existingDocument) {
        existingDocument =
          new DocumentUpload({
            userId,
          });
      }

      /*
      |--------------------------------------------------------------------------
      | UPDATE ONLY NEWLY UPLOADED DOCUMENTS
      |--------------------------------------------------------------------------
      |
      | IMPORTANT:
      |
      | If user uploads only signature:
      |
      | existing photo stays untouched.
      |
      | If user uploads only photo:
      |
      | existing signature stays untouched.
      |
      |--------------------------------------------------------------------------
      */

      Object.keys(documentData).forEach(
        (documentName) => {
          existingDocument[documentName] =
            documentData[documentName];
        }
      );

      /*
      |--------------------------------------------------------------------------
      | SAVE
      |--------------------------------------------------------------------------
      */

      const savedDocument =
        await existingDocument.save();

      /*
      |--------------------------------------------------------------------------
      | RESPONSE
      |--------------------------------------------------------------------------
      */

      return res.status(200).json({
        success: true,

        message:
          "Documents uploaded successfully.",

        documents: savedDocument,
      });
    } catch (error) {
      console.error(
        "Document upload error:",
        error
      );

      /*
      |--------------------------------------------------------------------------
      | MULTER ERROR
      |--------------------------------------------------------------------------
      */

      if (
        error instanceof multer.MulterError
      ) {
        if (
          error.code === "LIMIT_FILE_SIZE"
        ) {
          return res.status(400).json({
            success: false,
            message:
              "File size cannot exceed 2 MB.",
          });
        }

        return res.status(400).json({
          success: false,
          message:
            error.message ||
            "File upload error.",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | OTHER ERROR
      |--------------------------------------------------------------------------
      */

      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "Unable to upload documents.",
      });
    }
  }
);

/*
|--------------------------------------------------------------------------
| GET DOCUMENTS
|--------------------------------------------------------------------------
|
| GET:
| /api/document-upload/:userId
|
|--------------------------------------------------------------------------
*/

router.get(
  "/:userId",
  async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message:
            "User ID is required.",
        });
      }

      const documents =
        await DocumentUpload.findOne({
          userId,
        });

      /*
      |--------------------------------------------------------------------------
      | No documents yet
      |--------------------------------------------------------------------------
      */

      if (!documents) {
        return res.status(200).json({
          success: true,
          documents: null,
        });
      }

      /*
      |--------------------------------------------------------------------------
      | RETURN DOCUMENTS
      |--------------------------------------------------------------------------
      */

      return res.status(200).json({
        success: true,
        documents,
      });
    } catch (error) {
      console.error(
        "Get documents error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Unable to fetch documents.",
      });
    }
  }
);

export default router;