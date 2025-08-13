"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Users, MapPin, Camera, Award, Star, Globe, Zap } from "lucide-react";

const StorySection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);

  // Stable random-ish positions to avoid hydration mismatch
  const dots = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const seed = i + 1;
      const pseudoRand = (n: number) => {
        const x = Math.sin(seed * 999 + n) * 10000;
        return x - Math.floor(x);
      };
      return {
        left: `${Math.round(pseudoRand(1) * 100)}%`,
        top: `${Math.round(pseudoRand(2) * 100)}%`,
        xSwing: Math.round(pseudoRand(3) * 30) - 15,
        duration: 8 + Math.round(pseudoRand(4) * 4),
        delay: pseudoRand(5) * 2,
      };
    });
  }, []);

  const stats = [
    { icon: Users, number: "6", label: "Thành viên sáng lập", color: "from-blue-500 to-indigo-600" },
    { icon: MapPin, number: "100+", label: "Địa điểm khám phá", color: "from-emerald-500 to-teal-600" },
    { icon: Camera, number: "500+", label: "Ảnh được chia sẻ", color: "from-purple-500 to-pink-600" },
    { icon: Heart, number: "100+", label: "Người dùng hài lòng", color: "from-red-500 to-rose-600" },
  ];

  // Có thể bỏ phần này nếu không cần achievements
  const achievements = [
    { icon: Award, title: "Ứng dụng du lịch ", desc: "Được yêu thích  2025" },
    { icon: Star, title: "4.9/5 đánh giá", desc: "Từ cộng đồng người dùng" },
    { icon: Globe, title: "Toàn quốc", desc: "Phủ sóng 34 tỉnh thành" },
    { icon: Zap, title: "Tăng trưởng 300%", desc: "Người dùng trong năm qua" },
  ];

  return (
    <div
      ref={ref}
      id="story-section"
      className="py-20 px-4 sm:px-6 md:px-8 w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30"
    >
      {/* Parallax background blobs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200/40 to-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-200/40 to-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Floating dots (stable positions) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {dots.map((d, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full"
            style={{ left: d.left, top: d.top }}
            animate={{
              y: [0, -50, 0],
              x: [0, d.xSwing, 0],
              rotate: [0, 360],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: d.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: d.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            viewport={{ once: true }}
          >
            {/* Section badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 px-6 py-3 rounded-full mb-8"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-emerald-700 font-semibold text-sm tracking-wide uppercase">
                Câu chuyện của chúng tôi
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-12 leading-tight"
            >
              Hành trình khám phá
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 mt-2">
                Việt Nam đẹp
              </span>
            </motion.h2>

            <div className="space-y-8 text-slate-600 text-lg leading-relaxed mb-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-4 border-emerald-300/70 bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-r-2xl shadow-sm"
              >
                <span className="font-serif text-2xl text-emerald-600 font-semibold">SnapSpot</span> ra đời từ niềm đam
                mê du lịch và khám phá của 6 người bạn trẻ. Chúng tôi nhận ra rằng Việt Nam có vô vàn địa điểm đẹp,
                nhưng nhiều người lại không biết cách tìm kiếm và khám phá chúng.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-xl"
              >
                Từ những chuyến đi cùng nhau, chúng tôi quyết định tạo ra một nền tảng giúp mọi người dễ dàng tìm kiếm,
                khám phá và chia sẻ những địa điểm chụp ảnh đẹp nhất khắp đất nước.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="font-extralight text-2xl text-slate-800 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
              >
                SnapSpot Chụp ảnh đúng nơi - tỏa sáng đúng chất.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6 mb-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-slate-800 mb-1">{stat.number}</div>
                    <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Achievements (optional) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {achievements.map((a, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm border border-white/30 rounded-xl p-4 hover:from-white/80 hover:to-white/60 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <a.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">{a.title}</div>
                    <div className="text-slate-600 text-xs">{a.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                <motion.img
                  // dùng ảnh gốc của bạn ở component cũ
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3"
                  alt="Team working"
                  className="w-full h-[600px] md:h-[700px] object-cover group-hover:scale-110 transition-transform duration-1000"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Year Badge (2025 như bản đầu) */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 1, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:scale-110 cursor-pointer"
                whileHover={{ rotate: 5 }}
              >
                <div className="text-center">
                  <span className="text-white text-3xl font-bold block font-serif">2025</span>
                  <span className="text-emerald-100 text-sm font-medium">Thành lập</span>
                </div>
              </motion.div>

              {/* Decor */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl opacity-80 blur-sm"
              />
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute top-1/2 -right-8 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-60 blur-sm"
              />
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 80, rotate: -10 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 1.2, type: "spring" }}
              viewport={{ once: true }}
              className="absolute -left-8 top-1/4 bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 max-w-[220px] hidden lg:block hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg">Khám phá</div>
                  <div className="text-slate-600 text-sm">Địa điểm mới</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -80, rotate: 10 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 1.4, type: "spring" }}
              viewport={{ once: true }}
              className="absolute -right-3 bottom-1/4 bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 max-w-[220px] hidden lg:block hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg">Chia sẻ</div>
                  <div className="text-slate-600 text-sm">Khoảnh khắc đẹp</div>
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
