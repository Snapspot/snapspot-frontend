import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 text-white">
            {/* Background trắng đen + làm sáng */}
            <div
                className="absolute inset-0 bg-cover bg-center grayscale brightness-90 opacity-20"
                style={{
                    backgroundImage: `url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')`,
                    zIndex: -2,
                }}
            />

            {/* Overlay vàng kem vanilla */}
            <div className="absolute inset-0 bg-[#f5eacc] opacity-60 z-[-1]" />

            {/* Nội dung nav */}
            <div className="relative z-10 flex items-center justify-between px-8 py-4">
                {/* Logo */}
                <div className="flex items-center">
                    <img src="/images/logo-03.png" alt="SnapSpot Logo" className="h-10 w-auto" />
                </div>

                {/* Menu */}
                <div className="flex space-x-8 text-[#215858] font-semibold">
                    <button onClick={() => navigate("/home")} className="hover:underline">Home</button>
                    <button onClick={() => navigate("/services")} className="hover:underline">Service</button>
                    <button onClick={() => navigate("/about")} className="hover:underline">About Us</button>
                    <button onClick={() => navigate("/blog")} className="hover:underline">Blog</button>
                </div>

                {/* Nút Login & Register */}
                <div className="flex space-x-4">
                    <button
                        onClick={() => navigate("/register")}
                        className="border border-[#215858] px-4 py-2 rounded hover:bg-[#215858] hover:text-white text-[#215858] transition-colors duration-300"
                    >
                        Register
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className="border border-[#215858] px-4 py-2 rounded hover:bg-[#215858] hover:text-white text-[#215858] transition-colors duration-300"
                    >
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;