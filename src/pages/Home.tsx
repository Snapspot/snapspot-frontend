import Navbar from '../components/home/TransparentNavbar';
import Footer from '../components/home/GreenFooter';
import SpotSection from '../components/home/SpotSection';
import GallerySection from '../components/home/GallerySection';
import BlogSection from '../components/home/BlogSection';

const Home = () => {
  return (
    <div className="relative w-screen">
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

        {/* Section 3: Blog */}
        <div className="flex h-screen w-screen">
          <BlogSection />
        </div>

        {/* Các section khác */}

      </div>
      <Footer />
    </div>
  );
};

export default Home;
