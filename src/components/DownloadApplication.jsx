
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function DownloadApplication() {
  const location = useLocation();

  const userId =
    location.state?.userId || localStorage.getItem("userId");

  const [personal, setPersonal] = useState(null);
  const [qualification, setQualification] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // LOCALHOST BACKEND
  const API_URL = "https://cllnew.onrender.com";

  /*
  |--------------------------------------------------------------------------
  | FETCH APPLICATION DETAILS
  |--------------------------------------------------------------------------
  */

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

        /*
        |--------------------------------------------------------------------------
        | PERSONAL DETAILS
        |--------------------------------------------------------------------------
        */

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

        /*
        |--------------------------------------------------------------------------
        | QUALIFICATION DETAILS
        |--------------------------------------------------------------------------
        */

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

        /*
        |--------------------------------------------------------------------------
        | DOCUMENTS
        |--------------------------------------------------------------------------
        */

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

        /*
        |--------------------------------------------------------------------------
        | FEE DETAILS
        |--------------------------------------------------------------------------
        */

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
          "Unable to load application details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [userId]);

  /*
  |--------------------------------------------------------------------------
  | PRINT / DOWNLOAD PDF
  |--------------------------------------------------------------------------
  */

  const handlePrint = () => {
    window.print();
  };

  /*
  |--------------------------------------------------------------------------
  | FILE URL
  |--------------------------------------------------------------------------
  |
  | Supports:
  |
  | 1. Direct Cloudinary URL
  | 2. secure_url
  | 3. url
  | 4. cloudinaryUrl
  | 5. cloudUrl
  | 6. local backend path
  | 7. filename
  |
  |--------------------------------------------------------------------------
  */

  const getFileUrl = (file) => {
    if (!file) {
      return "";
    }

    /*
    |--------------------------------------------------------------------------
    | CASE 1: FILE IS ALREADY A STRING
    |--------------------------------------------------------------------------
    */

    if (typeof file === "string") {
      const cleanFile = file.trim();

      if (!cleanFile) {
        return "";
      }

      // Cloud URL
      if (
        cleanFile.startsWith("http://") ||
        cleanFile.startsWith("https://")
      ) {
        return cleanFile;
      }

      // Local backend file
      return `${API_URL}/${cleanFile
        .replace(/\\/g, "/")
        .replace(/^\/+/, "")}`;
    }

    /*
    |--------------------------------------------------------------------------
    | CASE 2: FILE IS AN OBJECT
    |--------------------------------------------------------------------------
    */

    if (typeof file === "object") {
      /*
      |--------------------------------------------------------------------------
      | CLOUD STORAGE URLS
      |--------------------------------------------------------------------------
      */

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

      /*
      |--------------------------------------------------------------------------
      | DIRECT URL
      |--------------------------------------------------------------------------
      */

      if (
        typeof filePath === "string" &&
        (filePath.startsWith("http://") ||
          filePath.startsWith("https://"))
      ) {
        return filePath;
      }

      /*
      |--------------------------------------------------------------------------
      | LOCAL BACKEND FILE
      |--------------------------------------------------------------------------
      */

      return `${API_URL}/${String(filePath)
        .replace(/\\/g, "/")
        .replace(/^\/+/, "")}`;
    }

    return "";
  };

  /*
  |--------------------------------------------------------------------------
  | ADDRESS
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | EDUCATION DATA
  |--------------------------------------------------------------------------
  */

  const getEducationRow = (qualificationName) => {
    if (!qualification) {
      return {};
    }

    /*
    |--------------------------------------------------------------------------
    | education ARRAY
    |--------------------------------------------------------------------------
    */

    if (Array.isArray(qualification.education)) {
      const found = qualification.education.find(
        (item) =>
          String(item?.qualification || "")
            .trim()
            .toLowerCase() ===
          qualificationName.trim().toLowerCase()
      );

      return found || {};
    }

    /*
    |--------------------------------------------------------------------------
    | DIRECT ARRAY
    |--------------------------------------------------------------------------
    */

    if (Array.isArray(qualification)) {
      const found = qualification.find(
        (item) =>
          String(item?.qualification || "")
            .trim()
            .toLowerCase() ===
          qualificationName.trim().toLowerCase()
      );

      return found || {};
    }

    return {};
  };

  /*
  |--------------------------------------------------------------------------
  | QUALIFICATION ROWS
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | BOARD / UNIVERSITY
  |--------------------------------------------------------------------------
  */

  const getBoardUniversity = (data) => {
    return (
      data?.boardUniversity ||
      data?.boardUniversityName ||
      data?.board ||
      data?.university ||
      "-"
    );
  };

  /*
  |--------------------------------------------------------------------------
  | PASSING YEAR
  |--------------------------------------------------------------------------
  */

  const getPassingYear = (data) => {
    return (
      data?.passingYear ||
      data?.year ||
      data?.passing_year ||
      "-"
    );
  };

  /*
  |--------------------------------------------------------------------------
  | STATUS
  |--------------------------------------------------------------------------
  */

  const getStatus = (data) => {
    return (
      data?.status ||
      data?.resultStatus ||
      "-"
    );
  };

  /*
  |--------------------------------------------------------------------------
  | MARKS
  |--------------------------------------------------------------------------
  */

  const getMarks = (data) => {
    return (
      data?.marks ||
      data?.totalMarks ||
      data?.obtainedMarks ||
      "-"
    );
  };

  /*
  |--------------------------------------------------------------------------
  | PERCENTAGE
  |--------------------------------------------------------------------------
  */

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

    const percentageString =
      String(percentage);

    if (percentageString.endsWith("%")) {
      return percentageString;
    }

    return `${percentageString}%`;
  };

  /*
  |--------------------------------------------------------------------------
  | DOCUMENT URLS
  |--------------------------------------------------------------------------
  */

  const photoUrl = getFileUrl(
    documents?.photo
  );

  const signatureUrl = getFileUrl(
    documents?.signature
  );

 

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-white px-8 py-6 text-center shadow-lg">
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

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="mx-auto max-w-[1000px]">
          <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-center">
            <div className="text-lg font-bold text-red-700">
              Unable to Load Application
            </div>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <Link
              to="/profile"
              state={{ userId }}
              className="mt-5 inline-block rounded-lg bg-[#ab183d] px-6 py-3 font-semibold text-white hover:bg-[#921532]"
            >
              ← Back to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | MAIN UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {/* PRINT BUTTONS */}

      <div className="no-print mx-auto mb-5 flex max-w-[1000px] flex-col gap-3 sm:flex-row sm:justify-between">
        <Link
          to="/profile"
          state={{ userId }}
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-center font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
        >
          ← Back to Profile
        </Link>

        <button
          type="button"
          onClick={handlePrint}
          className="rounded-lg bg-[#ab183d] px-6 py-3 font-semibold text-white shadow-sm hover:bg-[#921532]"
        >
          🖨 Print / Download PDF
        </button>
      </div>

      {/* APPLICATION DOCUMENT */}

      <div
        id="application-document"
        className="mx-auto w-full max-w-[1000px] bg-white shadow-lg"
      >
        {/* HEADER */}

        <div className="border-b-4 border-[#ab183d] px-8 py-6">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-[#ab183d]">
                APPLICATION FORM
              </h1>

              <p className="mt-1 text-sm font-semibold text-gray-600">
                Central Coalfield Limited
              </p>
            </div>

            {/* PASSPORT PHOTO */}

            <div className="flex h-32 w-28 items-center justify-center overflow-hidden border border-gray-400 bg-gray-50">
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

        {/* APPLICATION CONTENT */}

        <div className="space-y-7 p-8">
          {/* PERSONAL DETAILS */}

          <section>
            <div className="mb-4 bg-[#ab183d] px-4 py-3 text-lg font-bold text-white">
              1. Personal Details
            </div>

            <div className="grid grid-cols-1 gap-0 border border-gray-300 md:grid-cols-2">
              <Detail
                label="Name"
                value={personal?.name}
              />

              <Detail
                label="Date of Birth"
                value={
                  personal?.dob
                    ? new Date(
                        personal.dob
                      ).toLocaleDateString(
                        "en-IN"
                      )
                    : "-"
                }
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
                value={
                  personal?.fatherName
                }
              />

              <Detail
                label="Mother's Name"
                value={
                  personal?.motherName
                }
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
                value={
                  personal?.maritalStatus
                }
              />
            </div>
          </section>

          {/* PERMANENT ADDRESS */}

          <section>
            <div className="mb-4 bg-[#ab183d] px-4 py-3 text-lg font-bold text-white">
              2. Permanent Address
            </div>

            <div className="border border-gray-300 p-4 text-sm text-gray-700">
              {formatAddress(
                personal?.permanentAddress
              )}
            </div>
          </section>

          {/* CORRESPONDENCE ADDRESS */}

          <section>
            <div className="mb-4 bg-[#ab183d] px-4 py-3 text-lg font-bold text-white">
              3. Correspondence Address
            </div>

            <div className="border border-gray-300 p-4 text-sm text-gray-700">
              {formatAddress(
                personal?.correspondenceAddress
              )}
            </div>
          </section>

          {/* EDUCATIONAL QUALIFICATION */}

          <section>
            <div className="mb-4 bg-[#ab183d] px-4 py-3 text-lg font-bold text-white">
              4. Educational Qualification
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
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
                  {qualificationRows.map(
                    (row) => {
                      const data =
                        row.data || {};

                      return (
                        <tr
                          key={row.title}
                        >
                          <td className="border border-gray-300 px-3 py-3 font-semibold">
                            {row.title}
                          </td>

                          <td className="border border-gray-300 px-3 py-3">
                            {getBoardUniversity(
                              data
                            )}
                          </td>

                          <td className="border border-gray-300 px-3 py-3">
                            {getPassingYear(
                              data
                            )}
                          </td>

                          <td className="border border-gray-300 px-3 py-3">
                            {getStatus(data)}
                          </td>

                          <td className="border border-gray-300 px-3 py-3">
                            {getMarks(data)}
                          </td>

                          <td className="border border-gray-300 px-3 py-3">
                            {getPercentage(
                              data
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>

            {!qualification && (
              <div className="no-print mt-3 rounded border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
                Qualification details were not
                returned by the API.
                <br />
                Check browser console for:
                <strong className="ml-1">
                  Qualification API Response
                </strong>
              </div>
            )}
          </section>

          {/* FEE DETAILS */}

          <section>
            <div className="mb-4 bg-[#ab183d] px-4 py-3 text-lg font-bold text-white">
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
                  value={
                    fee.transactionId
                  }
                />
              )}

              {fee?.paymentDate && (
                <Detail
                  label="Payment Date"
                  value={new Date(
                    fee.paymentDate
                  ).toLocaleString("en-IN")}
                />
              )}
            </div>
          </section>

          {/* DECLARATION */}

          <section>
            <div className="mb-4 bg-[#ab183d] px-4 py-3 text-lg font-bold text-white">
              6. Declaration
            </div>

            <div className="border border-gray-300 p-5 text-sm leading-6 text-gray-700">
              I hereby declare that all the
              information furnished by me in this
              application is true, complete and
              correct to the best of my knowledge
              and belief. I understand that if any
              information is found to be incorrect
              or false, my application may be
              rejected.
            </div>
          </section>

          {/* SIGNATURE */}

          <div className="flex justify-end pt-8">
            <div className="w-64 text-center">
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

      {/* PRINT STYLES */}

      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

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
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          section {
            break-inside: avoid;
          }

          img {
            break-inside: avoid;
          }

          table {
            break-inside: auto;
          }

          tr {
            break-inside: avoid;
            break-after: auto;
          }
        }
      `}</style>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| DETAIL COMPONENT
|--------------------------------------------------------------------------
*/

function Detail({ label, value }) {
  return (
    <div className="flex flex-col border-b border-gray-300 p-3 sm:flex-row">
      <div className="w-full text-xs font-bold uppercase text-gray-500 sm:w-1/3">
        {label}
      </div>

      <div className="mt-1 w-full text-sm font-semibold text-gray-800 sm:mt-0 sm:w-2/3">
        {value || "-"}
      </div>
    </div>
  );
}
