export default function NoticeMarquee() {
  const notices = [
    "International Day of Yoga (IDY) 2026 Handbook",
    "Cyber Security Awareness and Safety Guide for Women",
    "Cyber Security Awareness and Protection Guide for Senior Citizens",
    "Handbook on Safe Internet Usage and Cyber Security",
    "New Toll free number for lodging complaints regarding repair and maintenance of Colonies is 18008909929",
    "For more information on new Labour Codes Click Here",
    "Link for Sexual Harassment electronic Box (She-Box) Portal",
    "Link for Cyber Crime Awareness Portal",
    "CPGRAMs - For Lodging grievances by the aggrieved citizens from anywhere and anytime (24×7)"
  ];

  return (
    <section className="w-full">
     <div className="max-w-[1000px] mx-auto overflow-hidden bg-[#0077b3] mb-5">

        <div className="marquee-wrapper">
          <div className="marquee-content">
            {notices.map((notice, index) => (
              <span key={index} className="inline-flex items-center">
                <span className="text-white mx-3 text-xl">
                  ➤➤➤
                </span>

                <span className="text-white font-bold text-[16px]">
                  {notice}
                </span>
              </span>
            ))}

            {/* Duplicate content for continuous loop */}
            {notices.map((notice, index) => (
              <span key={`copy-${index}`} className="inline-flex items-center">
                <span className="text-white mx-3 text-xl">
                  ➤➤➤
                </span>

                <span className="text-white font-bold text-[16px]">
                  {notice}
                </span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}