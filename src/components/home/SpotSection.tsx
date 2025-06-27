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
            className="w-full bg-cover bg-center relative flex items-center justify-center"
            style={{ backgroundImage: "url('https://i2.ex-cdn.com/crystalbay.com/files/content/2025/02/04/vinh-ha-long-co-bao-nhieu-hon-dao-1-1038.jpg')"}}
        >

            {/* Nội dung */}
            <div className="z-10 text-center px-4 text-white">
                <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6">{title}</h1>
                <p className="max-w-2xl mx-auto text-lg">{description}</p>
                <button
                    className="mt-6 px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                    onClick={onClick}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default SpotSection;