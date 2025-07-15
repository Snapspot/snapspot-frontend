import Navbar from '../components/home/TransparentNavbar';
import Footer from '../components/home/GreenFooter';

const PACKAGES = [
  {
    title: 'Gói Cơ Bản (Starter)',
    price: '299.000đ/tháng',
    description: [
      'Hiển thị thông tin cơ bản',
      'Đăng tối đa 15 ảnh',
    ],
    highlights: ['Tối đa 1 địa điểm'],
    badge: '',
    image: 'https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/45520/article_full%403x.jpg',
  },
  {
    title: 'Gói Tiêu Chuẩn (Growth)',
    price: '799.000đ/tháng (~200k/địa điểm)',
    description: [
      'Mọi thứ của Gói Cơ Bản',
      'Hiển thị ưu tiên trong kết quả tìm kiếm',
      'Đăng tải Video giới thiệu',
      'Huy hiệu “Đối tác SnapSpot”',
    ],
    highlights: ['Tối đa 4 địa điểm'],
    badge: '',
    image: 'https://media.istockphoto.com/id/610259354/vi/anh/ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-tr%E1%BA%BB-s%E1%BB%AD-d%E1%BB%A5ng-m%C3%A1y-%E1%BA%A3nh-dslr.jpg',
  },
  {
    title: 'Gói Cao Cấp (Premium)',
    price: '1.499.000đ/tháng (~150k/địa điểm)',
    description: [
      'Mọi thứ của Gói Tiêu Chuẩn',
      'Hiển thị nổi bật trên Trang chủ & Top tìm kiếm',
      'Đăng Video & Ảnh 360 độ',
      'Huy hiệu “Đối tác Cao cấp”',
    ],
    highlights: ['Tối đa 10 địa điểm'],
    badge: '',
    image: 'https://static.vinwonders.com/2022/11/khu-du-lich-viet-nam-1.jpg',
  },
];

const Services = () => {
  return (
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
        <h1 className="text-5xl font-bold text-center">CÁC GÓI DỊCH VỤ</h1>
        <div className="w-24 h-1 bg-[#215858] mt-4 mb-10"></div>

        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.title}
              className="w-[360px] md:w-[400px] lg:w-[450px] min-h-[540px] rounded-2xl shadow-lg text-white relative overflow-hidden group"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-center bg-cover grayscale transition duration-500"
                style={{ backgroundImage: `url(${pkg.image})` }}
              ></div>

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
                  <div className="bg-white/20 px-4 py-2 rounded-full mb-2">
                    <p className="text-xl font-extrabold text-white drop-shadow-md">{pkg.price}</p>
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
                  <div className="mt-auto pt-6 opacity-0 translate-y-4 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
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
  );
};

export default Services;
