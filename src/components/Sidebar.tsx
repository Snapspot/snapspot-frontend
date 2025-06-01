import { FiHome, FiUsers, FiPackage, FiMapPin, FiBook, FiStar, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = [
    { label: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { label: "Quản lý đối tác", icon: <FiUsers />, path: "/partners" },
    { label: "Quản lý gói tiếp thị", icon: <FiPackage />, path: "/marketing" },
    { label: "Quản lý địa điểm", icon: <FiMapPin />, path: "/locations" },
    { label: "Nhật ký hệ thống", icon: <FiBook />, path: "/system-log" },
    { label: "Quản lý đánh giá", icon: <FiStar />, path: "/reviews" },
    { label: "Quản lý dịch vụ", icon: <FiSettings />, path: "/services" },
  ];

  return (
    <div className="w-72 min-h-screen bg-[#215858] text-[#faebce] flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-10">SNAPSPOT</h2>
      <nav className="flex flex-col space-y-4">
        {menuItems.map(({ label, icon, path }, index) => (
          <Link
            key={index}
            to={path}
            className="hover:bg-teal-700 px-4 py-3 rounded transition duration-200 border-b border-[#3a7b7b] flex items-center space-x-3"
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
