import Navbar from "../components/home/TransparentNavbar";
import GreenFooter from "../components/home/GreenFooter";
import HeroSection from "../components/home/HeroSection";
import StorySection from "../components/home/StorySection";
import FeaturesSection from "../components/home/FeaturesSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import GallerySectionAu from "../components/home/GallerySectionAu";

const AboutUs = () => {
  return (
    <>
     
      <div className="relative w-screen min-h-screen">
        <Navbar />

        <div>
          {/* Section 1: Hero */}
          <div className="flex min-h-screen w-screen">
            <HeroSection />
          </div>

          {/* Section 2: Story */}
          <div className="flex w-screen">
            <StorySection />
          </div>

          {/* Section 3: FeaturesSection */}
          <div className="flex w-screen">
            <FeaturesSection />
          </div>

          {/* Section 4: GallerySectionAu */}
          <div className="flex w-screen">
            <GallerySectionAu />
          </div>
          {/* Section 5: TestimonialsSection */}
          <div className="flex w-screen">
            <TestimonialsSection />
          </div>
        </div>
        <GreenFooter />
      </div>
    </>
  );
};

export default AboutUs;
