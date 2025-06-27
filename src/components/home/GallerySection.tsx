import Slider from "react-slick";

const images = [
    "https://static1.cafeland.vn/cafelandnew/hinh-anh/2022/12/06/95/hoguom2.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Ben_Thanh_market_2.jpg/960px-Ben_Thanh_market_2.jpg",
    "https://www.vietnamairlines.com/~/media/SEO-images/2025%20SEO/Traffic%20TV/tay-ninh-co-gi-choi/tay-ninh-co-gi-choi.jpg",
    "https://media.ninhthuantourism.vn/resources/portal/Images/NTN/dulichninhthuan/cho_dem/17_9/65078304_2244102585658656_8006044688735797248_n_185458213.jpg",
    "https://cdnphoto.dantri.com.vn/A0cRhyoIOiQ1bIUH_FJU9HFji8E=/thumb_w/1020/2023/09/09/da-nang-docx-1694226826808.jpeg",
    "https://aeonmall-review-rikkei.cdn.vccloud.vn/website/21/tinymce/November2024/dai-noi-hue.png",
    "https://rootytrip.com/wp-content/uploads/2024/07/phu-quoc.jpg",
    "https://dailytravelvietnam.com/images/2024/08/du-lich-binh-thuan-01-800x533.jpg",
];

const GallerySection = () => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 600,
        slidesToShow: 4,     //  Hiển thị 4 ảnh một lúc
        slidesToScroll: 1,   //  Mỗi lần cuộn sang 1 ảnh
        arrows: true,
        responsive: [
            {
                breakpoint: 1024, // màn hình tablet
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // điện thoại
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480, // điện thoại nhỏ
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="relative w-full overflow-hidden">
            {/* Ảnh nền trắng đen */}
            <div
                className="absolute inset-0 bg-cover bg-center grayscale brightness-80"
                style={{
                    backgroundImage:
                        "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')",
                }}
            ></div>

            {/* Overlay màu kem */}
            <div className="absolute inset-0 bg-[#f5eacc] opacity-60"></div>

            {/* Nội dung Carousel */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
                {/* Tiêu đề nằm trên + đường gạch ngang */}
                <div className="w-full flex items-center justify-center px-4 mb-8">
                    {/* Đường gạch bên trái */}
                    <div className="flex-grow h-[3px] bg-[#215858]"></div>

                    {/* Tiêu đề nằm giữa */}
                    <h2 className="px-4 text-2xl md:text-3xl font-semibold text-[#215858] whitespace-nowrap">
                        CÁC ĐỊA ĐIỂM NỔI BẬT
                    </h2>

                    {/* Đường gạch bên phải */}
                    <div className="flex-grow h-[3px] bg-[#215858]"></div>
                </div>

                {/* Slider ảnh bên dưới */}
                <div className="w-full max-w-7xl mx-auto px-2 -mx-2">
                    <Slider {...settings}>
                        {images.map((img, index) => (
                            <div key={index} className="px-2">
                                <img
                                    src={img}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-[400px] object-cover rounded-xl shadow-lg"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

        </div>
    );
};

export default GallerySection;