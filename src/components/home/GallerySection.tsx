import { useState } from "react";
import Slider from "react-slick";
import LocationModal from "./LocationModel";

interface PlaceType {
    url: string;
    name: string;
    location: string;
    description: string;
    bestTime: string;
    features: string[];
    gallery: string[];
    tips: string[];
}


const images = [
    {
        url: "https://static1.cafeland.vn/cafelandnew/hinh-anh/2022/12/06/95/hoguom2.jpg",
        name: "Hồ Gươm",
        location: "Hà Nội",
        description: "Biểu tượng văn hóa ngàn năm của Thủ đô Hà Nội, nơi gắn liền với truyền thuyết rùa thần và là trái tim của khu phố cổ.",
        bestTime: "5:00 - 9:00 hoặc 17:00 - 20:00",
        features: ["Di tích lịch sử", "Không gian xanh", "Văn hóa truyền thống", "Cà phê vỉa hè"],
        gallery: [
            "https://static1.cafeland.vn/cafelandnew/hinh-anh/2022/12/06/95/hoguom2.jpg",
            "https://media.vneconomy.vn/w800/images/upload/2022/09/30/ho-guom.jpg",
            "https://cdn.tuoitre.vn/thumb_w/730/471584752817336320/2022/1/5/ho-guom-16413575214161809814052.jpg"
        ],
        tips: [
            "Tản bộ quanh hồ vào buổi sáng",
            "Thưởng thức cà phê trứng gần hồ",
            "Không cho chim ăn để giữ vệ sinh"
        ]
    },
    {
        url: "https://www.vietnamairlines.com/~/media/SEO-images/2025%20SEO/Traffic%20TV/tay-ninh-co-gi-choi/tay-ninh-co-gi-choi.jpg",
        name: "Tây Ninh",
        location: "Tây Ninh",
        description: "Nơi giao thoa giữa tôn giáo và thiên nhiên với núi Bà Đen hùng vĩ và Tòa Thánh Cao Đài độc đáo.",
        bestTime: "7:00 - 17:00",
        features: ["Núi non", "Tín ngưỡng tôn giáo", "Cáp treo", "Tòa thánh độc đáo"],
        gallery: [
            "https://www.vietnamairlines.com/~/media/SEO-images/2025%20SEO/Traffic%20TV/tay-ninh-co-gi-choi/tay-ninh-co-gi-choi.jpg",
            "https://vcdn1-dulich.vnecdn.net/2022/08/02/nuibaden-1659429907.jpg",
            "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/3/21/1168477/Nui-Ba-Den.jpg"
        ],
        tips: [
            "Mặc đồ gọn gàng khi leo núi",
            "Mang nước và nón",
            "Chụp ảnh từ cáp treo rất đẹp"
        ]
    },
    {
        url: "https://media.ninhthuantourism.vn/resources/portal/Images/NTN/dulichninhthuan/cho_dem/17_9/65078304_2244102585658656_8006044688735797248_n_185458213.jpg",
        name: "Chợ đêm Ninh Thuận",
        location: "Ninh Thuận",
        description: "Không gian rực rỡ sắc màu về đêm, mang đậm phong vị miền Trung với ẩm thực đường phố và văn hóa bản địa.",
        bestTime: "18:00 - 22:00",
        features: ["Ẩm thực đường phố", "Văn hóa bản địa", "Đèn lồng lung linh", "Đặc sản địa phương"],
        gallery: [
            "https://media.ninhthuantourism.vn/resources/portal/Images/NTN/dulichninhthuan/cho_dem/17_9/65078304_2244102585658656_8006044688735797248_n_185458213.jpg",
            "https://cdnphoto.danviet.vn/upload/3-2021/images/2021-12-16/du-lich-ninh-thuan-3.jpg",
            "https://media.travel.com.vn/tour/images/bandidau/cho-dem-ninh-thuan.jpg"
        ],
        tips: [
            "Mang tiền mặt lẻ",
            "Thử bánh căn, chả cuốn",
            "Giữ đồ cá nhân cẩn thận"
        ]
    },
    {
        url: "https://cdnphoto.dantri.com.vn/A0cRhyoIOiQ1bIUH_FJU9HFji8E=/thumb_w/1020/2023/09/09/da-nang-docx-1694226826808.jpeg",
        name: "Đà Nẵng",
        location: "Đà Nẵng",
        description: "Nổi tiếng với bãi biển Mỹ Khê tuyệt đẹp, thành phố đáng sống Đà Nẵng là điểm đến lý tưởng cho nghỉ dưỡng.",
        bestTime: "Tháng 3 - Tháng 8",
        features: ["Bãi biển đẹp", "Cầu Rồng", "Ẩm thực phong phú", "Thành phố đáng sống"],
        gallery: [
            "https://cdnphoto.dantri.com.vn/A0cRhyoIOiQ1bIUH_FJU9HFji8E=/thumb_w/1020/2023/09/09/da-nang-docx-1694226826808.jpeg",
            "https://ik.imagekit.io/tvlk/blog/2022/09/du-lich-da-nang-6.jpg",
            "https://cdn.tuoitre.vn/thumb_w/730/2023/5/3/cau-rong-da-nang-1683095880540406728387.jpg"
        ],
        tips: [
            "Nên thuê xe máy để di chuyển",
            "Xem cầu Rồng phun lửa cuối tuần",
            "Đặt phòng trước mùa cao điểm"
        ]
    },
    {
        url: "https://aeonmall-review-rikkei.cdn.vccloud.vn/website/21/tinymce/November2024/dai-noi-hue.png",
        name: "Đại Nội Huế",
        location: "Thừa Thiên Huế",
        description: "Quần thể di tích cổ kính ghi dấu vương triều nhà Nguyễn, mang đậm nét hoài cổ và di sản văn hóa cung đình.",
        bestTime: "7:00 - 17:00",
        features: ["Di sản văn hóa", "Kiến trúc cung đình", "Trang phục truyền thống", "Cảnh chụp cổ điển"],
        gallery: [
            "https://aeonmall-review-rikkei.cdn.vccloud.vn/website/21/tinymce/November2024/dai-noi-hue.png",
            "https://cdnmedia.baotintuc.vn/Upload/zFtGZqQytTOgKDaY07aw/files/2021/07/25/hue-1.jpg",
            "https://ik.imagekit.io/tvlk/blog/2022/07/dai-noi-hue-1.jpg"
        ],
        tips: [
            "Thuê áo dài để chụp ảnh",
            "Nên đi sớm để tránh nắng",
            "Mang nước uống theo"
        ]
    },
    {
        url: "https://rootytrip.com/wp-content/uploads/2024/07/phu-quoc.jpg",
        name: "Phú Quốc",
        location: "Kiên Giang",
        description: "Thiên đường biển đảo với làn nước trong xanh, bãi cát trắng mịn và những khu nghỉ dưỡng đẳng cấp quốc tế.",
        bestTime: "Tháng 11 - Tháng 4",
        features: ["Bãi biển", "Resort cao cấp", "Hải sản tươi sống", "Hoàng hôn đẹp"],
        gallery: [
            "https://rootytrip.com/wp-content/uploads/2024/07/phu-quoc.jpg",
            "https://media.vov.vn/sites/default/files/styles/large/public/2021-11/phu-quoc-1.jpg",
            "https://statics.vinpearl.com/phu-quoc-cover.jpg"
        ],
        tips: [
            "Mang kem chống nắng",
            "Thử lặn ngắm san hô",
            "Đặt vé cáp treo Hòn Thơm sớm"
        ]
    },
    {
        url: "https://dailytravelvietnam.com/images/2024/08/du-lich-binh-thuan-01-800x533.jpg",
        name: "Bình Thuận",
        location: "Bình Thuận",
        description: "Vùng đất nắng gió với đồi cát bay Mũi Né, những bãi biển hoang sơ và văn hóa Chăm độc đáo.",

        bestTime: "Tháng 12 - Tháng 5",
        features: ["Đồi cát bay", "Tháp Chăm", "Biển hoang sơ", "Hải sản giá rẻ"],
        gallery: [
            "https://dailytravelvietnam.com/images/2024/08/du-lich-binh-thuan-01-800x533.jpg",
            "https://ik.imagekit.io/tvlk/blog/2022/08/du-lich-binh-thuan-3.jpg",
            "https://vcdn1-dulich.vnecdn.net/2023/02/28/binh-thuan-1677557257.jpg"
        ],
        tips: [
            "Nên đi sáng sớm để chụp ảnh đồi cát",
            "Thử lướt ván cát",
            "Uống nước dừa hoặc thanh long tại chỗ"
        ]
    }

];



