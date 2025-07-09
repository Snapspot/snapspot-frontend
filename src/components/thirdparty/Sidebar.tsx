import { FiHome, FiMapPin, FiPackage, FiStar } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiUsers } from 'react-icons/fi';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);

    setTimeout(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="w-72 min-h-screen bg-[#215858] text-[#faebce] flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-10">SNAPSPOT</h2>
      <nav className="flex flex-col space-y-4">

        <Link
          to="/third-party/dashboard"
          className={`hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3 ${location.pathname === '/third-party/dashboard' ? 'bg-white text-[#215858] font-semibold' : ''
            }`}
        >
          <FiHome />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/third-party/branches"
          className={`hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3 ${location.pathname === '/third-party/branches' ? 'bg-white text-[#215858] font-semibold' : ''
            }`}
        >
          <FiMapPin />
          <span>Quản lý chi nhánh</span>
        </Link>

        <Link
          to="/third-party/package"
          className={`hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3 ${location.pathname === '/third-party/package' ? 'bg-white text-[#215858] font-semibold' : ''
            }`}
        >
          <FiPackage />
          <span>Gói đăng ký</span>
        </Link>

        <Link
          to="/third-party/ratings"
          className={`hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3 ${location.pathname === '/third-party/ratings' ? 'bg-white text-[#215858] font-semibold' : ''
            }`}
        >
          <FiStar />
          <span>Đánh giá</span>
        </Link>
      </nav>

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
