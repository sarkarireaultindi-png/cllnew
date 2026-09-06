import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaUser,
  FaGraduationCap,
  FaFileAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaMobileAlt,
  FaEnvelope,
  FaExternalLinkAlt,
  FaDownload,
  FaImage,
  FaFilePdf,
} from "react-icons/fa";

// =========================================================
// CONFIGURATION
// =========================================================

const API_URL = "https://cllnew.onrender.com/api";

// Your Cloudinary cloud name
const CLOUDINARY_CLOUD_NAME = "bqsfc3jf";


// =========================================================
// MAIN COMPONENT
// =========================================================

export default function AdminUserDetails() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [personal, setPersonal] = useState(null);
  const [qualification, setQualification] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [fees, setFees] = useState(null);

  const [activeTab, setActiveTab] = useState("personal");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // FETCH ALL USER DETAILS
  // =========================================================

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing.");
      setLoading(false);
      return;
    }

    fetchUserDetails();
  }, [userId]);

  // =========================================================
  // SAFE JSON RESPONSE
  // =========================================================

  const getJsonResponse = async (response, apiName) => {
    const contentType =
      response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      const text = await response.text();

      console.error(
        `${apiName} returned non-JSON response:`,
        text
      );

      throw new Error(
        `${apiName} did not return JSON. Check your backend API route.`
      );
    }

    return await response.json();
  };

  // =========================================================
  // FETCH USER DETAILS
  // =========================================================

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login", {
          replace: true,
        });
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // =====================================================
      // 1. REGISTERED USER
      // =====================================================

      const usersResponse = await fetch(
        `${API_URL}/users/admin/users`,
        {
          method: "GET",
          headers,
        }
      );

      const usersData = await getJsonResponse(
        usersResponse,
        "Users API"
      );

      if (usersResponse.status === 401) {
        localStorage.removeItem("adminToken");

        navigate("/admin/login", {
          replace: true,
        });

        return;
      }

      if (!usersResponse.ok) {
        throw new Error(
          usersData.message ||
            "Unable to load registered users."
        );
      }

      const selectedUser = (
        usersData.users || []
      ).find(
        (item) =>
          String(item._id) === String(userId)
      );

      if (!selectedUser) {
        throw new Error("User not found.");
      }

     

      setUser(selectedUser);

      // =====================================================
      // 2. PERSONAL DETAILS
      // =====================================================

      try {
        const response = await fetch(
          `${API_URL}/personal-details/${userId}`,
          {
            method: "GET",
            headers,
          }
        );

        const data = await getJsonResponse(
          response,
          "Personal Details API"
        );

     

        if (response.ok && data.success) {
          setPersonal(
            data.personalDetails ||
              data.personal ||
              data.data ||
              null
          );
        } else {
          setPersonal(null);
        }
      } catch (err) {
        console.error(
          "Personal details error:",
          err
        );

        setPersonal(null);
      }

      // =====================================================
      // 3. QUALIFICATION DETAILS
      // =====================================================

      try {
        const response = await fetch(
          `${API_URL}/qualification-details/${userId}`,
          {
            method: "GET",
            headers,
          }
        );

        const data = await getJsonResponse(
          response,
          "Qualification API"
        );

   

        if (response.ok && data.success) {
          setQualification(
            data.qualificationDetails ||
              data.qualification ||
              data.data ||
              null
          );
        } else {
          setQualification(null);
        }
      } catch (err) {
        console.error(
          "Qualification details error:",
          err
        );

        setQualification(null);
      }

      // =====================================================
      // 4. DOCUMENTS
      // =====================================================

      try {
        const documentUrl =
          `${API_URL}/document-upload/${userId}`;

    

        const response = await fetch(
          documentUrl,
          {
            method: "GET",
            headers,
          }
        );

     

        const data = await getJsonResponse(
          response,
          "Document Upload API"
        );

   

        if (response.ok && data.success) {
          const documentData =
            data.documents ||
            data.documentUpload ||
            data.document ||
            data.data ||
            null;

      

          setDocuments(documentData);
        } else {
          setDocuments(null);
        }
      } catch (err) {
        console.error(
          "Documents fetch error:",
          err
        );

        setDocuments(null);
      }

      // =====================================================
      // 5. FEE DETAILS
      // =====================================================

      try {
        const response = await fetch(
          `${API_URL}/fee-details/${userId}`,
          {
            method: "GET",
            headers,
          }
        );

        const data = await getJsonResponse(
          response,
          "Fee Details API"
        );

   

        if (response.ok && data.success) {
          setFees(
            data.feeDetails ||
              data.fees ||
              data.fee ||
              data.data ||
              null
          );
        } else {
          setFees(null);
        }
      } catch (err) {
        console.error(
          "Fee details error:",
          err
        );

        setFees(null);
      }
    } catch (err) {
      console.error(
        "Fetch user details error:",
        err
      );

      setError(
        err.message ||
          "Unable to load user details."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-10 text-center">
        <div className="animate-spin w-10 h-10 border-4 border-gray-200 border-t-[#ab183d] rounded-full mx-auto mb-4"></div>

        <h2 className="text-lg font-semibold text-gray-700">
          Loading user details...
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Please wait...
        </p>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div>
        <button
          onClick={() =>
            navigate("/admin/users")
          }
          className="flex items-center gap-2 mb-5 text-gray-600 hover:text-[#ab183d]"
        >
          <FaArrowLeft />
          Back to Registered Users
        </button>

        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-5">
          {error}
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="pb-10">

      <button
        onClick={() =>
          navigate("/admin/users")
        }
        className="flex items-center gap-2 mb-5 text-gray-600 hover:text-[#ab183d] font-medium"
      >
        <FaArrowLeft />
        Back to Registered Users
      </button>

      {/* USER HEADER */}

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-[#ab183d] text-white flex items-center justify-center">
              <FaUser className="text-2xl" />
            </div>

            <div>

              <h1 className="text-2xl font-bold text-gray-800">
                {user?.name || "N/A"}
              </h1>

              <p className="text-[#ab183d] font-semibold mt-1">
                Registration No:{" "}
                {user?.registrationNumber ||
                  "N/A"}
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            <HeaderInfo
              icon={<FaMobileAlt />}
              label="Mobile"
              value={user?.mobile}
            />

            <HeaderInfo
              icon={<FaEnvelope />}
              label="Email"
              value={user?.email}
            />

            <HeaderInfo
              icon={<FaCalendarAlt />}
              label="Registered"
              value={formatDate(
                user?.createdAt
              )}
            />

          </div>

        </div>

      </div>

      {/* TABS */}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

        <div className="flex overflow-x-auto border-b">

          <Tab
            active={activeTab === "personal"}
            onClick={() =>
              setActiveTab("personal")
            }
            icon={<FaUser />}
            text="Personal Details"
          />

          <Tab
            active={activeTab === "qualification"}
            onClick={() =>
              setActiveTab("qualification")
            }
            icon={<FaGraduationCap />}
            text="Qualification"
          />

          <Tab
            active={activeTab === "documents"}
            onClick={() =>
              setActiveTab("documents")
            }
            icon={<FaFileAlt />}
            text="Documents"
          />

          <Tab
            active={activeTab === "fees"}
            onClick={() =>
              setActiveTab("fees")
            }
            icon={<FaMoneyBillWave />}
            text="Fee Details"
          />

        </div>

        <div className="p-6">

          {activeTab === "personal" && (
            <PersonalSection
              user={user}
              personal={personal}
            />
          )}

          {activeTab === "qualification" && (
            <QualificationSection
              qualification={qualification}
            />
          )}

          {activeTab === "documents" && (
            <DocumentsSection
              documents={documents}
            />
          )}

          {activeTab === "fees" && (
            <FeesSection
              fees={fees}
            />
          )}

        </div>

      </div>

    </div>
  );
}


// =========================================================
// HEADER INFO
// =========================================================

function HeaderInfo({
  icon,
  label,
  value,
}) {
  return (
    <div className="bg-gray-50 border rounded-lg px-4 py-3">

      <div className="flex items-center gap-2 text-gray-500 text-xs">
        {icon}
        <span>{label}</span>
      </div>

      <p className="font-semibold text-gray-800 mt-1 text-sm break-all">
        {value || "N/A"}
      </p>

    </div>
  );
}


// =========================================================
// TAB
// =========================================================

function Tab({
  active,
  onClick,
  icon,
  text,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-4 whitespace-nowrap border-b-2 font-medium transition ${
        active
          ? "border-[#ab183d] text-[#ab183d]"
          : "border-transparent text-gray-500 hover:text-gray-800"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}


// =========================================================
// PERSONAL DETAILS
// =========================================================

function PersonalSection({
  user,
  personal,
}) {
  const data = personal || {};

  const permanentAddress =
    data.permanentAddress || {};

  const correspondenceAddress =
    data.correspondenceAddress || {};

  return (
    <div>

      <h2 className="text-xl font-bold mb-5 text-gray-800">
        Personal Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        <Detail
          label="Registration Number"
          value={user?.registrationNumber}
        />

        <Detail
          label="Name"
          value={user?.name}
        />

        <Detail
          label="Aadhaar Number"
          value={
            user?.aadhaar ||
            data?.aadhaar
          }
        />

        <Detail
          label="Date of Birth"
          value={user?.dob}
        />

        <Detail
          label="Mobile"
          value={user?.mobile}
        />

        <Detail
          label="Email"
          value={user?.email}
        />

        <Detail
          label="Gender"
          value={data.gender}
        />

        <Detail
          label="Category"
          value={data.category}
        />

        <Detail
          label="Father Name"
          value={data.fatherName}
        />

        <Detail
          label="Mother Name"
          value={data.motherName}
        />

        <Detail
          label="Nationality"
          value={data.nationality}
        />

        <Detail
          label="Marital Status"
          value={data.maritalStatus}
        />

      </div>

      <h3 className="text-lg font-bold mt-8 mb-4 text-gray-800">
        Permanent Address
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        <Detail
          label="Village / City / Town"
          value={permanentAddress.villageCityTown}
        />

        <Detail
          label="Post Office"
          value={permanentAddress.postOffice}
        />

        <Detail
          label="Police Station"
          value={permanentAddress.policeStation}
        />

        <Detail
          label="Sub District"
          value={permanentAddress.subDistrict}
        />

        <Detail
          label="District"
          value={permanentAddress.district}
        />

        <Detail
          label="State"
          value={permanentAddress.state}
        />

        <Detail
          label="PIN Code"
          value={permanentAddress.pinCode}
        />

      </div>

      <h3 className="text-lg font-bold mt-8 mb-4 text-gray-800">
        Correspondence Address
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        <Detail
          label="Same as Permanent Address"
          value={
            data.sameAddress
              ? "Yes"
              : "No"
          }
        />

        {!data.sameAddress && (
          <>
            <Detail
              label="Village / City / Town"
              value={
                correspondenceAddress.villageCityTown
              }
            />

            <Detail
              label="Post Office"
              value={
                correspondenceAddress.postOffice
              }
            />

            <Detail
              label="Police Station"
              value={
                correspondenceAddress.policeStation
              }
            />

            <Detail
              label="Sub District"
              value={
                correspondenceAddress.subDistrict
              }
            />

            <Detail
              label="District"
              value={
                correspondenceAddress.district
              }
            />

            <Detail
              label="State"
              value={
                correspondenceAddress.state
              }
            />

            <Detail
              label="PIN Code"
              value={
                correspondenceAddress.pinCode
              }
            />
          </>
        )}

      </div>

    </div>
  );
}


// =========================================================
// QUALIFICATION
// =========================================================

function QualificationSection({
  qualification,
}) {
  if (!qualification) {
    return (
      <Empty
        text="Qualification details not available."
      />
    );
  }

  const education =
    Array.isArray(
      qualification.education
    )
      ? qualification.education
      : [];

  const examDetails =
    qualification.examDetails || {};

  const otherDetails =
    qualification.otherDetails || {};

  return (
    <div className="space-y-8">

      <div>

        <h2 className="text-xl font-bold mb-5 text-gray-800">
          Educational Qualification
        </h2>

        {education.length === 0 ? (
          <Empty
            text="No qualification records found."
          />
        ) : (
          <div className="overflow-x-auto border rounded-lg">

            <table className="w-full min-w-[1000px] border-collapse">

              <thead>
                <tr className="bg-gray-50">

                  <th className="border p-3 text-left">
                    Qualification
                  </th>

                  <th className="border p-3 text-left">
                    Board / University
                  </th>

                  <th className="border p-3 text-left">
                    Passing Year
                  </th>

                  <th className="border p-3 text-left">
                    Status
                  </th>

                  <th className="border p-3 text-left">
                    Marks
                  </th>

                  <th className="border p-3 text-left">
                    Percentage
                  </th>

                </tr>
              </thead>

              <tbody>

                {education.map(
                  (item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50"
                    >

                      <td className="border p-3 font-medium text-gray-800">
                        {item.qualification || "N/A"}
                      </td>

                      <td className="border p-3 text-gray-700">
                        {item.boardUniversity || "N/A"}
                      </td>

                      <td className="border p-3 text-gray-700">
                        {item.passingYear || "N/A"}
                      </td>

                      <td className="border p-3 text-gray-700">
                        {item.status || "N/A"}
                      </td>

                      <td className="border p-3 text-gray-700">
                        {item.marks || "N/A"}
                      </td>

                      <td className="border p-3 text-gray-700">
                        {item.percentage || "N/A"}
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

      <div>

        <h2 className="text-xl font-bold mb-5 text-gray-800">
          Exam Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Detail
            label="Post Preference"
            value={examDetails.postPreference}
          />

          <Detail
            label="Exam Centre Preference"
            value={examDetails.examCentrePreference}
          />

        </div>

      </div>

      <div>

        <h2 className="text-xl font-bold mb-5 text-gray-800">
          Other Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Detail
            label="Domicile Certificate Number"
            value={
              otherDetails.domicileCertificateNumber
            }
          />

          <Detail
            label="Caste Certificate Number"
            value={
              otherDetails.casteCertificateNumber
            }
          />

          <Detail
            label="Disability Details Number"
            value={
              otherDetails.disabilityDetailsNumber
            }
          />

          <Detail
            label="Employment Details Number"
            value={
              otherDetails.employmentDetailsNumber
            }
          />

        </div>

      </div>

      <div>

        <h2 className="text-xl font-bold mb-5 text-gray-800">
          Record Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Detail
            label="Created At"
            value={
              qualification.createdAt
                ? new Date(
                    qualification.createdAt
                  ).toLocaleString("en-IN")
                : "N/A"
            }
          />

          <Detail
            label="Updated At"
            value={
              qualification.updatedAt
                ? new Date(
                    qualification.updatedAt
                  ).toLocaleString("en-IN")
                : "N/A"
            }
          />

        </div>

      </div>

    </div>
  );
}


// =========================================================
// DOCUMENTS SECTION
// =========================================================

function DocumentsSection({
  documents,
}) {
  console.log(
    "DOCUMENTS RECEIVED IN SECTION:",
    documents
  );

  if (!documents) {
    return (
      <Empty
        text="Documents not available."
      />
    );
  }

  const ignoredKeys = [
    "_id",
    "userId",
    "createdAt",
    "updatedAt",
    "__v",
  ];

  const entries = Object.entries(
    documents
  ).filter(
    ([key]) =>
      !ignoredKeys.includes(key)
  );

  if (entries.length === 0) {
    return (
      <Empty
        text="No documents found."
      />
    );
  }

  return (
    <div>

      <div className="mb-6">

        <h2 className="text-xl font-bold text-gray-800">
          Uploaded Documents
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Documents uploaded by the applicant
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {entries.map(
          ([key, value]) => (
            <DocumentCard
              key={key}
              label={formatLabel(key)}
              value={value}
            />
          )
        )}

      </div>

    </div>
  );
}


// =========================================================
// DOCUMENT CARD
// =========================================================

function DocumentCard({
  label,
  value,
}) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return (
      <div className="border rounded-xl p-5 bg-gray-50">

        <p className="text-sm text-gray-500">
          {label}
        </p>

        <p className="font-semibold text-gray-700 mt-2">
          Not uploaded
        </p>

      </div>
    );
  }

  // STRING
  if (typeof value === "string") {
    const url = extractUrl(value);

    if (url) {
      return (
        <CloudinaryDocument
          label={label}
          url={url}
        />
      );
    }

    return (
      <div className="border rounded-xl p-5 bg-gray-50">

        <p className="text-sm text-gray-500">
          {label}
        </p>

        <p className="font-semibold text-gray-800 mt-2 break-all">
          {value}
        </p>

      </div>
    );
  }

  // ARRAY
  if (Array.isArray(value)) {
    return (
      <div className="border rounded-xl p-5 bg-white shadow-sm">

        <p className="text-sm font-semibold text-gray-700 mb-4">
          {label}
        </p>

        <div className="space-y-4">

          {value.map(
            (item, index) => (
              <DocumentCard
                key={index}
                label={`${label} ${index + 1}`}
                value={item}
              />
            )
          )}

        </div>

      </div>
    );
  }

  // OBJECT
  if (typeof value === "object") {

    const objectUrl =
      extractObjectUrl(value);

    if (objectUrl) {
      return (
        <CloudinaryDocument
          label={label}
          url={objectUrl}
          fileData={value}
        />
      );
    }

    const nestedEntries =
      Object.entries(value);

    if (nestedEntries.length === 0) {
      return null;
    }

    return (
      <div className="border rounded-xl p-5 bg-white shadow-sm">

        <p className="text-sm font-semibold text-gray-700 mb-4">
          {label}
        </p>

        <div className="space-y-4">

          {nestedEntries.map(
            ([nestedKey, nestedValue]) => (
              <DocumentCard
                key={nestedKey}
                label={formatLabel(nestedKey)}
                value={nestedValue}
              />
            )
          )}

        </div>

      </div>
    );
  }

  return (
    <div className="border rounded-xl p-5 bg-gray-50">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-semibold text-gray-800 mt-2 break-all">
        {String(value)}
      </p>

    </div>
  );
}


// =========================================================
// CLOUDINARY DOCUMENT
// =========================================================

function CloudinaryDocument({
  label,
  url,
  fileData = null,
}) {
  const image =
    isImageUrl(url, fileData);

  const pdf =
    isPdfUrl(url, fileData);

  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">

      <div className="flex items-center gap-3 mb-4">

        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">

          {image ? (
            <FaImage className="text-[#ab183d]" />
          ) : pdf ? (
            <FaFilePdf className="text-red-600" />
          ) : (
            <FaFileAlt className="text-gray-500" />
          )}

        </div>

        <div className="min-w-0">

          <h3 className="font-semibold text-gray-800">
            {label}
          </h3>

          {fileData?.originalName && (
            <p className="text-xs text-gray-500 mt-1 break-all">
              {fileData.originalName}
            </p>
          )}

        </div>

      </div>

      {/* IMAGE */}

      {image && (
        <div className="border rounded-lg bg-gray-50 p-3 mb-4">

          <img
            src={url}
            alt={label}
            className="w-full h-[350px] object-contain rounded-lg bg-white"
            onLoad={() => {
              console.log(
                "CLOUDINARY IMAGE LOADED:",
                url
              );
            }}
            onError={(e) => {
              console.error(
                "CLOUDINARY IMAGE FAILED:",
                url
              );

              e.currentTarget.style.display =
                "none";
            }}
          />

        </div>
      )}

      {/* PDF / OTHER */}

      {!image && (
        <div className="border rounded-lg bg-gray-50 h-40 flex flex-col items-center justify-center mb-4">

          {pdf ? (
            <FaFilePdf className="text-6xl text-red-500 mb-3" />
          ) : (
            <FaFileAlt className="text-6xl text-gray-400 mb-3" />
          )}

          <p className="text-sm text-gray-500">
            {pdf
              ? "PDF Document"
              : "Uploaded Document"}
          </p>

        </div>
      )}

      {/* FILE INFORMATION */}

      {fileData && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4 text-xs text-gray-500 space-y-1">

          {fileData.mimetype && (
            <p>
              <strong>Type:</strong>{" "}
              {fileData.mimetype}
            </p>
          )}

          {fileData.size && (
            <p>
              <strong>Size:</strong>{" "}
              {formatFileSize(fileData.size)}
            </p>
          )}

          {fileData.filename && (
            <p className="break-all">
              <strong>Cloudinary File:</strong>{" "}
              {fileData.filename}
            </p>
          )}

        </div>
      )}

      {/* BUTTONS */}

      <div className="flex flex-col sm:flex-row gap-3">

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#ab183d] px-4 py-3 text-sm font-semibold text-white hover:bg-[#8f1534]"
        >
          <FaExternalLinkAlt />
          View Document
        </a>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
        >
          <FaDownload />
          Open
        </a>

      </div>

      <p className="text-xs text-gray-400 mt-3 break-all">
        {url}
      </p>

    </div>
  );
}


// =========================================================
// EXTRACT URL FROM STRING
// =========================================================

function extractUrl(value) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }

  return null;
}


// =========================================================
// EXTRACT URL FROM OBJECT
// =========================================================

function extractObjectUrl(object) {
  if (
    !object ||
    typeof object !== "object"
  ) {
    return null;
  }

  // Real URL fields
  const possibleUrlKeys = [
    "secure_url",
    "secureUrl",
    "url",
    "fileUrl",
    "fileURL",
    "documentUrl",
    "documentURL",
    "cloudinaryUrl",
    "cloudinaryURL",
    "path",
    "src",
    "location",
  ];

  for (const key of possibleUrlKeys) {
    const value = object[key];

    if (
      typeof value === "string" &&
      extractUrl(value)
    ) {
      return value;
    }
  }

  // Cloudinary filename
  if (
    typeof object.filename === "string"
  ) {
    return buildCloudinaryUrl(
      object.filename,
      object.mimetype,
      object.originalName
    );
  }

  // Cloudinary public_id
  if (
    typeof object.public_id === "string"
  ) {
    return buildCloudinaryUrl(
      object.public_id,
      object.mimetype,
      object.originalName
    );
  }

  return null;
}


// =========================================================
// BUILD CLOUDINARY URL
// =========================================================

function buildCloudinaryUrl(
  filename,
  mimetype = "",
  originalName = ""
) {
  if (
    !filename ||
    typeof filename !== "string"
  ) {
    return null;
  }

  let publicId =
    filename.trim();

  // Already a complete URL
  if (
    publicId.startsWith("http://") ||
    publicId.startsWith("https://")
  ) {
    return publicId;
  }

  // Remove leading slash
  publicId =
    publicId.replace(/^\/+/, "");

  // Remove Cloudinary URL pieces if accidentally stored
  publicId =
    publicId.replace(
      /^image\/upload\//i,
      ""
    );

  publicId =
    publicId.replace(
      /^raw\/upload\//i,
      ""
    );

  // Remove version if stored as:
  // v123456789/folder/file
  publicId =
    publicId.replace(
      /^v\d+\//i,
      ""
    );

  // =======================================================
  // RESOURCE TYPE
  // =======================================================

  let resourceType = "image";

  if (
    mimetype === "application/pdf" ||
    String(originalName)
      .toLowerCase()
      .endsWith(".pdf")
  ) {
    resourceType = "raw";
  }

  // =======================================================
  // REMOVE EXTENSION FROM PUBLIC ID
  // =======================================================

  /*
    Cloudinary public_id normally should NOT require
    manually adding .jpg/.png/.pdf.

    Example DB:

    cllnew/documents/photo-1787040362867-472324839

    Result:

    https://res.cloudinary.com/bqsfc3jf/image/upload/
    cllnew/documents/photo-1787040362867-472324839
  */

  console.log(
    "CLOUDINARY CLOUD NAME:",
    CLOUDINARY_CLOUD_NAME
  );

  console.log(
    "CLOUDINARY PUBLIC ID:",
    publicId
  );

  const url =
    `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/${publicId}`;

  console.log(
    "BUILT CLOUDINARY URL:",
    url
  );

  return url;
}


// =========================================================
// IMAGE URL
// =========================================================

function isImageUrl(
  url,
  fileData = null
) {
  if (!url) {
    return false;
  }

  // Best detection
  if (fileData?.mimetype) {
    return fileData.mimetype.startsWith(
      "image/"
    );
  }

  const lower =
    url.toLowerCase();

  return (
    lower.includes(
      "res.cloudinary.com"
    ) &&
    (
      lower.includes(
        "/image/upload/"
      ) ||
      /\.(jpg|jpeg|png|gif|webp|avif|bmp)(\?|$)/i.test(
        lower
      )
    )
  );
}


// =========================================================
// PDF URL
// =========================================================

function isPdfUrl(
  url,
  fileData = null
) {
  if (
    fileData?.mimetype ===
    "application/pdf"
  ) {
    return true;
  }

  if (!url) {
    return false;
  }

  const lower =
    url.toLowerCase();

  return (
    lower.includes(".pdf") ||
    lower.includes(
      "resource_type=raw"
    ) ||
    lower.includes(
      "/raw/upload/"
    )
  );
}


// =========================================================
// FILE SIZE
// =========================================================

function formatFileSize(bytes) {
  if (!bytes) {
    return "0 Bytes";
  }

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
  ];

  const index =
    Math.floor(
      Math.log(bytes) /
        Math.log(1024)
    );

  return `${(
    bytes /
    Math.pow(1024, index)
  ).toFixed(
    index === 0 ? 0 : 2
  )} ${units[index]}`;
}


// =========================================================
// FEES
// =========================================================

function FeesSection({
  fees,
}) {
  if (!fees) {
    return (
      <Empty
        text="Fee details not available."
      />
    );
  }

  const entries =
    Object.entries(fees).filter(
      ([key]) =>
        ![
          "_id",
          "userId",
          "createdAt",
          "updatedAt",
          "__v",
        ].includes(key)
    );

  if (entries.length === 0) {
    return (
      <Empty
        text="No fee details found."
      />
    );
  }

  return (
    <div>

      <h2 className="text-xl font-bold mb-5 text-gray-800">
        Fee Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {entries.map(
          ([key, value]) => (
            <Detail
              key={key}
              label={formatLabel(key)}
              value={
                value === null ||
                value === undefined ||
                value === ""
                  ? "N/A"
                  : String(value)
              }
            />
          )
        )}

      </div>

    </div>
  );
}


// =========================================================
// DETAIL
// =========================================================

function Detail({
  label,
  value,
}) {
  return (
    <div className="bg-gray-50 border rounded-lg p-4">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-semibold text-gray-800 mt-1 break-words">
        {value === null ||
        value === undefined ||
        value === ""
          ? "N/A"
          : String(value)}
      </p>

    </div>
  );
}


// =========================================================
// EMPTY
// =========================================================

function Empty({
  text,
}) {
  return (
    <div className="text-center py-12">

      <div className="text-gray-300 text-5xl mb-4">
        <FaFileAlt className="mx-auto" />
      </div>

      <p className="text-gray-500">
        {text}
      </p>

    </div>
  );
}


// =========================================================
// FORMAT LABEL
// =========================================================

function formatLabel(value) {
  return String(value)
    .replace(
      /([A-Z])/g,
      " $1"
    )
    .replace(
      /^./,
      (str) =>
        str.toUpperCase()
    );
}


// =========================================================
// FORMAT DATE
// =========================================================

function formatDate(date) {
  if (!date) {
    return "N/A";
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
}