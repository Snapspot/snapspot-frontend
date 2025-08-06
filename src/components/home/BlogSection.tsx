import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const images = [
    {
        id: "vinh-ha-long",
        url: "https://cdn3.ivivu.com/2015/02/vinhhanlongdiadiemselfiledepnhathanhtinh-ivivu-1.jpg",
        title: "Vịnh Hạ Long – Kỳ quan thiên nhiên",
        description: "Một trong 7 kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ vĩ.",
        date: "15/07/2025",
    },
    {
        id: "cao-nguyen-da-dong-van",
        url: "https://mytourcdn.com/upload_images/Image/Location/5_11_2015/dia-diem-du-lich-viet-nam-mytour-14.jpg",
        title: "Cao nguyên đá Đồng Văn",
        description: "Vùng đất đá hoang sơ nhưng đầy sức sống ở cực Bắc Việt Nam.",
        date: "14/07/2025",
    },
    {
        id: "phu-quoc",
        url: "https://media.vov.vn/sites/default/files/styles/front_large_watermark/public/2021-11/du-lich-mot-minh-phu-quoc.jpg?resize=p_8,w_",
        title: "Phú Quốc – Thiên đường biển đảo",
        description: "Nơi lý tưởng để thư giãn, khám phá và lưu giữ khoảnh khắc đáng nhớ.",
        date: "12/07/2025",
    },
    {
        id: "ba-na-hills",
        url: "https://bvhttdl.mediacdn.vn/2020/6/10/sun-world-ba-na-hills-24-15895192875941793928359-1591751128894-15917511288942046241021.jpg",
        title: "Bà Nà Hills – xứ sở thần tiên giữa núi rừng Đà Nẵng",
        description: "Khu nghỉ dưỡng nổi tiếng với cầu Vàng và khí hậu mát mẻ quanh năm.",
        date: "11/07/2025",
    },
    {
        id: "ha-noi",
        url: "https://cdn2.tuoitre.vn/zoom/480_300/471584752817336320/2024/5/30/du-lich-ha-noi-1703495521958912478347-180-470-963-1723-crop-17170584767591570643890.jpg",
        title: "Hà Nội – nơi giao thoa giữa hiện đại và cổ kính",
        description: "Thủ đô ngàn năm văn hiến với hồ Gươm, phố cổ và nền ẩm thực đặc sắc.",
        date: "10/07/2025",
    },
    {
        id: "con-dao",
        url: "https://dulichviet.com.vn/images/bandidau/NOI-DIA/Con-Dao/du-lich-con-dao-mua-he-2025-du-lich-viet.jpg",
        title: "Côn Đảo – thiên nhiên hoang sơ, yên bình và thiêng liêng",
        description: "Hòn đảo linh thiêng với những bãi biển hoang sơ và giá trị lịch sử sâu sắc.",
        date: "08/07/2025",
    },
    {
        id: "travel-journey",
        url: "https://www.elle.vn/wp-content/uploads/2017/06/30/8-tips-de-co-nhung-buc-anh-tuyet-dep-khi-di-du-lich-mot-minh-ellevn.jpg",
        title: "Hành trình khám phá bản thân qua từng bước chân du lịch",
        description: "Du lịch không chỉ là khám phá thế giới, mà còn là hành trình tìm lại chính mình.",
        date: "06/07/2025",
    },
    {
        id: "rung-tram-tra-su",
        url: "https://images.baoangiang.com.vn/image/fckeditor/upload/2024/20240131/images/8f0d986ccf20267e7f31.jpg",
        title: "Rừng Tràm Trà Sư – không gian xanh thanh bình của miền Tây",
        description: "Nơi lý tưởng để thả mình giữa thiên nhiên ngập nước và chim trời ríu rít.",
        date: "05/07/2025",
    }
];

const features = [
    {
        image: "https://dulichsaigon.edu.vn/wp-content/uploads/2024/01/hoi-an-thanh-pho-du-lich-o-viet-nam-thu-hut-nhieu-du-khach.jpg",
        title: "Mỗi địa điểm là một bức tranh sống động, nơi bạn có thể tự do tạo nên những khoảnh khắc không thể quên",
        size: "large",
    },
    {
        image: "https://puluongexcursions.com/wp-content/uploads/2023/03/vinh-ha-long-01.jpg",
        title: "Thiên nhiên không chỉ đẹp để ngắm nhìn, mà còn là nơi chữa lành và truyền cảm hứng cho tâm hồn bạn",
        size: "medium",
    },
    {
        image: "https://cdn-images.vtv.vn/2020/5/27/du-lich-noi-dia-1590582875432562565334.jpg",
        title: "Du lịch không chỉ là đi, mà là hành trình để tìm thấy chính mình giữa muôn vàn trải nghiệm mới lạ",
        size: "small",
    },
];

