import Navbar from '../components/home/TransparentNavbar';
import Footer from '../components/home/GreenFooter';
import SpotSection from '../components/home/SpotSection';
import GallerySection from '../components/home/GallerySection';
import BlogSection from '../components/home/BlogSection';
import InfoSection from '../components/home/InfoSection';

const Home = () => {
  return (
    <div className="relative w-screen h-screen">
      <Navbar />
      <div>
        {/* Section 1: Spot */}
        <div className="flex h-screen w-screen">
          <SpotSection
            title="Vịnh Hạ Long"
            description="Vịnh Hạ Long là địa điểm du lịch Quảng Ninh hấp dẫn bậc nhất..."
            onClick={() => console.log("Đi đến trang chi tiết")}
          />
        </div>

        {/* Section 2: Gallery */}
        <div className="flex h-screen w-screen">
          <GallerySection />
        </div>

        {/* Đường chia nằm tại đúng đáy section 1 (SpotSection) */}
        <div className="absolute left-0 w-full z-30 flex items-center justify-start px-8 h-0">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#215858] whitespace-nowrap mr-4 px-2">
            CÁC BLOG NỔI BẬT
          </h2>
          <div className="flex-grow h-[3px] bg-[#215858]"></div>
        </div>


        {/* Section 3: Blog */}
        <div className="flex w-screen">
          <BlogSection />
        </div>


        {/* Đường chia nằm tại đúng đáy section 1 (SpotSection) */}
        <div className="absolute left-0 w-full z-30 flex items-center justify-start px-8 h-0">
          <div className="flex-grow h-[3px] bg-[#215858]"></div>
        </div>

        {/* Section 5: Info */}
        <div className="flex w-screen">
          <InfoSection />
        </div>

        {/* Các section khác */}

      </div>
      <Footer />
    </div>
  );
};

export default Home;
