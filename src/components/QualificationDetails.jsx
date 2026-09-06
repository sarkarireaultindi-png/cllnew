import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function QualificationDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  // --------------------------------------------------------------------------
  // USER ID
  // --------------------------------------------------------------------------

  const userId = location.state?.userId || localStorage.getItem("userId");

  // --------------------------------------------------------------------------
  // EDUCATION ROWS
  // --------------------------------------------------------------------------

  const educationRows = [
    "High School",
    "Senior Secondary",
    "Graduation",
    "Post Graduation / Diploma",
  ];

  // --------------------------------------------------------------------------
  // EXAM CENTERS
  // --------------------------------------------------------------------------

  const examCenters = [
    "New Delhi",
    "Mumbai",
    "Kolkata",
    "Chennai",
    "Bengaluru",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Jaipur",
    "Lucknow",
    "Patna",
    "Bhopal",
    "Chandigarh",
    "Bhubaneswar",
    "Guwahati",
    "Agra",
    "Allahabad (Prayagraj)",
    "Amritsar",
    "Bareilly",
    "Dehradun",
    "Gorakhpur",
    "Kanpur",
    "Meerut",
    "Varanasi",
    "Noida",
    "Ghaziabad",
    "Ranchi",
    "Jamshedpur",
    "Raipur",
    "Bilaspur",
    "Bokaro",
    "Indore",
    "Jabalpur",
    "Gwalior",
    "Aurangabad",
    "Nagpur",
    "Nashik",
    "Thane",
    "Visakhapatnam",
    "Vijayawada",
    "Tirupati",
    "Kochi",
    "Thiruvananthapuram",
    "Coimbatore",
    "Madurai",
    "Mysuru",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Srinagar",
  ];

  // --------------------------------------------------------------------------
  // CREATE EMPTY EDUCATION ROWS
  // --------------------------------------------------------------------------

  const createEducationRows = () =>
    educationRows.map((qualification) => ({
      qualification,
      boardUniversity: "",
      passingYear: "",
      rollNumber: "",
      marks: "",
      percentage: "",
    }));

  // --------------------------------------------------------------------------
  // FORM STATE
  // --------------------------------------------------------------------------

  const [formData, setFormData] = useState({
    education: createEducationRows(),

    otherDetails: {
      domicileCertificateNumber: "",
      casteCertificateNumber: "",
      disabilityDetailsNumber: "",
      employmentDetailsNumber: "",
    },

    examDetails: {
      postPreference: "",
      examCentrePreference: "",
    },
  });

  // --------------------------------------------------------------------------
  // UI STATE
  // --------------------------------------------------------------------------

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --------------------------------------------------------------------------
  // FETCH EXISTING QUALIFICATION DETAILS
  // --------------------------------------------------------------------------

  useEffect(() => {
    const fetchQualificationDetails = async () => {
      if (!userId) {
        setError(
          "User registration information not found. Please login again."
        );

        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://cllnew.onrender.com/api/qualification-details/${userId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch qualification details."
          );
        }

        const saved = data.qualificationDetails;

        // --------------------------------------------------------------------
        // NO SAVED DATA
        // --------------------------------------------------------------------

        if (!saved) {
          setFormData({
            education: createEducationRows(),

            otherDetails: {
              domicileCertificateNumber: "",
              casteCertificateNumber: "",
              disabilityDetailsNumber: "",
              employmentDetailsNumber: "",
            },

            examDetails: {
              postPreference: "",
              examCentrePreference: "",
            },
          });

          return;
        }

        // --------------------------------------------------------------------
        // EDUCATION
        // --------------------------------------------------------------------

        const savedEducation = Array.isArray(saved.education)
          ? saved.education
          : [];

        const education = educationRows.map((qualification) => {
          const existing = savedEducation.find(
            (item) => item.qualification === qualification
          );

          return {
            qualification,

            boardUniversity: existing?.boardUniversity || "",

            passingYear: existing?.passingYear || "",

            rollNumber: existing?.rollNumber || "",

            marks: existing?.marks || "",

            percentage: existing?.percentage || "",
          };
        });

        // --------------------------------------------------------------------
        // SET SAVED FORM DATA
        // --------------------------------------------------------------------

        setFormData({
          education,

          otherDetails: {
            domicileCertificateNumber:
              saved.otherDetails?.domicileCertificateNumber || "",

            casteCertificateNumber:
              saved.otherDetails?.casteCertificateNumber || "",

            disabilityDetailsNumber:
              saved.otherDetails?.disabilityDetailsNumber || "",

            employmentDetailsNumber:
              saved.otherDetails?.employmentDetailsNumber || "",
          },

          examDetails: {
            postPreference: saved.examDetails?.postPreference || "",

            examCentrePreference:
              saved.examDetails?.examCentrePreference || "",
          },
        });
      } catch (error) {
        console.error("Fetch qualification details error:", error);

        setError(error.message || "Unable to load qualification details.");
      } finally {
        setLoading(false);
      }
    };

    fetchQualificationDetails();
  }, [userId]);

  // --------------------------------------------------------------------------
  // EDUCATION CHANGE
  // --------------------------------------------------------------------------

  const handleEducationChange = (index, field, value) => {
    setFormData((prev) => {
      const education = [...prev.education];

      education[index] = {
        ...education[index],
        [field]: value,
      };

      return {
        ...prev,
        education,
      };
    });

    setError("");
    setSuccess("");
  };

  // --------------------------------------------------------------------------
  // OTHER DETAILS CHANGE
  // --------------------------------------------------------------------------

  const handleOtherDetailsChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      otherDetails: {
        ...prev.otherDetails,
        [name]: value,
      },
    }));

    setError("");
    setSuccess("");
  };

  // --------------------------------------------------------------------------
  // EXAM DETAILS CHANGE
  // --------------------------------------------------------------------------

  const handleExamDetailsChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      examDetails: {
        ...prev.examDetails,
        [name]: value,
      },
    }));

    setError("");
    setSuccess("");
  };

  // --------------------------------------------------------------------------
  // SUBMIT
  // --------------------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ------------------------------------------------------------------------
    // USER ID VALIDATION
    // ------------------------------------------------------------------------

    if (!userId) {
      setError(
        "User registration information not found. Please login again."
      );
      return;
    }

    // ------------------------------------------------------------------------
    // EDUCATIONAL QUALIFICATION VALIDATION
    //
    // At least ONE complete qualification is mandatory.
    // ------------------------------------------------------------------------

    const completeQualificationIndex = formData.education.findIndex(
      (row) =>
        row.boardUniversity.trim() !== "" &&
        row.passingYear.trim() !== "" &&
        row.rollNumber.trim() !== "" &&
        row.marks.trim() !== "" &&
        row.percentage.trim() !== ""
    );

    // No complete qualification found
    if (completeQualificationIndex === -1) {
      setError(
        "Please complete at least one educational qualification: High School, Senior Secondary, Graduation, or Post Graduation / Diploma."
      );
      return;
    }

    // ------------------------------------------------------------------------
    // CHECK FOR PARTIALLY FILLED QUALIFICATION
    //
    // If user starts another qualification, require all fields in that row.
    // ------------------------------------------------------------------------

    for (const row of formData.education) {
      const fields = [
        row.boardUniversity.trim(),
        row.passingYear.trim(),
        row.rollNumber.trim(),
        row.marks.trim(),
        row.percentage.trim(),
      ];

      const filledFields = fields.filter((field) => field !== "").length;

      if (filledFields > 0 && filledFields < 5) {
        const missingFields = [];

        if (!row.boardUniversity.trim()) {
          missingFields.push("Board / University");
        }

        if (!row.passingYear.trim()) {
          missingFields.push("Passing Year");
        }

        if (!row.rollNumber.trim()) {
          missingFields.push("Roll Number");
        }

        if (!row.marks.trim()) {
          missingFields.push("Marks");
        }

        if (!row.percentage.trim()) {
          missingFields.push("Percentage / CGPA");
        }

        setError(
          `${row.qualification}: Please complete ${missingFields.join(
            ", "
          )}.`
        );

        return;
      }
    }

    // ------------------------------------------------------------------------
    // POST PREFERENCE VALIDATION
    // ------------------------------------------------------------------------

    if (!formData.examDetails.postPreference) {
      setError("Please select your post preference.");
      return;
    }

    // ------------------------------------------------------------------------
    // EXAM CENTRE VALIDATION
    // ------------------------------------------------------------------------

    if (!formData.examDetails.examCentrePreference) {
      setError("Please select your exam centre preference.");
      return;
    }

    // ------------------------------------------------------------------------
    // SAVE DATA
    // ------------------------------------------------------------------------

    try {
      setSaving(true);

      const response = await fetch(
        "https://cllnew.onrender.com/api/qualification-details",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            userId,

            education: formData.education,

            otherDetails: formData.otherDetails,

            examDetails: formData.examDetails,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save qualification details."
        );
      }

      // ----------------------------------------------------------------------
      // SUCCESS
      // ----------------------------------------------------------------------

      setSuccess("Qualification details saved successfully.");

      // ----------------------------------------------------------------------
      // KEEP USER ID
      // ----------------------------------------------------------------------

      localStorage.setItem("userId", userId);

      // ----------------------------------------------------------------------
      // GO TO STEP 3
      // ----------------------------------------------------------------------

      setTimeout(() => {
        navigate("/documents-upload", {
          state: {
            userId,
          },
        });
      }, 800);
    } catch (error) {
      console.error("Save qualification details error:", error);

      setError(error.message || "Unable to save qualification details.");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------------------------------
  // LOADING
  // --------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-xl bg-white px-8 py-6 shadow">
          <p className="font-semibold text-gray-700">
            Loading qualification details...
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // UI
  // --------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto w-full max-w-[1000px]">

        {/* Header */}

        <div className="rounded-t-2xl bg-[#ab183d] px-6 py-5 text-white">
          <h1 className="text-xl font-bold">
            Qualification & Exam Details
          </h1>

          <p className="mt-1 text-sm text-white/80">
            Enter your educational and examination details
          </p>
        </div>

        {/* Application Steps */}

        <div className="grid grid-cols-2 gap-3 bg-white px-6 pt-6 md:grid-cols-4">

          {/* Step 1 */}

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

          {/* Step 2 */}

          <div className="rounded-lg bg-[#ab183d] px-3 py-3 text-center text-white shadow-sm">
            <div className="text-sm font-bold">
              Step 2
            </div>

            <div className="mt-1 text-xs">
              Qualification
            </div>
          </div>

          {/* Step 3 */}

          <Link
            to="/documents-upload"
            state={{ userId }}
            className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-3 text-center text-gray-600 transition hover:bg-gray-200"
          >
            <div className="text-sm font-bold">
              Step 3
            </div>

            <div className="mt-1 text-xs">
              Documents
            </div>
          </Link>

          {/* Step 4 */}

          <Link
            to="/fee-details"
            state={{ userId }}
            className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-3 text-center text-gray-600 transition hover:bg-gray-200"
          >
            <div className="text-sm font-bold">
              Step 4
            </div>

            <div className="mt-1 text-xs">
              Fee Details
            </div>
          </Link>
        </div>

        {/* Main Form */}

        <div className="rounded-b-2xl bg-white p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* =====================================================
                EDUCATIONAL QUALIFICATION
            ====================================================== */}

            <div>
              <h2 className="rounded-t-md bg-[#ab183d] px-4 py-3 text-lg font-semibold text-white">
                Educational Qualification
                <span className="ml-2 text-sm font-normal text-white/90">
                  (At least one qualification is required)
                </span>
              </h2>

              <div className="overflow-x-auto border border-gray-300">
                <table className="w-full min-w-[1000px] border-collapse">

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
                        Roll Number
                      </th>

                      <th className="border border-gray-300 px-3 py-3 text-left">
                        Marks
                      </th>

                      <th className="border border-gray-300 px-3 py-3 text-left">
                        Percentage / CGPA
                      </th>

                    </tr>
                  </thead>

                  <tbody>
                    {formData.education.map((row, index) => (
                      <tr key={row.qualification}>

                        {/* Qualification */}

                        <td className="border border-gray-300 bg-gray-50 px-3 py-2 font-medium">
                          {row.qualification}
                        </td>

                        {/* Board / University */}

                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="text"
                            value={row.boardUniversity}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "boardUniversity",
                                e.target.value
                              )
                            }
                            placeholder="Board / University"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#ab183d] focus:ring-1 focus:ring-[#ab183d]"
                          />
                        </td>

                        {/* Passing Year */}

                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={4}
                            value={row.passingYear}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "passingYear",
                                e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 4)
                              )
                            }
                            placeholder="YYYY"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#ab183d] focus:ring-1 focus:ring-[#ab183d]"
                          />
                        </td>

                        {/* Roll Number */}

                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="text"
                            value={row.rollNumber}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "rollNumber",
                                e.target.value
                              )
                            }
                            placeholder="Roll Number"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#ab183d] focus:ring-1 focus:ring-[#ab183d]"
                          />
                        </td>

                        {/* Marks */}

                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={row.marks}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "marks",
                                e.target.value.replace(/\D/g, "")
                              )
                            }
                            placeholder="Marks"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#ab183d] focus:ring-1 focus:ring-[#ab183d]"
                          />
                        </td>

                        {/* Percentage */}

                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="text"
                            inputMode="decimal"
                            value={row.percentage}
                            onChange={(e) => {
                              let value = e.target.value;

                              // Allow numbers and one decimal point
                              value = value
                                .replace(/[^0-9.]/g, "")
                                .replace(/(\..*)\./g, "$1");

                              handleEducationChange(
                                index,
                                "percentage",
                                value
                              );
                            }}
                            placeholder="Percentage / CGPA"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#ab183d] focus:ring-1 focus:ring-[#ab183d]"
                          />
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Please complete at least one qualification. If you start
                entering another qualification, all fields in that row must
                also be completed.
              </p>
            </div>

            {/* =====================================================
                OTHER DETAILS
            ====================================================== */}

            <div>
              <h2 className="rounded-t-md bg-[#ab183d] px-4 py-3 text-lg font-semibold text-white">
                Other Details
              </h2>

              <div className="grid grid-cols-1 gap-5 border border-gray-300 bg-white p-5 md:grid-cols-2">

                {/* Domicile */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Domicile Certificate Number
                  </label>

                  <input
                    type="text"
                    name="domicileCertificateNumber"
                    value={
                      formData.otherDetails.domicileCertificateNumber
                    }
                    onChange={handleOtherDetailsChange}
                    placeholder="Enter Domicile Certificate Number"
                    className="w-full rounded-md border border-gray-300 px-3 py-3 outline-none focus:border-[#ab183d] focus:ring-1 focus:ring-[#ab183d]"
                  />
                </div>

                {/* Caste */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Caste Certificate Number
                  </label>

                  <input
                    type="text"
                    name="casteCertificateNumber"
                    value={
                      formData.otherDetails.casteCertificateNumber
                    }
                    onChange={handleOtherDetailsChange}
                    placeholder="Enter Caste Certificate Number"
                    className="w-full rounded-md border border-gray-300 px-3 py-3 outline-none focus:border-[#ab183d] focus:ring-1 focus:ring-[#ab183d]"
                  />
                </div>

                {/* Disability */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Disability Details Number
                  </label>

                  <input
                    type="text"
                    name="disabilityDetailsNumber"
                    value={
                      formData.otherDetails.disabilityDetailsNumber
                    }
                    onChange={handleOtherDetailsChange}
                    placeholder="Enter Disability Details Number"
                    className="w-full rounded-md border border-gray-300 px-3 py-3 outline-none focus:border-[#ab183d] focus:ring-1 focus:ring-[#ab183d]"
                  />
                </div>

                {/* Employment */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Employment Details Number
                  </label>

                  <input
                    type="text"
                    name="employmentDetailsNumber"
                    value={
                      formData.otherDetails.employmentDetailsNumber
                    }
                    onChange={handleOtherDetailsChange}
                    placeholder="Enter Employment Details Number"
                    className="w-full rounded-md border border-gray-300 px-3 py-3 outline-none focus:border-[#ab183d] focus:ring-1 focus:ring-[#ab183d]"
                  />
                </div>

              </div>
            </div>

            {/* =====================================================
                EXAM DETAILS
            ====================================================== */}

            <div>
              <h2 className="rounded-t-md bg-[#ab183d] px-4 py-3 text-lg font-semibold text-white">
                Exam Details
              </h2>

              <div className="grid grid-cols-1 gap-5 border border-gray-300 bg-white p-5 md:grid-cols-2">

                {/* Post Preference */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Post Preference
                    <span className="ml-1 text-red-600">*</span>
                  </label>

                  <select
                    name="postPreference"
                    value={formData.examDetails.postPreference}
                    onChange={handleExamDetailsChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 outline-none focus:border-[#ab183d] focus:ring-1 focus:ring-[#ab183d]"
                  >
                    <option value="">
                      Select Post Preference
                    </option>

                    <option value="Assistant Section Officer (ASO)">
                      Assistant Section Officer (ASO)
                    </option>

                    <option value="Upper Division Clerk (UDC)">
                      Upper Division Clerk (UDC)
                    </option>

                    <option value="Lower Division Clerk (LDC)">
                      Lower Division Clerk (LDC)
                    </option>

                    <option value="Multi Tasking Staff (MTS)">
                      Multi Tasking Staff (MTS)
                    </option>
                  </select>
                </div>

                {/* Exam Centre */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Exam Centre Preference
                    <span className="ml-1 text-red-600">*</span>
                  </label>

                  <select
                    name="examCentrePreference"
                    value={
                      formData.examDetails.examCentrePreference
                    }
                    onChange={handleExamDetailsChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 outline-none focus:border-[#ab183d] focus:ring-1 focus:ring-[#ab183d]"
                  >
                    <option value="">
                      Select Exam Centre
                    </option>

                    {examCenters.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
            </div>

            {/* =====================================================
                MESSAGES
            ====================================================== */}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* =====================================================
                NAVIGATION
            ====================================================== */}

            <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-between">

              {/* Back */}

              <Link
                to="/user-profile"
                state={{ userId }}
                className="rounded-lg border border-gray-300 bg-white px-7 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                ← Back
              </Link>

              {/* Next */}

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#ab183d] px-7 py-3 text-center font-semibold text-white transition hover:bg-[#921532] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Next →"}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}