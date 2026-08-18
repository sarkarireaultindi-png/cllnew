import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Header2 from "./components/Header2";
import Home from "./Home";
import Footer from "./components/Footer";
import FooterBottom from "./components/FooterBottom";
import JobDetails from "./components/Jobdetails";
import Vacancy from "./components/Registration";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import UserProfile from "./components/Afterloginform";

import QualificationDetails from "./components/QualificationDetails";
import DocumentsUpload from "./components/DocumentsUpload";
import FeesDetails from "./components/FeeDetails";
import Profile from "./components/Profile";
import DownloadApplication from "./components/DownloadApplication";

import About from "./components/content/History";
import Ourvision from "./components/content/visionMission";
import Iso from "./components/content/Iso";

import CompanyProfile from "./components/content/CompanyProfile";
import Rti from "./components/content/Rti";
import Anual from "./components/content/Annual";

import Quality from "./components/content/HemmStatus";
import WorkOrder from "./components/content/WorkOrder";
import MaterialMangaement from "./components/content/MaterialMangaement";
import MarketingSales from "./components/content/MarketingSales";

import Safety from "./components/content/Safety";
import Wlfare from "./components/content/Wlfare";
import Health from "./components/content/Health";
import Envrfrst from "./components/content/Envrfrst";

import Complaint from "./components/content/Complaint";
import Intgrtpctprgm from "./components/content/Intgrtpctprgm";
import Capacitybuildingtab from "./components/content/capacitybuildingtab";
import Sopsvig from "./components/content/Sopsvig";

import GlobalMining from "./components/news/globalmining"
import Cclshine from "./components/news/cclshine"
import Cclcomplete from "./components/news/cclcomplete"
import Cclconducts from "./components/news/cclconducts"
import Navchetna from "./components/news/ccllaunch"
function App() {
  return (
    <Routes>


<Route
        path="/news/navchetna-campaign"
        element={
          <>
            <Header2 />
            <Navchetna />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/news/ccl-conducts"
        element={
          <>
            <Header2 />
            <Cclconducts />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/news/ccl-complete"
        element={
          <>
            <Header2 />
            <Cclcomplete />
            <Footer />
            <FooterBottom />
          </>
        }
      />


      <Route
        path="/news/global-mining-delegation"
        element={
          <>
            <Header2 />
            <GlobalMining />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/news/ccl-shine"
        element={
          <>
            <Header2 />
            <Cclshine />
            <Footer />
            <FooterBottom />
          </>
        }
      />

      <Route
        path="/vigilance/complaints"
        element={
          <>
            <Header2 />
            <Complaint />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/vigilance/intgrtctprgm"
        element={
          <>
            <Header2 />
            <Intgrtpctprgm />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/vigilance/capacity-building"
        element={
          <>
            <Header2 />
            <Capacitybuildingtab />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/vigilance/sopSvig"
        element={
          <>
            <Header2 />
            <Sopsvig />
            <Footer />
            <FooterBottom />
          </>
        }
      />

      <Route
        path="/sustainability/Safety"
        element={
          <>
            <Header2 />
            <Safety />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/sustainability/Welfare"
        element={
          <>
            <Header2 />
            <Wlfare />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/sustainability/Health"
        element={
          <>
            <Header2 />
            <Health />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/sustainability/Environment"
        element={
          <>
            <Header2 />
            <Envrfrst />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route path="/" element={<Home />} />
      <Route
        path="/user-Profile"
        element={
          <>
            <Header2 />
            <UserProfile />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/business/Quality"
        element={
          <>
            <Header2 />
            <Quality />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/business/WorkOrder"
        element={
          <>
            <Header2 />
            <WorkOrder />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/business/marketing-material"
        element={
          <>
            <Header2 />
            <MaterialMangaement />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/business/marketing-sales"
        element={
          <>
            <Header2 />
            <MarketingSales />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/performance/Annual"
        element={
          <>
            <Header2 />
            <Anual />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/about-us/iso-ohsas-certification"
        element={
          <>
            <Header2 />
            <Iso />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/about-us/rti-infrastructure"
        element={
          <>
            <Header2 />
            <Rti />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/about-us/company-profile"
        element={
          <>
            <Header2 />
            <CompanyProfile />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/about-us/history"
        element={
          <>
            <Header2 />
            <About />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/about-us/vision-mission"
        element={
          <>
            <Header2 />
            <Ourvision />
            <Footer />
            <FooterBottom />
          </>
        }
      />

      <Route
        path="/download-application"
        element={
          <>
            {/* Website headers - hidden when printing */}
            <div className="no-print">
              <Header2 />
            </div>

            {/* Application - will print */}
            <DownloadApplication />
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <Header2 />
            <Profile />
          </>
        }
      />
      <Route
        path="/fee-details"
        element={
          <>
            <Header2 />
            <FeesDetails />
          </>
        }
      />

      <Route
        path="/qualification-details"
        element={
          <>
            <Header2 />
            <QualificationDetails />
          </>
        }
      />

      <Route
        path="/documents-upload"
        element={
          <>
            <Header2 />
            <DocumentsUpload />
          </>
        }
      />
      <Route
        path="/forget-password"
        element={
          <>
            <Header2 />
            <ForgetPassword />
            <Footer />
            <FooterBottom />
          </>
        }
      />

      <Route
        path="/login"
        element={
          <>
            <Header2 />
            <Login />
            <Footer />
            <FooterBottom />
          </>
        }
      />
      <Route
        path="/apply-vacancy"
        element={
          <>
            <Header2 />
            <Vacancy />
            <Footer />
            <FooterBottom />
          </>
        }
      />

      <Route
        path="/job-details"
        element={
          <>
            <Header2 />
            <JobDetails />
            <Footer />
            <FooterBottom />
          </>
        }
      />
    </Routes>
  );
}

export default App;