const BlogSection = () => {
    // Slider settings responsive
    const settings = {
        dots: true,
        infinite: false,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1280, // xl
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024, // lg
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 768, // md
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                },
            },
            {
                breakpoint: 640, // sm
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    centerMode: true,
                    centerPadding: '40px',
                },
            },
            {
                breakpoint: 480, // xs
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                    centerMode: false,
                },
            },
        ],
    };

    return (
        <div className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20">
            {/* Background with overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center grayscale brightness-80"
                style={{
                    backgroundImage:
                        "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')",
                    backgroundPosition: 'center center',
                    backgroundAttachment: 'fixed',
                }}
            />
            <div className="absolute inset-0 bg-[#f5eacc] opacity-60" />

            {/* Blog Slider Section */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 mb-12 sm:mb-16 md:mb-20">
                <Slider {...settings}>
                    {images.map((item, index) => (
                        <div key={index} className="px-2 sm:px-3">
                            <Link to={`/blog/${item.id}`}>
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[350px] sm:h-[380px] md:h-[400px] flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                                    {/* Image - 65% height */}
                                    <div className="h-[65%] overflow-hidden">
                                        <img
                                            src={item.url}
                                            alt={item.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Content - 35% height */}
                                    <div className="h-[35%] px-3 sm:px-4 py-2 sm:py-3 bg-white flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-sm sm:text-base font-semibold text-[#215858] mb-1 sm:mb-2 line-clamp-2 leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 line-clamp-2 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">{item.date}</span>
                                            <span className="text-xs sm:text-sm text-[#215858] font-medium hover:underline">
                                                Đọc thêm →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Main Title Section */}
            <div className="relative z-10 text-white text-center mt-8 sm:mt-12 md:mt-16 px-4 sm:px-6 mb-12 sm:mb-16 md:mb-20">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-4 sm:mb-6">
                    SNAPSPOT{" "}
                    <span className="text-2xl sm:text-3xl md:text-4xl align-top font-semibold">
                        giúp
                    </span>{" "}
                    người dùng
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-medium mb-4 sm:mb-6">
                    Dễ dàng{" "}
                    <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                        tìm kiếm
                    </span>{" "}
                    địa điểm{" "}
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                        chụp ảnh
                    </span>{" "}
                    đẹp
                </p>

                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold">
                    TRÊN VIỆT NAM
                </h2>
            </div>

            {/* Vision Divider */}
            <div className="relative z-10 w-full flex items-center justify-end px-4 sm:px-6 md:px-8 lg:px-25 mt-12 sm:mt-16 md:mt-20 mb-8 sm:mb-10 md:mb-12">
                <div className="flex-grow h-[2px] sm:h-[3px] bg-[#215858]" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#215858] whitespace-nowrap ml-4">
                    TẦM NHÌN
                </h2>
            </div>

            {/* Vision Features - Responsive Circles */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-20 lg:gap-40 xl:gap-60 flex-wrap px-4 sm:px-6 mb-12 sm:mb-16 md:mb-20">
                {features.map((feature, index) => {
                    let sizeClasses = "";
                    if (feature.size === "large") {
                        sizeClasses = "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-60 xl:h-60";
                    } else if (feature.size === "medium") {
                        sizeClasses = "w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48";
                    } else {
                        sizeClasses = "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40";
                    }

                    return (
                        <div
                            key={index}
                            className={`relative group rounded-full overflow-hidden shadow-xl transition-transform duration-500 hover:scale-105 ${sizeClasses}`}
                        >
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="object-cover w-full h-full"
                                loading="lazy"
                            />
                            {/* Hover overlay with text */}
                            <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
                                <span className="text-white text-center text-xs sm:text-sm md:text-base font-light px-2 sm:px-3 md:px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                                    {feature.title}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Contact Divider */}
            <div className="relative z-10 w-full flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-25 mt-12 sm:mt-16 md:mt-20 mb-8 sm:mb-10 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#215858] whitespace-nowrap mr-4">
                    LIÊN HỆ
                </h2>
                <div className="flex-grow h-[2px] sm:h-[3px] bg-[#215858]" />
            </div>

            {/* Contact Form Section */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 px-4 sm:px-6 md:px-8">
                {/* Left: Contact Form */}
                <form className="w-full lg:w-[60%] flex flex-col space-y-4 sm:space-y-6 md:space-y-8 lg:pl-4 xl:pl-8">
                    {/* Email and Phone Row */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-[#215858] text-white placeholder-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#215858]/50 transition-all"
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            className="w-full bg-[#215858] text-white placeholder-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#215858]/50 transition-all"
                            required
                        />
                    </div>

                    {/* Name Field */}
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full bg-[#215858] text-white placeholder-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#215858]/50 transition-all"
                        required
                    />

                    {/* Message Field */}
                    <textarea
                        placeholder="Message"
                        className="w-full bg-[#215858] text-white placeholder-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl h-32 sm:h-36 md:h-40 resize-none focus:outline-none focus:ring-2 focus:ring-[#215858]/50 transition-all"
                        required
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-fit border-2 border-[#215858] text-[#215858] text-sm sm:text-base lg:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#215858] hover:text-white transition-all duration-300 font-medium min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#215858]/50"
                    >
                        Submit
                    </button>
                </form>

                {/* Right: Contact Info Cards */}
                <div className="w-full lg:w-[40%] flex flex-col gap-4 sm:gap-6 px-2 sm:px-4 md:px-6 lg:px-8 xl:pr-12">
                    {/* Phone Card */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 bg-[#215858] text-white px-4 sm:px-6 py-6 sm:py-8 md:py-10 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                        <FiPhone className="text-lg sm:text-xl md:text-2xl text-[#faebce] flex-shrink-0" />
                        <span className="text-sm sm:text-base font-medium text-center">
                            (+84) 123 456 789
                        </span>
                    </div>

                    {/* Email Card */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 bg-[#215858] text-white px-4 sm:px-6 py-6 sm:py-8 md:py-10 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                        <FiMail className="text-lg sm:text-xl md:text-2xl text-[#faebce] flex-shrink-0" />
                        <span className="text-sm sm:text-base font-medium text-center">
                            snapspot@gmail.com
                        </span>
                    </div>

                    {/* Location Card */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 bg-[#215858] text-white px-4 sm:px-6 py-6 sm:py-8 md:py-10 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                        <FiMapPin className="text-lg sm:text-xl md:text-2xl text-[#faebce] flex-shrink-0" />
                        <span className="text-sm sm:text-base font-medium text-center">
                            Thành phố Hồ Chí Minh
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogSection;