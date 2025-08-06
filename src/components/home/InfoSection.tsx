

const InfoSection = () => {
    return (
        <div className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
            {/* Background trắng đen */}
            <div
                className="absolute inset-0 bg-cover bg-center grayscale brightness-90 z-0"
                style={{
                    backgroundImage:
                        "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')",
                }}
            />
            <div className="absolute inset-0 bg-[#f5eacc] opacity-60 z-0" />

            {/* Divider trước OUR TEAM */}
            <div className="w-full flex items-center justify-center px-4 sm:px-5">
                <div className="flex-grow h-[2px] sm:h-px bg-[#215858]" />
                <h2 className="px-2 sm:px-4 text-xl sm:text-2xl md:text-3xl font-semibold text-[#215858] whitespace-nowrap">
                    OUR TEAM
                </h2>
                <div className="flex-grow h-[2px] sm:h-px bg-[#215858]" />
            </div>

            <div className="relative z-10 w-full max-w-8xl mx-auto text-center px-4 sm:px-6 md:px-8 lg:px-10">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mt-[-30px] sm:mt-[-40px] md:mt-[-50px] mb-8 sm:mb-12 md:mb-[50px]">
                    <span
                        className="mr-1 sm:mr-2"
                        style={{
                            WebkitTextStroke: "1px #215858",
                            color: "transparent",
                        }}
                    >
                        OUR
                    </span>
                    <span className="text-[#215858]">TEAM</span>
                </h2>

                {/* Team Members Grid - Responsive for 6 members */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-4 lg:gap-6 xl:gap-8 justify-center">
                    {[
                        { name: 'HỒ MINH QUYỀN', image: '/images/member01.png' },     
                        { name: 'HOÀNG HỮU NHẤT LINH', image: '/images/member4.png' },                
                        { name: 'PHẠM NGUYỄN ĐAN THƯ', image: '/images/member3.png' },
                        { name: 'NGUYỄN BÌNH AN', image: '/images/member02.png' },
                        { name: 'HOÀNG VÕ QUYỀN', image: '/images/member5.png' },
                        { name: 'NGUYỄN QUÝ ĐỨC', image: '/images/member6.png' }, // Thay đổi thành member6.png
                    ].map((member, index) => (
                        <div
                            key={index}
                            className="bg-[#215858] rounded-xl sm:rounded-2xl shadow-lg overflow-hidden flex flex-col items-center justify-end w-full max-w-[220px] mx-auto hover:scale-105 hover:shadow-xl transition-all duration-300"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] object-contain bg-[#215858]"
                                loading="lazy"
                            />
                            <div className="w-full bg-[#f5eacc] px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-[#215858] text-center rounded-t-xl sm:rounded-t-2xl">
                                <span className="border-b-2 sm:border-b-4 border-[#215858] pb-1 leading-tight">
                                    {member.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Optional: Team description */}
                <div className="mt-8 sm:mt-12 md:mt-16 max-w-4xl mx-auto">
                    <p className="text-sm sm:text-base md:text-lg text-[#215858] leading-relaxed font-bold">
                        Đội ngũ SnapSpot với 6 thành viên tài năng, luôn nỗ lực mang đến trải nghiệm tuyệt vời nhất cho người dùng trong việc khám phá và lưu giữ những khoảnh khắc đẹp nhất của Việt Nam.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoSection;