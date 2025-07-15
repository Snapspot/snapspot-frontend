import Navbar from '../components/home/TransparentNavbar';
import Footer from '../components/home/GreenFooter';
import { Helmet } from "react-helmet";

const PACKAGES = [
  {
    title: 'Gói Cơ Bản (Starter)',
    price: '299.000đ/tháng',
    originalPrice: '399.000đ',
    saveTag: 'Tiết kiệm 25%',
    description: [
      'Hiển thị thông tin cơ bản',
      'Đăng tối đa 15 ảnh chất lượng cao',
      'Hiển thị thông thường trên tìm kiếm',
      'Hỗ trợ khách hàng cơ bản',
      'Đăng tải video giới thiệu',
      'Huy hiệu "Đối tác SnapSpot"',
    ],
    highlights: ['Tối đa 1 địa điểm'],
    badge: '',
    image: 'https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/45520/article_full%403x.jpg',
  },
  {
    title: 'Gói Tiêu Chuẩn (Growth)',
    price: '500.000đ/tháng (~200k/địa điểm)',
    originalPrice: '799.000đ',
    saveTag: 'Tiết kiệm 37%',
    description: [
      'Tất cả tính năng của Gói Cơ Bản',
      'Hiển thị ưu tiên trong kết quả tìm kiếm',
      'Đăng tải Video giới thiệu HD',
      'Huy hiệu “Đối tác SnapSpot”',
      'Analytics chi tiết',
      'Hỗ trợ khách hàng ưu tiên',
      'Huy hiệu “Đối tác Cao Cấp"',
    ],
    highlights: ['Tối đa 4 địa điểm'],
    badge: '',
    image: 'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg',
  },
  {
    title: 'Gói Cao Cấp (Premium)',
    price: '1.499.000đ/tháng (~150k/địa điểm)',
    originalPrice: '1.899.000đ',
    saveTag: 'Tiết kiệm 21%',
    description: [
      'Tất cả tính năng của Gói Tiêu Chuẩn',
      'Hiển thị trên Trang chủ & Top tìm kiếm',
      'Đăng Video & Ảnh 360 độ',
      'Huy hiệu “Đối tác Cao cấp”',
      'Hỗ trợ khách hàng VIP 24/7',
      'Quản lý danh tiếng online',
      'Báo cáo chi tiết hàng tuần',
    ],
    highlights: ['Tối đa 10 địa điểm'],
    badge: '',
    image: 'https://static.vinwonders.com/2022/11/khu-du-lich-viet-nam-1.jpg',
  },
];

const Services = () => {

  return (
    <>
      <Helmet>
        <title>Dịch vụ</title>
        <meta name="description" content="Khám phá những địa điểm nổi bật tại Việt Nam" />
      </Helmet>
      <div className="relative w-screen min-h-screen overflow-y-auto">
        <Navbar />

        {/* Background */}
        <div>
          <div
            className="absolute inset-0 bg-cover bg-center grayscale brightness-80 -z-10"
            style={{
              backgroundImage:
                "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')",
            }}
          ></div>
          <div className="absolute inset-0 bg-[#f5eacc] opacity-60 -z-10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center pt-32 px-6 text-[#215858]">
          {/* Ưu đãi đặc biệt */}
          <div className="mb-3 inline-block bg-gradient-to-r from-[#215858] to-[#5f9e9e] text-white text-sm font-medium px-4 py-2 rounded-full shadow">
            🏷 Ưu đãi đặc biệt - Giảm giá lên đến 37%
          </div>

          {/* Tiêu đề chính */}
          <h1 className="text-5xl font-bold">CÁC GÓI DỊCH VỤ</h1>

          {/* Mô tả ngắn */}
          <p className="mt-3 text-base text-[#215858] max-w">
            Chọn gói dịch vụ phù hợp và bắt đầu phát triển thương hiệu của bạn ngay hôm nay
          </p>

          {/* Thông tin phụ */}
          <div className="mt-4 flex flex-wrap justify-center items-center gap-6 text-sm text-[#215858] font-medium">
            <div className="flex items-center gap-2">
              <span className="text-[#215858] text-lg">👥</span>
              <span>2,500+ khách hàng tin tưởng</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#215858] text-lg">⚡</span>
              <span>Kích hoạt trong 24h</span>
            </div>
          </div>
          <div className="w-24 h-1 bg-[#215858] mt-4 mb-10"></div>

          <div className="flex flex-wrap justify-center gap-6 mb-20">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.title}
                className={`w-[360px] md:w-[400px] lg:w-[550px] min-h-[540px] rounded-2xl text-white relative overflow-hidden group transition-all duration-300
    ${pkg.title === 'Gói Tiêu Chuẩn (Growth)'
                    ? 'ring-4 ring-[#b9f8cf] shadow-[0_8px_30px_rgba(2,103,207,0.4)] scale-[1.03] z-20'
                    : 'shadow-lg'}
  `}
              >
                {pkg.title === 'Gói Tiêu Chuẩn (Growth)' && (
                  <div className="absolute top-4 left-4 z-40 bg-[#f5eacc] text-[#215858] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    ✨ Đề xuất
                  </div>
                )}

                {pkg.saveTag && (
                  <div className="absolute top-4 right-4 z-40 bg-green-200 text-[#215858] px-2 py-1 text-xs rounded-full font-semibold shadow">
                    {pkg.saveTag}
                  </div>
                )}

                {/* Image */}
                <div
                  className="absolute inset-0 bg-center bg-cover grayscale transition duration-500"
                  style={{ backgroundImage: `url(${pkg.image})` }}
                >
                </div>

                {/* Overlay + Content */}
                <div className="absolute inset-0 bg-[#577e7e]/60 z-10 flex flex-col justify-between p-6 text-center transition-all duration-500 ease-in-out">
                  <div className="absolute inset-0 bg-black/10 z-20"></div>

                  <div className="relative z-30 flex flex-col justify-start items-center h-full">
                    {/* Badge */}
                    {pkg.badge && (
                      <div className="mb-4 text-xs bg-yellow-400 text-[#215858] px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                        {pkg.badge}
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-2xl font-bold mb-2">{pkg.title}</h2>

                    {/* Price nổi bật */}
                    <div className="flex items-center gap-2 mb-2 bg-white/20 px-4 py-2 rounded-full">
                      <p className="text-xl font-extrabold text-white drop-shadow-md">{pkg.price}</p>
                      {pkg.originalPrice && (
                        <p className="text-sm text-white/60 line-through">{pkg.originalPrice}</p>
                      )}
                    </div>

                    {/* Highlights */}
                    {pkg.highlights.length > 0 && (
                      <p className="text-sm italic text-white/80 mb-4">{pkg.highlights.join(', ')}</p>
                    )}

                    {/* Divider */}
                    <div className="w-2/3 h-[1px] bg-white/30 my-2" />

                    {/* Features */}
                    <div className="text-sm space-y-2 leading-[32px] text-left w-full max-w-[300px]">
                      {pkg.description.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-green-200 text-lg">✔️</span>
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>

                    {/* Register button */}
                    <div className="mt-auto pt-6 transition-all duration-500 ease-in-out">
                      <button className="bg-[#f5eacc] text-[#215858] px-5 py-2 rounded-full font-medium hover:bg-white transition">
                        Đăng ký ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Services;