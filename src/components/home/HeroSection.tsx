"use client"

import { motion } from "framer-motion"
import { ChevronDown, MapPin, Users, Camera, Heart } from "lucide-react"

const HeroSection = () => {
  const floatingElements = [
    { icon: MapPin, delay: 0.2, x: "10%", y: "20%" },
    { icon: Camera, delay: 0.4, x: "85%", y: "30%" },
    { icon: Users, delay: 0.6, x: "15%", y: "70%" },
    { icon: Heart, delay: 0.8, x: "80%", y: "75%" },
  ]

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://i.pinimg.com/736x/10/80/62/108062e7e8ad0929aa0ebdf683705b4e.jpg")',
        }}
      />

      {/* Enhanced Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-emerald-900/20" />

      {/* Floating Background Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: element.delay }}
          className="absolute hidden lg:block"
          style={{ left: element.x, top: element.y }}
        >
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <element.icon className="w-8 h-8 text-white/50" />
          </div>
        </motion.div>
      ))}

      {/* Decorative Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full mb-8"
        >
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Khám phá Việt Nam cùng SnapSpot</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="block">VỀ</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            CHÚNG TÔI
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl mb-12 leading-relaxed max-w-4xl mx-auto text-gray-200"
        >
          Chúng tôi là đội ngũ đam mê du lịch, mong muốn kết nối mọi người với{" "}
          <span className="text-emerald-300 font-semibold">vẻ đẹp thiên nhiên Việt Nam</span>
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {[
            { number: "6", label: "Thành viên" },
            { number: "1000+", label: "Địa điểm" },
            { number: "50K+", label: "Người dùng" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-emerald-300">{stat.number}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => document.getElementById("story-section")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative bg-gradient-to-r from-[#215858] to-teal-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-[#1a4646] hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <span className="relative z-10">Khám phá câu chuyện</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button className="group flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-full text-lg font-medium hover:bg-white/20 transition-all duration-300">
            <Users className="w-5 h-5" />
            Tham gia cộng đồng
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center gap-2 text-white/70 cursor-pointer"
          onClick={() => document.getElementById("story-section")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-sm">Cuộn xuống</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-teal-500/20 to-transparent rounded-tl-full"></div>
    </div>
  )
}

export default HeroSection
