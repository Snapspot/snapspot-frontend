"use client";

import { motion } from "framer-motion";
import { Heart, Users, MapPin, Camera } from "lucide-react";

const StorySection = () => {
  const stats = [
    { icon: Users, number: "6", label: "Thành viên sáng lập" },
    { icon: MapPin, number: "100+", label: "Địa điểm khám phá" },
    { icon: Camera, number: "1.500+", label: "Ảnh được chia sẻ" },
    { icon: Heart, number: "1.000+", label: "Người dùng hài lòng" },
  ];

  return (
    <div
      id="story-section"
      className="py-20 px-4 sm:px-6 md:px-8 w-full relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 to-emerald-50/30"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-teal-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-100/20 rounded-full blur-3xl"></div>

      <div className="max-w gap-x-80 mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 justify-between ">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#215858] mb-8 leading-tight">
              Hành trình khám phá
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                Việt Nam đẹp
              </span>
            </h2>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative pl-6 border-l-4 border-teal-200"
              >
                SnapSpot ra đời từ niềm đam mê du lịch và khám phá của 6 người
                bạn trẻ. Chúng tôi nhận ra rằng Việt Nam có vô vàn địa điểm đẹp,
                nhưng nhiều người lại không biết cách tìm kiếm và khám phá
                chúng.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Từ những chuyến đi cùng nhau, chúng tôi quyết định tạo ra một
                nền tảng giúp mọi người dễ dàng tìm kiếm, khám phá và chia sẻ
                những địa điểm chụp ảnh đẹp nhất khắp đất nước.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="font-medium text-[#215858] text-xl"
              >
                SnapSpot không chỉ là một ứng dụng, mà là cầu nối giúp người
                Việt yêu thương và tự hào hơn về quê hương mình.
              </motion.p>
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#215858]">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative group">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3"
                  alt="Team working"
                  className="w-full h-[700px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Year Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-br from-[#215858] to-teal-700 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
              >
                <div className="text-center">
                  <span className="text-white text-2xl font-bold block">
                    2025
                  </span>
                  <span className="text-teal-200 text-xs">Thành lập</span>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl opacity-80 blur-sm"></div>
              <div className="absolute top-1/2 -right-6 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-60 blur-sm"></div>
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
              className="absolute -left-7 top-1/4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 max-w-[200px] hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">
                    Khám phá
                  </div>
                  <div className="text-gray-600 text-xs">Địa điểm mới</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              viewport={{ once: true }}
              className="absolute -right-3 bottom-1/4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 max-w-[200px] hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">
                    Chia sẻ
                  </div>
                  <div className="text-gray-600 text-xs">Khoảnh khắc đẹp</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StorySection;
