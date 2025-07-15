import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { Link } from "react-router-dom";

const blogPosts = [
    {
        id: "vinh-ha-long",
        title: "Vịnh Hạ Long – Kỳ quan thiên nhiên",
        description: "Một trong 7 kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ vĩ.",
        url: "https://cdn3.ivivu.com/2015/02/vinhhanlongdiadiemselfiledepnhathanhtinh-ivivu-1.jpg",
        date: "15/07/2025",
        content: `Vịnh Hạ Long nằm ở tỉnh Quảng Ninh, nổi tiếng với vẻ đẹp tự nhiên kỳ vĩ và hệ thống đảo đá vôi trùng điệp. Du khách có thể tham gia tour du thuyền, khám phá hang động như Thiên Cung, Đầu Gỗ hoặc trải nghiệm chèo kayak giữa làn nước xanh ngọc.

        Với hơn 1.600 hòn đảo lớn nhỏ, mỗi hòn đảo mang một vẻ đẹp và câu chuyện riêng. Đảo Titop là điểm dừng chân lý tưởng để ngắm toàn cảnh vịnh từ trên cao, trong khi hang Sửng Sốt gây ấn tượng với những nhũ đá độc đáo được hình thành qua hàng triệu năm.

        Ngoài ra, du khách không thể bỏ qua trải nghiệm đêm trên vịnh, khi màn đêm buông xuống, hàng nghìn ánh đèn từ các du thuyền tạo nên khung cảnh lung linh như trong cổ tích. Đây cũng là thời điểm tuyệt vời để thưởng thức hải sản tươi ngon đặc trưng của vùng biển Hạ Long.

        Hang Sửng Sốt - một trong những hang động đẹp nhất vịnh Hạ Long, nổi tiếng với những khối thạch nhũ độc đáo và không gian rộng lớn. Du khách sẽ được chiêm ngưỡng những tác phẩm nghệ thuật tự nhiên được tạo nên bởi thời gian và thiên nhiên.

        Đảo Cát Bà gần đó cũng là điểm đến không thể bỏ qua, với Vườn quốc gia và những bãi biển hoang sơ. Du khách có thể kết hợp tham quan vịnh Hạ Long với việc khám phá hệ sinh thái đa dạng của Cát Bà.

        Ngoài ra, bạn có thể thử trải nghiệm chèo thuyền kayak, tham gia các hoạt động thể thao dưới nước hoặc đơn giản là thư giãn trên boong tàu giữa khung cảnh thiên nhiên hùng vĩ. Vịnh Hạ Long còn nổi tiếng với các lễ hội truyền thống, các làng chài cổ và những món ăn hải sản đặc sắc như sá sùng, tu hài, ngao, hàu, cua biển...`,
    },
    {
        id: "cao-nguyen-da-dong-van",
        title: "Cao nguyên đá Đồng Văn",
        description: "Vùng đất đá hoang sơ nhưng đầy sức sống ở cực Bắc Việt Nam.",
        url: "https://mytourcdn.com/upload_images/Image/Location/5_11_2015/dia-diem-du-lich-viet-nam-mytour-14.jpg",
        date: "14/07/2025",
content: `Cao nguyên đá Đồng Văn thuộc tỉnh Hà Giang, là Công viên địa chất toàn cầu UNESCO với cảnh sắc hùng vĩ. Đây là nơi giao thoa văn hóa của nhiều dân tộc thiểu số và có các điểm đến nổi bật như Dinh Vua Mèo, Cột cờ Lũng Cú và đèo Mã Pí Lèng.

        Điểm nhấn của cao nguyên là những thửa ruộng bậc thang uốn lượn theo sườn núi, tạo nên bức tranh thiên nhiên tuyệt đẹp. Mùa thu là thời điểm lý tưởng để chiêm ngưỡng những cánh đồng lúa chín vàng, trong khi mùa xuân được điểm tô bởi sắc hoa đào, hoa mận trắng tinh khôi.

        Thị trấn cổ Đồng Văn với những ngôi nhà trình tường cổ kính là điểm dừng chân không thể bỏ qua. Vào các buổi sáng sớm, chợ phiên Đồng Văn họp với đủ các sắc màu văn hóa của đồng bào dân tộc H'Mông, Dao, Tày, Nùng.

        Đèo Mã Pí Lèng - một trong "tứ đại đỉnh đèo" của Việt Nam, nơi du khách có thể chiêm ngưỡng vẻ đẹp hùng vĩ của sông Nho Quế xanh ngọc uốn lượn giữa những vách núi đá vôi cao ngất. Đây là điểm check-in không thể bỏ qua khi đến Hà Giang.

        Vùng tam giác Lũng Cú - Đồng Văn - Mèo Vạc còn nổi tiếng với những cánh đồng hoa tam giác mạch nở rộ vào mùa thu. Từ tháng 9 đến tháng 12, những cánh đồng tam giác mạch hồng phấn trải dài tạo nên khung cảnh đẹp như tranh vẽ.

        Ngoài ra, bạn có thể khám phá các bản làng dân tộc, thưởng thức các món đặc sản như thắng cố, bánh tam giác mạch, thịt trâu gác bếp và tham gia các lễ hội truyền thống đặc sắc của người Mông, Dao, Tày.`,
    },
    {
        id: "phu-quoc",
        url: "https://media.vov.vn/sites/default/files/styles/front_large_watermark/public/2021-11/du-lich-mot-minh-phu-quoc.jpg?resize=p_8,w_",
        title: "Phú Quốc – Thiên đường biển đảo",
        description: "Nơi lý tưởng để thư giãn, khám phá và lưu giữ khoảnh khắc đáng nhớ.",
        date: "12/07/2025",
        content: `Phú Quốc không chỉ nổi tiếng với làn nước trong xanh và bãi cát trắng mịn, mà còn là nơi lý tưởng cho những ai muốn rời xa nhịp sống hối hả để tận hưởng cảm giác thư giãn tuyệt đối. 

        Đến Phú Quốc, du khách có thể ghé thăm Suối Tranh, làng chài Hàm Ninh, Dinh Cậu, hay trải nghiệm lặn ngắm san hô tại quần đảo An Thới. Đặc biệt, hoàng hôn tại Bãi Dài là khoảnh khắc không thể bỏ lỡ để lưu giữ những bức ảnh tuyệt đẹp. 

        Ẩm thực Phú Quốc cũng vô cùng đa dạng, với các món đặc sản như gỏi cá trích, nhum nướng mỡ hành và nước mắm trứ danh.
Vườn tiêu Phú Quốc - nơi sản xuất loại hạt tiêu ngon nhất thế giới, du khách có thể tham quan và tìm hiểu quy trình trồng và chế biến tiêu. Đây cũng là nơi lý tưởng để mua những món quà đặc sản cho người thân.

        Grand World Phú Quốc - khu phức hợp giải trí và mua sắm hiện đại với kiến trúc độc đáo, nơi du khách có thể thưởng thức các show diễn đặc sắc và khám phá "thành phố không ngủ" của đảo ngọc.

        Ngoài ra, bạn có thể tham quan vườn quốc gia Phú Quốc, khám phá rừng nguyên sinh, ngắm nhìn các loài động thực vật quý hiếm, hoặc trải nghiệm câu mực đêm cùng ngư dân địa phương. Đừng quên thưởng thức các món hải sản tươi sống tại chợ đêm Dinh Cậu và mua các sản phẩm ngọc trai nổi tiếng.`

    },
    {
        id: "ba-na-hills",
        url: "https://bvhttdl.mediacdn.vn/2020/6/10/sun-world-ba-na-hills-24-15895192875941793928359-1591751128894-15917511288942046241021.jpg",
        title: "Bà Nà Hills – xứ sở thần tiên giữa núi rừng Đà Nẵng",
        description: "Khu nghỉ dưỡng nổi tiếng với cầu Vàng và khí hậu mát mẻ quanh năm.",
        date: "11/07/2025",
        content: `Bà Nà Hills được ví như "châu Âu thu nhỏ" giữa lòng Đà Nẵng, nằm ở độ cao hơn 1.400m so với mực nước biển. Nơi đây nổi bật với Cầu Vàng – công trình độc đáo được nâng đỡ bởi đôi bàn tay khổng lồ, thu hút hàng triệu lượt check-in mỗi năm.

        Không khí mát mẻ quanh năm cùng quần thể kiến trúc mang phong cách Gothic cổ kính tại Làng Pháp khiến du khách có cảm giác như lạc vào cổ tích. Ngoài ra, khu vui chơi Fantasy Park, vườn hoa Le Jardin D'Amour, chùa Linh Ứng cũng là những điểm dừng chân thú vị.

        Hệ thống cáp treo hiện đại đưa du khách vượt qua thung lũng, len lỏi giữa mây trời để đến với đỉnh núi Chúa. Từ độ cao này, du khách có thể ngắm nhìn toàn cảnh thành phố Đà Nẵng và vịnh Đà Nẵng tuyệt đẹp.

        Nhà hàng Le Jardin với kiến trúc Pháp cổ điển và các món ăn fusion Á-Âu là điểm dừng chân lý tưởng để thưởng thức ẩm thực. Du khách có thể thư giãn trong không gian sang trọng và ngắm nhìn biển mây bồng bềnh.

        Khu vực Mercure Danang French Village Ba Na Hills với kiến trúc đậm chất Pháp cổ điển là nơi nghỉ dưỡng tuyệt vời. Những con đường lát sỏi, những ô cửa sổ Gothic, và những tòa nhà theo phong cách kiến trúc thế kỷ 18 tạo nên không gian châu Âu cổ kính giữa núi rừng Việt Nam.
Ngoài ra, bạn có thể tham gia các lễ hội đường phố, thưởng thức các chương trình biểu diễn nghệ thuật, tham quan bảo tàng sáp, hoặc trải nghiệm các trò chơi cảm giác mạnh tại Fantasy Park. Bà Nà Hills còn nổi tiếng với khí hậu bốn mùa trong một ngày, tạo nên trải nghiệm đặc biệt cho du khách.`,
    },
    {
        id: "ha-noi",
        url: "https://cdn2.tuoitre.vn/zoom/480_300/471584752817336320/2024/5/30/du-lich-ha-noi-1703495521958912478347-180-470-963-1723-crop-17170584767591570643890.jpg",
        title: "Hà Nội – nơi giao thoa giữa hiện đại và cổ kính",
        description: "Thủ đô ngàn năm văn hiến với hồ Gươm, phố cổ và nền ẩm thực đặc sắc.",
        date: "10/07/2025",
        content: `Hà Nội – thủ đô ngàn năm văn hiến – luôn mang trong mình nét duyên dáng rất riêng. Tản bộ quanh hồ Gươm vào sáng sớm, thưởng thức một ly cà phê trứng hay khám phá phố cổ với những con phố mang tên nghề là những trải nghiệm không thể bỏ qua.

        Ngoài các di tích nổi tiếng như Văn Miếu – Quốc Tử Giám, Lăng Bác, chùa Một Cột, Hà Nội còn níu chân du khách bằng nền ẩm thực phong phú: phở bò, bún chả, bánh cuốn, cốm làng Vòng... tất cả đều mang hương vị truyền thống rất đặc trưng.

        36 phố phường cổ kính, mỗi con phố là một nghề truyền thống, từ hàng Bạc, hàng Đồng đến hàng Mã đều mang đậm dấu ấn văn hóa và lịch sử. Những ngôi nhà ống cổ kính với kiến trúc đặc trưng là nơi lưu giữ những giá trị văn hóa độc đáo của người Hà Nội.

        Không gian văn hóa café phố cổ với những quán café trứng, café dốc, hay những quán nhỏ ven hồ là nơi thư giãn lý tưởng. Du khách có thể ngồi hàng giờ ngắm nhìn cuộc sống Hà Nội chậm rãi trôi qua qua những ô cửa sổ cổ kính.

        Hồ Tây - lá phổi xanh của thành phố với không gian thoáng đãng và những con đường ven hồ romantíc. Đây là nơi lý tưởng để tận hưởng hoàng hôn, thưởng thức ẩm thực đường phố và trải nghiệm không khí về đêm sôi động của Hà Nội.

        Ngoài ra, bạn có thể tham quan các bảo tàng lịch sử, thưởng thức nghệ thuật múa rối nước, dạo quanh các khu chợ truyền thống như chợ Đồng Xuân, hoặc tham gia các lễ hội văn hóa đặc sắc diễn ra quanh năm.`,
    },
    {
        id: "con-dao",
        url: "https://dulichviet.com.vn/images/bandidau/NOI-DIA/Con-Dao/du-lich-con-dao-mua-he-2025-du-lich-viet.jpg",
        title: "Côn Đảo – thiên nhiên hoang sơ, yên bình và thiêng liêng",
        description: "Hòn đảo linh thiêng với những bãi biển hoang sơ và giá trị lịch sử sâu sắc.",
        date: "08/07/2025",
content: `Côn Đảo là điểm đến lý tưởng cho những ai yêu thiên nhiên và muốn tìm về sự tĩnh lặng. Với bãi biển hoang sơ, làn nước trong xanh cùng hệ sinh thái phong phú, nơi đây là thiên đường nghỉ dưỡng và khám phá sinh thái.

        Bên cạnh vẻ đẹp tự nhiên, Côn Đảo còn là vùng đất thiêng liêng gắn với lịch sử dân tộc. Nghĩa trang Hàng Dương và mộ cô Sáu là nơi nhiều người tìm đến để tưởng niệm và cầu bình an.

        Bạn cũng có thể trải nghiệm ngắm rùa đẻ trứng, lặn biển, hay đơn giản là nằm dài trên bãi Đầm Trầu để cảm nhận sự thanh bình của đảo ngọc giữa đại dương.

        Vườn quốc gia Côn Đảo với hệ sinh thái đa dạng là nơi bảo tồn nhiều loài động thực vật quý hiếm. Du khách có thể tham gia các tour khám phá rừng nguyên sinh, quan sát các loài chim quý và tìm hiểu về hệ sinh thái độc đáo của hòn đảo.

        Chợ Côn Đảo với những món hải sản tươi ngon và đặc sản địa phương là điểm đến không thể bỏ qua. Du khách có thể thưởng thức những món ăn đặc trưng như mực một nắng, cá thu một nắng, và nhiều loại hải sản tươi sống khác.

        Ngoài ra, bạn có thể tham quan các di tích lịch sử như nhà tù Côn Đảo, cầu tàu 914, bảo tàng Côn Đảo, hoặc tham gia các hoạt động thể thao dưới nước như lặn ngắm san hô, chèo thuyền kayak, câu cá biển sâu.`,
    },
];

