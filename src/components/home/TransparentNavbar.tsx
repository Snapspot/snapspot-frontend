import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TransparentNavbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: "Trang chủ", path: "/home" },
    { name: "Dịch vụ", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Về chúng tôi", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white">
      {/* Desktop Layout - giữ nguyên như ban đầu */}
      <div className="hidden md:flex items-center justify-between px-8 py-4">
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
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-4 py-4">
        <div className="flex items-center justify-between">
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

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-[#215858] hover:text-[#0267CF] hover:bg-gray-100 focus:outline-none transition-colors duration-200"
          >
            <span className="sr-only">Mở menu</span>
            {/* Hamburger icon */}
            <svg
              className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close icon */}
            <svg
              className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-4 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                navigate(link.path);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-[#215858] hover:text-[#0267CF] hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              {link.name}
            </button>
          ))}
          
          {/* Mobile Auth Buttons */}
          <div className="pt-4 space-y-2">
            <button 
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-center bg-[#215858] text-white px-4 py-2 rounded-md hover:bg-[#1a4646] transition duration-300"
            >
              Đăng nhập
            </button>
            <button 
              onClick={() => {
                navigate("/register");
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-center bg-[#215858] text-white px-4 py-2 rounded-md hover:bg-[#1a4646] transition duration-300"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TransparentNavbar;