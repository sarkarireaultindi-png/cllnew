import Header from "./components/Header";
import Header2 from "./components/Header2"
import Slider from "./components/Slider"
import MeetAskSection from "./components/MeetAskSection"
import NoticeMarquee from "./components/NoticeMarquee"
import NewsSection from "./components/NewsSection"
import QuickLinks from "./components/QuickLinks"
import LinksSection from "./components/LinksSection"
import Footer from "./components/Footer"
import FooterBottom from "./components/FooterBottom"



// or "./components/layout/Header" depending on your folder structure

export default function Home() {
  return (
    <>
      
      <Header2 />  
        <Slider />  
        
        <NoticeMarquee />
        <NewsSection />
        <QuickLinks />
        <LinksSection />
      
      {/* Your Home Page Content */}
      <div className="max-w-[1000px] mx-auto p-4">
       <div className="flex justify-center">
  <img
    src="/assets/vis_mis_end.png"
    alt="Vision Mission"
    className="h-[50%] w-[70%]"
  />
</div>

      </div>

      <Footer />
      <FooterBottom />
    </>
  );
}