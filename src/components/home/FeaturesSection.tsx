"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Camera, Users, Heart, Star, Compass, Zap } from "lucide-react";
import { useRef } from "react";

const FeaturesSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  const features = [
    {
      icon: MapPin,
      title: "Khám phá địa điểm",
      description:
        "Tìm kiếm hàng nghìn địa điểm chụp ảnh đẹp khắp Việt Nam với thông tin chi tiết và đánh giá từ cộng đồng",
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50",
    },
    {
      icon: Camera,
      title: "Chia sẻ khoảnh khắc",
      description:
        "Đăng tải và chia sẻ những bức ảnh đẹp nhất của bạn, tạo cảm hứng cho cộng đồng yêu du lịch",
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      icon: Users,
      title: "Cộng đồng sôi động",
      description:
        "Kết nối với những người cùng đam mê, chia sẻ kinh nghiệm và lên kế hoạch du lịch cùng nhau",
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50",
    },
    {
      icon: Heart,
      title: "Yêu thích & Lưu",
      description:
        "Lưu lại những địa điểm yêu thích và tạo danh sách du lịch cá nhân cho những chuyến đi sắp tới",
      color: "from-red-500 to-rose-600",
      bgColor: "from-red-50 to-rose-50",
    },
    {
      icon: Star,
      title: "Đánh giá chất lượng",
      description:
        "Hệ thống đánh giá và review chi tiết giúp bạn chọn được những địa điểm phù hợp nhất",
      color: "from-yellow-500 to-orange-600",
      bgColor: "from-yellow-50 to-orange-50",
    },
    {
      icon: Compass,
      title: "Dẫn đường thông minh",
      description:
        "Tích hợp GPS và bản đồ chi tiết, hướng dẫn đường đi cụ thể đến từng địa điểm",
      color: "from-cyan-500 to-blue-600",
      bgColor: "from-cyan-50 to-blue-50",
    },
  ];

  return (
    <div
      ref={ref}
      className="py-30 px-4 sm:px-6 md:px-8 w-full relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-gray-50"
    >
      {/* Background Elements */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 px-6 py-3 rounded-full mb-8"
          >
            <Zap className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 font-semibold text-sm tracking-wide uppercase">
              Tính năng nổi bật
            </span>
          </motion.div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-6">
            Trải nghiệm du lịch
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 mt-2">
              hoàn toàn mới
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            SnapSpot mang đến những công cụ và tính năng hiện đại nhất để biến mỗi chuyến du lịch của bạn
            thành một trải nghiệm đáng nhớ
          </p>
        </motion.div>

        {/* Features Grid */}
        {/* items-stretch + auto-rows đảm bảo các hàng bằng nhau; minmax giúp co giãn */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch [grid-auto-rows:minmax(0,1fr)]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"                 // <- quan trọng
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className={`relative h-full bg-gradient-to-br ${feature.bgColor}
                            border border-white/50 rounded-3xl p-8 shadow-lg
                            hover:shadow-2xl transition-all duration-500 overflow-hidden
                            flex flex-col`}      // <- flex để nội dung dàn đều theo chiều dọc
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-black to-transparent rounded-full" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-black to-transparent rounded-full" />
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 5 }}
                  className={`inline-flex items-center justify-center w-16 h-16
                              bg-gradient-to-br ${feature.color} rounded-2xl mb-6 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-slate-800 mb-4
                               group-hover:text-transparent group-hover:bg-clip-text
                               group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-300">
                  {feature.title}
                </h3>

                <p className="text-slate-600 leading-relaxed text-lg flex-grow">
                  {feature.description}
                </p>
                <div className="mt-4" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
