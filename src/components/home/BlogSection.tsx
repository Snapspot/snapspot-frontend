import Slider from "react-slick";

const images = [
    "https://cdn3.ivivu.com/2015/02/vinhhanlongdiadiemselfiledepnhathanhtinh-ivivu-1.jpg",
    "https://mytourcdn.com/upload_images/Image/Location/5_11_2015/dia-diem-du-lich-viet-nam-mytour-14.jpg",
    "https://media.vov.vn/sites/default/files/styles/front_large_watermark/public/2021-11/du-lich-mot-minh-phu-quoc.jpg?resize=p_8,w_",
    "https://bvhttdl.mediacdn.vn/2020/6/10/sun-world-ba-na-hills-24-15895192875941793928359-1591751128894-15917511288942046241021.jpg",
    "https://cdn2.tuoitre.vn/zoom/480_300/471584752817336320/2024/5/30/du-lich-ha-noi-1703495521958912478347-180-470-963-1723-crop-17170584767591570643890.jpg",
    "https://dulichviet.com.vn/images/bandidau/NOI-DIA/Con-Dao/du-lich-con-dao-mua-he-2025-du-lich-viet.jpg",
    "https://www.elle.vn/wp-content/uploads/2017/06/30/8-tips-de-co-nhung-buc-anh-tuyet-dep-khi-di-du-lich-mot-minh-ellevn.jpg",
    "https://images.baoangiang.com.vn/image/fckeditor/upload/2024/20240131/images/8f0d986ccf20267e7f31.jpg",
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
        <div className="relative w-full h-screen overflow-hidden">
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

            <div className="relative z-10 text-white text-center mt-16 px-4">
                <h1 className="text-6xl font-extrabold leading-tight">
                    SNAPSPOT <span className="text-4xl align-top font-semibold">giúp</span> người dùng
                </h1>

                <p className="mt-4 text-2xl leading-relaxed font-medium">
                    Dễ dàng <span className="text-4xl font-bold">tìm kiếm</span> địa điểm <span className="text-3xl font-semibold">chụp ảnh</span> đẹp
                </p>

                <h2 className="mt-6 text-7xl font-extrabold">TRÊN VIỆT NAM</h2>
            </div>

        </div>
    );
};

export default BlogSection;