const formatDate = (dateStr: string) => {
    const months = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];
    const [day, month, year] = dateStr.split("/");
    return `${parseInt(day)} ${months[parseInt(month) - 1]}, ${year}`;
};

const BlogDetail = () => {
    const { id } = useParams();
    const post = blogPosts.find((p) => p.id === id);

    const relatedPosts = blogPosts.filter((p) => p.id !== id);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Không tìm thấy bài viết.
            </div>
        );
    }

    return (
        <div className="relative w-screen min-h-screen overflow-x-hidden text-gray-800">
            <Helmet>
                <title>{post.title} | Blog Du Lịch Việt Nam</title>
                <meta name="description" content={post.description} />
            </Helmet>

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center grayscale brightness-75 z-0"
                style={{
                    backgroundImage:
                        "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay...t=1500w')",
                }}
            />
<div className="absolute inset-0 bg-[#f5eacc] opacity-60 z-0"></div>

            <div className="relative z-10">
                <Navbar />

                {/* Cover image */}
                <div className="w-full max-h-[600px] overflow-hidden mt-0">
                    <img
                        src={post.url}
                        alt={post.title}
                        className="w-full h-[500px] object-cover rounded-xl shadow-lg"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 px-6 py-12">
                    {/* Bên trái: Main blog content - 70% */}
                    <div className="w-full lg:w-[70%] text-left space-y-6">
                        <h1 className="text-4xl font-bold text-[#215858]">{post.title}</h1>
                        <p className="text-lg text-gray-600 italic">{post.description}</p>
                        <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
                        <p className="text-lg text-gray-700 leading-8 whitespace-pre-line">
                            {post.content}
                        </p>
                    </div>

                    {/* Bên phải: Related blogs - 30% */}
                    <div className="w-full lg:w-[30%] p-2 lg:p-0 space-y-4">
                        <h2 className="text-2xl font-semibold text-[#215858] mb-4">Bài viết liên quan</h2>
                        <div className="space-y-6">
                            {relatedPosts.map((item) => (
                                <Link to={`/blog/${item.id}`} key={item.id}>
                                    <div className="cursor-pointer hover:opacity-90 transition duration-200 border-b pb-4">
                                        <img
                                            src={item.url}
                                            alt={item.title}
                                            className="h-32 w-full object-cover rounded-md mb-2"
                                        />
                                        <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                                        <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default BlogDetail;