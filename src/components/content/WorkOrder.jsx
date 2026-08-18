import React from "react";
import { Link } from "react-router-dom";

export default function WorkOrders() {
  const workOrders = [
    {
      title:
        "Mobile connectivity under Closed User Group(CUG) facility at various locations under CCL Commands Areas for 3 years.",
      date: "18.04.2026",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/24_04_2026_work_order",
    },
    {
      title:
        "Supply order for UTM (Firewall) Service for 2 years at CCLHQ.",
      date: "14.01.2026",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/GEMC-511687706349353-14012026%20(1)",
    },
    {
      title: "Supply of 1423 All-in-one PC with UPS.",
      date: "13.08.2025",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/Work_order_AIO_UPS",
    },
    {
      title:
        "Supply order for UTM (Firewall) Service for 2 years at CCLHQ.",
      date: "15.11.2023",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/GEMC-511687713342456-15112023",
    },
    {
      title: "Supply of 145 Personal Computers (PCs) with accessories",
      date: "16-11-2022",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/45.pdf",
    },
    {
      title: "Supply of 160 Personal Computers (PCs) with accessories",
      date: "23-05-2022",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/46.pdf",
    },
    {
      title: "Supply of 1001 Personal Computers (PCs) with accessories",
      date: "04-01-2022",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/44.pdf",
    },
    {
      title:
        "Termination of Contract with Electronics Corporation of India Limited",
      date: "05-06-2021",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/1.pdf",
    },
    {
      title:
        "Work order to M/s Electronics Corporation of India Limited to provide Maintenance support for existing customized ERP type Application Software namely CoalNet at Central Coalfield Limited for three years.",
      date: "12-05-2020",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/3.pdf",
    },
    {
      title:
        'Work Order for "Annual Maintenance Contract (AMC) for three (3) Years of 30 KVA UPS (2 nos.) make - M/s INVA Power Systems Pvt. Ltd., located at CCL HQ Computer Centre, Ranchi".',
      date: "20-12-2019",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/2.pdf",
    },
    {
      title: "Supply of 1011 Personal Computers (PCs) with accessories",
      date: "24-09-2019",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/42.pdf",
    },
    {
      title:
        "Purchase Order for Processer Based Oracle Licenses & Software Support. (HSN Code:9973)",
      date: "19-02-2019",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/4.pdf",
    },
    {
      title: "Amendment towards applicability of GST.",
      date: "20-12-2018",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/6.pdf",
    },
    {
      title:
        "Work order to M/s BSNL for providing of alternate MPLS-VPN network of higher Bandwidth across CCL Command areas on rental basis for 5 years.",
      date: "26-02-2018",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/5.pdf",
    },
    {
      title: "Supply of Anti Virus Software (Application Software).",
      date: "14-02-2018",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/7.pdf",
    },
    {
      title:
        "Turnkey Project for Setting up of State of Art CCL HQ Campus LAN of 800 Nodes on outright purchase basis with 1 year warranty and 4 year AMC.",
      date: "25-05-2017",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/8.pdf",
    },
    {
      title:
        "Procurement of Scanner having resolution 600 DPI, Speed 20ppm/40 ipm or higher.",
      date: "19-04-2017",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/9.pdf",
    },
    {
      title:
        "Procurement of integrated Attendance Device Type-I with 3G connectivity for Aadhar Based Attendance System.",
      date: "25-01-2017",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/11.pdf",
    },
    {
      title:
        "Termination of Service Order to M/s Orange Business India Technology Services Pvt. Ltd.",
      date: "13-01-2017",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/10.pdf",
    },
    {
      title:
        "Work Order for Supply, installation, Integration, Commissioning, Execution, and Maintenance of Servers and peripherals and maintenance of existing essential allied accessories for 5 years comprehensive AMC in HQs and Areas of Central Coalfields Limited.",
      date: "27-12-2016",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/12.pdf",
    },
    {
      title:
        "To provide Maintenance support for existing customized ERP named CoalNet Application software at Central Coalfields Limited for three years.",
      date: "23-12-2016",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/13.pdf",
    },
    {
      title: "Supply of MS Office Project Professional 2013.",
      date: "04-11-2015",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/14.pdf",
    },
    {
      title: "Supply Order for Supply of one number CANNON Lide 120 flatbed Scanner.",
      date: "22-09-2015",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/15.pdf",
    },
    {
      title: "Supply of 30 KVA UPS.",
      date: "27-10-2014",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/18.pdf",
    },
    {
      title:
        "GPS/GPRS based Vehicle Tracking System & RFID based Weighing Control System along with CCTV in CCL.",
      date: "24-10-2014",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/19.pdf",
    },
    {
      title: "Corrigendum to Supply Order No. 11112114 - 103B",
      date: "09-09-2014",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/21.pdf",
    },
    {
      title:
        "Work Order for System Study, Redesign, Development, Integration, Implementation and Maintenance of CCL Websites and Web based application on CCL Web Server using latest available technologies.",
      date: "25-08-2014",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/16.pdf",
    },
    {
      title: "Corrigendum to Supply Order No. 11112114 - 103A",
      date: "06-08-2014",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/23.pdf",
    },
    {
      title: "Supply order of MS Office 2013 or Latest.",
      date: "17-07-2014",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/25.pdf",
    },
    {
      title:
        "Formal order for Supply, Installation, Commissioning & one year ATS of Oracle Software.",
      date: "25-06-2014",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/26.pdf",
    },
    {
      title:
        "Extension of Rental Contract of 13 Nos. IBM RS-6000 Servers installed at Areas/HQ of CCL.",
      date: "23-04-2014",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/29.pdf",
    },
    {
      title: "Extension of Rental Contract of Campus LAN installed at CCL HQ.",
      date: "23-04-2014",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/30.pdf",
    },
    {
      title:
        "Formal order Supply, installation, commissioning and maintenance of RISC/EPIC Servers along with allied accessories on rental basis for 5 years.",
      date: "28-03-2014",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/28.pdf",
    },
    {
      title: "Supply of NSPAM Software",
      date: "14-02-2014",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/24.pdf",
    },
    {
      title:
        "Addendum/Corrigendum to Supply Order No.- 15401 11 14-217 Dt.28.10.13.",
      date: "12-02-2014",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/39.pdf",
    },
    {
      title: "Repeat Order for 10 Pcs",
      date: "03-01-2014",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/20.pdf",
    },
    {
      title:
        "805 Personal Computers (PCs) with accessories with buy back option for 15 nos. obsolete PCs with accessories.",
      date: "28-10-2013",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/38.pdf",
    },
    {
      title:
        "To extend Maintenance Support and Customization for Three Years for ERP like solution Coal Net Application Software for Coal India which is presently running at Central Coalfields Limited.",
      date: "07-09-2013",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/32.pdf",
    },
    {
      title:
        "Work order for 10Mb. (1:1) Internet connectivity at CCL HQ and its command Area.",
      date: "28-06-2013",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/37.pdf",
    },
    {
      title: "Supply of Antivirus (269 Nos.) for 269 nos. PCs.",
      date: "22-03-2013",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/27.pdf",
    },
    {
      title:
        "Work order for incorporation of software as well as hardware for upgradation of 91 Nos. of road weighbridges and installed at different locations of CCL.",
      date: "06-03-2013",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/33.pdf",
    },
    {
      title:
        "Work order for incorporation of software as well as hardware for upgradation of 38 Nos. of rail weighbridges installed at different locations of CCL.",
      date: "28-02-2013",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/34.pdf",
    },
    {
      title:
        "Conclusion of contract for Turnkey Project for setting up WAN in CCL on RENTAL BASIS for 5 Years.",
      date: "18-02-2013",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/31.pdf",
    },
    {
      title:
        "Supply of 269 Personal Computers (PCs) with accessories against buy back option for 219 nos. obsolete PCs with accessories.",
      date: "05-11-2012",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/35.pdf",
    },
    {
      title:
        "Development, installation and commissioning of software for Online filing of Property Return, Security of CCL Website, Board Agenda Tracking System and AMC for CCL Website.",
      date: "30-10-2012",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/41.pdf",
    },
    {
      title:
        "Extension of Rental Contract of 11 nos. of OMMS Project installed at 11 Regional Stores / Central Store of CCL for further two years.",
      date: "29-10-2012",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/36.pdf",
    },
    {
      title: "Supply of 677 PCs along with all accessories for CCL.",
      date: "07-05-2009",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/17.pdf",
    },
    {
      title:
        "Procurement of 409 nos. of Personal Computers along with accessories for CCL.",
      date: "28-12-2007",
      link: "https://www.centralcoalfields.in/busns/sys_work_order/40.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="relative overflow-hidden bg-cover bg-center text-white"
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
              to="/business"
              className="transition hover:text-white hover:underline"
            >
              Business
            </Link>

            <span>/</span>

            <span className="text-white">
              Work Orders
            </span>

          </div>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Work Orders
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/90 sm:text-base">
            Details of work orders, supply orders, contracts and
            technology-related projects of Central Coalfields Limited.
          </p>

        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">

          {/* =================================================
              TABLE
          ================================================= */}

          <section className="min-w-0">

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

              {/* Header */}

              <div className="border-b border-gray-200 bg-white px-5 py-5 sm:px-6">

                <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                  Work Orders
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  List of work orders issued by CCL
                </p>

              </div>

              {/* Responsive Table */}

              <div className="overflow-x-auto">

                <table className="w-full min-w-[700px] border-collapse">

                  <thead>

                    <tr className="bg-[#ab183d] text-left text-sm text-white">

                      <th className="w-16 px-4 py-4 font-semibold">
                        Sl No.
                      </th>

                      <th className="px-4 py-4 font-semibold">
                        Title
                      </th>

                      <th className="w-32 px-4 py-4 font-semibold">
                        Date
                      </th>

                      <th className="w-28 px-4 py-4 text-center font-semibold">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {workOrders.map((item, index) => (

                      <tr
                        key={index}
                        className="border-b border-gray-100 transition hover:bg-[#ab183d]/5"
                      >

                        <td className="px-4 py-4 align-top text-sm font-semibold text-gray-600">
                          {index + 1}
                        </td>

                        <td className="px-4 py-4 align-top">

                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold leading-6 text-[#ab183d] transition hover:underline"
                          >
                            {item.title}
                          </a>

                        </td>

                        <td className="whitespace-nowrap px-4 py-4 align-top text-sm text-gray-600">
                          {item.date}
                        </td>

                        <td className="px-4 py-4 text-center align-top">

                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-md bg-[#ab183d] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#8f1233]"
                          >
                            View
                          </a>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </section>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="hidden lg:block">

            <div className="sticky top-24 overflow-hidden rounded-xl bg-white shadow-sm">

              <div className="bg-[#ab183d] px-5 py-4 text-white">

                <h3 className="font-bold">
                  Business
                </h3>

              </div>

              <div>

                <Link
                  to="/business/financial"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Financial
                </Link>

                <Link
                  to="/business/marketing-sales"
                  className="block border-b border-gray-100 px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Marketing & Sales
                </Link>

                <Link
                  to="/business/work-orders"
                  className="block border-b border-gray-100 bg-gray-100 px-5 py-4 text-sm font-semibold text-[#ab183d]"
                >
                  Work Orders
                </Link>

                <Link
                  to="/business/non-moving-items"
                  className="block px-5 py-4 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-[#ab183d]"
                >
                  Non-Moving Items
                </Link>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}