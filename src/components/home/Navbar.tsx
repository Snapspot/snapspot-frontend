import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

   return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-white">
      {/* Logo */}
          <div className="flex items-center">
        <button
          onClick={() => navigate("/home")} 
          className="focus:outline-none"
        >
          <img
            src="/images/logo-03.png"
            className="h-5 w-auto cursor-pointer"
          />
        </button>
      </div>

      {/* Menu chính */}
      <div className="flex items-center space-x-12">
        <button onClick={() => navigate("/home")} 
          className="text-[#215858] hover:text-[#0267CF] text-lg font-medium">
          Trang chủ
        </button>
        <button onClick={() => navigate("/services")}
          className="text-[#215858] hover:text-[#0267CF] text-lg font-medium">
          Dịch vụ
        </button>
        <button onClick={() => navigate("/blog")}
          className="text-[#215858] hover:text-[#0267CF] text-lg font-medium">
          Blog
        </button>
          <button onClick={() => navigate("/about")}
          className="text-[#215858] hover:text-[#0267CF] text-lg font-medium">
          Về chúng tôi
        </button>
      
      </div>

      {/* Buttons đăng nhập/đăng ký */}
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate("/login")}
          className="bg-[#215858] text-white px-4 py-2 rounded-md hover:bg-[#1a4646] transition duration-300">
          Đăng nhập
        </button>
        <button onClick={() => navigate("/register")}
          className="bg-[#215858] text-white px-4 py-2 rounded-md hover:bg-[#1a4646] transition duration-300">
          Đăng ký
        </button>
      </div>
    </nav>
  );
};


export default Navbar;