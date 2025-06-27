import { useState } from 'react';
import Navbar from '../components/home/TransparentNavbar';
import Footer from '../components/home/GreenFooter';

type Package = {
  title: string;
  price: string;
  description: string;
  image: string;
};

type ServiceKey = 'Photographer' | 'Studio' | 'Makeup Artist' | 'Khu du lịch';

const SERVICES: Record<ServiceKey, { basic: Package; premium: Package }> = {
  Photographer: {
    basic: {
      title: 'Gói Cơ Bản',
      price: '',
      description: 'Chụp tại studio, chỉnh sửa cơ bản.',
      image: 'https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/45520/article_full%403x.jpg',
    },
    premium: {
      title: 'Gói Chuyên Nghiệp',
      price: '1.500.000đ',
      description: 'Chụp ngoại cảnh, chỉnh sửa cao cấp.',
      image: 'https://media.istockphoto.com/id/610259354/vi/anh/ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-tr%E1%BA%BB-s%E1%BB%AD-d%E1%BB%A5ng-m%C3%A1y-%E1%BA%A3nh-dslr.jpg?s=612x612&w=0&k=20&c=AdTtAj1Lo46Mz7ZuCC9VpmzEMp3SjNh8bPzntmnGArI=',
    },
  },
  Studio: {
    basic: {
      title: 'Gói Cơ Bản',
      price: '',
      description: 'Thuê phòng chụp trong 1 giờ.',
      image: 'https://d1hjkbq40fs2x4.cloudfront.net/2021-03-02/files/03_-_BOOK_STUDIO_.jpg',
    },
    premium: {
      title: 'Gói Chuyên Nghiệp',
      price: '900.000đ',
      description: 'Thuê phòng + hỗ trợ ánh sáng, đạo cụ.',
      image: 'https://photographyschoolasia.com/wp-content/uploads/2019/01/photography-studio-rental-bangkok.jpg',
    },
  },
  'Makeup Artist': {
    basic: {
      title: 'Gói Cơ Bản',
      price: '',
      description: 'Trang điểm nhẹ, phù hợp đi chơi.',
      image: 'https://media-api.xogrp.com/images/7256fa18-0a4e-4691-8f51-3bc669ebc83f~rs_768.h',
    },
    premium: {
      title: 'Gói Chuyên Nghiệp',
      price: '1.200.000đ',
      description: 'Trang điểm chuyên sâu cho chụp ảnh.',
      image: 'https://www.easterncollege.ca/uploads/2022/01/should-i-be-a-makeup-artist-2.jpg',
    },
  },
  'Khu du lịch': {
    basic: {
      title: 'Gói Cơ Bản',
      price: '',
      description: 'Vé vào cổng, tự do chụp hình.',
      image: 'https://www.homepaylater.vn/static/1124165692189f132bead79e46eadbea/08fef/4_kham_pha_ngay_cac_loai_hinh_du_lich_pho_bien_va_len_ke_hoach_cho_chuyen_di_dang_nho_691b4cbc76.jpg',
    },
    premium: {
      title: 'Gói Chuyên Nghiệp',
      price: '800.000đ',
      description: 'Vé + hướng dẫn viên + xe đưa đón.',
      image: 'https://static.vinwonders.com/2022/11/khu-du-lich-viet-nam-1.jpg',
    },
  },
};


const Services = () => {
  const [selected, setSelected] = useState<ServiceKey>('Photographer');


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

      {/* Tiêu đề và danh mục */}
      <div className="relative z-10 flex flex-col items-center pt-32 px-6 text-[#215858]">
        <h1 className="text-5xl font-bold">CÁC GÓI DỊCH VỤ</h1>
        <div className="w-24 h-1 bg-[#215858] mt-4 mb-10"></div>

        <div className="flex flex-wrap justify-center gap-8 text-xl font-medium mb-10">
          {Object.keys(SERVICES).map((key) => (
            <div
              key={key}
              onClick={() => setSelected(key as ServiceKey)}
              className={`px-6 py-3 border border-[#215858] rounded-full cursor-pointer transition hover:bg-[#215858] hover:text-white ${selected === key ? 'bg-[#215858] text-white' : ''
                }`}
            >
              {key}
            </div>
          ))}
        </div>

        {/* Hiển thị gói dịch vụ nếu đã chọn mục */}
        {selected && (
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {(['basic', 'premium'] as const).map((type) => {
              const pkg = SERVICES[selected][type];
              return (
                <div
                  key={type}
                  className="w-[450px] h-[450px] rounded-2xl shadow-lg text-white relative overflow-hidden group"
                >
                  {/* Lớp hình ảnh trắng đen */}
                  <div
                    className="absolute inset-0 bg-center bg-cover grayscale transition duration-500"
                    style={{ backgroundImage: `url(${pkg.image})` }}
                  ></div>

                  {/* Overlay xanh lá mờ */}
                  <div className="absolute inset-0 bg-[#577e7e]/60 z-10 flex flex-col justify-between p-6 text-center text-white transition-all duration-500 ease-in-out">
                  <div className="absolute inset-0 bg-black/10 z-20"></div>
                    <div className="flex-1 flex flex-col justify-center items-center text-center">
                      <h2 className="text-3xl font-bold mb-3 transition-all duration-500">{pkg.title}</h2>
                      <p className="text-xl font-semibold transition-all duration-500">{pkg.price}</p>
                      <p className="opacity-0 translate-y-2 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 mt-2">
                        {pkg.description}
                      </p>
                    </div>
                    <div className="mt-4 opacity-0 translate-y-4 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                      <button className="bg-[#f5eacc] text-[#215858] px-5 py-2 rounded-full font-medium hover:bg-white transition">
                        Đăng ký
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Services;