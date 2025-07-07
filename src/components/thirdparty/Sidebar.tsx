import { FiHome, FiMapPin, FiPackage, FiStar, FiLogOut } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
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
          to="/third-party/dashboard"
          className={`hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3 ${
            location.pathname === '/third-party/dashboard' ? 'bg-white text-[#215858] font-semibold' : ''
          }`}
        >
          <FiHome />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/third-party/branches"
          className={`hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3 ${
            location.pathname === '/third-party/branches' ? 'bg-white text-[#215858] font-semibold' : ''
          }`}
        >
          <FiMapPin />
          <span>Quản lý chi nhánh</span>
        </Link>

        <Link
          to="/third-party/package"
          className={`hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3 ${
            location.pathname === '/third-party/package' ? 'bg-white text-[#215858] font-semibold' : ''
          }`}
        >
          <FiPackage />
          <span>Gói đăng ký</span>
        </Link>

        <Link
          to="/third-party/ratings"
          className={`hover:bg-teal-700 px-4 py-3 rounded transition flex items-center space-x-3 ${
            location.pathname === '/third-party/ratings' ? 'bg-white text-[#215858] font-semibold' : ''
          }`}
        >
          <FiStar />
          <span>Đánh giá</span>
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto hover:bg-red-700 px-4 py-3 rounded transition flex items-center space-x-3 text-left bg-red-600 text-white font-semibold"
      >
        <FiLogOut />
        <span>Đăng xuất</span>
      </button>
    </div>
  );
}
