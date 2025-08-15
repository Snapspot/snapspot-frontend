"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote, MapPin, Camera, Heart } from "lucide-react";
import { useRef } from "react";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  const testimonials = [
    {
      name: "Nguyễn Minh Anh",
      role: "Travel Blogger",
      avatar:
        "https://i.pinimg.com/1200x/7f/1a/c9/7f1ac9226758fe98738168e57780be85.jpg",
      content:
        "SnapSpot đã thay đổi hoàn toàn cách tôi khám phá Việt Nam. Từ những địa điểm nổi tiếng đến những góc khuất ít người biết, ứng dụng này giúp tôi tìm ra vô số điểm chụp ảnh tuyệt đẹp.",
      rating: 5,
      location: "Hà Nội",
      trips: 47,
    },
    {
      name: "Trần Thu Hà",
      role: "Photographer",
      avatar:
        "https://i.pinimg.com/1200x/c9/24/1e/c9241ee4d7126ca60add7cc82e7afdbd.jpg",
      content:
        "Là một nhiếp ảnh gia, tôi luôn tìm kiếm những góc chụp độc đáo. SnapSpot không chỉ giúp tôi khám phá địa điểm mới mà còn kết nối với cộng đồng yêu nhiếp ảnh trên toàn quốc.",
      rating: 5,
      location: "TP.HCM",
      trips: 62,
    },
    {
      name: "Lê Hoàng Nam",
      role: "Du lịch gia đình",
      avatar:
        "https://sohanews.sohacdn.com/2017/1291610710209554594881299982616623413613868o-1506468168931.jpg",
      content:
        "Với gia đình có con nhỏ, việc tìm địa điểm du lịch phù hợp rất quan trọng. SnapSpot cung cấp thông tin chi tiết và đánh giá thực tế giúp chúng tôi lên kế hoạch hoàn hảo cho mỗi chuyến đi.",
      rating: 5,
      location: "Đà Nẵng",
      trips: 23,
    },
    {
      name: "Phạm Mai Linh",
      role: "Content Creator",
      avatar:
        "https://danviet.ex-cdn.com/resize/800x550/files/f1/upload/4-2014/images/2014-12-16/1434415107-kxqznsna-tuyet-minh-ec073.jpg",
      content:
        "SnapSpot là công cụ không thể thiếu trong công việc tạo nội dung của tôi. Giao diện đẹp, thông tin chính xác và cộng đồng nhiệt tình - tất cả đều hoàn hảo!",
      rating: 5,
      location: "Cần Thơ",
      trips: 38,
    },
    {
      name: "Alex Warren",
      role: "Backpacker",
      avatar:
        "https://cafefcdn.com/203337114487263232/2022/6/18/photo-4-16555374125461367733050.jpg",
      content:
        "Là một backpacker, tôi thích khám phá những nơi hoang sơ, ít người biết. SnapSpot giúp tôi tìm ra những viên ngọc ẩn giấu và chia sẻ với cộng đồng những trải nghiệm tuyệt vời.",
      rating: 5,
      location: "Sapa",
      trips: 89,
    },
    {
      name: "Đỗ Lan Anh",
      role: "Travel Influencer",
      avatar:
        "https://hgth.1cdn.vn/thumbs/1000x0/2021/03/20/icdn-dantri-com-vn_vanhuong-2031-1616220725875.jpeg",
      content:
        "SnapSpot không chỉ là ứng dụng du lịch mà còn là nơi tôi tìm thấy cảm hứng sáng tạo. Những bức ảnh và câu chuyện từ cộng đồng luôn khiến tôi muốn khám phá thêm nhiều nơi.",
      rating: 5,
      location: "Hội An",
      trips: 56,
    },
  ];

  return (
    <div
      ref={ref}
      className="py-32 px-4 sm:px-6 md:px-8 w-full relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50"
    >
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-teal-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-cyan-200/20 to-blue-200/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 px-6 py-3 rounded-full mb-8">
            <Heart className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 font-semibold text-sm tracking-wide uppercase">
              Cảm nhận từ người dùng
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-xl md:text-6xl font-bold text-slate-800 leading-tight">
            Người dùng nói gì 
            {/* dùng sans + antialiased để tránh lỗi dấu ở gradient */}
            <span className="block font-sans antialiased text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 mt-2">
              Về SnapSpot ?
            </span>
          </h2>

          <p className="mt-6 text-xl text-slate-600 max-w mx-auto leading-relaxed">
            Hàng trăm người dùng đã tin tưởng và sử dụng SnapSpot để khám phá vẻ đẹp Việt Nam
          </p>
        </motion.div>

        {/* Grid: các card cao đều */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch [grid-auto-rows:1fr]">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative h-full bg-white/90 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* badge quote tròn */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-emerald-600" />
                </div>

                {/* rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* content: flex-grow để các card cao đều */}
                <p className="text-slate-700 leading-relaxed text-lg italic flex-grow">
                  “{t.content}”
                </p>

                {/* user info */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={t.avatar || "/placeholder.svg"}
                      alt={t.name}
                      className="w-14 h-14 rounded-2xl object-cover shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                      <Camera className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-800">{t.name}</h4>
                    <p className="text-slate-600 text-sm">{t.role}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {t.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        {t.trips} chuyến đi
                      </span>
                    </div>
                  </div>
                </div>

                {/* đảm bảo chiều cao tối thiểu đồng nhất */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default TestimonialsSection;
