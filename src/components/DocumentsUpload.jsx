import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function DocumentsUpload() {
  const location = useLocation();
  const navigate = useNavigate();

  const userId =
    location.state?.userId || localStorage.getItem("userId");

  // ============================================================
  // DOCUMENT CONFIGURATION
  // ============================================================

  const documents = [
    {
      name: "photo",
      label: "Passport Size Photo",
      required: true,
      minSize: 50,
      maxSize: 200,
      sizeText: "50 KB to 200 KB",
      allowedExtensions: [".jpg", ".jpeg", ".png"],
      allowedTypes: [
        "image/jpeg",
        "image/jpg",
        "image/png",
      ],
      accept:
        ".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png",
    },

    {
      name: "signature",
      label: "Signature",
      required: true,
      minSize: 0,
      maxSize: 100,
      sizeText: "0 KB to 100 KB",
      allowedExtensions: [".jpg", ".jpeg", ".png"],
      allowedTypes: [
        "image/jpeg",
        "image/jpg",
        "image/png",
      ],
      accept:
        ".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png",
    },

    {
      name: "highSchoolCertificate",
      label: "High School Certificate",
      required: false,
      minSize: 50,
      maxSize: 200,
      sizeText: "50 KB to 200 KB",
      allowedExtensions: [
        ".jpg",
        ".jpeg",
        ".png",
        ".pdf",
      ],
      allowedTypes: [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ],
      accept:
        ".jpg,.jpeg,.png,.pdf,image/jpeg,image/jpg,image/png,application/pdf",
    },

    {
      name: "seniorSecondaryCertificate",
      label: "Senior Secondary Certificate",
      required: false,
      minSize: 50,
      maxSize: 200,
      sizeText: "50 KB to 200 KB",
      allowedExtensions: [
        ".jpg",
        ".jpeg",
        ".png",
        ".pdf",
      ],
      allowedTypes: [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ],
      accept:
        ".jpg,.jpeg,.png,.pdf,image/jpeg,image/jpg,image/png,application/pdf",
    },

    {
      name: "graduationCertificate",
      label: "Graduation Certificate",
      required: false,
      minSize: 50,
      maxSize: 200,
      sizeText: "50 KB to 200 KB",
      allowedExtensions: [
        ".jpg",
        ".jpeg",
        ".png",
        ".pdf",
      ],
      allowedTypes: [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ],
      accept:
        ".jpg,.jpeg,.png,.pdf,image/jpeg,image/jpg,image/png,application/pdf",
    },

    {
      name: "postGraduationDiplomaCertificate",
      label: "Post Graduation / Diploma Certificate",
      required: false,
      minSize: 50,
      maxSize: 200,
      sizeText: "50 KB to 200 KB",
      allowedExtensions: [
        ".jpg",
        ".jpeg",
        ".png",
        ".pdf",
      ],
      allowedTypes: [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ],
      accept:
        ".jpg,.jpeg,.png,.pdf,image/jpeg,image/jpg,image/png,application/pdf",
    },
  ];

  // ============================================================
  // EMPTY STATES
  // ============================================================

  const emptyFiles = {
    photo: null,
    signature: null,
    highSchoolCertificate: null,
    seniorSecondaryCertificate: null,
    graduationCertificate: null,
    postGraduationDiplomaCertificate: null,
  };

  const emptyErrors = {
    photo: "",
    signature: "",
    highSchoolCertificate: "",
    seniorSecondaryCertificate: "",
    graduationCertificate: "",
    postGraduationDiplomaCertificate: "",
  };

  const [files, setFiles] = useState(emptyFiles);

  const [uploadedDocuments, setUploadedDocuments] =
    useState({});

  const [loadingDocuments, setLoadingDocuments] =
    useState(true);

  const [fileErrors, setFileErrors] =
    useState(emptyErrors);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // ============================================================
  // FETCH EXISTING DOCUMENTS
  // ============================================================

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!userId) {
        setLoadingDocuments(false);

        setError(
          "User registration information not found. Please login again."
        );

        return;
      }

      try {
        setLoadingDocuments(true);
        setError("");

        const response = await fetch(
          `https://www.ccl.ac/document-upload/${userId}`
        );

        let data = {};

        try {
          data = await response.json();
        } catch {
          throw new Error(
            "Invalid response received from server."
          );
        }

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to fetch uploaded documents."
          );
        }

        console.log(
          "DOCUMENT API RESPONSE:",
          data
        );

        // ======================================================
        // NORMALIZE API RESPONSE
        // ======================================================

        let documentsData = data.documents || {};

        /*
         * Handles response such as:
         *
         * {
         *   documents: {
         *     photo: {...},
         *     signature: {...}
         *   }
         * }
         *
         * OR:
         *
         * {
         *   documents: {
         *     documents: {
         *       photo: {...}
         *     }
         *   }
         * }
         */

        if (
          documentsData &&
          documentsData.documents &&
          typeof documentsData.documents === "object" &&
          !Array.isArray(documentsData.documents)
        ) {
          documentsData =
            documentsData.documents;
        }

        /*
         * If backend returns an array:
         *
         * [
         *   {
         *     name: "photo",
         *     filename: "abc.jpg"
         *   }
         * ]
         */

        if (Array.isArray(documentsData)) {
          const normalized = {};

          documentsData.forEach((item) => {
            if (!item) {
              return;
            }

            const documentName =
              item.name ||
              item.documentName ||
              item.fieldname;

            if (documentName) {
              normalized[documentName] = item;
            }
          });

          documentsData = normalized;
        }

        console.log(
          "FINAL NORMALIZED DOCUMENTS:",
          documentsData
        );

        setUploadedDocuments(
          documentsData || {}
        );
      } catch (err) {
        console.error(
          "Fetch documents error:",
          err
        );

        setError(
          err.message ||
            "Unable to fetch uploaded documents."
        );

        setUploadedDocuments({});
      } finally {
        setLoadingDocuments(false);
      }
    };

    fetchDocuments();
  }, [userId]);

  // ============================================================
  // FORMAT FILE SIZE
  // ============================================================

  const formatFileSize = (bytes) => {
    if (!bytes || bytes <= 0) {
      return "0 KB";
    }

    const kb = bytes / 1024;

    if (kb < 1024) {
      return `${kb.toFixed(2)} KB`;
    }

    return `${(kb / 1024).toFixed(2)} MB`;
  };

  // ============================================================
  // GET FILE EXTENSION
  // ============================================================

  const getFileExtension = (fileName) => {
    if (!fileName) {
      return "";
    }

    const lastDot =
      fileName.lastIndexOf(".");

    if (lastDot === -1) {
      return "";
    }

    return fileName
      .substring(lastDot)
      .toLowerCase();
  };

  // ============================================================
  // VALIDATE FILE
  // ============================================================

  const validateFile = (file, document) => {
    if (!file) {
      return `Please upload ${document.label}.`;
    }

    const minBytes =
      document.minSize * 1024;

    const maxBytes =
      document.maxSize * 1024;

    // ==========================================================
    // MAXIMUM SIZE
    // ==========================================================

    if (file.size > maxBytes) {
      return (
        `You are uploading more than ${document.maxSize} KB. ` +
        `Your selected file is ${formatFileSize(
          file.size
        )}. ` +
        `Maximum allowed size is ${document.maxSize} KB.`
      );
    }

    // ==========================================================
    // MINIMUM SIZE
    // ==========================================================

    if (file.size < minBytes) {
      return (
        `File size is too small. ` +
        `Your selected file is ${formatFileSize(
          file.size
        )}. ` +
        `Minimum allowed size is ${document.minSize} KB.`
      );
    }

    // ==========================================================
    // EXTENSION
    // ==========================================================

    const extension =
      getFileExtension(file.name);

    if (
      !document.allowedExtensions.includes(
        extension
      )
    ) {
      return (
        `Invalid file format. ` +
        `Allowed formats: ${document.allowedExtensions.join(
          ", "
        )}.`
      );
    }

    // ==========================================================
    // MIME TYPE
    // ==========================================================

    if (
      file.type &&
      !document.allowedTypes.includes(
        file.type
      )
    ) {
      return (
        `Invalid file type. ` +
        `Allowed formats: ${document.allowedExtensions.join(
          ", "
        )}.`
      );
    }

    return "";
  };

  // ============================================================
  // CHECK IF DATABASE DOCUMENT EXISTS
  // ============================================================

  const hasUploadedDocument = (
    documentName
  ) => {
    const document =
      uploadedDocuments?.[documentName];

    if (!document) {
      return false;
    }

    /*
     * Different backend implementations may return
     * different properties.
     *
     * Any one of these means the document exists.
     */

    return Boolean(
      document.filename ||
      document.originalName ||
      document.path ||
      document.url
    );
  };

  // ============================================================
  // FILE CHANGE
  // ============================================================

  const handleFileChange = (
    e,
    document
  ) => {
    const input = e.target;

    const file =
      input.files &&
      input.files.length > 0
        ? input.files[0]
        : null;

    setError("");
    setSuccess("");

    setFileErrors((previous) => ({
      ...previous,
      [document.name]: "",
    }));

    if (!file) {
      return;
    }

    // ==========================================================
    // VALIDATE NEW FILE
    // ==========================================================

    const validationError =
      validateFile(
        file,
        document
      );

    if (validationError) {
      setFileErrors((previous) => ({
        ...previous,
        [document.name]:
          validationError,
      }));

      setFiles((previous) => ({
        ...previous,
        [document.name]: null,
      }));

      input.value = "";

      return;
    }

    // ==========================================================
    // SAVE NEW FILE
    // ==========================================================

    setFiles((previous) => ({
      ...previous,
      [document.name]: file,
    }));

    /*
     * IMPORTANT:
     *
     * DO NOT DELETE OR SET uploadedDocuments[document.name]
     * TO NULL HERE.
     *
     * Example:
     *
     * Existing DB:
     *
     * photo = cmd_img.jpeg
     *
     * User selects:
     *
     * signature = new-signature.jpg
     *
     * Photo must remain in uploadedDocuments.
     */

    setSuccess(
      `✓ ${document.label} selected successfully. File size: ${formatFileSize(
        file.size
      )}.`
    );
  };

  // ============================================================
  // REQUIRED DOCUMENTS
  // ============================================================

  const requiredDocuments =
    documents.filter(
      (document) =>
        document.required
    );

  // ============================================================
  // CHECK REQUIRED DOCUMENT
  // ============================================================

  const isRequiredDocumentComplete = (
    document
  ) => {
    // New local file
    const localFile =
      files[document.name] instanceof File;

    if (localFile) {
      return true;
    }

    // Existing database file
    return hasUploadedDocument(
      document.name
    );
  };

  // ============================================================
  // REQUIRED DOCUMENT COUNT
  // ============================================================

  const completedRequiredCount =
    requiredDocuments.filter(
      (document) =>
        isRequiredDocumentComplete(
          document
        )
    ).length;

  const allRequiredDocumentsUploaded =
    completedRequiredCount ===
    requiredDocuments.length;

  // ============================================================
  // VALIDATE ALL REQUIRED DOCUMENTS
  // ============================================================

  const validateAllDocuments = () => {
    if (!userId) {
      setError(
        "User registration information not found. Please login again."
      );

      return false;
    }

    let isValid = true;

    const newErrors = {
      photo: "",
      signature: "",
      highSchoolCertificate: "",
      seniorSecondaryCertificate: "",
      graduationCertificate: "",
      postGraduationDiplomaCertificate: "",
    };

    // ==========================================================
    // REQUIRED DOCUMENT VALIDATION
    // ==========================================================

    requiredDocuments.forEach(
      (document) => {
        const localFile =
          files[document.name];

        // ======================================================
        // CASE 1:
        // NEW FILE SELECTED
        // ======================================================

        if (
          localFile instanceof File
        ) {
          const validationError =
            validateFile(
              localFile,
              document
            );

          if (validationError) {
            newErrors[
              document.name
            ] = validationError;

            isValid = false;
          }

          return;
        }

        // ======================================================
        // CASE 2:
        // EXISTING DATABASE FILE
        // ======================================================

        const existingFile =
          uploadedDocuments?.[
            document.name
          ];

        const databaseFileExists =
          Boolean(
            existingFile &&
            (
              existingFile.filename ||
              existingFile.originalName ||
              existingFile.path ||
              existingFile.url
            )
          );

        console.log(
          `${document.name} existing file:`,
          existingFile
        );

        console.log(
          `${document.name} exists:`,
          databaseFileExists
        );

        if (databaseFileExists) {
          newErrors[
            document.name
          ] = "";

          return;
        }

        // ======================================================
        // CASE 3:
        // MISSING REQUIRED DOCUMENT
        // ======================================================

        newErrors[
          document.name
        ] =
          `Please upload ${document.label}.`;

        isValid = false;
      }
    );

    // ==========================================================
    // OPTIONAL DOCUMENTS
    // ==========================================================

    newErrors.highSchoolCertificate =
      "";

    newErrors.seniorSecondaryCertificate =
      "";

    newErrors.graduationCertificate =
      "";

    newErrors.postGraduationDiplomaCertificate =
      "";

    setFileErrors(newErrors);

    console.log(
      "================ DOCUMENT VALIDATION ================"
    );

    console.log(
      "Uploaded Documents:",
      uploadedDocuments
    );

    console.log(
      "Local Files:",
      files
    );

    console.log(
      "Validation Result:",
      isValid
    );

    console.log(
      "======================================================"
    );

    return isValid;
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setError("");
    setSuccess("");

    // ==========================================================
    // USER ID CHECK
    // ==========================================================

    if (!userId) {
      setError(
        "User registration information not found. Please login again."
      );

      return;
    }

    // ==========================================================
    // VALIDATE DOCUMENTS
    // ==========================================================

    const validationPassed =
      validateAllDocuments();

    if (!validationPassed) {
      return;
    }

    // ==========================================================
    // CALCULATE CURRENT REQUIRED STATUS
    // ==========================================================

    /*
     * We calculate this directly instead of relying only
     * on allRequiredDocumentsUploaded.
     *
     * This avoids stale React state issues.
     */

    const requiredCompleteNow =
      requiredDocuments.every(
        (document) => {
          const localFile =
            files[document.name] instanceof File;

          const existingFile =
            uploadedDocuments?.[
              document.name
            ];

          const databaseFile =
            Boolean(
              existingFile &&
              (
                existingFile.filename ||
                existingFile.originalName ||
                existingFile.path ||
                existingFile.url
              )
            );

          return (
            localFile ||
            databaseFile
          );
        }
      );

    console.log(
      "Required documents complete:",
      requiredCompleteNow
    );

    if (!requiredCompleteNow) {
      validateAllDocuments();

      return;
    }

    // ==========================================================
    // CHECK NEW FILES
    // ==========================================================

    const hasNewFiles =
      documents.some(
        (document) =>
          files[document.name] instanceof File
      );

    // ==========================================================
    // NOTHING NEW TO UPLOAD
    // ==========================================================

    if (!hasNewFiles) {
      setSuccess(
        "✓ Required documents are already uploaded."
      );

      localStorage.setItem(
        "userId",
        userId
      );

      setTimeout(() => {
        navigate("/fee-details", {
          state: {
            userId,
          },
        });
      }, 700);

      return;
    }

    // ==========================================================
    // UPLOAD NEW FILES
    // ==========================================================

    try {
      setSaving(true);

      const formData =
        new FormData();

      formData.append(
        "userId",
        userId
      );

      // ========================================================
      // APPEND ONLY NEW FILES
      // ========================================================

      documents.forEach(
        (document) => {
          const file =
            files[document.name];

          if (
            file instanceof File
          ) {
            formData.append(
              document.name,
              file
            );
          }
        }
      );

      console.log(
        "Uploading documents for user:",
        userId
      );

      const response =
        await fetch(
          "https://www.ccl.ac/api/document-upload",
          {
            method: "POST",
            body: formData,
          }
        );

      let data = {};

      try {
        data =
          await response.json();
      } catch {
        throw new Error(
          "Invalid response received from server."
        );
      }

      console.log(
        "UPLOAD RESPONSE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to upload documents."
        );
      }

      // ========================================================
      // MERGE API DOCUMENTS WITH EXISTING DOCUMENTS
      // ========================================================

      if (data.documents) {
        let newDocuments =
          data.documents;

        /*
         * Handle nested response:
         *
         * data.documents.documents
         */

        if (
          newDocuments &&
          newDocuments.documents &&
          typeof newDocuments.documents ===
            "object" &&
          !Array.isArray(
            newDocuments.documents
          )
        ) {
          newDocuments =
            newDocuments.documents;
        }

        /*
         * Merge instead of replacing.
         *
         * Example:
         *
         * Existing:
         * {
         *   photo: {...}
         * }
         *
         * New:
         * {
         *   signature: {...}
         * }
         *
         * Result:
         * {
         *   photo: {...},
         *   signature: {...}
         * }
         */

        setUploadedDocuments(
          (previous) => ({
            ...(previous || {}),
            ...(newDocuments || {}),
          })
        );
      }

      // ========================================================
      // CLEAR LOCAL FILES
      // ========================================================

      setFiles({
        ...emptyFiles,
      });

      // ========================================================
      // SUCCESS
      // ========================================================

      setSuccess(
        "✓ Required documents uploaded successfully."
      );

      localStorage.setItem(
        "userId",
        userId
      );

      // ========================================================
      // GO TO FEE DETAILS
      // ========================================================

      setTimeout(() => {
        navigate("/fee-details", {
          state: {
            userId,
          },
        });
      }, 700);
    } catch (err) {
      console.error(
        "Document upload error:",
        err
      );

      setError(
        err.message ||
          "Unable to upload documents."
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // VIEW FILE URL
  // ============================================================

  const getFileUrl = (file) => {
    if (!file) {
      return "#";
    }

    if (file.url) {
      return file.url;
    }

    if (file.path) {
      const cleanPath =
        file.path.replace(
          /\\/g,
          "/"
        );

      return `https://www.ccl.ac/${cleanPath}`;
    }

    return "#";
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto w-full max-w-[1000px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="rounded-t-2xl bg-[#ab183d] px-6 py-5 text-white">
          <h1 className="text-xl font-bold">
            Documents Upload
          </h1>

          <p className="mt-1 text-sm text-white/80">
            Upload required documents
          </p>
        </div>

        {/* =====================================================
            STEPS
        ====================================================== */}

        <div className="grid grid-cols-2 gap-3 bg-white px-6 pt-6 md:grid-cols-4">

          {/* STEP 1 */}

          <Link
            to="/user-profile"
            state={{ userId }}
            className="rounded-lg bg-green-600 px-3 py-3 text-center text-white shadow-sm transition hover:bg-green-700"
          >
            <div className="text-sm font-bold">
              Step 1
            </div>

            <div className="mt-1 text-xs">
              Personal
            </div>
          </Link>

          {/* STEP 2 */}

          <Link
            to="/qualification-details"
            state={{ userId }}
            className="rounded-lg bg-green-600 px-3 py-3 text-center text-white shadow-sm transition hover:bg-green-700"
          >
            <div className="text-sm font-bold">
              Step 2
            </div>

            <div className="mt-1 text-xs">
              Qualification
            </div>
          </Link>

          {/* STEP 3 */}

          <div className="rounded-lg bg-[#ab183d] px-3 py-3 text-center text-white shadow-sm">
            <div className="text-sm font-bold">
              Step 3
            </div>

            <div className="mt-1 text-xs">
              Documents
            </div>
          </div>

          {/* STEP 4 */}

          <button
            type="button"
            disabled={
              saving ||
              loadingDocuments ||
              !allRequiredDocumentsUploaded
            }
            onClick={() => {
              if (
                !allRequiredDocumentsUploaded
              ) {
                validateAllDocuments();
              }
            }}
            className={`rounded-lg px-3 py-3 text-center shadow-sm transition ${
              allRequiredDocumentsUploaded
                ? "bg-green-600 text-white hover:bg-green-700"
                : "cursor-not-allowed border border-gray-300 bg-gray-100 text-gray-400"
            }`}
          >
            <div className="text-sm font-bold">
              Step 4
            </div>

            <div className="mt-1 text-xs">
              Fee Details
            </div>
          </button>
        </div>

        {/* =====================================================
            MAIN
        ====================================================== */}

        <div className="rounded-b-2xl bg-white p-6 shadow-lg">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >

            {/* =================================================
                UPLOAD SECTION
            ================================================== */}

            <div>

              <h2 className="rounded-t-md bg-[#ab183d] px-4 py-3 text-lg font-semibold text-white">
                Upload Documents
              </h2>

              <div className="border border-gray-300 bg-white p-5">

                {/* LOADING */}

                {loadingDocuments && (
                  <div className="mb-5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
                    Loading previously uploaded documents...
                  </div>
                )}

                {/* IMPORTANT */}

                <div className="mb-5 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
                  <strong>
                    Important:
                  </strong>{" "}
                  Passport Size Photo and
                  Signature are mandatory.
                  Other certificates are
                  optional.
                </div>

                {/* =================================================
                    PROGRESS
                ================================================== */}

                <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4">

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-sm font-semibold text-gray-700">
                      Required Document Progress
                    </span>

                    <span
                      className={`text-sm font-bold ${
                        allRequiredDocumentsUploaded
                          ? "text-green-600"
                          : "text-[#ab183d]"
                      }`}
                    >
                      {completedRequiredCount} /{" "}
                      {requiredDocuments.length}
                    </span>

                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">

                    <div
                      className="h-full bg-[#ab183d] transition-all duration-300"
                      style={{
                        width: `${
                          requiredDocuments.length
                            ? (
                                completedRequiredCount /
                                requiredDocuments.length
                              ) * 100
                            : 0
                        }%`,
                      }}
                    />

                  </div>

                </div>

                {/* =================================================
                    DOCUMENT LIST
                ================================================== */}

                <div className="space-y-5">

                  {documents.map(
                    (document) => {

                      const selected =
                        files[
                          document.name
                        ] instanceof File;

                      const selectedFile =
                        selected
                          ? files[
                              document.name
                            ]
                          : null;

                      const documentError =
                        fileErrors[
                          document.name
                        ];

                      const existingFile =
                        uploadedDocuments?.[
                          document.name
                        ];

                      const hasExistingFile =
                        hasUploadedDocument(
                          document.name
                        );

                      return (
                        <div
                          key={
                            document.name
                          }
                          className={`rounded-lg border p-4 ${
                            documentError
                              ? "border-red-300 bg-red-50"
                              : selected ||
                                hasExistingFile
                              ? "border-green-300 bg-green-50"
                              : "border-gray-200 bg-gray-50"
                          }`}
                        >

                          {/* =================================================
                              LABEL
                          ================================================== */}

                          <label
                            htmlFor={
                              document.name
                            }
                            className="mb-2 block text-sm font-semibold text-gray-700"
                          >
                            {document.label}

                            {document.required && (
                              <span className="ml-1 text-red-600">
                                *
                              </span>
                            )}

                            {!document.required && (
                              <span className="ml-2 rounded bg-gray-200 px-2 py-1 text-[10px] font-semibold text-gray-600">
                                Optional
                              </span>
                            )}
                          </label>

                          {/* =================================================
                              INPUT
                          ================================================== */}

                          <input
                            id={
                              document.name
                            }
                            type="file"
                            name={
                              document.name
                            }
                            accept={
                              document.accept
                            }
                            onChange={(e) =>
                              handleFileChange(
                                e,
                                document
                              )
                            }
                            disabled={saving}
                            className={`w-full cursor-pointer rounded-md border bg-white px-3 py-3 text-sm outline-none transition file:mr-4 file:rounded-md file:border-0 file:bg-[#ab183d] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#921532] focus:border-[#ab183d] disabled:cursor-not-allowed disabled:bg-gray-100 ${
                              documentError
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />

                          {/* =================================================
                              ERROR
                          ================================================== */}

                          {documentError && (
                            <div className="mt-2 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">

                              <span>
                                ✕
                              </span>

                              <span>
                                {
                                  documentError
                                }
                              </span>

                            </div>
                          )}

                          {/* =================================================
                              EXISTING DATABASE FILE
                          ================================================== */}

                          {!selected &&
                            hasExistingFile && (
                              <div className="mt-3 rounded-md border border-green-200 bg-green-100 px-3 py-3">

                                <div className="flex items-start gap-2">

                                  <span className="font-bold text-green-700">
                                    ✓
                                  </span>

                                  <div className="min-w-0 flex-1">

                                    <div className="text-xs font-semibold text-green-700">
                                      Already Uploaded
                                    </div>

                                    <div className="mt-1 break-all text-xs font-semibold text-green-700">
                                      {existingFile.originalName ||
                                        existingFile.filename ||
                                        existingFile.name}
                                    </div>

                                    {existingFile.size && (
                                      <div className="mt-1 text-xs text-green-600">
                                        File size:{" "}
                                        {formatFileSize(
                                          existingFile.size
                                        )}
                                      </div>
                                    )}

                                    {(existingFile.path ||
                                      existingFile.url) && (
                                      <a
                                        href={getFileUrl(
                                          existingFile
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-block text-xs font-bold text-[#ab183d] underline"
                                      >
                                        View Uploaded File
                                      </a>
                                    )}

                                  </div>

                                </div>

                              </div>
                            )}

                          {/* =================================================
                              NEW FILE SELECTED
                          ================================================== */}

                          {selectedFile && (
                            <div className="mt-3 rounded-md border border-green-200 bg-green-100 px-3 py-3">

                              <div className="flex items-start gap-2 text-xs font-semibold text-green-700">

                                <span>
                                  ✓
                                </span>

                                <div className="min-w-0">

                                  <div className="font-bold">
                                    New File Selected
                                  </div>

                                  <div className="mt-1 break-all">
                                    {
                                      selectedFile.name
                                    }
                                  </div>

                                  <div className="mt-1">
                                    File size:{" "}
                                    {formatFileSize(
                                      selectedFile.size
                                    )}
                                  </div>

                                </div>

                              </div>

                            </div>
                          )}

                          {/* =================================================
                              FILE SIZE
                          ================================================== */}

                          <p className="mt-2 text-xs text-gray-500">

                            Allowed file size:{" "}

                            <span className="font-semibold text-gray-700">
                              {
                                document.sizeText
                              }
                            </span>

                          </p>

                          {/* =================================================
                              FILE FORMAT
                          ================================================== */}

                          <p className="mt-1 text-xs text-gray-500">

                            Allowed format:{" "}

                            <span className="font-semibold text-gray-700">

                              {document.name ===
                                "photo" ||
                              document.name ===
                                "signature"
                                ? "JPG, JPEG, PNG"
                                : "JPG, JPEG, PNG, PDF"}

                            </span>

                          </p>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>

            </div>

            {/* =====================================================
                GLOBAL ERROR
            ====================================================== */}

            {error && (
              <div className="rounded-lg border-2 border-red-400 bg-red-50 px-4 py-4 text-sm font-semibold text-red-700">

                <div className="flex items-start gap-3">

                  <span className="text-lg font-bold text-red-600">
                    ✕
                  </span>

                  <div>
                    {error}
                  </div>

                </div>

              </div>
            )}

            {/* =====================================================
                SUCCESS
            ====================================================== */}

            {success && (
              <div className="rounded-lg border border-green-300 bg-green-50 px-4 py-4 text-sm font-medium text-green-700">

                <div className="flex items-center gap-2">

                  <span>
                    ✓
                  </span>

                  <span>
                    {success}
                  </span>

                </div>

              </div>
            )}

            {/* =====================================================
                NAVIGATION
            ====================================================== */}

            <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-between">

              {/* BACK */}

              <Link
                to="/qualification-details"
                state={{ userId }}
                className="rounded-lg border border-gray-300 bg-white px-7 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                ← Back
              </Link>

              {/* NEXT */}

              <button
                type="submit"
                disabled={
                  saving ||
                  loadingDocuments
                }
                className={`rounded-lg px-7 py-3 text-center font-semibold text-white transition ${
                  saving ||
                  loadingDocuments
                    ? "cursor-not-allowed bg-gray-400"
                    : allRequiredDocumentsUploaded
                    ? "bg-[#ab183d] hover:bg-[#921532]"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              >
                {saving
                  ? "Uploading..."
                  : "Next →"}
              </button>

            </div>

            {/* =====================================================
                STATUS
            ====================================================== */}

            {!allRequiredDocumentsUploaded &&
              !saving &&
              !loadingDocuments && (
                <p className="text-center text-sm font-medium text-red-600">

                  Please upload the mandatory
                  Passport Size Photo and
                  Signature to continue.

                </p>
              )}

            {allRequiredDocumentsUploaded &&
              !saving &&
              !loadingDocuments && (
                <p className="text-center text-sm font-medium text-green-600">

                  ✓ Required documents uploaded.
                  You can continue to Fee Details.

                </p>
              )}

          </form>

        </div>
      </div>
    </div>
  );
}