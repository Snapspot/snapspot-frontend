import { Helmet } from "react-helmet";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

interface SellerPackage {
  id: string;
  name: string;
  description: string;
  maxAgency: number;
  price: number;
  isDeleted: boolean;
}

const imageMap: Record<string, string> = {
  'Gói Cơ Bản': 'https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/45520/article_full%403x.jpg',
  'Gói Tiêu Chuẩn': 'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg',
  'Gói Cao Cấp': 'https://static.vinwonders.com/2022/11/khu-du-lich-viet-nam-1.jpg',
};

const saveTagMap: Record<string, string> = {
  'Gói Cơ Bản': 'Tiết kiệm 83%',
  'Gói Tiêu Chuẩn': 'Tiết kiệm 80%',
  'Gói Cao Cấp': 'Tiết kiệm 77%',
};

const descriptionMap: Record<string, string[]> = {
  'Gói Cơ Bản': [
    'Hiển thị thông tin cơ bản',
    'Đăng tối đa 15 ảnh chất lượng cao',
    'Hiển thị thông thường trên tìm kiếm',
    'Hỗ trợ khách hàng cơ bản',
    'Đăng tải video giới thiệu',
    'Huy hiệu "Đối tác SnapSpot"',
  ],
  'Gói Tiêu Chuẩn': [
    'Tất cả tính năng của Gói Cơ Bản',
    'Hiển thị ưu tiên trong kết quả tìm kiếm',
    'Đăng tải Video giới thiệu HD',
    'Huy hiệu "Đối tác SnapSpot"',
    'Analytics chi tiết',
    'Hỗ trợ khách hàng ưu tiên',
    'Huy hiệu "Đối tác Cao Cấp"',
  ],
  'Gói Cao Cấp': [
    'Tất cả tính năng của Gói Tiêu Chuẩn',
    'Hiển thị trên Trang chủ & Top tìm kiếm',
    'Đăng Video & Ảnh 360 độ',
    'Huy hiệu "Đối tác Cao cấp"',
    'Hỗ trợ khách hàng VIP 24/7',
    'Quản lý danh tiếng online',
    'Báo cáo chi tiết hàng tuần',
  ],
};

const originalPriceMap: { [key: string]: number } = {
  'Gói Cơ Bản': 299000,
  'Gói Tiêu Chuẩn': 500000,
  'Gói Cao Cấp': 899000,
};

const subTextMap: Record<string, string> = {
  'Gói Cơ Bản': 'Chủ địa điểm nhỏ, kinh doanh đơn lẻ',
  'Gói Tiêu Chuẩn': 'Chuỗi nhỏ, các thương hiệu muốn tăng nhận diện',
  'Gói Cao Cấp': 'Các chuỗi lớn, resort, thương hiệu muốn thống trị',
};

