import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, MapPin, Users, Camera, Heart, Sparkles, Mountain, Compass } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const EnhancedHeroSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const backgroundImages = [
    "https://i.pinimg.com/1200x/fa/61/b5/fa61b59db724d5e62c739f6d89e9cd6e.jpg",
    "https://i.pinimg.com/736x/07/ac/9b/07ac9b763323cc4ee144ab7964f108a4.jpg",
    "https://i.pinimg.com/1200x/f5/3d/7d/f53d7d2b3edef915a0baaf49d807a3da.jpg",
    "https://i.pinimg.com/736x/b4/8e/1e/b48e1ebc0b1dd12ded7903bb1102fdd6.jpg",
    "https://i.pinimg.com/1200x/ec/ba/17/ecba17d7943048b995feca177360a9b5.jpg",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  const floatingPhotos = [
    {
      src: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Hạ Long Bay",
      x: "5%",
      y: "20%",
      delay: 0.5,
      rotation: -15,
    },
    {
      src: "https://i.pinimg.com/736x/44/1d/5b/441d5b93cd7073aa930d092484e88358.jpg",
      title: "Sapa Terraces",
      x: "85%",
      y: "15%",
      delay: 1.0,
      rotation: 12,
    },
    {
      src: "https://i.pinimg.com/1200x/f5/3d/7d/f53d7d2b3edef915a0baaf49d807a3da.jpg",
      title: "Hội An",
      x: "10%",
      y: "65%",
      delay: 1.5,
      rotation: -8,
    },
    {
      src: "https://i.pinimg.com/1200x/fa/68/d7/fa68d7abe7cf5378fa5e1b24debe7ee9.jpg",
      title: "Phú Quốc",
      x: "80%",
      y: "70%",
      delay: 2.0,
      rotation: 18,
    },
  ]

  const floatingElements = [
    { icon: MapPin, delay: 0.2, x: "8%", y: "15%", color: "from-emerald-400 to-teal-500" },
    { icon: Camera, delay: 0.4, x: "88%", y: "25%", color: "from-violet-400 to-purple-500" },
    { icon: Users, delay: 0.6, x: "12%", y: "75%", color: "from-orange-400 to-red-500" },
    { icon: Heart, delay: 0.8, x: "85%", y: "70%", color: "from-pink-400 to-rose-500" },
    { icon: Sparkles, delay: 1.0, x: "20%", y: "45%", color: "from-yellow-400 to-amber-500" },
    { icon: Mountain, delay: 1.2, x: "75%", y: "50%", color: "from-blue-400 to-indigo-500" },
    { icon: Compass, delay: 1.4, x: "45%", y: "20%", color: "from-cyan-400 to-blue-500" },
  ]

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${image}")` }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
        className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-slate-900/70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-teal-900/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/10 to-transparent" />

      {floatingPhotos.map((photo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, rotate: photo.rotation - 180 }}
          animate={{ opacity: 0.9, scale: 1, rotate: photo.rotation }}
          transition={{
            duration: 1.5,
            delay: photo.delay,
            type: "spring",
            stiffness: 80,
          }}
          className="absolute hidden lg:block z-20"
          style={{ left: photo.x, top: photo.y }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [photo.rotation, photo.rotation + 5, photo.rotation],
            }}
            transition={{
              duration: 6 + index,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="group cursor-pointer"
          >
            <div className="relative w-32 h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm hover:scale-110 transition-transform duration-300">
              <img src={photo.src || "/placeholder.svg"} alt={photo.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-semibold truncate">{photo.title}</p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-3 h-3 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Enhanced Floating Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
          transition={{
            duration: 1.2,
            delay: element.delay,
            type: "spring",
            stiffness: 100,
          }}
          className="absolute hidden lg:block"
          style={{ left: element.x, top: element.y }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 20 + index * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className={`w-24 h-24 bg-gradient-to-br ${element.color} rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-2xl border border-white/10`}
          >
            <element.icon className="w-10 h-10 text-white/80" />
          </motion.div>
        </motion.div>
      ))}

      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1, 0.9, 0.1],
              scale: [0.5, 2, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content with Enhanced Typography */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8 max-w-7xl mx-auto"
      >
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-full mb-12 shadow-2xl"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
          />
          <span className="text-base font-medium tracking-wide">Khám phá Việt Nam cùng SnapSpot</span>
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </motion.div>

        {/* Dramatic Main Title */}
       <motion.h1
  initial={{ opacity: 0, y: 80 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 50 }}
  className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-bold mb-7 leading-[0.9]"
>
  <motion.span
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.6 }}
    className="block"
  >
    SNAPSPOT
  </motion.span>

</motion.h1>


        {/* Enhanced Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mb-16"
        >
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed max-w-5xl mx-auto text-gray-100 font-seri">
            Chúng tôi là đội ngũ đam mê du lịch, mong muốn kết nối mọi người với{" "}
            <span className="font-serif font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
              vẻ đẹp thiên nhiên Việt Nam
            </span>
          </p>
        </motion.div>

        {/* Premium CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            onClick={() => document.getElementById("story-section")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white px-10 py-5 rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Khám phá câu chuyện
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
              </motion.div>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          </motion.button>

          <motion.button
            className="group flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-5 rounded-2xl text-xl font-medium hover:bg-white/20 transition-all duration-500 shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Users className="w-6 h-6" />
            Tham gia cộng đồng
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
      </motion.div>

      {/* Enhanced Corner Decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent rounded-br-full blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-cyan-500/20 via-blue-500/10 to-transparent rounded-tl-full blur-xl"></div>
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-gradient-to-r from-purple-500/15 to-transparent rounded-r-full blur-2xl"></div>
      <div className="absolute top-1/2 right-0 w-32 h-32 bg-gradient-to-l from-pink-500/15 to-transparent rounded-l-full blur-2xl"></div>
    </div>
  )
}

export default EnhancedHeroSection
