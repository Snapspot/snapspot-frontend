
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-transparent text-white">
      {/* Logo từ thư mục public */}
      <div className="flex items-center">
        <img src="/images/logo-03.png" alt="SnapSpot Logo" className="h-10 w-auto" />
      </div>

      {/* Menu */}
      <div className="flex space-x-8 text-[#ffffff] font-semibold">
        <button onClick={() => navigate("/home")} className="hover:underline">Home</button>
        <button onClick={() => navigate("/services")} className="hover:underline">Service</button>
        <button onClick={() => navigate("/about")} className="hover:underline">About Us</button>
        <button onClick={() => navigate("/blog")} className="hover:underline">Blog</button>
      </div>

      <div className="flex space-x-4">
        {/* Nút Register */}
        <button
          onClick={() => navigate("/register")}
          className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black text-white transition-colors duration-300"
        >
          Register
        </button>

        {/* Nút Login */}
        <button
          onClick={() => navigate("/login")}
          className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black text-white transition-colors duration-300"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;