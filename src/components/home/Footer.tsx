import { FaFacebookF, FaInstagram, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-full text-white">
      {/* Lớp ảnh nền trắng đen */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale brightness-90"
        style={{
          backgroundImage:
            "url('https://vietrektravel.com/Upload/News/Top-10-Dinh-Nui-Cao-Nhat-Viet-Nam-Thon-Thuc-Tam-Hon-Xe-Dich.jpg')",
          zIndex: -2,
        }}
      />

      {/* Lớp overlay màu vàng kem */}
      <div
        className="absolute inset-0 bg-[#f5eacc] opacity-60"
        style={{ zIndex: -1 }}
      />

      {/* Nội dung chính */}
      <div className="relative z-10 px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-6 text-[#215858]">
        {/* Logo & slogan */}
        <div className="md:col-span-1 flex flex-col items-center">
          <img src="/images/logo-03.png" alt="Logo" className="h-10 mb-2" />
          <p className="text-sm mt-4 opacity-90">
            Chụp đúng nơi – Tỏa sáng đúng chất
          </p>
        </div>

        {/* Menu */}
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wide mb-5">Menu</h3>
          <ul className="space-y-5 text-sm opacity-80">
            <li>Map</li>
            <li>About Us</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wide mb-5">
            Thông tin liên hệ
          </h3>
          <ul className="space-y-5 text-sm opacity-80">
            <li>(+84) 123 456 789</li>
            <li>snapspot@gmail.com</li>
            <li>Thành phố Hồ Chí Minh, Việt Nam</li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div className="flex flex-col items-start text-[#215858]">
          <h3 className="text-lg font-bold uppercase tracking-wide mb-5">
            Mạng xã hội
          </h3>
          <div className="flex space-x-6 text-xl">
            <a
              href="https://www.facebook.com/profile.php?id=61576421500227"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="hover:opacity-80 cursor-pointer" />
            </a>
            <FaInstagram className="hover:opacity-80 cursor-pointer" />
            <FaDiscord className="hover:opacity-80 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Đường line */}
      <div className="relative z-10 border-t border-[#215858]/40 mx-8 my-2" />

      {/* Bản quyền */}
      <div className="relative z-10 text-center text-xs py-15 px-10 text-[#215858] opacity-70">
        © 2025–2050 SnapSpot. All rights reserved.{" "}
        <span className="underline">Terms and Conditions</span>
      </div>
    </footer>
  );
};

export default Footer;
