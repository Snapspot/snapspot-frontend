import { FiSearch, FiBell, FiUser } from 'react-icons/fi';

export default function Navbar() {
    return (
        <header className="bg-[#fff5e2] shadow px-6 h-20 flex items-center justify-between">

            {/* Thanh Search ở giữa */}
            <div className="flex items-center rounded-md px-3 py-1 w-1/3" style={{ backgroundColor: '#215858' }}>
                <FiSearch className="mr-2" style={{ color: '#faebce' }} />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent focus:outline-none w-full"
                    style={{ color: '#faebce' }}
                // Thay đổi màu placeholder bằng CSS inline styles
                />
            </div>


            {/* Icon bên phải (Notification + User) */}
            <div className="flex items-center space-x-6 text-gray-600">
                <button aria-label="Notifications" className="hover:text-gray-800 transition">
                    <FiBell size={20} />
                </button>
                <button aria-label="User Profile" className="hover:text-gray-800 transition flex items-center space-x-2">
                    <FiUser size={20} />
                    <span className="hidden sm:inline text-gray-800 font-medium">Hi, User</span>
                </button>
            </div>
        </header>
    );
}
