
const InfoSection = () => {
    return (
        <div className="relative w-full py-24 px-6">
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
            <div className="w-full flex items-center justify-center px-5">
                <div className="flex-grow h-px bg-[#215858]"></div>
                <h2 className="px-4 text-2xl md:text-3xl font-semibold text-[#215858] whitespace-nowrap">
                    OUR TEAM
                </h2>
                <div className="flex-grow h-px bg-[#215858]"></div>
            </div>

            {/* OUR TEAM Section */}
            <div className="relative z-10 w-full max-w-8xl mx-auto text-center px-10">
                <h2 className="text-8xl font-bold mt-[-50px] mb-[50px]">
                    <span
                        className="mr-2"
                        style={{
                            WebkitTextStroke: "2px #215858",
                            color: "transparent",
                        }}
                    >
                        OUR
                    </span>
                    <span className="text-[#215858]">TEAM</span>
                </h2>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-30 justify-center">
                    {/* Member Card */}
                    {[
                        { name: 'HỒ MINH QUYỀN', image: '/images/member1.png' },
                        { name: 'NGUYỄN BÌNH AN', image: '/images/member2.png' },
                        { name: 'PHẠM NGUYỄN ĐAN THƯ', image: '/images/member3.png' },
                        { name: 'HOÀNG HỮU NHẤT LINH', image: '/images/member4.png' },
                        { name: 'HOÀNG VÕ QUYỀN', image: '/images/member5.png' },
                    ].map((member, index) => (
                        <div
                            key={index}
                            className="bg-[#215858] rounded-2xl shadow-lg overflow-hidden flex flex-col items-center justify-end"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-[280px] object-contain bg-[#215858]"
                            />
                            <div className="w-full bg-[#f5eacc] px-4 py-3 text-sm font-semibold text-[#215858] text-center rounded-t-2xl">
                                <span className="border-b-4 border-[#215858] pb-1">{member.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default InfoSection;