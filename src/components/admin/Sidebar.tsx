import { FiHome, FiUsers, FiPackage, FiMapPin, FiBook, FiStar, FiSettings, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {

  const location = useLocation();
  const isPartnerPath = ['/partners', '/members', '/partner-approval'].includes(location.pathname);
  const [isPartnerMenuOpen, setIsPartnerMenuOpen] = useState(isPartnerPath);
  const isLocationPath = ['/provinces', '/districts', '/spots'].includes(location.pathname);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(isLocationPath);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <div className="w-72 min-h-screen bg-[#215858] text-[#faebce] flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-10">SNAPSPOT</h2>
      <nav className="flex flex-col space-y-4">
        <Link
          to="/dashboard"
          className="hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3"
        >
          <FiHome />
          <span>Dashboard</span>
        </Link>

        {/* Quản lý đối tác với menu con */}
        <div>
          <button
            onClick={() => setIsPartnerMenuOpen(!isPartnerMenuOpen)}
            className="w-full text-left hover:bg-teal-700 px-4 py-3 rounded transition flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <FiUsers />
              <span>Quản lý đối tác</span>
            </div>
            {isPartnerMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {isPartnerMenuOpen && (
            <div className="pl-15 mt-2 flex flex-col space-y-2">
              <Link
                to="/partners"
                className={`text-left w-full block px-2 py-1 rounded transition ${location.pathname === '/partners'
                  ? 'bg-white text-[#215858] font-semibold'
                  : 'hover:underline'
                  }`}
              >
                Đối tác
              </Link>
              <Link
                to="/members"
                className={`text-left w-full block px-2 py-1 rounded transition ${location.pathname === '/members'
                  ? 'bg-white text-[#215858] font-semibold'
                  : 'hover:underline'
                  }`}
              >
                Thành viên
              </Link>
              <Link
                to="/partner-approval"
                className={`text-left w-full block px-2 py-1 rounded transition ${location.pathname === '/partner-approval'
                  ? 'bg-white text-[#215858] font-semibold'
                  : 'hover:underline'
                  }`}
              >
                Duyệt danh sách đối tác
              </Link>
            </div>
          )}
        </div>

        {/* Các menu khác */}
        <Link to="/marketing" className="hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3">
          <FiPackage />
          <span>Quản lý gói tiếp thị</span>
        </Link>
        {/* Quản lý địa điểm với menu con */}
        <div>
          <button
            onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
            className="w-full text-left hover:bg-teal-700 px-4 py-3 rounded transition flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <FiMapPin />
              <span>Quản lý địa điểm</span>
            </div>
            {isLocationMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {isLocationMenuOpen && (
            <div className="pl-15 mt-2 flex flex-col space-y-2">
              <Link
                to="/provinces"
                className={`text-left w-full block px-2 py-1 rounded transition ${location.pathname === '/provinces'
                  ? 'bg-white text-[#215858] font-semibold'
                  : 'hover:underline'
                  }`}
              >
                Tỉnh
              </Link>
              <Link
                to="/districts"
                className={`text-left w-full block px-2 py-1 rounded transition ${location.pathname === '/districts'
                  ? 'bg-white text-[#215858] font-semibold'
                  : 'hover:underline'
                  }`}
              >
                Huyện / Thị xã
              </Link>
              <Link
                to="/spots"
                className={`text-left w-full block px-2 py-1 rounded transition ${location.pathname === '/spots'
                  ? 'bg-white text-[#215858] font-semibold'
                  : 'hover:underline'
                  }`}
              >
                Spot
              </Link>
            </div>
          )}
        </div>
        <Link to="/system-log" className="hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3">
          <FiBook />
          <span>Nhật ký hệ thống</span>
        </Link>
        <Link to="/reviews" className="hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3">
          <FiStar />
          <span>Quản lý đánh giá</span>
        </Link>
        <Link to="/services" className="hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3">
          <FiSettings />
          <span>Quản lý dịch vụ</span>
        </Link>
      </nav>
      {/* NÚT ĐĂNG XUẤT */}
      <button
        onClick={handleLogout}
        className="mt-auto hover:bg-red-700 px-4 py-3 rounded transition flex items-center space-x-3 text-left bg-red-600 text-white font-semibold"
      >
        <FiUsers />
        <span>Đăng xuất</span>
      </button>
    </div>
  );
}
