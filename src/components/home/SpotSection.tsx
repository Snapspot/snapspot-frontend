import React from 'react';

interface SpotSectionProps {
    title: string;
    description: string;
    buttonText?: string;
    onClick?: () => void;
}

const SpotSection: React.FC<SpotSectionProps> = ({
    title,
    description,
    buttonText = "Xem thêm",
    onClick,
}) => {
    return (
        <div
            className="w-full bg-cover bg-center relative flex items-center justify-center min-h-screen"
            style={{ 
                backgroundImage: "url('https://i2.ex-cdn.com/crystalbay.com/files/content/2025/02/04/vinh-ha-long-co-bao-nhieu-hon-dao-1-1038.jpg')",
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 z-5"></div>

            {/* Nội dung responsive */}
            <div className="z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12 text-white max-w-5xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-4 sm:mb-6 leading-tight">
                    {title}
                </h1>
                <p className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
                    {description}
                </p>
                <button
                    className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base md:text-lg font-medium"
                    onClick={onClick}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default SpotSection;