const GallerySection = () => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = (item: PlaceType) => {
        setSelectedPlace(item);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedPlace(null);
    };

    
    return (
        <>
            {/* Wrapper chứa background và carousel */}
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
                    {/* Tiêu đề */}
                    <div className="w-full flex items-center justify-center px-4 mb-8">
                        <div className="flex-grow h-[3px] bg-[#215858]"></div>
                        <h2 className="px-4 text-2xl md:text-3xl font-semibold text-[#215858] whitespace-nowrap">
                            CÁC ĐỊA ĐIỂM NỔI BẬT
                        </h2>
                        <div className="flex-grow h-[3px] bg-[#215858]"></div>
                    </div>

                    {/* Slider */}
                    <div className="w-full max-w-7xl mx-auto px-2 -mx-2">
                        <Slider {...settings}>
                            {images.map((item, index) => (
                                <div key={index} className="px-2">
                                    <div className="relative rounded-xl overflow-hidden shadow-lg group h-[400px]">
                                        <img
                                            src={item.url}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white p-4 text-left">
                                            <h3 className="text-lg font-bold">{item.name}</h3>
                                            <p className="text-sm flex items-center gap-1 text-gray-200">
                                                📍 {item.location}
                                            </p>
                                            <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
                                            <button
                                                onClick={() => handleOpen(item)}
                                                className="mt-2 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded hover:bg-blue-700 transition"
                                            >
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>

            {/* Modal nằm ngoài wrapper để hiển thị đúng overlay */}
            <LocationModal data={selectedPlace} isOpen={isModalOpen} onClose={handleClose} />
        </>
    );
}

export default GallerySection;