// src/components/Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-sand text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© 2025 Velvety Skincare. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:underline">Chính sách bảo mật</a>
          <a href="#" className="hover:underline">Liên hệ</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
