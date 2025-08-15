import { useState } from "react";
import Navbar from "../components/home/Navbar";
import GreenFooter from "../components/home/GreenFooter";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: "vinh-ha-long",
    url: "https://i.pinimg.com/736x/79/fb/75/79fb7565154e04969f10720622618d32.jpg",
    title: "Vịnh Hạ Long – Kỳ quan thiên nhiên",
    description:
      "Một trong 7 kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ vĩ.",
    date: "15/07/2025",
    category: "Biển đảo",
  },
  {
    id: "cao-nguyen-da-dong-van",
    url: "https://mytourcdn.com/upload_images/Image/Location/5_11_2015/dia-diem-du-lich-viet-nam-mytour-14.jpg",
    title: "Cao nguyên đá Đồng Văn",
    description: "Vùng đất đá hoang sơ nhưng đầy sức sống ở cực Bắc Việt Nam.",
    date: "14/07/2025",
    category: "Khám phá",
  },
  {
    id: "phu-quoc",
    url: "https://media.vov.vn/sites/default/files/styles/front_large_watermark/public/2021-11/du-lich-mot-minh-phu-quoc.jpg?resize=p_8,w_",
    title: "Phú Quốc – Thiên đường biển đảo",
    description:
      "Nơi lý tưởng để thư giãn, khám phá và lưu giữ khoảnh khắc đáng nhớ.",
    date: "12/07/2025",
    category: "Biển đảo",
  },
  {
    id: "ba-na-hills",
    url: "https://bvhttdl.mediacdn.vn/2020/6/10/sun-world-ba-na-hills-24-15895192875941793928359-1591751128894-15917511288942046241021.jpg",
    title: "Bà Nà Hills – xứ sở thần tiên giữa núi rừng Đà Nẵng",
    description:
      "Khu nghỉ dưỡng nổi tiếng với cầu Vàng và khí hậu mát mẻ quanh năm.",
    date: "11/07/2025",
    category: "Khám phá",
  },
  {
    id: "ha-noi",
    url: "https://cdn2.tuoitre.vn/zoom/480_300/471584752817336320/2024/5/30/du-lich-ha-noi-1703495521958912478347-180-470-963-1723-crop-17170584767591570643890.jpg",
    title: "Hà Nội – nơi giao thoa giữa hiện đại và cổ kính",
    description:
      "Thủ đô ngàn năm văn hiến với hồ Gươm, phố cổ và nền ẩm thực đặc sắc.",
    date: "10/07/2025",
    category: "Văn hóa",
  },
  {
    id: "con-dao",
    url: "https://dulichviet.com.vn/images/bandidau/NOI-DIA/Con-Dao/du-lich-con-dao-mua-he-2025-du-lich-viet.jpg",
    title: "Côn Đảo – thiên nhiên hoang sơ, yên bình và thiêng liêng",
    description:
      "Hòn đảo linh thiêng với những bãi biển hoang sơ và giá trị lịch sử sâu sắc.",
    date: "08/07/2025",
    category: "Biển đảo",
  },

  {
    id: "sapa",
    url: "https://i.pinimg.com/736x/2a/5b/9f/2a5b9f7b6914558a30af108a2b92c325.jpg",
    title: "Sa Pa – Thiên đường mây trắng",
    description:
      "Sapa, một thị trấn vùng cao Tây Bắc, luôn là điểm đến mơ ước của những tâm hồn yêu thiên nhiên và muốn khám phá .",
    date: "05/07/2025",
    category: "Khám phá",
  },
  {
    id: "hoi-an",
    url: "https://i.pinimg.com/1200x/18/16/8b/18168b400406687b8371b743d77e1154.jpg",
    title: "Hội An – Phố cổ quyến rũ",
    description:
      "Thành phố cổ với những ngôi nhà cổ kính và đèn lồng rực rỡ.",
    date: "03/07/2025",
    category: "Văn hóa",
  },
  {
    id: "nha-trang",
    url: "https://i.pinimg.com/1200x/22/07/03/220703bd07c427acc9ca6d1d7455c263.jpg",
    title: "Nha Trang – Bãi biển xanh ngắt",
    description:
      "Thành phố biển xinh đẹp với làn nước trong xanh và cát trắng mịn.",
    date: "01/07/2025",
    category: "Biển đảo",
  },
  {
    id: "Viện Hải Dương Học Nha Trang",
    url: "https://i.pinimg.com/736x/3e/e8/09/3ee8095fe6d0749af8a2c9d3353839ce.jpg",
    title: "Khám phá Viện Hải Dương Học Nha Trang",
    description:
      "Địa chỉ Viện Hải Dương Học Nha Trang là vấn đề được rất nhiều người quan tâm và thắc mắc. Nơi đây là một trong những điểm đến thú vị cho những ai yêu thích những sinh vật biển độc đáo.",
    date: "01/04/2024",
    category: "Khám phá",
  },
];

