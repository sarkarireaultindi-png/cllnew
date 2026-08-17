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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/user-Profile"
        element={
          <>
            <Header />
            <Header2 />
            <UserProfile />
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
        <Header />
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
   <Header />
            <Header2 />
  <Profile />
  </>
  
  }
/>
      <Route
        path="/fee-details"
        element={
          <>
            <Header />
            <Header2 />
            <FeesDetails />
          </>
        }
      />

      <Route
        path="/qualification-details"
        element={
          <>
            <Header />
            <Header2 />
            <QualificationDetails />
          </>
        }
      />

      <Route
        path="/documents-upload"
        element={
          <>
            <Header />
            <Header2 />
            <DocumentsUpload />
          </>
        }
      />
      <Route
        path="/forget-password"
        element={
          <>
            <Header />
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
            <Header />
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
            <Header />
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
            <Header />
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
