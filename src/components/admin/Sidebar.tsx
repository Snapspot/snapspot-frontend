import { FiHome, FiUsers, FiPackage, FiMapPin, FiStar, FiSettings, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {

  const location = useLocation();
  const isPartnerPath = ['/admin/companies', '/admin/agencies', '/admin/partner-approval'].includes(location.pathname);
  const [isPartnerMenuOpen, setIsPartnerMenuOpen] = useState(isPartnerPath);
  const isLocationPath = ['/admin/provinces', '/admin/districts', '/admin/spots'].includes(location.pathname);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(isLocationPath);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggingOut(true);

    setTimeout(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    }, 1000);
  };


  return (
    <div className="w-72 h-screen fixed left-0 top-0 bg-[#215858] text-[#faebce] flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-10">SNAPSPOT</h2>
      <nav className="flex flex-col space-y-4">
        <Link
          to="/admin/dashboard"
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
                to="/admin/companies"
                className={`text-left w-full block px-2 py-1 rounded transition ${location.pathname === '/admin/companies'
                  ? 'bg-white text-[#215858] font-semibold'
                  : 'hover:underline'
                  }`}
              >
                Đối tác
              </Link>
              <Link
                to="/admin/agencies"
                className={`text-left w-full block px-2 py-1 rounded transition ${location.pathname === '/admin/agencies'
                  ? 'bg-white text-[#215858] font-semibold'
                  : 'hover:underline'
                  }`}
              >
                Thành viên
              </Link>
              <Link
                to="/admin/partner-approval"
                className={`text-left w-full block px-2 py-1 rounded transition ${location.pathname === '/admin/partner-approval'
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
        <Link to="/admin/seller-packages" className="hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3">
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
                to="/admin/provinces"
                className={`text-left w-full block px-2 py-1 rounded transition ${location.pathname === '/admin/provinces'
                  ? 'bg-white text-[#215858] font-semibold'
                  : 'hover:underline'
                  }`}
              >
                Tỉnh
              </Link>
              <Link
                to="/admin/districts"
                className={`text-left w-full block px-2 py-1 rounded transition ${location.pathname === '/admin/districts'
                  ? 'bg-white text-[#215858] font-semibold'
                  : 'hover:underline'
                  }`}
              >
                Huyện / Thị xã
              </Link>
              <Link
                to="/admin/spots"
                className={`text-left w-full block px-2 py-1 rounded transition ${location.pathname === '/admin/spots'
                  ? 'bg-white text-[#215858] font-semibold'
                  : 'hover:underline'
                  }`}
              >
                Spot
              </Link>
            </div>
          )}
        </div>
        <Link to="/admin/reviews" className="hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3">
          <FiStar />
          <span>Quản lý đánh giá</span>
        </Link>
        <Link to="/admin/agency-services" className="hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3">
          <FiSettings />
          <span>Quản lý dịch vụ</span>
        </Link>
      </nav>
      {/* NÚT ĐĂNG XUẤT */}
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className={`mt-auto px-4 py-3 rounded transition flex items-center space-x-3 text-left font-semibold 
    ${loggingOut ? 'bg-red-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
      >
        {loggingOut ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
            ></path>
          </svg>
        ) : (
          <FiUsers />
        )}
        <span>{loggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}</span>
      </button>
    </div>
  );
}