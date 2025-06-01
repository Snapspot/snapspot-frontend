import CTAForm from "../components/CTAForm";
import Footer from "../components/Footer";
import TeamSection from "../components/TeamSection";

const Blog = () => {
  return (
    <div className="bg-sand text-white">
      <header className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4">Velvety Skincare</h1>
        <p className="text-lg opacity-90">
          Nơi vẻ đẹp bắt đầu từ sự chăm sóc dịu dàng
        </p>
      </header>

      <TeamSection />
      <CTAForm />
      <Footer />
    </div>
  );
};

export default Blog
