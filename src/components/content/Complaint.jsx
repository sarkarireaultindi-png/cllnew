import React from "react";
import { Link } from "react-router-dom";

export default function VigilanceComplaint() {
  const guidelines = [
    "Complaints containing allegation of corruption, misconduct or malpractice involving the matters of Central Coalfields Limited (CCL) or the officials, employees working in CCL can be lodged through letter or online on the website of Central Coalfields Limited directly addressed to Chief Vigilance Officer, Central Coalfields Limited (CVO, CCL), Ranchi.",

    "Complaints without specific factual details, verifiable facts and which are vague or contain sweeping or general allegations will not be acted upon.",

    "Complainants to be careful before lodging complaints: Complainants are important stake holders for an anti-corruption institution like Office of CVO, CCL. The Office of CVO, CCL expects that the complaints lodged with the Office of CVO, CCL are genuine and not malicious, vexatious or frivolous; are based on verifiable facts and pertain to the Office of CVO, CCL’s jurisdiction. Complainants must keep in mind that the resources at the command of the Office of CVO, CCL are precious; and so, it needs to be used prudently in unearthing serious issues of corruption that would serve the public interest. Apart from using the resources of the Office of CVO, CCL, false and frivolous complaints create administrative delays in decision making like in the selection processes, project implementations apart from tarnishing personal reputations of the Government functionaries. In appropriate cases of misuse of the provision with a malafide intention to harass or harm an innocent Government servant, necessary action as per extant provisions could be taken against such complainants.",

    "It has been the experience of the Office of CVO, CCL that some complainants raise a large number of issues in one complaint in a way that all the issues get mixed up / intertwined with each other and it becomes difficult to discern and delineate the specific issues individually. The Office of CVO, CCL expects that the complainants, while lodging their complaints to the Office of CVO, CCL, should mention about the various specific issues one by one in a coherent manner so that any person of normal prudence can understand these issues unambiguously.",

    "The complaint should not be anonymous or pseudonymous. If the complainant expects that the Office of CVO, CCL should not file (take no action) their complaints on the basis of it being anonymous or pseudonymous, the complainants are expected to mention their name, correspondence address and contact details properly. It is also expected that the complainants will be quick to respond to the verification / confirmation being sought from them by the Office of CVO, CCL.",

    "On receipt of complaints, confirmation will be sought in the standard format from the complainant for owning or disowning the complaint as the case may be, together with a copy of complainant’s identity proof. If no response to the letter seeking confirmation is received from the complainant in the standard format sent by this office within 15 days followed by a reminder to for another 15 days, such complaints will be treated as pseudonymous complaint and will not be acted upon.",

    "Complaints via email will not be entertained and complainant should avoid sending the complaints on official emails of officers of Vigilance department. This practice is also in consonance with Clause 3.3 (viii) and Clause 3.11.1 (c) of the CVC Manual, as well as Clause 2.1 (h) of CVC Circular No. 25/12/21 dated 24.12.2021, which states that complaints sent to any mail ID of officers of the Commission will not be entertained or taken cognizance of by the Commission.",

    "As the Office of CVO, CCL deals only with matters of corruption, redressal of grievances should not be the focus of complaints to the Office of CVO, CCL.",

    "If hand written complaints are received in the Office of CVO, CCL and are not legible at all, it will be difficult to understand the contents of complaints and take appropriate action. If a hand-written complaint is forwarded to the Office of CVO, CCL, it is expected that it should be legible. The same applies to the enclosures sent along with the complaints. All types of complaints, even if printed or photocopied should be clearly legible.",

    "The complainants are also expected to lodge complaints regarding only those issues having vigilance angle which are not part of any litigation in any court, tribunal, etc., i.e. the matter should not be sub-judice.",

    "Complaint / Information about corruption / malpractice can also be lodged against any official by their subordinates or other officials, directly to this office.",

    "Once the complaint has been registered, this office will ensure that the complaints are acted upon and action taken to its logical conclusion.",

    "Complaints under PIDPI commonly known as Whistle Blower Complainant may be lodged to The Secretary, Central Vigilance Commission, New Delhi duly following the guidelines of CVC for lodging complaint under PIDPI which is available at the PIDPI link.",

    "If a complaint against a public servant is found to be malicious, vexatious or unfounded, then action may be taken as per extant provisions against the complainant for making a false complaint.",

    "Withdrawal of complaint: Some complainants, after confirming the complaint made by them, make a request for withdrawing the same or stopping the inquiry / investigation by the Office of CVO, CCL. It is to be noted that once a complainant confirms the complaint and action has been initiated for inquiry / investigation by the Office of CVO, CCL, it is not permissible to withdraw / stop such enquiry / investigation even if the complainant withdraws his complaint. The allegations contained in the complaint will be taken to its logical conclusion irrespective of complainant’s request for withdrawal of the complaint.",
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage: "url('/assets/project.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#ab183d]/85"></div>

        <div className="relative mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/80">
            <Link
              to="/"
              className="transition hover:text-white hover:underline"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              to="/vigilance"
              className="transition hover:text-white hover:underline"
            >
              Vigilance
            </Link>

            <span>/</span>

            <span className="text-white">
              General Instructions for Lodging Complaints
            </span>
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            General Instructions for Lodging Complaints
          </h1>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/90 sm:text-base">
            Guidelines for lodging complaints at the Office of Chief
            Vigilance Officer, Central Coalfields Limited.
          </p>

        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">

          {/* =================================================
              CONTENT
          ================================================= */}
          <article className="rounded-xl bg-white p-5 shadow-sm sm:p-8">

            {/* Page Heading */}
            <div className="mb-8">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                General Instructions for Lodging Complaints at C.V.O., C.C.L.
              </h2>

              <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-700 sm:text-base">
                  Guidelines for Lodging Complaints
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Updated as on 01.07.2025
                </p>
              </div>

            </div>

            {/* Intro */}
            <div className="mb-8 rounded-lg border-l-4 border-[#ab183d] bg-[#ab183d]/5 p-5">
              <p className="text-[15px] leading-7 text-gray-700 sm:text-base">
                The office of Chief Vigilance Officer, C.C.L. advises that
                the complainants should follow undermentioned guidelines /
                instructions to make a meaningful contribution in the
                vigilance administration.
              </p>
            </div>

            {/* =================================================
                GUIDELINES
            ================================================= */}
            <div className="space-y-5">

              {guidelines.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 transition hover:border-[#ab183d]/30 hover:shadow-sm sm:p-5"
                >

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ab183d] text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  <p className="text-sm leading-7 text-gray-700 sm:text-[15px]">
                    {item}
                    {index === 12 && (
                      <>
                        {" "}
                        <a
                          href="https://cvc.gov.in/pidpi.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#ab183d] hover:underline"
                        >
                          PIDPI
                        </a>
                      </>
                    )}
                  </p>

                </div>
              ))}

            </div>

            {/* =================================================
                MODE OF LODGING COMPLAINTS
            ================================================= */}
            <section className="mt-10">

              <h2 className="border-l-4 border-[#ab183d] pl-4 text-2xl font-bold text-gray-800">
                Mode of Lodging Complaints
              </h2>

              <div className="mt-6 space-y-5">

                {/* By Post */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                  <h3 className="text-lg font-bold text-gray-800">
                    a) By Post
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-700">
                    The complaint may be sent by post to:
                  </p>

                  <div className="mt-4 rounded-lg border-l-4 border-[#ab183d] bg-white p-5 shadow-sm">

                    <p className="text-sm font-semibold leading-7 text-gray-800 sm:text-base">
                      The Chief Vigilance Officer,
                      <br />
                      Vigilance Department,
                      <br />
                      Central Coalfields Limited,
                      <br />
                      Darbhanga House,
                      <br />
                      Ranchi - 834029,
                      <br />
                      Jharkhand.
                    </p>

                  </div>

                </div>

                {/* Online */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">

                  <h3 className="text-lg font-bold text-gray-800">
                    b) Online Lodging of Complaints
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-700">
                    For online lodging of complaints, click the button below.
                  </p>

                  <a
                    href="https://centralcoalfields.in/ccl_cmplnt/cruptn.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center rounded-lg bg-[#ab183d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8f1233]"
                  >
                    Lodge Complaint Online
                  </a>

                </div>

                {/* Email */}
                <div className="rounded-lg border border-red-200 bg-red-50 p-5">

                  <h3 className="font-bold text-red-800">
                    c) Complaints via Email
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-red-700">
                    Complaints via email will not be entertained.
                  </p>

                </div>

                {/* PIDPI */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">

                  <h3 className="text-lg font-bold text-gray-800">
                    d) PIDPI
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-700">
                    Complaints under PIDPI may be lodged to The Secretary,
                    Central Vigilance Commission, New Delhi.
                  </p>

                  <a
                    href="https://cvc.gov.in/citizens-corner/whistle-blower-complaints"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center rounded-lg border border-[#ab183d] px-5 py-3 text-sm font-semibold text-[#ab183d] transition hover:bg-[#ab183d] hover:text-white"
                  >
                    PIDPI Whistle Blower
                  </a>

                </div>

              </div>

            </section>

            {/* =================================================
                IMPORTANT NOTICE
            ================================================= */}
            <section className="mt-10">

              <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-5 sm:p-6">

                <h2 className="text-lg font-bold text-yellow-900">
                  Important Information
                </h2>

                <div className="mt-4 space-y-4 text-sm leading-7 text-yellow-900">

                  <p>
                    While lodging complaints, complainant must provide
                    his/her name and full address with pin code.
                  </p>

                  <p>
                    If you don't want to disclose your identity while
                    lodging complaint use the PIDPI Whistle Blower.
                  </p>

                  <a
                    href="https://cvc.gov.in/citizens-corner/whistle-blower-complaints"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-semibold text-[#ab183d] hover:underline"
                  >
                    PIDPI Whistle Blower
                  </a>

                  <p>
                    No action will be taken against Anonymous /
                    Pseudonymous complaints.
                  </p>

                  <a
                    href="https://www.centralcoalfields.in/vigilance_circular/file/Action%20on%20anonymous%20Pseudonymous%20complaints.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-semibold text-[#ab183d] hover:underline"
                  >
                    Link to CVC's Circular
                  </a>

                </div>

              </div>

            </section>

            {/* =================================================
                COMMISSION GUIDELINES
            ================================================= */}
            <section className="mt-10">

              <a
                href="https://centralcoalfields.in/vglnc/guidelines.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-gray-200 bg-gray-50 p-5 transition hover:border-[#ab183d] hover:bg-[#ab183d]/5"
              >

                <div className="flex items-center justify-between gap-4">

                  <div>
                    <h2 className="text-lg font-bold text-gray-800 group-hover:text-[#ab183d]">
                      Commission's Guidelines on Complaint Handling
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      View the official guidelines document.
                    </p>
                  </div>

                  <span className="shrink-0 rounded-lg bg-[#ab183d] px-4 py-2 text-sm font-semibold text-white">
                    View
                  </span>

                </div>

              </a>

            </section>

          </article>

          {/* =================================================
              SIDEBAR
          ================================================= */}
          <aside className="hidden lg:block">

            <div className="sticky top-24 overflow-hidden rounded-xl bg-white shadow-sm">

              <div className="bg-[#ab183d] px-5 py-4 text-white">
                <h3 className="font-bold">
                  Vigilance
                </h3>
              </div>

              <div>

                <Link
                  to="/vigilance/complaint"
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  General Instructions for Complaints
                </Link>

                <Link
                  to="/vigilance/guidelines"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Guidelines
                </Link>

                <Link
                  to="/vigilance/online-complaint"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Lodge Complaint Online
                </Link>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}