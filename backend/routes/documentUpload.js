import express from "express";
import multer from "multer";
import path from "path";

import cloudinary from "../config/cloudinary.js";
import DocumentUpload from "../models/DocumentUpload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| MULTER MEMORY STORAGE
|--------------------------------------------------------------------------
*/

const storage = multer.memoryStorage();

/*
|--------------------------------------------------------------------------
| FILE FILTER
|--------------------------------------------------------------------------
*/

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

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
| CREATE CLOUDINARY URL
|--------------------------------------------------------------------------
|
| This is important for OLD MongoDB records where only:
|
| filename: "cllnew/documents/photo-xxxx"
|
| was stored.
|
*/

const getCloudinaryUrl = (
  publicId,
  resourceType = "image"
) => {
  if (!publicId) {
    return "";
  }

  try {
    return cloudinary.url(publicId, {
      secure: true,
      resource_type: resourceType,
      type: "upload",
    });
  } catch (error) {
    console.error(
      "Cloudinary URL generation error:",
      error
    );

    return "";
  }
};

/*
|--------------------------------------------------------------------------
| NORMALIZE DOCUMENT
|--------------------------------------------------------------------------
|
| Converts old records into:
|
| {
|   filename,
|   cloudinaryUrl,
|   url,
|   publicId
| }
|
|--------------------------------------------------------------------------
*/

const normalizeDocumentFile = (
  documentFile,
  defaultResourceType = "image"
) => {
  if (!documentFile) {
    return documentFile;
  }

  const publicId =
    documentFile.publicId ||
    documentFile.filename ||
    "";

  const resourceType =
    documentFile.resourceType ||
    defaultResourceType;

  /*
  |--------------------------------------------------------------------------
  | Existing URL
  |--------------------------------------------------------------------------
  */

  if (
    documentFile.url ||
    documentFile.cloudinaryUrl
  ) {
    return {
      ...documentFile,
      url:
        documentFile.url ||
        documentFile.cloudinaryUrl,

      cloudinaryUrl:
        documentFile.cloudinaryUrl ||
        documentFile.url,

      publicId,
      resourceType,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | OLD RECORD
  |--------------------------------------------------------------------------
  */

  if (publicId) {
    const cloudinaryUrl =
      getCloudinaryUrl(
        publicId,
        resourceType
      );

    return {
      ...documentFile,

      filename: publicId,

      cloudinaryUrl,

      url: cloudinaryUrl,

      publicId,

      resourceType,
    };
  }

  return documentFile;
};

/*
|--------------------------------------------------------------------------
| UPLOAD BUFFER TO CLOUDINARY
|--------------------------------------------------------------------------
*/

const uploadToCloudinary = (
  buffer,
  originalName,
  fieldName,
  mimetype
) => {
  return new Promise((resolve, reject) => {
    const extension = path
      .extname(originalName)
      .toLowerCase();

    const resourceType =
      mimetype === "application/pdf"
        ? "raw"
        : "image";

    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "cllnew/documents",

          resource_type: resourceType,

          public_id:
            `${fieldName}-${Date.now()}-${Math.round(
              Math.random() * 1e9
            )}`,

          ...(resourceType === "raw"
            ? {
                format: extension.replace(
                  ".",
                  ""
                ),
              }
            : {}),
        },

        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        }
      );

    uploadStream.end(buffer);
  });
};

/*
|--------------------------------------------------------------------------
| DELETE OLD CLOUDINARY FILE
|--------------------------------------------------------------------------
*/

const deleteFromCloudinary = async (
  publicId,
  resourceType = "image"
) => {
  if (!publicId) {
    return;
  }

  try {
    await cloudinary.uploader.destroy(
      publicId,
      {
        resource_type: resourceType,
      }
    );
  } catch (error) {
    console.error(
      "Cloudinary delete error:",
      error
    );
  }
};

