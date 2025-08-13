"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { MapPin, Heart, Camera, Eye } from "lucide-react"
import { useRef, useState } from "react"

const GallerySectionAu = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"])
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const galleryImages = [
    {
      src: "https://i.pinimg.com/1200x/e8/d1/7c/e8d17c8592c336cd0e2eb441486974e2.jpg",
      location: "Vịnh Hạ Long",
    },
    {
      src: "https://i.pinimg.com/736x/e9/86/a4/e986a4b441b7e57966a2cb307286a342.jpg",
      location: "Sapa, Lào Cai",
    },
    {
      src: "https://i.pinimg.com/736x/9d/b6/fa/9db6fa1bc52e1705bc0d6aa96555eb8a.jpg",
      location: "Đà Nẵng",
    },
    {
      src: "https://i.pinimg.com/736x/b1/34/a1/b134a1e572e67a37d5c72e43055e2ec0.jpg",
      location: "Hội An",
    },
    {
      src: "https://i.pinimg.com/1200x/12/b5/3a/12b53a18b8df7f08d727f2acd5a18926.jpg",
      location: "Phú Yên",
    },
    {
      src: "https://i.pinimg.com/736x/b8/7b/56/b87b56147cb4551f6982e8a1f776135d.jpg",
      location: "Đà Lạt",

    },
  ]

  return (
    <div
      ref={ref}
      className="py-10 px-4 sm:px-6 md:px-18 w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Background Elements */}
       <div className="absolute inset-0">
        <img
          src="https://i.pinimg.com/1200x/af/37/bf/af37bf13aa55288d972ce80cba4bdbc8.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay tối để nổi chữ */}
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-W mx-auto relative z-10">
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
            className="inline-flex items-center gap-5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 px-9 py-3 rounded-full mb-8 backdrop-blur-sm"
          >
            <Camera className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 font-semibold text-sm tracking-wide uppercase">Thư viện ảnh</span>
          </motion.div>

          <h2 className=" text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Khoảnh khắc đẹp nhất
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 mt-2">
              Việt Nam
            </span>
          </h2>

          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Khám phá những bức ảnh tuyệt đẹp được chia sẻ bởi cộng đồng SnapSpot từ khắp mọi miền đất nước
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <motion.div
                className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.img
                    src={image.src}
                    alt={image.location}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Content Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-lg">{image.location}</span>
                    </div>

                  </motion.div>
                </div>

         
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
        
        </motion.div>
      </div>
    </div>
  )
}

export default GallerySectionAu
