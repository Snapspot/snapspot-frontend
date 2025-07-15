import { useState } from "react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const blogPosts = [
    {
        id: "vinh-ha-long",
        url: "https://cdn3.ivivu.com/2015/02/vinhhanlongdiadiemselfiledepnhathanhtinh-ivivu-1.jpg",
        title: "Vịnh Hạ Long – Kỳ quan thiên nhiên",
        description: "Một trong 7 kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ vĩ.",
        date: "15/07/2025",
    },
    {
        id: "cao-nguyen-da-dong-van",
        url: "https://mytourcdn.com/upload_images/Image/Location/5_11_2015/dia-diem-du-lich-viet-nam-mytour-14.jpg",
        title: "Cao nguyên đá Đồng Văn",
        description: "Vùng đất đá hoang sơ nhưng đầy sức sống ở cực Bắc Việt Nam.",
        date: "14/07/2025",
    },
    {
        id: "phu-quoc",
        url: "https://media.vov.vn/sites/default/files/styles/front_large_watermark/public/2021-11/du-lich-mot-minh-phu-quoc.jpg?resize=p_8,w_",
        title: "Phú Quốc – Thiên đường biển đảo",
        description: "Nơi lý tưởng để thư giãn, khám phá và lưu giữ khoảnh khắc đáng nhớ.",
        date: "12/07/2025",
    },
    {
        id: "ba-na-hills",
        url: "https://bvhttdl.mediacdn.vn/2020/6/10/sun-world-ba-na-hills-24-15895192875941793928359-1591751128894-15917511288942046241021.jpg",
        title: "Bà Nà Hills – xứ sở thần tiên giữa núi rừng Đà Nẵng",
        description: "Khu nghỉ dưỡng nổi tiếng với cầu Vàng và khí hậu mát mẻ quanh năm.",
        date: "11/07/2025",
    },
    {
        id: "ha-noi",
        url: "https://cdn2.tuoitre.vn/zoom/480_300/471584752817336320/2024/5/30/du-lich-ha-noi-1703495521958912478347-180-470-963-1723-crop-17170584767591570643890.jpg",
        title: "Hà Nội – nơi giao thoa giữa hiện đại và cổ kính",
        description: "Thủ đô ngàn năm văn hiến với hồ Gươm, phố cổ và nền ẩm thực đặc sắc.",
        date: "10/07/2025",
    },
    {
        id: "con-dao",
        url: "https://dulichviet.com.vn/images/bandidau/NOI-DIA/Con-Dao/du-lich-con-dao-mua-he-2025-du-lich-viet.jpg",
        title: "Côn Đảo – thiên nhiên hoang sơ, yên bình và thiêng liêng",
        description: "Hòn đảo linh thiêng với những bãi biển hoang sơ và giá trị lịch sử sâu sắc.",
        date: "08/07/2025",
    },
];

const formatDate = (dateStr: string) => {
    const months = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];
    const [day, month, year] = dateStr.split("/");
    return `${parseInt(day)} ${months[parseInt(month) - 1]}, ${year}`;
};

const Blog = () => {
    const latestPosts = blogPosts.slice(1);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = latestPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative w-screen min-h-screen overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Blog Du Lịch Việt Nam | Khám phá vẻ đẹp đất nước</title>
                <meta name="description" content="Blog chia sẻ địa điểm du lịch nổi bật tại Việt Nam: biển đảo, cao nguyên, văn hóa và ẩm thực địa phương." />
            </Helmet>

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center grayscale brightness-75 z-0"
                style={{
                    backgroundImage:
                        "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')",
                }}
            ></div>
            <div className="absolute inset-0 bg-[#f5eacc] opacity-60 z-0"></div>

            <div className="relative z-10">
                <Navbar />

                {/* Header */}
                <div className="text-center py-16 mt-8">
                    <h1 className="text-5xl font-bold text-[#215858]">Blog Du Lịch Việt Nam</h1>
                    <p className="text-gray-600 mt-4 text-lg">Khám phá vẻ đẹp khắp mọi miền tổ quốc</p>
                </div>

                {/* Search + Content */}
                <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Search & Filter */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Tìm kiếm bài viết..."
                                className="w-full sm:w-2/3 px-4 py-2 border rounded-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <select className="w-full sm:w-1/3 px-4 py-2 border rounded-lg">
                                <option>Tất cả chủ đề</option>
                                <option>Biển đảo</option>
                                <option>Văn hóa</option>
                                <option>Khám phá</option>
                            </select>
                        </div>

                        {/* Blog Grid */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {filteredPosts.map((post, index) => (
                                <Link to={`/blog/${post.id}`} key={index}>
                                    <div className="flex flex-col h-full bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer">
                                        <img src={post.url} alt={post.title} className="w-full h-[200px] object-cover" />
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="text-lg font-semibold text-[#215858]">{post.title}</h3>
                                            <p className="text-sm text-gray-600 mb-2 line-clamp-2 flex-grow">{post.description}</p>
                                            <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                                            <div className="mt-2">
                                                <span className="text-sm text-[#215858] font-medium hover:underline">Xem thêm</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white p-4 rounded-xl shadow-md">
                            <h3 className="text-lg font-bold text-[#215858] mb-3">Chủ đề phổ biến</h3>
                            <ul className="text-sm space-y-2 text-gray-700">
                                <li>#BiểnĐảo</li>
                                <li>#VănHóa</li>
                                <li>#KhámPhá</li>
                                <li>#ẨmThực</li>
                                <li>#MiềnNúi</li>
                            </ul>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-md">
                            <h3 className="text-lg font-bold text-[#215858] mb-3">Bài viết gần đây</h3>
                            <ul className="text-sm text-gray-700 space-y-3">
                                {latestPosts.slice(0, 4).map((post, index) => (
                                    <li key={index} className="border-b pb-2">
                                        <span className="font-medium">{post.title}</span>
                                        <br />
                                        <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default Blog;