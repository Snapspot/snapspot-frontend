import SpotSection from '../components/home/SpotSection';
import GallerySection from '../components/home/GallerySection';

const Home = () => {
  return (
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

      {/* Các section khác */}
    </div>
  );
};

export default Home;
