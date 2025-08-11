import Navbar from '../components/home/TransparentNavbar';
import Footer from '../components/home/GreenFooter';
import BlogSection from '../components/home/BlogSection';
import InfoSection from '../components/home/InfoSection';
import { Helmet } from "react-helmet";
import HeroSection from '../components/home/HeroSection';
import StorySection from '../components/home/StorySection';

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>Về chúng tôi - SnapSpot</title>
        <meta name="description" content="Tìm hiểu về SnapSpot - nền tảng giúp bạn khám phá những địa điểm chụp ảnh đẹp nhất Việt Nam" />
      </Helmet>

      <div className="relative w-screen min-h-screen">
        <Navbar />
        
        <div>
          {/* Section 1: Hero */}
          <div className="flex min-h-screen w-screen">
            <HeroSection />
          </div>

          {/* Đường chia cho Info Section */}
          <div className="absolute left-0 w-full z-30 flex items-center justify-start px-8 h-0">
             <h2 className="text-2xl md:text-3xl font-semibold text-[#215858] whitespace-nowrap mr-4 px-2">
              Câu chuyện 
            </h2>
            <div className="flex-grow h-[3px] bg-[#215858]"></div>
          </div>

          {/* Section 2: Story */}
          <div className="flex w-screen">
            <StorySection />
          </div>

          {/* Đường chia cho Info Section */}
          <div className="absolute left-0 w-full z-30 flex items-center justify-start px-8 h-0">
             <h2 className="text-2xl md:text-3xl font-semibold text-[#215858] whitespace-nowrap mr-4 px-2">
              Đội ngũ của chúng tôi
            </h2>
            <div className="flex-grow h-[3px] bg-[#215858]"></div>
          </div>

          {/* Section 4: Info */}
          <div className="flex w-screen">
            <InfoSection />
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;