// Icon components
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const Services = () => {
  const [packages, setPackages] = useState<SellerPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function để xử lý đăng ký - LOGIC HOÀN CHỈNH
  const handleRegister = (packageId: string, packageName: string) => {
    // Option 1: Chuyển đến trang đăng ký với thông tin gói
    navigate('/register', { 
      state: { 
        selectedPackage: {
          id: packageId,
          name: packageName
        }
      }
    });

    // Option 2: Nếu bạn muốn chuyển đến trang khác
    // navigate('/signup');

    // Option 3: Nếu bạn muốn mở trong tab mới
    // window.open('/register', '_blank');
  };

  // LOGIC FETCH API HOÀN CHỈNH
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axiosInstance.get('/sellerpackages');
        const data = res.data?.data || [];

        const order = ['Gói Cơ Bản', 'Gói Tiêu Chuẩn', 'Gói Cao Cấp'];

        const getPriority = (name: string) => {
          const match = order.find((o) => name.trim().includes(o));
          return match ? order.indexOf(match) : order.length;
        };

        const activePackages = data
          .filter((pkg: SellerPackage) => !pkg.isDeleted)
          .sort((a: SellerPackage, b: SellerPackage) => getPriority(a.name) - getPriority(b.name));

        setPackages(activePackages);
      } catch (error) {
        console.error('Lỗi khi lấy gói:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <>
      <Helmet>
        <title>Dịch vụ</title>
        <meta name="description" content="Khám phá những địa điểm nổi bật tại Việt Nam" />
      </Helmet>

      <section
        className="relative isolate w-full min-h-screen"
        style={{ backgroundColor: "#FAEBCE" }}
        aria-labelledby="services-heading"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-teal-50/30 -z-10" />
        <div className="hidden md:block absolute top-20 left-10 w-20 h-20 bg-emerald-200/20 rounded-full blur-xl -z-10" />
        <div className="hidden md:block absolute bottom-20 right-10 w-32 h-32 bg-teal-200/20 rounded-full blur-xl -z-10" />

        <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 md:py-16 lg:py-24">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-emerald-700 font-semibold text-sm tracking-wide uppercase">
                🏷 Ưu đãi đặc biệt - Giảm giá lên đến 83%
              </span>
            </div>

            {/* Title */}
            <h1
              id="services-heading"
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-emerald-800 mb-4"
            >
              CÁC GÓI DỊCH VỤ
            </h1>

            <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mx-auto mb-6" />

            <p className="text-base md:text-lg lg:text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed">
              Chọn gói dịch vụ phù hợp và bắt đầu phát triển thương hiệu của bạn ngay hôm nay
            </p>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-emerald-700 font-medium">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 text-lg">👥</span>
                <span> khách hàng tin tưởng</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 text-lg">⚡</span>
                <span>Kích hoạt trong 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 text-lg">🛡️</span>
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              </div>
            ) : (
              packages.map((pkg) => {
                const isRecommended = pkg.name.includes("Tiêu Chuẩn");
                const image = imageMap[pkg.name] || 'https://placehold.co/600x400?text=SnapSpot';
                const saveTag = saveTagMap[pkg.name];
                const originalPrice = originalPriceMap[pkg.name];
                const features = descriptionMap[pkg.name] || [pkg.description];
                const subText = subTextMap[pkg.name] || "";

                return (
                  <div
                    key={pkg.id}
                    className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                      isRecommended ? "ring-2 ring-emerald-400 scale-105 lg:scale-110 z-10" : "hover:scale-105"
                    }`}
                  >
                    {/* Recommended badge */}
                    {isRecommended && (
                      <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <StarIcon />
                        <span>Đề xuất</span>
                      </div>
                    )}

                    {/* Save tag */}
                    {saveTag && (
                      <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 text-xs rounded-full font-semibold shadow-lg">
                        {saveTag}
                      </div>
                    )}

                    {/* Image header */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={image}
                        alt={`${pkg.name} package`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      {/* Package name overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>
                        <p className="text-white/90 text-sm">{subText}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Pricing */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-3xl font-bold text-emerald-800">
                            {pkg.price.toLocaleString("vi-VN")}đ
                          </span>
                          <span className="text-emerald-600 text-sm">/tháng</span>
                          {originalPrice && originalPrice > pkg.price && (
                            <span className="text-gray-400 text-sm line-through ml-2">
                              {originalPrice.toLocaleString("vi-VN")}đ
                            </span>
                          )}
                        </div>
                        <p className="text-emerald-700 text-sm font-medium">Tối đa {pkg.maxAgency} địa điểm</p>
                      </div>

                      {/* Features - HIỂN THỊ FULL FEATURES */}
                      <div className="mb-6">
                        <ul className="space-y-3">
                          {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-0.5">
                                <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                  <CheckIcon />
                                </div>
                              </div>
                              <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleRegister(pkg.id, pkg.name)}
                        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                          isRecommended
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300"
                        }`}
                      >
                        Đăng ký ngay
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;