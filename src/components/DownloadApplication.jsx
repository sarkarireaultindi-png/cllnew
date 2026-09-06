import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Barcode from "react-barcode";
import { QRCodeCanvas } from "qrcode.react";

export default function DownloadApplication() {
  const location = useLocation();

  const userId =
    location.state?.userId || localStorage.getItem("userId");

  // ======================================================
  // LOCAL API
  // ======================================================
  const API_URL = "https://cllnew.onrender.com";

  // ======================================================
  // STATES
  // ======================================================
  const [user, setUser] = useState(null);
  const [personal, setPersonal] = useState(null);
  const [qualification, setQualification] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================================
  // FETCH ALL APPLICATION DETAILS
  // ======================================================
  useEffect(() => {
    const fetchApplicationDetails = async () => {
      if (!userId) {
        setError("User information not found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        // ==================================================
        // USER PROFILE
        // ==================================================
        const userResponse = await fetch(
          `${API_URL}/api/users/profile/${userId}`
        );

        const userData = await userResponse.json();

        if (!userResponse.ok) {
          throw new Error(
            userData?.message || "Unable to fetch user profile."
          );
        }

        setUser(userData?.user || null);

        // ==================================================
        // PERSONAL DETAILS
        // ==================================================
        const personalResponse = await fetch(
          `${API_URL}/api/personal-details/${userId}`
        );

        const personalData = await personalResponse.json();

        if (personalResponse.ok && personalData) {
          setPersonal(
            personalData.personalDetails ||
              personalData.data ||
              personalData
          );
        }

        // ==================================================
        // QUALIFICATION DETAILS
        // ==================================================
        const qualificationResponse = await fetch(
          `${API_URL}/api/qualification-details/${userId}`
        );

        const qualificationData =
          await qualificationResponse.json();

        if (qualificationResponse.ok && qualificationData) {
          const qualificationResult =
            qualificationData.qualificationDetails ||
            qualificationData.qualification ||
            qualificationData.data ||
            qualificationData;

          setQualification(qualificationResult);
        }

        // ==================================================
        // DOCUMENTS
        // ==================================================
        const documentResponse = await fetch(
          `${API_URL}/api/document-upload/${userId}`
        );

        const documentData = await documentResponse.json();

        if (documentResponse.ok && documentData) {
          const documentResult =
            documentData.documents ||
            documentData.data ||
            documentData;

          setDocuments(documentResult);
        }

        // ==================================================
        // FEE DETAILS
        // ==================================================
        const feeResponse = await fetch(
          `${API_URL}/api/fee-details/${userId}`
        );

        const feeData = await feeResponse.json();

        if (feeResponse.ok && feeData) {
          setFee(
            feeData.feeDetails ||
              feeData.data ||
              feeData
          );
        }
      } catch (err) {
        console.error(
          "Application details error:",
          err
        );

        setError(
          err?.message ||
            "Unable to load application details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [userId]);

  // ======================================================
  // PRINT
  // ======================================================
  const handlePrint = () => {
    window.print();
  };

  // ======================================================
  // FORMAT DATE
  // ======================================================
  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN");
  };

  // ======================================================
  // FORMAT DATE + TIME
  // ======================================================
  const formatDateTime = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleString("en-IN");
  };

  // ======================================================
  // MASK AADHAAR
  // ======================================================
  const maskAadhaar = (aadhaar) => {
    if (!aadhaar) return "-";

    const cleanAadhaar = String(aadhaar).replace(/\s/g, "");

    if (cleanAadhaar.length < 4) {
      return cleanAadhaar;
    }

    return `XXXX-XXXX-${cleanAadhaar.slice(-4)}`;
  };

  // ======================================================
  // FILE URL
  // ======================================================
  const getFileUrl = (file) => {
    if (!file) {
      return "";
    }

    if (typeof file === "string") {
      const cleanFile = file.trim();

      if (!cleanFile) {
        return "";
      }

      if (
        cleanFile.startsWith("http://") ||
        cleanFile.startsWith("https://")
      ) {
        return cleanFile;
      }

      return `${API_URL}/${cleanFile
        .replace(/\\/g, "/")
        .replace(/^\/+/, "")}`;
    }

    if (typeof file === "object") {
      const filePath =
        file.secure_url ||
        file.secureUrl ||
        file.url ||
        file.cloudinaryUrl ||
        file.cloudUrl ||
        file.fileUrl ||
        file.path ||
        file.filePath ||
        file.filename ||
        file.public_id ||
        "";

      if (!filePath) {
        console.warn(
          "No image URL/path found:",
          file
        );

        return "";
      }

      if (
        typeof filePath === "string" &&
        (filePath.startsWith("http://") ||
          filePath.startsWith("https://"))
      ) {
        return filePath;
      }

      return `${API_URL}/${String(filePath)
        .replace(/\\/g, "/")
        .replace(/^\/+/, "")}`;
    }

    return "";
  };

  // ======================================================
  // ADDRESS
  // ======================================================
  const formatAddress = (address) => {
    if (!address) {
      return "-";
    }

    return [
      address.villageCityTown,
      address.postOffice,
      address.policeStation,
      address.subDistrict,
      address.district,
      address.state,
      address.pinCode
        ? `PIN - ${address.pinCode}`
        : "",
    ]
      .filter(Boolean)
      .join(", ");
  };

  // ======================================================
  // EDUCATION DATA
  // ======================================================
  const getEducationRow = (qualificationName) => {
    if (!qualification) {
      return {};
    }

    if (Array.isArray(qualification.education)) {
      const found = qualification.education.find(
        (item) =>
          String(item?.qualification || "")
            .trim()
            .toLowerCase() ===
          qualificationName
            .trim()
            .toLowerCase()
      );

      return found || {};
    }

    if (Array.isArray(qualification)) {
      const found = qualification.find(
        (item) =>
          String(item?.qualification || "")
            .trim()
            .toLowerCase() ===
          qualificationName
            .trim()
            .toLowerCase()
      );

      return found || {};
    }

    return {};
  };

  // ======================================================
  // QUALIFICATION ROWS
  // ======================================================
  const qualificationRows = [
    {
      title: "High School",
      data: getEducationRow("High School"),
    },
    {
      title: "Senior Secondary",
      data: getEducationRow("Senior Secondary"),
    },
    {
      title: "Graduation",
      data: getEducationRow("Graduation"),
    },
    {
      title: "Post Graduation / Diploma",
      data: getEducationRow(
        "Post Graduation / Diploma"
      ),
    },
  ];

  // ======================================================
  // BOARD / UNIVERSITY
  // ======================================================
  const getBoardUniversity = (data) => {
    return (
      data?.boardUniversity ||
      data?.boardUniversityName ||
      data?.board ||
      data?.university ||
      "-"
    );
  };

  // ======================================================
  // PASSING YEAR
  // ======================================================
  const getPassingYear = (data) => {
    return (
      data?.passingYear ||
      data?.year ||
      data?.passing_year ||
      "-"
    );
  };

  // ======================================================
  // STATUS
  // ======================================================
  const getStatus = (data) => {
    return (
      data?.status ||
      data?.resultStatus ||
      "-"
    );
  };

  // ======================================================
  // MARKS
  // ======================================================
  const getMarks = (data) => {
    return (
      data?.marks ||
      data?.totalMarks ||
      data?.obtainedMarks ||
      "-"
    );
  };

  // ======================================================
  // PERCENTAGE
  // ======================================================
  const getPercentage = (data) => {
    const percentage =
      data?.percentage ??
      data?.percent ??
      data?.Percentage;

    if (
      percentage === undefined ||
      percentage === null ||
      percentage === ""
    ) {
      return "-";
    }

    const percentageString = String(
      percentage
    );

    if (percentageString.endsWith("%")) {
      return percentageString;
    }

    return `${percentageString}%`;
  };

  // ======================================================
  // DOCUMENT URLS
  // ======================================================
  const photoUrl = getFileUrl(
    documents?.photo
  );

  const signatureUrl = getFileUrl(
    documents?.signature
  );

  // ======================================================
  // USER PROFILE VALUES
  // ======================================================
  const registrationNumber =
    user?.registrationNumber ||
    personal?.registrationNumber ||
    personal?.registrationNo ||
    personal?.registration ||
    personal?.applicationNumber ||
    personal?.applicationNo ||
    "-";

  const applicantName =
    user?.name ||
    personal?.name ||
    "-";

  const dob =
    user?.dob ||
    personal?.dob ||
    "";

  const mobileNumber =
    user?.mobile ||
    personal?.mobile ||
    personal?.mobileNumber ||
    personal?.phone ||
    personal?.contactNumber ||
    "-";

  const emailId =
    user?.email ||
    personal?.email ||
    personal?.emailId ||
    personal?.emailAddress ||
    "-";

  const aadhaar =
    user?.aadhaar ||
    personal?.aadhaar ||
    personal?.aadhaarNumber ||
    "";

  // ======================================================
  // BARCODE VALUE
  // ======================================================
  const barcodeValue =
    registrationNumber !== "-"
      ? String(registrationNumber)
      : String(userId || "");

  // ======================================================
  // QR VALUE
  // ======================================================
  const qrValue = JSON.stringify({
    registrationNumber:
      registrationNumber !== "-"
        ? registrationNumber
        : "",
    name: applicantName,
    dob: dob || "",
    mobile:
      mobileNumber !== "-"
        ? mobileNumber
        : "",
    email:
      emailId !== "-"
        ? emailId
        : "",
  });

  // ======================================================
  // LOADING
  // ======================================================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md rounded-xl bg-white px-6 py-8 text-center shadow-lg">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#ab183d]" />

          <div className="text-lg font-semibold text-gray-700">
            Loading application details...
          </div>

          <div className="mt-2 text-sm text-gray-500">
            Please wait.
          </div>
        </div>
      </div>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="mx-auto max-w-[1000px]">
          <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-center shadow-sm">
            <div className="text-lg font-bold text-red-700">
              Unable to Load Application
            </div>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <Link
              to="/profile"
              state={{ userId }}
              className="mt-5 inline-block rounded-lg bg-[#ab183d] px-6 py-3 font-semibold text-white transition hover:bg-[#921532]"
            >
              ← Back to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ======================================================
  // MAIN UI
  // ======================================================
  return (
    <div className="min-h-screen bg-gray-100 px-2 py-4 sm:px-4 sm:py-8">

      {/* ==================================================
          ACTION BUTTONS
      ================================================== */}
      <div className="no-print mx-auto mb-5 flex w-full max-w-[1000px] flex-col gap-3 sm:flex-row sm:justify-between">
        <Link
          to="/profile"
          state={{ userId }}
          className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-center text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 sm:px-6"
        >
          ← Back to Profile
        </Link>

        <button
          type="button"
          onClick={handlePrint}
          className="rounded-lg bg-[#ab183d] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#921532] sm:px-6"
        >
          🖨 Print / Download PDF
        </button>
      </div>

      {/* ==================================================
          APPLICATION DOCUMENT
      ================================================== */}
      <div
        id="application-document"
        className="mx-auto w-full max-w-[1000px] overflow-hidden bg-white shadow-lg"
      >

        {/* ==================================================
            HEADER
        ================================================== */}
        <div className="border-b-4 border-[#ab183d] px-3 py-5 sm:px-6 sm:py-6 md:px-8">

          {/* ==================================================
              TITLE
          ================================================== */}
          <div className="text-center">

            <h1 className="text-xl font-bold text-[#ab183d] sm:text-2xl md:text-3xl">
              APPLICATION FORM
            </h1>

            <p className="mt-1 text-sm font-bold text-gray-700 sm:text-base">
              Central Coalfield Limited
            </p>

            <p className="mt-1 text-xs font-semibold text-gray-500">
              Government of India Enterprise
            </p>

          </div>

          {/* ==================================================
              BARCODE + QR CODE
              SAME ROW
          ================================================== */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-y border-gray-200 py-4 sm:gap-6">

            {/* BARCODE */}
            <div className="flex min-w-0 flex-col items-center justify-center">

              <div className="mb-2 text-center text-[9px] font-bold uppercase tracking-wide text-gray-500 sm:text-xs">
                Application Barcode
              </div>

              <div className="flex w-full max-w-[300px] items-center justify-center overflow-hidden">
                <div className="w-full max-w-[280px] overflow-hidden">
                  <Barcode
                    value={barcodeValue}
                    format="CODE128"
                    width={1.2}
                    height={45}
                    displayValue={true}
                    fontSize={9}
                    margin={0}
                    background="#ffffff"
                    lineColor="#000000"
                  />
                </div>
              </div>

            </div>

            {/* QR CODE */}
            <div className="flex min-w-0 flex-col items-center justify-center">

              <div className="mb-2 text-center text-[9px] font-bold uppercase tracking-wide text-gray-500 sm:text-xs">
                Scan QR Code
              </div>

              <div className="border border-gray-300 bg-white p-1 sm:p-1.5">
                <QRCodeCanvas
                  value={qrValue}
                  size={100}
                  level="M"
                  includeMargin={true}
                />
              </div>

              <div className="mt-1 text-[8px] text-gray-500 sm:text-[10px]">
                Applicant Details
              </div>

            </div>

          </div>

          {/* ==================================================
              APPLICANT DETAILS + PHOTO
          ================================================== */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-[minmax(0,1fr)_130px] sm:items-start">

            {/* ==================================================
                LEFT SIDE DETAILS
            ================================================== */}
            <div className="grid grid-cols-1 overflow-hidden border border-gray-300 sm:grid-cols-2">

              <Detail
                label="Registration Number"
                value={registrationNumber}
              />

              <Detail
                label="Name"
                value={applicantName}
              />

              <Detail
                label="Email ID"
                value={emailId}
              />

              <Detail
                label="Date of Birth"
                value={formatDate(dob)}
              />

              <Detail
                label="Mobile Number"
                value={mobileNumber}
              />

              <Detail
                label="Aadhaar Number"
                value={maskAadhaar(aadhaar)}
              />

            </div>

            {/* ==================================================
                RIGHT SIDE PHOTO
            ================================================== */}
            <div className="flex justify-center sm:justify-end">

              <div className="flex h-36 w-28 shrink-0 items-center justify-center overflow-hidden border-2 border-gray-400 bg-gray-50 sm:h-40 sm:w-32">

                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Passport Size Photo"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      console.error(
                        "PHOTO FAILED TO LOAD:",
                        photoUrl
                      );

                      e.currentTarget.style.display =
                        "none";
                    }}
                  />
                ) : (
                  <span className="px-2 text-center text-xs text-red-500">
                    Passport Size Photo
                    <br />
                    Not Uploaded
                  </span>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* ==================================================
            APPLICATION CONTENT
        ================================================== */}
        <div className="space-y-6 p-3 sm:space-y-7 sm:p-6 md:p-8">

          {/* ==================================================
              1. PERSONAL DETAILS
          ================================================== */}
          <section>

            <div className="mb-3 bg-[#ab183d] px-3 py-2.5 text-base font-bold text-white sm:mb-4 sm:px-4 sm:py-3 sm:text-lg">
              1. Personal Details
            </div>

            <div className="grid grid-cols-1 border border-gray-300 md:grid-cols-2">

              <Detail
                label="Registration Number"
                value={registrationNumber}
              />

              <Detail
                label="Name"
                value={applicantName}
              />

              <Detail
                label="Aadhaar Number"
                value={maskAadhaar(aadhaar)}
              />

              <Detail
                label="Date of Birth"
                value={formatDate(dob)}
              />

              <Detail
                label="Gender"
                value={personal?.gender}
              />

              <Detail
                label="Category"
                value={personal?.category}
              />

              <Detail
                label="Father's Name"
                value={personal?.fatherName}
              />

              <Detail
                label="Mother's Name"
                value={personal?.motherName}
              />

              <Detail
                label="Nationality"
                value={
                  personal?.nationality ||
                  "Indian"
                }
              />

              <Detail
                label="Marital Status"
                value={personal?.maritalStatus}
              />

              <Detail
                label="Mobile Number"
                value={mobileNumber}
              />

              <Detail
                label="Email ID"
                value={emailId}
              />

              <Detail
                label="Domicile Certificate Number"
                value={
                  personal?.domicileCertificateNumber ||
                  personal?.domicileCertificateNo ||
                  personal?.domicileNumber
                }
              />

              <Detail
                label="Caste Certificate Number"
                value={
                  personal?.casteCertificateNumber ||
                  personal?.casteCertificateNo ||
                  personal?.casteNumber
                }
              />

              <Detail
                label="Disability Details Number"
                value={
                  personal?.disabilityDetailsNumber ||
                  personal?.disabilityNumber ||
                  personal?.disabilityCertificateNumber
                }
              />

              <Detail
                label="Employment Details Number"
                value={
                  personal?.employmentDetailsNumber ||
                  personal?.employmentNumber
                }
              />

            </div>

          </section>

          {/* ==================================================
              2. PERMANENT ADDRESS
          ================================================== */}
          <section>

            <div className="mb-3 bg-[#ab183d] px-3 py-2.5 text-base font-bold text-white sm:mb-4 sm:px-4 sm:py-3 sm:text-lg">
              2. Permanent Address
            </div>

            <div className="break-words border border-gray-300 p-3 text-sm leading-6 text-gray-700 sm:p-4">
              {formatAddress(
                personal?.permanentAddress
              )}
            </div>

          </section>

          {/* ==================================================
              3. CORRESPONDENCE ADDRESS
          ================================================== */}
          <section>

            <div className="mb-3 bg-[#ab183d] px-3 py-2.5 text-base font-bold text-white sm:mb-4 sm:px-4 sm:py-3 sm:text-lg">
              3. Correspondence Address
            </div>

            <div className="break-words border border-gray-300 p-3 text-sm leading-6 text-gray-700 sm:p-4">
              {formatAddress(
                personal?.correspondenceAddress
              )}
            </div>

          </section>

          {/* ==================================================
              4. EDUCATIONAL QUALIFICATION
          ================================================== */}
          <section>

            <div className="mb-3 bg-[#ab183d] px-3 py-2.5 text-base font-bold text-white sm:mb-4 sm:px-4 sm:py-3 sm:text-lg">
              4. Educational Qualification
            </div>

            <div className="overflow-x-auto border border-gray-300">

              <table className="w-full min-w-[750px] border-collapse text-xs sm:text-sm">

                <thead>
                  <tr className="bg-gray-100">

                    <th className="border border-gray-300 px-3 py-3 text-left">
                      Qualification
                    </th>

                    <th className="border border-gray-300 px-3 py-3 text-left">
                      Board / University
                    </th>

                    <th className="border border-gray-300 px-3 py-3 text-left">
                      Passing Year
                    </th>

                    <th className="border border-gray-300 px-3 py-3 text-left">
                      Status
                    </th>

                    <th className="border border-gray-300 px-3 py-3 text-left">
                      Marks
                    </th>

                    <th className="border border-gray-300 px-3 py-3 text-left">
                      Percentage
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {qualificationRows.map((row) => {

                    const data = row.data || {};

                    return (
                      <tr key={row.title}>

                        <td className="border border-gray-300 px-3 py-3 font-semibold">
                          {row.title}
                        </td>

                        <td className="border border-gray-300 px-3 py-3">
                          {getBoardUniversity(data)}
                        </td>

                        <td className="border border-gray-300 px-3 py-3">
                          {getPassingYear(data)}
                        </td>

                        <td className="border border-gray-300 px-3 py-3">
                          {getStatus(data)}
                        </td>

                        <td className="border border-gray-300 px-3 py-3">
                          {getMarks(data)}
                        </td>

                        <td className="border border-gray-300 px-3 py-3">
                          {getPercentage(data)}
                        </td>

                      </tr>
                    );

                  })}

                </tbody>

              </table>

            </div>

            {!qualification && (
              <div className="no-print mt-3 rounded border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
                Qualification details were not returned by
                the API.
              </div>
            )}

          </section>

          {/* ==================================================
              5. FEE DETAILS
          ================================================== */}
          <section>

            <div className="mb-3 bg-[#ab183d] px-3 py-2.5 text-base font-bold text-white sm:mb-4 sm:px-4 sm:py-3 sm:text-lg">
              5. Fee Details
            </div>

            <div className="border border-gray-300">

              <Detail
                label="Category"
                value={
                  fee?.category ||
                  personal?.category ||
                  "-"
                }
              />

              <Detail
                label="Payable Amount"
                value={
                  fee?.amount !== undefined &&
                  fee?.amount !== null
                    ? `₹${fee.amount}`
                    : "-"
                }
              />

              <Detail
                label="Payment Status"
                value={
                  fee?.paymentStatus ||
                  fee?.status ||
                  "Pending"
                }
              />

              {fee?.transactionId && (
                <Detail
                  label="Transaction ID"
                  value={fee.transactionId}
                />
              )}

              {fee?.paymentDate && (
                <Detail
                  label="Payment Date"
                  value={formatDateTime(
                    fee.paymentDate
                  )}
                />
              )}

            </div>

          </section>

          {/* ==================================================
              6. REGISTRATION INFORMATION
          ================================================== */}
         

          {/* ==================================================
              7. DECLARATION
          ================================================== */}
          <section>

            <div className="mb-3 bg-[#ab183d] px-3 py-2.5 text-base font-bold text-white sm:mb-4 sm:px-4 sm:py-3 sm:text-lg">
              6. Declaration
            </div>

            <div className="border border-gray-300 p-4 text-sm leading-6 text-gray-700 sm:p-5">
              I hereby declare that all the information
              furnished by me in this application is true,
              complete and correct to the best of my knowledge
              and belief. I understand that if any information
              is found to be incorrect or false, my application
              may be rejected.
            </div>

          </section>

          {/* ==================================================
              SIGNATURE
          ================================================== */}
          <div className="flex justify-center pt-6 sm:justify-end sm:pt-8">

            <div className="w-56 text-center sm:w-64">

              {signatureUrl ? (
                <img
                  src={signatureUrl}
                  alt="Applicant Signature"
                  className="mx-auto mb-2 h-20 max-w-[200px] object-contain"
                  onError={(e) => {
                    console.error(
                      "SIGNATURE FAILED TO LOAD:",
                      signatureUrl
                    );

                    e.currentTarget.style.display =
                      "none";
                  }}
                />
              ) : (
                <div className="mb-2 h-20" />
              )}

              <div className="border-t border-gray-400 pt-2 text-sm font-semibold">
                Applicant Signature
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ==================================================
          PRINT STYLES
      ================================================== */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }

          html,
          body {
            background: white !important;
          }

          .no-print {
            display: none !important;
          }

          #application-document {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            box-shadow: none !important;
            overflow: visible !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          section {
            break-inside: avoid;
          }

          img,
          canvas,
          svg {
            break-inside: avoid;
          }

          table {
            break-inside: auto;
          }

          tr {
            break-inside: avoid;
            break-after: auto;
          }

          #application-document > div:first-child {
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}

// ======================================================
// DETAIL COMPONENT
// ======================================================
function Detail({ label, value }) {
  return (
    <div className="flex min-w-0 flex-col border-b border-gray-300 p-3 sm:flex-row sm:items-start">

      <div className="w-full shrink-0 text-[10px] font-bold uppercase tracking-wide text-gray-500 sm:w-1/3 sm:text-xs">
        {label}
      </div>

      <div className="mt-1 w-full min-w-0 break-words text-sm font-semibold text-gray-800 sm:mt-0 sm:w-2/3">
        {value !== undefined &&
        value !== null &&
        value !== ""
          ? value
          : "-"}
      </div>

    </div>
  );
}