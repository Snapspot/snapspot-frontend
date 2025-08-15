// src/components/home/SnapSpotReasonsRedesigned.tsx
"use client";

import type React from "react";

type Reason = {
  text: string;
  icon?: React.ReactNode;
};

type Props = {
  eyebrow?: string;
  title?: string;
  reasons?: Reason[];
  images?: string[];
  altTexts?: string[];
  className?: string;

  /** Kích cỡ chữ (Tailwind classes) */
  titleSize?: string; // ví dụ "text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
  reasonTextSize?: string; // ví dụ "text-sm md:text-base lg:text-lg"
  buttonTextSize?: string; // ví dụ "text-base" hoặc "text-sm"

  /** Bề rộng container */
  maxWidth?: string; // ví dụ "max-w-5xl" | "max-w-7xl"
  
  /** Chiều cao phần hình ảnh */
  imageHeight?: string; // ví dụ "h-[300px] md:h-[400px] lg:h-[500px]"
};

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="w-4 h-4 md:w-5 md:h-5 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 shrink-0" fill="currentColor">
    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM10 5.47l4 1.4v11.66l-4-1.4V5.47z" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 shrink-0" fill="currentColor">
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MegaphoneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 shrink-0" fill="currentColor">
    <path d="M3 11v3a1 1 0 001 1h1l4 4v-4h2a8 8 0 000-16H9v4l-4 4H4a1 1 0 00-1 1z" />
  </svg>
);

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 shrink-0" fill="currentColor">
    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const ImageCard = ({
  src,
  alt = "",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) => {
  return (
    <div
      className={`group aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-border/50 hover:ring-primary/20 hover:-translate-y-1 ${className}`}
    >
      <div className="relative h-full w-full">
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};

const SnapSpotReasonsRedesigned = ({
  eyebrow = "",
  title = "Hàng trăm địa điểm đã tin tưởng và đồng hành cùng SnapSpot",
  reasons = [
    {
      text: "Hiển thị nổi bật trên bản đồ địa điểm chụp ảnh",
      icon: <MapIcon />,
    },
    {
      text: "Gia tăng check-in và tiếp cận khách mục tiêu",
      icon: <UsersIcon />,
    },
    {
      text: "Hỗ trợ truyền thông miễn phí qua kênh social & app",
      icon: <MegaphoneIcon />,
    },
    {
      text: "Cập nhật linh hoạt thông tin – hình ảnh – khuyến mãi",
      icon: <RefreshIcon />,
    },
    { text: "Hợp tác dễ dàng, không tốn phí khởi tạo", icon: <CheckIcon /> },
  ],
  images = [
    "https://i.pinimg.com/736x/7b/29/cb/7b29cb9de22c83a2f451184808ab3a46.jpg",
    "https://i.pinimg.com/1200x/a6/ae/57/a6ae57eeb7d1682608b3f85c08da1fd3.jpg",
    "https://i.pinimg.com/736x/9a/37/c7/9a37c773ced4dc4b9983101d565e7d76.jpg",
  ],
  altTexts = [
    "Địa điểm chụp ảnh núi non",
    "Địa điểm chụp ảnh thành phố",
    "Địa điểm chụp ảnh biển",
  ],
  className = "",

  // kích cỡ responsive tốt hơn
  titleSize = "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
  reasonTextSize = "text-sm md:text-base lg:text-lg",
  // bề rộng container
  maxWidth = "max-w-7xl",
  // chiều cao phần hình ảnh
  imageHeight = "h-[300px] md:h-[400px] lg:h-[500px]",
}: Props) => {
  return (
    <section
      className={`relative isolate w-full ${className}`}
      style={{ backgroundColor: "#FAEBCE" }}
      aria-labelledby="snapspot-reasons-heading"
    >
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{
          backgroundImage: "url('https://i.pinimg.com/736x/9b/5d/1d/9b5d1dba22aa80a8607b2cea6cd9db8b.jpg')",
          opacity: 0.5
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 -z-10" />

      {/* Decorative elements - ẩn trên mobile để tránh lộn xộn */}
      <div className="hidden md:block absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl -z-10" />
      <div className="hidden md:block absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl -z-10" />

      <div className={`mx-auto ${maxWidth} px-4 md:px-8 py-12 md:py-16 lg:py-24`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* LEFT: Title + bullets */}
          <div className="space-y-6 md:space-y-8">
            {eyebrow?.trim() && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full" />
                <span className="text-emerald-700 font-semibold text-xs tracking-wide uppercase">
                  {eyebrow}
                </span>
              </div>
            )}

            <div className="space-y-3 md:space-y-4">
              <h2
                id="snapspot-reasons-heading"
                className={`${titleSize} font-bold leading-tight font-[family-name:var(--font-space-grotesk)] text-emerald-800`}
              >
                {title}
              </h2>
              <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>

            <ul className="space-y-4 md:space-y-6">
              {reasons.map((reason, i) => (
                <li
                  key={i}
                  className="group flex items-start gap-3 md:gap-4 hover:translate-x-1 md:hover:translate-x-2 transition-transform duration-200"
                >
                  <div className="flex-shrink-0 mt-0.5 md:mt-1">
                    <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-white text-emerald-700 rounded-lg md:rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-200">
                      {reason.icon || <CheckIcon />}
                    </div>
                  </div>
                  <p
                    className={`${reasonTextSize} leading-relaxed font-[family-name:var(--font-dm-sans)] group-hover:text-primary transition-colors duration-200 text-green-900 font-medium`}
                  >
                    {reason.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Dynamic Image Layout - Tối ưu cho mobile */}
          <div className={`relative ${imageHeight} mt-8 lg:mt-0`}>
            {/* Image 1 - Left */}
            <ImageCard
              src={images[0] || "/placeholder.svg"}
              alt={altTexts[0] ?? ""}
              className="absolute left-0 top-4 md:top-8 w-[40%] md:w-[45%] -rotate-3 md:-rotate-6 hover:rotate-1 md:hover:rotate-3 z-10"
            />
            
            {/* Image 2 - Center */}
            <ImageCard
              src={images[1] || "/placeholder.svg"}
              alt={altTexts[1] ?? ""}
              className="absolute left-1/2 top-0 w-[45%] md:w-[50%] -translate-x-1/2 rotate-1 md:rotate-2 hover:rotate-0 z-20"
            />

            {/* Image 3 - Right */}
            <ImageCard
              src={images[2] || "/placeholder.svg"}
              alt={altTexts[2] ?? ""}
              className="absolute right-0 top-6 md:top-12 w-[40%] md:w-[45%] rotate-3 md:rotate-6 hover:-rotate-1 md:hover:-rotate-3 z-10"
            />
            
            {/* Floating stats - Responsive positioning */}
            <div className="absolute -bottom-4 md:-bottom-8 left-2 md:left-8 bg-white border border-gray-200 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer z-30">
              <div className="text-lg md:text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-emerald-800">
                100+
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-[family-name:var(--font-dm-sans)]">
                Địa điểm
              </div>
            </div>

            <div className="absolute -bottom-4 md:-bottom-8 right-8 md:right-20 bg-white border border-gray-200 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer z-30">
              <div className="text-lg md:text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-green-800">
                500+
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-[family-name:var(--font-dm-sans)]">
                Check-ins
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SnapSpotReasonsRedesigned;