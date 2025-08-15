import React, { useState, useRef, useEffect } from 'react';

interface SpotSectionProps {
    buttonText?: string;
    onClick?: () => void;
}

interface LocationSlide {
    image: string;
    title: string;
    description: string;
}

const backgroundImages: LocationSlide[] = [
   {
    image: 'https://i.pinimg.com/736x/b0/d3/ac/b0d3ac2622306a97cdd74da2eef38c5c.jpg',
    title: 'Trở Thành Đối Tác Cùng SnapSpot',
    description: 'Cùng SnapSpot đưa địa điểm của bạn đến gần hơn với hàng ngàn người dùng đang tìm kiếm nơi chụp hình đẹp khắp Việt Nam. Đăng ký để được hiển thị nổi bật, hỗ trợ truyền thông, và tham gia hệ sinh thái du lịch – nhiếp ảnh năng động!'
},
{
    image: 'https://i.pinimg.com/736x/16/92/9f/16929fd2fa04a3c9f6712caf47f366f1.jpg',
    title: 'Tăng Lượt  Ghé Thăm và Doanh Thu',
    description: 'Biến mỗi lượt check-in thành cơ hội kinh doanh. SnapSpot giúp bạn thu hút khách mới, giữ chân khách cũ và tạo hiệu ứng lan truyền mạnh mẽ trên mạng xã hội.'
},
{
    image: 'https://i.pinimg.com/736x/61/27/e9/6127e9aa734fb9abfd43cec7af5debb2.jpg',
    title: 'Hiển Thị Nổi Bật Trên Bản Đồ SnapSpot',
    description: 'Địa điểm của bạn sẽ xuất hiện ở vị trí nổi bật trên bản đồ SnapSpot, giúp hàng ngàn khách hàng tiềm năng dễ dàng tìm thấy và ghé thăm.'
},
{
    image: 'https://i.pinimg.com/736x/0e/a0/7b/0ea07bac1cce654d42381cc99066ed70.jpg',
    title: 'Đồng Hành Cùng Cộng Đồng SnapSpot',
    description: 'Kết nối với hàng ngàn nhiếp ảnh gia, travel blogger và du khách yêu thích khám phá. Cùng tạo nên những khoảnh khắc đáng nhớ và lan tỏa hình ảnh địa điểm của bạn.'
}

];

const fadeDuration = 3000; // ms
const displayDuration = 6000; // ms

const ServiceSpotSection: React.FC<SpotSectionProps> = ({
    buttonText = "Đăng ký ngay",
    onClick,
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const timeoutRef = useRef<number | null>(null);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        const changeImage = () => {
            setFade(true);

            timeoutRef.current = window.setTimeout(() => {
                setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
                setFade(false);
            }, fadeDuration);
        };

        changeImage();

        intervalRef.current = window.setInterval(() => {
            changeImage();
        }, displayDuration + fadeDuration);

        return () => {
            if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
            if (intervalRef.current !== null) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div className="w-full relative flex items-center justify-center min-h-screen overflow-hidden">
            {/* Background Image với slideshow */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity ease-in-out will-change-opacity"
                style={{
                    backgroundImage: `url(${backgroundImages[currentImageIndex].image})`,
                    opacity: fade ? 0 : 1,
                    transitionDuration: `${fadeDuration}ms`,
                    backgroundPosition: 'center center',
                    backgroundAttachment: 'fixed'
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 z-5"></div>

            {/* Nội dung responsive - Dynamic content */}
            <div className="z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12 text-white max-w-5xl mx-auto">
                <h1 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight transition-opacity duration-500"
                    style={{ 
                        fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
                        fontWeight: 700,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        letterSpacing: '0.02em'
                    }}
                >
                    {backgroundImages[currentImageIndex].title}
                </h1>
                <p 
                    className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 transition-opacity duration-500"
                    style={{ 
                        fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
                        fontWeight: 400,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        lineHeight: '1.6'
                    }}
                >
                    {backgroundImages[currentImageIndex].description}
                </p>
                <button
                    className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base md:text-lg font-medium"
                    style={{ 
                        fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
                        fontWeight: 500,
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                    }}
                    onClick={onClick}
                >
                    {buttonText}
                </button>
            </div>

            {/* Optional: Slideshow Indicators */}
           <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {backgroundImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`transition-all duration-300 rounded-full ${
                            currentImageIndex === index 
                                ? 'w-8 h-2 bg-white' 
                                : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ServiceSpotSection;