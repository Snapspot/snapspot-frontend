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
        image: 'https://i.pinimg.com/736x/10/80/62/108062e7e8ad0929aa0ebdf683705b4e.jpg',
        title: 'Vịnh Hạ Long',
        description: 'Vịnh Hạ Long là địa điểm du lịch Quảng Ninh hấp dẫn bậc nhất bởi khung cảnh thiên nhiên hùng vĩ với những đảo đá vôi kỳ thú của mình. Nơi đây...'
    },
    {
        image: 'https://vcdn1-dulich.vnecdn.net/2022/06/03/cau-vang-jpeg-mobile-4171-1654247848.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=xrjEn1shZLiHomFix1sHNQ',
        title: 'Cầu Vàng',
        description: 'Cầu Vàng Đà Nẵng là một trong những biểu tượng du lịch của Việt Nam gây ấn tượng mạnh với cộng đồng quốc tế ngay sau khi ra mắt...'
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Ho_Chi_Minh_City_panorama_2019_%28cropped2%29.jpg',
        title: 'Thành phố Hồ Chí Minh',
        description: 'Thành phố Hồ Chí Minh là trung tâm kinh tế lớn nhất Việt Nam, nơi giao thoa giữa hiện đại và truyền thống với những tòa nhà cao tầng...'
    },
    {
        image: 'https://i.pinimg.com/1200x/1b/15/55/1b155537eb42a5b9101725aa982fea24.jpg',
        title: 'Đèo Khau Phạ',
        description: 'Đèo Khau Phạ là một trong những cung đường đèo quan có vị độc đáng thuộc hàng bậc nhất Việt Nam với vẻ đẹp đình núi Khau Pha, ngoạn...'
    },
];

const fadeDuration = 3000; // ms
const displayDuration = 6000; // ms

const SpotSection: React.FC<SpotSectionProps> = ({
    buttonText = "Tham gia cộng đồng SnapSpot",
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

export default SpotSection;