// Tags
const popularTags = [
  { name: "Biển đảo", count: 4 },
  { name: "Văn hóa", count: 2 },
  { name: "Khám phá", count: 4 },
];

const formatDate = (dateStr: string) => {
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const [day, month, year] = dateStr.split("/");
  return `${parseInt(day)} ${months[parseInt(month) - 1]}, ${year}`;
};

const Blog = () => {
  // Dùng tất cả bài (không bỏ bài đầu)
  const latestPosts = blogPosts;

  // Tìm kiếm & lọc
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả chủ đề");

  // Phân trang lưới bài chính
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = latestPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả chủ đề" ||
      post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handleFilterChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Component Pagination (lưới chính)
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) pages.push(i);

    return (
      <div className="flex justify-center items-center space-x-2 mt-8 mb-4">
        {/* Prev */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-[#215858] hover:text-white shadow-md"
          }`}
          aria-label="Trang trước"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* First + ... */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 hover:bg-[#215858] hover:text-white shadow-md transition-colors"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-2 text-gray-500" aria-hidden>
                ...
              </span>
            )}
          </>
        )}

        {/* Pages */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-[#215858] text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-[#215858] hover:text-white shadow-md"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        {/* ... + Last */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 text-gray-500" aria-hidden>
                ...
              </span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 hover:bg-[#215858] hover:text-white shadow-md transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-[#215858] hover:text-white shadow-md"
          }`}
          aria-label="Trang sau"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    );
  };

  // ========================
  // Sidebar Featured Pagination
  // ========================
  const [featPage, setFeatPage] = useState(1);
  const featPerPage = 4;
  const featTotalPages = Math.ceil(blogPosts.length / featPerPage);
  const featStart = (featPage - 1) * featPerPage;
  const featuredCurrent = blogPosts.slice(featStart, featStart + featPerPage);

  const changeFeatPage = (p: number) => {
    if (p < 1 || p > featTotalPages) return;
    setFeatPage(p);
  };

  // helper tạo dải trang sidebar
  const featPages = (() => {
    const visible = 5;
    const pages: number[] = [];
    let start = Math.max(1, featPage - Math.floor(visible / 2));
    let end = Math.min(featTotalPages, start + visible - 1);
    if (end - start + 1 < visible) start = Math.max(1, end - visible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  })();

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden text-gray-800">
      <Helmet>
        <title>Blog Du Lịch Việt Nam | Khám phá vẻ đẹp đất nước</title>
        <meta
          name="description"
          content="Blog chia sẻ địa điểm du lịch nổi bật tại Việt Nam: biển đảo, cao nguyên, văn hóa và ẩm thực địa phương."
        />
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
        <div className="text-center py-16 mt-16">
          <h1 className="text-5xl font-bold text-[#216565]">
            Blog Du Lịch Việt Nam
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Khám phá vẻ đẹp khắp mọi miền tổ quốc
          </p>
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
                onChange={handleSearchChange}
              />
              <select
                className="w-full sm:w-1/3 px-4 py-2 border rounded-lg"
                value={selectedCategory}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option>Tất cả chủ đề</option>
                <option>Biển đảo</option>
                <option>Văn hóa</option>
                <option>Khám phá</option>
              </select>
            </div>

            {/* Blog Grid */}
            {currentPosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {currentPosts.map((post) => (
                  <Link to={`/blog/${post.id}`} key={post.id}>
                    <div className="flex flex-col h-full bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer">
                      <img
                        src={post.url}
                        alt={post.title}
                        className="w-full h-[200px] object-cover"
                      />
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-[#215858]">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2 flex-grow">
                          {post.description}
                        </p>
                        <span className="text-xs text-gray-500">
                          {formatDate(post.date)}
                        </span>
                        <div className="mt-2">
                          <span className="text-sm text-[#215858] font-medium hover:underline">
                            Xem thêm
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.044-5.709-2.566M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy bài viết
                </h3>
                <p className="text-gray-500">
                  Thử thay đổi từ khóa tìm kiếm hoặc chọn chủ đề khác
                </p>
              </div>
            )}

            {/* Pagination chính */}
            <Pagination />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Featured Posts + pagination */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                Bài viết nổi bật
              </h3>

              <div className="space-y-4">
                {featuredCurrent.map((post) => (
                  <Link to={`/blog/${post.id}`} key={post.id} className="block group">
                    <div className="flex gap-3 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                      <img
                        src={post.url}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://via.placeholder.com/64x64?text=Ảnh";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-emerald-600 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {formatDate(post.date)}
                        </p>
                        <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full mt-1 inline-block">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Phân trang sidebar */}
              {featTotalPages > 1 && (
                <div className="mt-5 flex items-center justify-center gap-1">
                  <button
                    onClick={() => changeFeatPage(featPage - 1)}
                    disabled={featPage === 1}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      featPage === 1
                        ? "text-gray-400 border-gray-200 cursor-not-allowed"
                        : "text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    Trước
                  </button>

                  {/* First + ... */}
                  {featPages[0] > 1 && (
                    <>
                      <button
                        onClick={() => changeFeatPage(1)}
                        className="px-3 py-1.5 text-sm rounded-lg border text-gray-700 border-gray-200 hover:bg-gray-50"
                      >
                        1
                      </button>
                      {featPages[0] > 2 && (
                        <span className="px-2 text-gray-400">…</span>
                      )}
                    </>
                  )}

                  {featPages.map((p) => (
                    <button
                      key={p}
                      onClick={() => changeFeatPage(p)}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                        featPage === p
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  {/* ... + Last */}
                  {featPages[featPages.length - 1] < featTotalPages && (
                    <>
                      {featPages[featPages.length - 1] < featTotalPages - 1 && (
                        <span className="px-2 text-gray-400">…</span>
                      )}
                      <button
                        onClick={() => changeFeatPage(featTotalPages)}
                        className="px-3 py-1.5 text-sm rounded-lg border text-gray-700 border-gray-200 hover:bg-gray-50"
                      >
                        {featTotalPages}
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => changeFeatPage(featPage + 1)}
                    disabled={featPage === featTotalPages}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      featPage === featTotalPages
                        ? "text-gray-400 border-gray-200 cursor-not-allowed"
                        : "text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    Sau
                  </button>
                </div>
              )}
            </div>

            {/* Popular Tags */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                Chủ đề phổ biến
              </h3>
              <div className="space-y-3">
                {popularTags.map((tag) => (
                  <button
                    key={tag.name}
                    onClick={() => handleFilterChange(tag.name)}
                    className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors group ${
                      selectedCategory === tag.name
                        ? "bg-emerald-100 text-emerald-700"
                        : "hover:bg-emerald-50"
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        selectedCategory === tag.name
                          ? "text-emerald-700"
                          : "text-gray-700 group-hover:text-emerald-600"
                      }`}
                    >
                      {tag.name}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedCategory === tag.name
                          ? "bg-emerald-200 text-emerald-700"
                          : "bg-gray-100 text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-600"
                      }`}
                    >
                      {tag.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <GreenFooter />
    </div>
  );
};

export default Blog;
