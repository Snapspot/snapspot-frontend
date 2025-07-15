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
        url: "https://www.elle.vn/wp-content/uploads/2017/06/30/8-tips-de-co-nhung-buc-anh-tuyet-dep-khi-di-du-lich-mot-minh-ellevn.jpg",
        title: "Hành trình khám phá bản thân qua từng bước chân du lịch",
        description: "Du lịch không chỉ là khám phá thế giới, mà còn là hành trình tìm lại chính mình.",
        date: "06/07/2025",
    },
    {
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
        size: "w-150 h-150", // lớn nhất
    },
    {
        image: "https://puluongexcursions.com/wp-content/uploads/2023/03/vinh-ha-long-01.jpg",
        title: "Thiên nhiên không chỉ đẹp để ngắm nhìn, mà còn là nơi chữa lành và truyền cảm hứng cho tâm hồn bạn",
        size: "w-100 h-100", // vừa
    },
    {
        image: "https://cdn-images.vtv.vn/2020/5/27/du-lich-noi-dia-1590582875432562565334.jpg",
        title: "Du lịch không chỉ là đi, mà là hành trình để tìm thấy chính mình giữa muôn vàn trải nghiệm mới lạ",
        size: "w-50 h-50", // nhỏ nhất
    },
];

const BlogSection = () => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 600,
        slidesToShow: 4,     // 👈 Hiển thị 4 ảnh một lúc
        slidesToScroll: 1,   // 👈 Mỗi lần cuộn sang 1 ảnh
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
        <div className="relative w-full">
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

            {/* Slider ảnh bên dưới */}
            <div className="w-full max-w-7xl mx-auto px-2 -mx-2 mt-12">
                <Slider {...settings}>
                    {images.map((item, index) => (
                        <div key={index} className="px-3">
                            <Link to={`/blog/${item.id}`}>
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[400px] flex flex-col justify-between transition-all duration-500 hover:shadow-2xl">

                                    {/* Ảnh — chiếm khoảng 65% chiều cao */}
                                    <div className="h-[65%] overflow-hidden">
                                        <img
                                            src={item.url}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Nội dung — chiếm 35% chiều cao */}
                                    <div className="h-[35%] px-4 py-3 bg-white">
                                        <h3 className="text-base font-semibold text-[#215858] mb-1 line-clamp-2">{item.title}</h3>
                                        <p className="text-sm text-gray-600 mb-1 line-clamp-2">{item.description}</p>
                                        <span className="text-xs text-gray-400">{item.date}</span>
                                    </div>

                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="relative z-10 text-white text-center mt-16 px-4">
                <h1 className="text-6xl font-extrabold leading-tight">
                    SNAPSPOT <span className="text-4xl align-top font-semibold">giúp</span> người dùng
                </h1>

                <p className="mt-4 text-2xl leading-relaxed font-medium">
                    Dễ dàng <span className="text-4xl font-bold">tìm kiếm</span> địa điểm <span className="text-3xl font-semibold">chụp ảnh</span> đẹp
                </p>

                <h2 className="mt-6 text-7xl font-extrabold">TRÊN VIỆT NAM</h2>
            </div>

            <div className="relative z-10 w-full flex items-center justify-end px-25 mt-20 mb-10">
                <div className="flex-grow h-[3px] bg-[#215858]"></div>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#215858] whitespace-nowrap">
                    TẦM NHÌN
                </h2>
            </div>


            <div className="flex items-end justify-center gap-60 flex-wrap">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`relative group rounded-full overflow-hidden shadow-xl transition-transform duration-500 hover:scale-105 ${feature.size}`}
                    >
                        <img
                            src={feature.image}
                            alt={feature.title}
                            className="object-cover w-full h-full"
                        />
                        {/* Overlay hiển thị title */}
                        <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-300">
                            <span className="text-white text-center text-sm md:text-base font-light px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {feature.title}
                            </span>

                        </div>
                    </div>
                ))}
            </div>

            <div className="relative z-10 w-full flex items-center justify-start px-25 mt-20 mb-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#215858] whitespace-nowrap">
                    LIÊN HỆ
                </h2>
                <div className="flex-grow h-[3px] bg-[#215858]"></div>
            </div>

            <div className="relative z-10 max-w-8xl mx-auto flex flex-col md:flex-row gap-12">
                {/* Bên trái: Form nhập liệu */}
                <form className="w-full md:w-[60%] flex flex-col space-y-11 pl-15">
                    <div className="flex flex-col md:flex-row gap-6">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-[#215858] text-white placeholder-white px-6 py-4 text-base rounded-2xl"
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            className="w-full bg-[#215858] text-white placeholder-white px-6 py-4 text-base rounded-2xl"
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full bg-[#215858] text-white placeholder-white px-6 py-4 text-base rounded-2xl"
                    />

                    <textarea
                        placeholder="Message"
                        className="w-full bg-[#215858] text-white placeholder-white px-6 py-4 text-base rounded-2xl h-40 resize-none"
                    />

                    <button
                        type="submit"
                        className="w-fit border border-[#215858] text-[#215858] text-lg px-6 py-2 rounded-full hover:bg-[#215858] hover:text-white transition"
                    >
                        Submit
                    </button>
                </form>


                {/* Bên phải: Info hiển thị */}
                <form className="w-full md:w-[40%] flex flex-col gap-6 pr-6 md:pr-50 pl-50">
                    <div className="flex items-center justify-center gap-4 bg-[#215858] text-white px-6 py-10 rounded-2xl shadow-md">
                        <FiPhone className="text-2xl text-[#faebce]" />
                        <span className="text-base font-medium">(+84) 123 456 789</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 bg-[#215858] text-white px-6 py-10 rounded-2xl shadow-md">
                        <FiMail className="text-2xl text-[#faebce]" />
                        <span className="text-base font-medium">snapspot@gmail.com</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 bg-[#215858] text-white px-6 py-10 rounded-2xl shadow-md">
                        <FiMapPin className="text-2xl text-[#faebce]" />
                        <span className="text-base font-medium">Thành phố Hồ Chí Minh</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogSection;