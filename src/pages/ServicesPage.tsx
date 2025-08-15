import { useRef } from "react";
import Navbar from "../components/home/TransparentNavbar";
import GreenFooter from "../components/home/GreenFooter";
import Services from "../pages/Services";
import ServiceSpotSection from "../components/home/ServiceSpotSection";
import SnapSpotReasons from "../components/home/SnapSpotReasons";

const ServicesPage = () => {
  // Create a ref for the Services section
  const servicesRef = useRef<HTMLDivElement>(null);

  // Function to scroll to Services section
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <>
      <div className="relative w-screen min-h-screen">
        <Navbar />
        <div>
          {/* Section 1: ServiceSpotSection */}
          <div className="flex min-h-screen w-screen">
            <ServiceSpotSection 
              buttonText="Đăng ký ngay"
              onClick={scrollToServices}
            />
          </div>
          
          {/* Section 3: Services */}
          <div ref={servicesRef} className="flex min-h-screen w-screen">
            <Services />
          </div>
            {/* Section 2: SnapSpotReasons */}

          <div className="flex min-h-screen w-screen">
            <SnapSpotReasons />
          </div>
        </div>
        <GreenFooter />
      </div>
    </>
  );
};

export default ServicesPage;