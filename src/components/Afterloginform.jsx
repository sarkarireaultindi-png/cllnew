import { useEffect, useState } from "react";

import {
  FaUser,
  FaUsers,
  FaGlobe,
  FaHeart,
  FaMapMarkerAlt,
  FaHome,
  FaMailBulk,
  FaCalendarAlt,
} from "react-icons/fa";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function PersonalDetailsForm() {
  const navigate = useNavigate();
  const location = useLocation();

  /*
  |--------------------------------------------------------------------------
  | USER ID
  |--------------------------------------------------------------------------
  | First check React Router state.
  | If page is refreshed, use localStorage.
  |--------------------------------------------------------------------------
  */

  const userId =
    location.state?.userId ||
    localStorage.getItem("userId");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    dob: "",

    gender: "",
    category: "",
    fatherName: "",
    motherName: "",
    nationality: "Indian",
    maritalStatus: "",

    permanentAddress: {
      villageCityTown: "",
      postOffice: "",
      policeStation: "",
      subDistrict: "",
      district: "",
      state: "",
      pinCode: "",
    },

    sameAddress: false,

    correspondenceAddress: {
      villageCityTown: "",
      postOffice: "",
      policeStation: "",
      subDistrict: "",
      district: "",
      state: "",
      pinCode: "",
    },
  });

  /*
  |--------------------------------------------------------------------------
  | STATES / UT
  |--------------------------------------------------------------------------
  */

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  /*
  |--------------------------------------------------------------------------
  | EMPTY ADDRESS
  |--------------------------------------------------------------------------
  */

  const emptyAddress = {
    villageCityTown: "",
    postOffice: "",
    policeStation: "",
    subDistrict: "",
    district: "",
    state: "",
    pinCode: "",
  };

  /*
  |--------------------------------------------------------------------------
  | FETCH USER + PERSONAL DETAILS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      if (!userId) {
        setError(
          "User registration information not found. Please register again."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://cllnew.onrender.com/api/personal-details/${userId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to fetch personal details."
          );
        }

        /*
         * Registration data
         *
         * Name + DOB should come from registration.
         */

        const registrationUser =
          data.user || {};

        /*
         * Existing personal details
         */

        const personalDetails =
          data.personalDetails || {};

        setFormData({
          name: registrationUser.name || "",

          dob: registrationUser.dob
            ? new Date(registrationUser.dob)
                .toISOString()
                .substring(0, 10)
            : "",

          gender:
            personalDetails.gender || "",

          category:
            personalDetails.category || "",

          fatherName:
            personalDetails.fatherName || "",

          motherName:
            personalDetails.motherName || "",

          nationality:
            personalDetails.nationality ||
            "Indian",

          maritalStatus:
            personalDetails.maritalStatus || "",

          permanentAddress:
            personalDetails.permanentAddress || {
              ...emptyAddress,
            },

          sameAddress:
            personalDetails.sameAddress || false,

          correspondenceAddress:
            personalDetails.correspondenceAddress || {
              ...emptyAddress,
            },
        });
      } catch (error) {
        console.error(
          "Fetch personal details error:",
          error
        );

        setError(
          error.message ||
            "Unable to load personal details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalDetails();
  }, [userId]);

  /*
  |--------------------------------------------------------------------------
  | NORMAL INPUT CHANGE
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /*
  |--------------------------------------------------------------------------
  | ADDRESS CHANGE
  |--------------------------------------------------------------------------
  */

  const handleAddressChange = (
    addressType,
    e
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [addressType]: {
        ...prev[addressType],
        [name]: value,
      },
    }));

    setError("");
    setSuccess("");
  };

  /*
  |--------------------------------------------------------------------------
  | SAME ADDRESS
  |--------------------------------------------------------------------------
  */

  const handleSameAddress = (e) => {
    const checked = e.target.checked;

    setFormData((prev) => ({
      ...prev,

      sameAddress: checked,

      correspondenceAddress: checked
        ? { ...prev.permanentAddress }
        : { ...emptyAddress },
    }));

    setError("");
    setSuccess("");
  };

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!userId) {
      setError(
        "User registration information not found. Please register again."
      );
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | PERSONAL VALIDATION
    |--------------------------------------------------------------------------
    */

    if (!formData.gender) {
      setError("Please select your gender.");
      return;
    }

    if (!formData.category) {
      setError("Please select your category.");
      return;
    }

    if (!formData.fatherName.trim()) {
      setError("Please enter father's name.");
      return;
    }

    if (!formData.motherName.trim()) {
      setError("Please enter mother's name.");
      return;
    }

    if (!formData.maritalStatus) {
      setError(
        "Please select your marital status."
      );
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | PERMANENT ADDRESS VALIDATION
    |--------------------------------------------------------------------------
    */

    if (
      !formData.permanentAddress
        .villageCityTown.trim()
    ) {
      setError(
        "Please enter your village/city/town."
      );
      return;
    }

    if (
      !formData.permanentAddress.postOffice.trim()
    ) {
      setError(
        "Please enter your post office."
      );
      return;
    }

    if (
      !formData.permanentAddress.policeStation.trim()
    ) {
      setError(
        "Please enter your police station."
      );
      return;
    }

    if (
      !formData.permanentAddress.subDistrict.trim()
    ) {
      setError(
        "Please enter your sub-district."
      );
      return;
    }

    if (
      !formData.permanentAddress.district.trim()
    ) {
      setError(
        "Please enter your district."
      );
      return;
    }

    if (
      !formData.permanentAddress.state
    ) {
      setError(
        "Please select your permanent address state."
      );
      return;
    }

    if (
      !/^\d{6}$/.test(
        formData.permanentAddress.pinCode
      )
    ) {
      setError(
        "Please enter a valid 6-digit permanent address PIN code."
      );
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | CORRESPONDENCE ADDRESS VALIDATION
    |--------------------------------------------------------------------------
    */

    if (!formData.sameAddress) {
      if (
        !formData.correspondenceAddress
          .villageCityTown.trim()
      ) {
        setError(
          "Please enter your correspondence village/city/town."
        );
        return;
      }

      if (
        !formData.correspondenceAddress
          .postOffice.trim()
      ) {
        setError(
          "Please enter your correspondence post office."
        );
        return;
      }

      if (
        !formData.correspondenceAddress
          .policeStation.trim()
      ) {
        setError(
          "Please enter your correspondence police station."
        );
        return;
      }

      if (
        !formData.correspondenceAddress
          .subDistrict.trim()
      ) {
        setError(
          "Please enter your correspondence sub-district."
        );
        return;
      }

      if (
        !formData.correspondenceAddress
          .district.trim()
      ) {
        setError(
          "Please enter your correspondence district."
        );
        return;
      }

      if (
        !formData.correspondenceAddress.state
      ) {
        setError(
          "Please select your correspondence address state."
        );
        return;
      }

      if (
        !/^\d{6}$/.test(
          formData.correspondenceAddress
            .pinCode
        )
      ) {
        setError(
          "Please enter a valid 6-digit correspondence address PIN code."
        );
        return;
      }
    }

    /*
    |--------------------------------------------------------------------------
    | SAVE
    |--------------------------------------------------------------------------
    */

    try {
      setLoading(true);

      const response = await fetch(
        "https://cllnew.onrender.com/api/personal-details",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId,

            /*
             * Name and DOB are NOT sent.
             *
             * Backend gets these from Registration.
             */

            gender: formData.gender,

            category: formData.category,

            fatherName:
              formData.fatherName.trim(),

            motherName:
              formData.motherName.trim(),

            nationality:
              formData.nationality,

            maritalStatus:
              formData.maritalStatus,

            permanentAddress:
              formData.permanentAddress,

            sameAddress:
              formData.sameAddress,

            correspondenceAddress:
              formData.sameAddress
                ? formData.permanentAddress
                : formData.correspondenceAddress,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to save personal details."
        );
      }

      setSuccess(
        "Personal details saved successfully."
      );

      /*
      |--------------------------------------------------------------------------
      | NEXT STEP
      |--------------------------------------------------------------------------
      |
      | Keep userId available for Step 2.
      |--------------------------------------------------------------------------
      */

      localStorage.setItem(
        "userId",
        userId
      );

      setTimeout(() => {
        navigate("/qualification-details", {
          state: {
            userId,
          },
        });
      }, 800);
    } catch (error) {
      console.error(
        "Save personal details error:",
        error
      );

      setError(
        error.message ||
          "Unable to save personal details."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | CLASSES
  |--------------------------------------------------------------------------
  */

  const inputClass =
    "w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20";

  const selectClass =
    "w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#ab183d] focus:ring-2 focus:ring-[#ab183d]/20";

  /*
  |--------------------------------------------------------------------------
  | ADDRESS FIELDS
  |--------------------------------------------------------------------------
  */

  const renderAddressFields = (
    addressType,
    title
  ) => {
    const address =
      formData[addressType];

    return (
      <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ab183d]/10 text-[#ab183d]">
            <FaHome />
          </div>

          <h2 className="text-lg font-bold text-gray-800">
            {title}
          </h2>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* Village / City / Town */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Village / City / Town
            </label>

            <div className="relative">

              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="villageCityTown"
                value={
                  address.villageCityTown
                }
                onChange={(e) =>
                  handleAddressChange(
                    addressType,
                    e
                  )
                }
                placeholder="Enter village/city/town"
                className={inputClass}
              />

            </div>
          </div>

          {/* Post Office */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Post Office
            </label>

            <div className="relative">

              <FaMailBulk className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="postOffice"
                value={
                  address.postOffice
                }
                onChange={(e) =>
                  handleAddressChange(
                    addressType,
                    e
                  )
                }
                placeholder="Enter post office"
                className={inputClass}
              />

            </div>
          </div>

          {/* Police Station */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Police Station
            </label>

            <div className="relative">

              <FaHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="policeStation"
                value={
                  address.policeStation
                }
                onChange={(e) =>
                  handleAddressChange(
                    addressType,
                    e
                  )
                }
                placeholder="Enter police station"
                className={inputClass}
              />

            </div>
          </div>

          {/* Sub District */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Sub-District
            </label>

            <div className="relative">

              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="subDistrict"
                value={
                  address.subDistrict
                }
                onChange={(e) =>
                  handleAddressChange(
                    addressType,
                    e
                  )
                }
                placeholder="Enter sub-district"
                className={inputClass}
              />

            </div>
          </div>

          {/* District */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              District
            </label>

            <div className="relative">

              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="district"
                value={
                  address.district
                }
                onChange={(e) =>
                  handleAddressChange(
                    addressType,
                    e
                  )
                }
                placeholder="Enter district"
                className={inputClass}
              />

            </div>
          </div>

          {/* State */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              State / UT
            </label>

            <div className="relative">

              <FaGlobe className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />

              <select
                name="state"
                value={
                  address.state
                }
                onChange={(e) =>
                  handleAddressChange(
                    addressType,
                    e
                  )
                }
                className={selectClass}
              >
                <option value="">
                  Select State / UT
                </option>

                {states.map(
                  (state) => (
                    <option
                      key={state}
                      value={state}
                    >
                      {state}
                    </option>
                  )
                )}
              </select>

            </div>
          </div>

          {/* PIN Code */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              PIN Code
            </label>

            <div className="relative">

              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="pinCode"
                value={
                  address.pinCode
                }
                onChange={(e) => {
                  const value =
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6);

                  handleAddressChange(
                    addressType,
                    {
                      target: {
                        name: "pinCode",
                        value,
                      },
                    }
                  );
                }}
                placeholder="Enter 6-digit PIN code"
                inputMode="numeric"
                maxLength={6}
                className={inputClass}
              />

            </div>
          </div>

        </div>
      </div>
    );
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (
    loading &&
    !formData.name
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">

        <div className="rounded-xl bg-white px-8 py-6 shadow">

          <p className="font-semibold text-gray-700">
            Loading personal details...
          </p>

        </div>

      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      <div className="mx-auto w-full max-w-[900px]">

        {/* Header */}

        <div className="rounded-t-2xl bg-[#ab183d] px-6 py-5 text-white">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
              <FaUser />
            </div>

            <div>

              <h1 className="text-xl font-bold">
                Personal Details
              </h1>

              <p className="mt-1 text-sm text-white/80">
                Enter your personal and address details
              </p>

            </div>

          </div>

        </div>

        {/* Steps */}

        <div className="grid grid-cols-2 gap-3 bg-white px-4 py-4 md:grid-cols-4">

          <div className="rounded-lg bg-[#ab183d] px-3 py-3 text-center text-white shadow-sm">
            <div className="text-sm font-bold">
              Step 1
            </div>

            <div className="mt-1 text-xs">
              Personal
            </div>
          </div>

          <Link
            to="/qualification-details"
            state={{ userId }}
            className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-3 text-center text-gray-600 transition hover:border-[#ab183d] hover:bg-[#ab183d]/5 hover:text-[#ab183d]"
          >
            <div className="text-sm font-bold">
              Step 2
            </div>

            <div className="mt-1 text-xs">
              Qualification
            </div>
          </Link>

          <Link
            to="/documents-upload"
            state={{ userId }}
            className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-3 text-center text-gray-600 transition hover:border-[#ab183d] hover:bg-[#ab183d]/5 hover:text-[#ab183d]"
          >
            <div className="text-sm font-bold">
              Step 3
            </div>

            <div className="mt-1 text-xs">
              Documents
            </div>
          </Link>

          <Link
            to="/fee-details"
            state={{ userId }}
            className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-3 text-center text-gray-600 transition hover:border-[#ab183d] hover:bg-[#ab183d]/5 hover:text-[#ab183d]"
          >
            <div className="text-sm font-bold">
              Step 4
            </div>

            <div className="mt-1 text-xs">
              Fee Details
            </div>
          </Link>

        </div>

        {/* Form */}

        <div className="rounded-b-2xl bg-white p-6 shadow-lg">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Personal Information */}

            <div>

              <h2 className="mb-5 text-lg font-bold text-gray-800">
                Personal Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">

                {/* Name */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Name
                  </label>

                  <div className="relative">

                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      value={
                        formData.name
                      }
                      readOnly
                      className={`${inputClass} cursor-not-allowed bg-gray-100`}
                    />

                  </div>

                  
                </div>

                {/* DOB */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Date of Birth
                  </label>

                  <div className="relative">

                    <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="date"
                      value={
                        formData.dob
                      }
                      readOnly
                      className={`${inputClass} cursor-not-allowed bg-gray-100`}
                    />

                  </div>

                 

                </div>

                {/* Gender */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Gender
                  </label>

                  <div className="relative">

                    <FaUsers className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />

                    <select
                      name="gender"
                      value={
                        formData.gender
                      }
                      onChange={
                        handleChange
                      }
                      className={
                        selectClass
                      }
                    >

                      <option value="">
                        Select Gender
                      </option>

                      <option value="Male">
                        Male
                      </option>

                      <option value="Female">
                        Female
                      </option>

                      <option value="Transgender">
                        Transgender
                      </option>

                    </select>

                  </div>

                </div>

                {/* Category */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Category
                  </label>

                  <div className="relative">

                    <FaUsers className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />

                    <select
                      name="category"
                      value={
                        formData.category
                      }
                      onChange={
                        handleChange
                      }
                      className={
                        selectClass
                      }
                    >

                      <option value="">
                        Select Category
                      </option>

                      <option value="UR">
                        UR
                      </option>

                      <option value="EWS">
                        EWS
                      </option>

                      <option value="OBC">
                        OBC
                      </option>

                      <option value="SC">
                        SC
                      </option>

                      <option value="ST">
                        ST
                      </option>

                    </select>

                  </div>

                </div>

                {/* Father's Name */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Father's Name
                  </label>

                  <div className="relative">

                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      name="fatherName"
                      value={
                        formData.fatherName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter father's name"
                      className={
                        inputClass
                      }
                    />

                  </div>

                </div>

                {/* Mother's Name */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Mother's Name
                  </label>

                  <div className="relative">

                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      name="motherName"
                      value={
                        formData.motherName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter mother's name"
                      className={
                        inputClass
                      }
                    />

                  </div>

                </div>

                {/* Nationality */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Nationality
                  </label>

                  <div className="relative">

                    <FaGlobe className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400" />

                    <select
                      name="nationality"
                      value={
                        formData.nationality
                      }
                      onChange={
                        handleChange
                      }
                      className={
                        selectClass
                      }
                    >

                      <option value="Indian">
                        Indian
                      </option>

                    </select>

                  </div>

                </div>

                {/* Marital Status */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Marital Status
                  </label>

                  <div className="relative">
  <select
    name="maritalStatus"
    value={formData.maritalStatus}
    onChange={handleChange}
    className={selectClass}
  >
    <option value="">
      Select Marital Status
    </option>

    <option value="Single">
      Single
    </option>

    <option value="Married">
      Married
    </option>

    <option value="Divorced">
      Divorced
    </option>

    <option value="Widowed">
      Widowed
    </option>
  </select>
</div>

                </div>

              </div>

            </div>

            {/* Permanent Address */}

            {renderAddressFields(
              "permanentAddress",
              "Permanent Address"
            )}

            {/* Same Address */}

            <div className="rounded-xl border border-gray-200 bg-white p-4">

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={
                    formData.sameAddress
                  }
                  onChange={
                    handleSameAddress
                  }
                  className="h-5 w-5 rounded border-gray-300 text-[#ab183d] focus:ring-[#ab183d]"
                />

                <span className="text-sm font-semibold text-gray-700">
                  Correspondence address is same as permanent address
                </span>

              </label>

            </div>

            {/* Correspondence Address */}

            {!formData.sameAddress &&
              renderAddressFields(
                "correspondenceAddress",
                "Correspondence Address"
              )}

            {/* Error */}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Success */}

            {success && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* Navigation */}

            <div className="flex items-center justify-between border-t border-gray-200 pt-5">

              <Link
                to="/"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                ← Previous
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[#ab183d] px-8 py-3 font-semibold text-white transition hover:bg-[#921532] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Saving..."
                  : "Next →"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}