/*
|--------------------------------------------------------------------------
| POST DOCUMENTS
|--------------------------------------------------------------------------
|
| POST:
| /api/document-upload
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
      | CHECK NEW PHOTO
      |--------------------------------------------------------------------------
      */

      const hasNewPhoto = Boolean(
        req.files?.photo?.[0]
      );

      /*
      |--------------------------------------------------------------------------
      | CHECK NEW SIGNATURE
      |--------------------------------------------------------------------------
      */

      const hasNewSignature = Boolean(
        req.files?.signature?.[0]
      );

      /*
      |--------------------------------------------------------------------------
      | REQUIRED PHOTO CHECK
      |--------------------------------------------------------------------------
      */

      const hasPhoto =
        hasNewPhoto ||
        Boolean(
          existingDocument?.photo?.cloudinaryUrl ||
          existingDocument?.photo?.url ||
          existingDocument?.photo?.filename ||
          existingDocument?.photo?.publicId
        );

      /*
      |--------------------------------------------------------------------------
      | REQUIRED SIGNATURE CHECK
      |--------------------------------------------------------------------------
      */

      const hasSignature =
        hasNewSignature ||
        Boolean(
          existingDocument?.signature?.cloudinaryUrl ||
          existingDocument?.signature?.url ||
          existingDocument?.signature?.filename ||
          existingDocument?.signature?.publicId
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
      | CREATE RECORD
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
      | UPLOAD DOCUMENTS
      |--------------------------------------------------------------------------
      */

      for (
        const documentField of documentFields
      ) {
        const fieldName =
          documentField.name;

        const file =
          req.files?.[fieldName]?.[0];

        /*
        |--------------------------------------------------------------------------
        | NO NEW FILE
        |--------------------------------------------------------------------------
        */

        if (!file) {
          continue;
        }

        console.log(
          `Uploading ${fieldName} to Cloudinary...`
        );

        /*
        |--------------------------------------------------------------------------
        | CLOUDINARY UPLOAD
        |--------------------------------------------------------------------------
        */

        const cloudinaryResult =
          await uploadToCloudinary(
            file.buffer,
            file.originalname,
            fieldName,
            file.mimetype
          );

        console.log(
          `${fieldName} uploaded:`,
          cloudinaryResult.secure_url
        );

        /*
        |--------------------------------------------------------------------------
        | OLD FILE
        |--------------------------------------------------------------------------
        */

        const oldDocument =
          existingDocument[fieldName];

        if (
          oldDocument?.publicId &&
          oldDocument.publicId !==
            cloudinaryResult.public_id
        ) {
          await deleteFromCloudinary(
            oldDocument.publicId,
            oldDocument.resourceType ||
              "image"
          );
        }

        /*
        |--------------------------------------------------------------------------
        | SAVE CLOUDINARY INFORMATION
        |--------------------------------------------------------------------------
        */

        existingDocument[fieldName] = {
          filename:
            cloudinaryResult.public_id,

          originalName:
            file.originalname,

          cloudinaryUrl:
            cloudinaryResult.secure_url,

          url:
            cloudinaryResult.secure_url,

          publicId:
            cloudinaryResult.public_id,

          resourceType:
            cloudinaryResult.resource_type,

          mimetype:
            file.mimetype,

          size:
            file.size,

          uploadedAt:
            new Date(),
        };
      }

      /*
      |--------------------------------------------------------------------------
      | NORMALIZE OLD FILES
      |--------------------------------------------------------------------------
      |
      | This handles documents uploaded before the new URL fields existed.
      |
      */

      if (existingDocument.photo) {
        existingDocument.photo =
          normalizeDocumentFile(
            existingDocument.photo,
            "image"
          );
      }

      if (existingDocument.signature) {
        existingDocument.signature =
          normalizeDocumentFile(
            existingDocument.signature,
            "image"
          );
      }

      if (
        existingDocument.highSchoolCertificate
      ) {
        existingDocument.highSchoolCertificate =
          normalizeDocumentFile(
            existingDocument.highSchoolCertificate,
            existingDocument
              .highSchoolCertificate
              ?.resourceType ||
              "image"
          );
      }

      if (
        existingDocument.seniorSecondaryCertificate
      ) {
        existingDocument.seniorSecondaryCertificate =
          normalizeDocumentFile(
            existingDocument
              .seniorSecondaryCertificate,
            existingDocument
              .seniorSecondaryCertificate
              ?.resourceType ||
              "image"
          );
      }

      if (
        existingDocument.graduationCertificate
      ) {
        existingDocument.graduationCertificate =
          normalizeDocumentFile(
            existingDocument
              .graduationCertificate,
            existingDocument
              .graduationCertificate
              ?.resourceType ||
              "image"
          );
      }

      if (
        existingDocument.postGraduationDiplomaCertificate
      ) {
        existingDocument.postGraduationDiplomaCertificate =
          normalizeDocumentFile(
            existingDocument
              .postGraduationDiplomaCertificate,
            existingDocument
              .postGraduationDiplomaCertificate
              ?.resourceType ||
              "image"
          );
      }

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
          error.code ===
          "LIMIT_FILE_SIZE"
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
      | NO DOCUMENTS
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
      | NORMALIZE OLD PHOTO
      |--------------------------------------------------------------------------
      */

      if (documents.photo) {
        documents.photo =
          normalizeDocumentFile(
            documents.photo,
            "image"
          );
      }

      /*
      |--------------------------------------------------------------------------
      | NORMALIZE OLD SIGNATURE
      |--------------------------------------------------------------------------
      */

      if (documents.signature) {
        documents.signature =
          normalizeDocumentFile(
            documents.signature,
            "image"
          );
      }

      /*
      |--------------------------------------------------------------------------
      | NORMALIZE CERTIFICATES
      |--------------------------------------------------------------------------
      */

      if (
        documents.highSchoolCertificate
      ) {
        documents.highSchoolCertificate =
          normalizeDocumentFile(
            documents.highSchoolCertificate,
            documents
              .highSchoolCertificate
              ?.resourceType ||
              "image"
          );
      }

      if (
        documents.seniorSecondaryCertificate
      ) {
        documents.seniorSecondaryCertificate =
          normalizeDocumentFile(
            documents.seniorSecondaryCertificate,
            documents
              .seniorSecondaryCertificate
              ?.resourceType ||
              "image"
          );
      }

      if (
        documents.graduationCertificate
      ) {
        documents.graduationCertificate =
          normalizeDocumentFile(
            documents.graduationCertificate,
            documents
              .graduationCertificate
              ?.resourceType ||
              "image"
          );
      }

      if (
        documents.postGraduationDiplomaCertificate
      ) {
        documents.postGraduationDiplomaCertificate =
          normalizeDocumentFile(
            documents.postGraduationDiplomaCertificate,
            documents
              .postGraduationDiplomaCertificate
              ?.resourceType ||
              "image"
          );
      }

      /*
      |--------------------------------------------------------------------------
      | SAVE NORMALIZED URL
      |--------------------------------------------------------------------------
      |
      | This also updates the old MongoDB record so that next time
      | it already contains the Cloudinary URL.
      |
      */

      await documents.save();

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