import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "../components/home/Navbar";
import GreenFooter from "../components/home/GreenFooter";
import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  BookOpen,
  Heart,
  ThumbsUp,
  MessageCircle,
  Share2,
  ChevronRight,
} from "lucide-react";

// =============== DỮ LIỆU DEMO (giữ nguyên của bạn) ===============
const blogPosts = [
  {
    id: "vinh-ha-long",
    title: "Vịnh Hạ Long – Kỳ quan thiên nhiên",
    description:
      "Một trong 7 kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ vĩ.",
    url: "https://cdn3.ivivu.com/2015/02/vinhhanlongdiadiemselfiledepnhathanhtinh-ivivu-1.jpg",
    date: "15/07/2025",
    category: "Biển đảo",
    readTime: "5 phút đọc",
    author: {
      name: "Minh Anh",
      avatar: "/api/placeholder/40/40",
      bio: "Travel blogger với 8 năm kinh nghiệm khám phá Việt Nam",
    },
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
    category: "Miền núi",
    readTime: "7 phút đọc",
    author: {
      name: "Hoàng Nam",
      avatar: "/api/placeholder/40/40",
      bio: "Nhiếp ảnh gia chuyên về phong cảnh miền núi Việt Nam",
    },
    content: `Cao nguyên đá Đồng Văn thuộc tỉnh Hà Giang, là Công viên địa chất toàn cầu UNESCO với cảnh sắc hùng vĩ. Đây là nơi giao thoa văn hóa của nhiều dân tộc thiểu số và có các điểm đến nổi bật như Dinh Vua Mèo, Cột cờ Lũng Cú và đèo Mã Pí Lèng.

Điểm nhấn của cao nguyên là những thửa ruộng bậc thang uốn lượn theo sườn núi, tạo nên bức tranh thiên nhiên tuyệt đẹp. Mùa thu là thời điểm lý tưởng để chiêm ngưỡng những cánh đồng lúa chín vàng, trong khi mùa xuân được điểm tô bởi sắc hoa đào, hoa mận trắng tinh khôi.

Thị trấn cổ Đồng Văn với những ngôi nhà trình tường cổ kính là điểm dừng chân không thể bỏ qua. Vào các buổi sáng sớm, chợ phiên Đồng Văn họp với đủ các sắc màu văn hóa của đồng bào dân tộc H'Mông, Dao, Tày, Nùng.

Đèo Mã Pí Lèng - một trong "tứ đại đỉnh đèo" của Việt Nam, nơi du khách có thể chiêm ngưỡng vẻ đẹp hùng vĩ của sông Nho Quế xanh ngọc uốn lượn giữa những vách núi đá vôi cao ngất. Đây là điểm check-in không thể bỏ qua khi đến Hà Giang.

Vùng tam giác Lũng Cú - Đồng Văn - Mèo Vạc còn nổi tiếng với những cánh đồng hoa tam giác mạch nở rộ vào mùa thu. Từ tháng 9 đến tháng 12, những cánh đồng tam giác mạch hồng phấn trải dài tạo nên khung cảnh đẹp như tranh vẽ.

Ngoài ra, bạn có thể khám phá các bản làng dân tộc, thưởng thức các món đặc sản như thắng cố, bánh tam giác mạch, thịt trâu gác bếp và tham gia các lễ hội truyền thống đặc sắc của người Mông, Dao, Tày.`,
  },
  {
    id: "phu-quoc",
    url: "https://media.vov.vn/sites/default/files/styles/front_large_watermark/public/2021-11/du-lich-mot-minh-phu-quoc.jpg",
    title: "Phú Quốc – Thiên đường biển đảo",
    description:
      "Nơi lý tưởng để thư giãn, khám phá và lưu giữ khoảnh khắc đáng nhớ.",
    date: "12/07/2025",
    category: "Biển đảo",
    readTime: "6 phút đọc",
    author: {
      name: "Thu Hà",
      avatar: "/api/placeholder/40/40",
      bio: "Chuyên gia du lịch biển đảo với hơn 10 năm kinh nghiệm",
    },
    content: `Phú Quốc không chỉ nổi tiếng với làn nước trong xanh và bãi cát trắng mịn, mà còn là nơi lý tưởng cho những ai muốn rời xa nhịp sống hối hả để tận hưởng cảm giác thư giãn tuyệt đối. 

Đến Phú Quốc, du khách có thể ghé thăm Suối Tranh, làng chài Hàm Ninh, Dinh Cậu, hay trải nghiệm lặn ngắm san hô tại quần đảo An Thới. Đặc biệt, hoàng hôn tại Bãi Dài là khoảnh khắc không thể bỏ lỡ để lưu giữ những bức ảnh tuyệt đẹp. 

Ẩm thực Phú Quốc cũng vô cùng đa dạng, với các món đặc sản như gỏi cá trích, nhum nướng mỡ hành và nước mắm trứ danh.
Vườn tiêu Phú Quốc - nơi sản xuất loại hạt tiêu ngon nhất thế giới, du khách có thể tham quan và tìm hiểu quy trình trồng và chế biến tiêu. Đây cũng là nơi lý tưởng để mua những món quà đặc sản cho người thân.

Grand World Phú Quốc - khu phức hợp giải trí và mua sắm hiện đại với kiến trúc độc đáo, nơi du khách có thể thưởng thức các show diễn đặc sắc và khám phá "thành phố không ngủ" của đảo ngọc.

Ngoài ra, bạn có thể tham quan vườn quốc gia Phú Quốc, khám phá rừng nguyên sinh, ngắm nhìn các loài động thực vật quý hiếm, hoặc trải nghiệm câu mực đêm cùng ngư dân địa phương. Đừng quên thưởng thức các món hải sản tươi sống tại chợ đêm Dinh Cậu và mua các sản phẩm ngọc trai nổi tiếng.`,
  },
  {
    id: "ba-na-hills",
    url: "https://bvhttdl.mediacdn.vn/2020/6/10/sun-world-ba-na-hills-24-15895192875941793928359-1591751128894-15917511288942046241021.jpg",
    title: "Bà Nà Hills – xứ sở thần tiên giữa núi rừng Đà Nẵng",
    description:
      "Khu nghỉ dưỡng nổi tiếng với cầu Vàng và khí hậu mát mẻ quanh năm.",
    date: "11/07/2025",
    category: "Khám phá",
    readTime: "8 phút đọc",
    author: {
      name: "Đức Minh",
      avatar: "/api/placeholder/40/40",
      bio: "Hướng dẫn viên du lịch chuyên về miền Trung Việt Nam",
    },
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
    description:
      "Thủ đô ngàn năm văn hiến với hồ Gươm, phố cổ và nền ẩm thực đặc sắc.",
    date: "10/07/2025",
    category: "Văn hóa",
    readTime: "10 phút đọc",
    author: {
      name: "Lan Anh",
      avatar: "/api/placeholder/40/40",
      bio: "Nhà văn và blogger chuyên về văn hóa Hà Nội",
    },
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
    description:
      "Hòn đảo linh thiêng với những bãi biển hoang sơ và giá trị lịch sử sâu sắc.",
    date: "08/07/2025",
    category: "Biển đảo",
    readTime: "9 phút đọc",
    author: {
      name: "Văn Hải",
      avatar: "/api/placeholder/40/40",
      bio: "Nhà nghiên cứu lịch sử và văn hóa biển đảo Việt Nam",
    },
    content: `Côn Đảo là điểm đến lý tưởng cho những ai yêu thiên nhiên và muốn tìm về sự tĩnh lặng. Với bãi biển hoang sơ, làn nước trong xanh cùng hệ sinh thái phong phú, nơi đây là thiên đường nghỉ dưỡng và khám phá sinh thái.

Bên cạnh vẻ đẹp tự nhiên, Côn Đảo còn là vùng đất thiêng liêng gắn với lịch sử dân tộc. Nghĩa trang Hàng Dương và mộ cô Sáu là nơi nhiều người tìm đến để tưởng niệm và cầu bình an.

Bạn cũng có thể trải nghiệm ngắm rùa đẻ trứng, lặn biển, hay đơn giản là nằm dài trên bãi Đầm Trầu để cảm nhận sự thanh bình của đảo ngọc giữa đại dương.

Vườn quốc gia Côn Đảo với hệ sinh thái đa dạng là nơi bảo tồn nhiều loài động thực vật quý hiếm. Du khách có thể tham gia các tour khám phá rừng nguyên sinh, quan sát các loài chim quý và tìm hiểu về hệ sinh thái độc đáo của hòn đảo.

Chợ Côn Đảo với những món hải sản tươi ngon và đặc sản địa phương là điểm đến không thể bỏ qua. Du khách có thể thưởng thức những món ăn đặc trưng như mực một nắng, cá thu một nắng, và nhiều loại hải sản tươi sống khác.

Ngoài ra, bạn có thể tham quan các di tích lịch sử như nhà tù Côn Đảo, cầu tàu 914, bảo tàng Côn Đảo, hoặc tham gia các hoạt động thể thao dưới nước như lặn ngắm san hô, chèo thuyền kayak, câu cá biển sâu.`,
  },
  {
    id: "sapa",
    url: "https://i.pinimg.com/736x/2a/5b/9f/2a5b9f7b6914558a30af108a2b92c325.jpg",
    title: "Sa Pa – Thiên đường mây trắng",
    description:
      "Sapa, một thị trấn vùng cao Tây Bắc, luôn là điểm đến mơ ước của những tâm hồn yêu thiên nhiên và muốn khám phá.",
    date: "05/07/2025",
    category: "Khám phá",
    readTime: "20 phút đọc",
    author: {
      name: "Lan Phương",
      avatar: "/api/placeholder/40/40",
      bio: "Người kể chuyện núi rừng, đam mê trekking và văn hóa bản địa",
    },
    content: `Sa Pa nằm ở độ cao hơn 1.500m so với mực nước biển, thuộc tỉnh Lào Cai, là điểm du lịch nổi tiếng với khí hậu mát mẻ quanh năm và cảnh quan núi rừng hùng vĩ. Không chỉ là "thiên đường mây trắng" của miền Bắc, Sa Pa còn là nơi giao thoa văn hóa của nhiều dân tộc thiểu số, tạo nên sức hút đặc biệt cho bất kỳ ai đặt chân đến.

Trải nghiệm thực tế và hoạt động cụ thể
Khi đến Sa Pa, bạn có thể thử trekking đến đỉnh Fansipan – "nóc nhà Đông Dương" cao 3.143m. Nếu chọn trekking, hành trình thường kéo dài 2-3 ngày, băng qua rừng trúc, dốc đá và những con suối nhỏ, mang lại cảm giác chinh phục đầy phấn khích. Nếu muốn nhẹ nhàng hơn, bạn có thể đi cáp treo từ ga Hoàng Liên, chỉ mất 15 phút để lên gần đỉnh và ngắm toàn cảnh mây núi hùng vĩ. Bên cạnh đó, thung lũng Mường Hoa là điểm chụp ảnh nổi tiếng với ruộng bậc thang trải dài và bãi đá cổ có niên đại hàng trăm năm. Các bản làng như Cát Cát, Tả Van, Lao Chải, Tả Phìn mang đến trải nghiệm homestay ấm cúng, nơi bạn có thể tham gia dệt thổ cẩm, học nấu món ăn truyền thống hoặc tắm lá thuốc Dao đỏ. Buổi sáng, bạn có thể dạo bộ trên những con đường quanh co giữa núi rừng, ngắm sương mù tan chậm, còn buổi tối thì nhâm nhi ly trà nóng bên bếp lửa.

Mùa đẹp nhất để đi
Mùa xuân từ tháng 2 đến tháng 4 là thời điểm hoa đào, hoa mận nở rộ khắp sườn núi, thời tiết mát mẻ, dễ chịu, thích hợp để chụp ảnh. Mùa hè từ tháng 5 đến tháng 8 là lựa chọn lý tưởng để tránh nóng, ruộng bậc thang xanh mướt và không khí trong lành. Mùa thu từ tháng 9 đến tháng 10 là mùa lúa chín vàng rực rỡ, đẹp nhất để ngắm cảnh và săn ảnh. Mùa đông từ tháng 12 đến tháng 1 có thể xuất hiện băng tuyết, tạo khung cảnh hiếm có tại Việt Nam, đặc biệt thu hút những ai muốn trải nghiệm không khí lạnh giá vùng cao.

Sa Pa không chỉ là nơi ngắm cảnh, mà còn là hành trình khám phá văn hóa, ẩm thực và thử thách bản thân. Mỗi lần trở lại, bạn sẽ tìm thấy một vẻ đẹp mới, một trải nghiệm khác biệt khiến chuyến đi trở nên đáng nhớ.`,
  },
  {
    id: "hoi-an",
    url: "https://i.pinimg.com/1200x/18/16/8b/18168b400406687b8371b743d77e1154.jpg",
    title: "Hội An – Phố cổ quyến rũ",
    description: "Thành phố cổ với những ngôi nhà cổ kính và đèn lồng rực rỡ.",
    date: "03/07/2025",
    category: "Văn hóa",
    readTime: "18 phút đọc",
    author: {
      name: "Minh Trí",
      avatar: "/api/placeholder/40/40",
      bio: "Biên soạn viên văn hóa, yêu kiến trúc và di sản Việt Nam",
    },
    content: `Hội An là thành phố cổ nằm bên bờ sông Hoài, từng là thương cảng sầm uất từ thế kỷ XVI - XVII, nơi giao thương của thuyền buôn Nhật Bản, Trung Quốc, Ấn Độ và phương Tây. Sự giao thoa văn hóa lâu đời đã để lại những công trình kiến trúc mang nét Á - Âu hòa quyện, cùng lối sống chậm rãi và bình yên.

Trải nghiệm thực tế và hoạt động cụ thể
Đi dạo trên những con phố nhỏ lát gạch, bạn sẽ bắt gặp những ngôi nhà cổ mái ngói âm dương, cửa gỗ chạm khắc tinh xảo và bức tường vàng rêu phong. Chùa Cầu là điểm tham quan nổi bật, vừa là công trình kiến trúc độc đáo vừa mang giá trị lịch sử. Ban ngày, bạn có thể ghé thăm các hội quán, bảo tàng, nhà cổ như Tấn Ký, Phùng Hưng để tìm hiểu lịch sử. Buổi tối, phố cổ rực rỡ ánh đèn lồng, tiếng mái chèo khua trên sông Hoài tạo không khí lãng mạn. Ngoài khu phố cổ, bạn có thể đạp xe đến làng rau Trà Quế, tham gia lớp học trồng rau, hoặc đến làng gốm Thanh Hà để tự tay nặn những sản phẩm gốm. Nếu yêu biển, chỉ cần 15 phút di chuyển là tới Cửa Đại hay An Bàng để tắm biển và thưởng thức hải sản.

Mùa đẹp nhất để đi
Mùa khô từ tháng 2 đến tháng 8 là thời điểm đẹp nhất, trời nắng ấm, ít mưa, thích hợp tham quan và chụp ảnh. Tháng 2-4 thời tiết mát mẻ, không quá nóng. Tháng 5-8 nắng vàng rực rỡ, biển xanh trong. Mùa mưa từ tháng 9 đến tháng 1 có thể xuất hiện lũ lụt nhưng cũng mang đến vẻ đẹp lãng mạn khi phố cổ soi bóng trên mặt nước.

Mẹo du lịch và chi phí
Từ Đà Nẵng, bạn có thể đi xe máy hoặc taxi đến Hội An chỉ mất khoảng 30 phút. Giá vé tham quan khu phố cổ là 80.000 đồng/người cho khách Việt và 120.000 đồng/người cho khách nước ngoài, bao gồm 5 điểm tham quan. Homestay và khách sạn tầm trung có giá 400.000 - 800.000 đồng/đêm. Chi phí ăn uống trung bình từ 40.000 - 150.000 đồng/món. Nên mang giày hoặc dép thấp để dễ dàng đi bộ, và nếu muốn trải nghiệm không khí lễ hội, hãy đến vào đêm rằm hàng tháng khi phố cổ tắt đèn điện và chỉ thắp sáng bằng đèn lồng.`,
  },
  {
    id: "nha-trang",
    url: "https://i.pinimg.com/1200x/22/07/03/220703bd07c427acc9ca6d1d7455c263.jpg",
    title: "Nha Trang – Bãi biển xanh ngắt",
    description:
      "Thành phố biển xinh đẹp với làn nước trong xanh và cát trắng mịn.",
    date: "01/07/2025",
    category: "Biển đảo",
    readTime: "18 phút đọc",
    author: {
      name: "Quốc Hưng",
      avatar: "/api/placeholder/40/40",
      bio: "Travel blogger mê lặn biển và các cung biển đảo miền Trung",
    },
    content: `Nha Trang là thành phố biển thuộc tỉnh Khánh Hòa, nổi tiếng với bãi biển dài, cát trắng mịn và làn nước xanh ngọc. Khí hậu ôn hòa quanh năm khiến nơi đây trở thành điểm nghỉ dưỡng hàng đầu.

Trải nghiệm thực tế và hoạt động cụ thể
Ngoài tắm biển ở bãi trung tâm, du khách có thể tham gia tour đảo khám phá Hòn Mun, Hòn Tằm, Bãi Trũ. Hòn Mun là điểm lặn ngắm san hô đẹp nhất Nha Trang, với hàng trăm loài san hô và cá nhiệt đới. Hòn Tằm thích hợp nghỉ dưỡng với resort cao cấp, spa và các hoạt động thể thao biển. Buổi chiều, bạn có thể ghé Tháp Bà Ponagar tìm hiểu kiến trúc Chăm Pa, hoặc Nhà thờ Núi với kiến trúc Gothic độc đáo. Nếu yêu thiên nhiên, hãy đến Viện Hải dương học để khám phá hàng nghìn mẫu sinh vật biển. Hoạt động giải trí về đêm sôi động với các quán bar ven biển, chợ đêm và phố ẩm thực.

Mùa đẹp nhất để đi
Mùa khô từ tháng 1 đến tháng 8 là thời gian lý tưởng, đặc biệt là tháng 3-6 khi nắng vàng, biển lặng, thích hợp cho các hoạt động ngoài trời. Mùa mưa từ tháng 9 đến tháng 12 có thể có bão, sóng lớn nên cần theo dõi dự báo thời tiết.

Mẹo du lịch và chi phí
Từ Hà Nội và TP.HCM đều có chuyến bay thẳng đến sân bay Cam Ranh, sau đó di chuyển khoảng 35km vào trung tâm thành phố. Giá tour đảo từ 250.000 - 600.000 đồng/người tùy lịch trình. Khách sạn từ 400.000 đồng/đêm, resort cao cấp từ 2 triệu đồng/đêm. Ăn uống trung bình từ 50.000 - 200.000 đồng/món. Nên mang theo kem chống nắng, kính râm và đồ bơi.`,
  },
  {
    id: "Vien-Hai-Duong-Hoc-Nha-Trang",
    url: "https://i.pinimg.com/736x/3e/e8/09/3ee8095fe6d0749af8a2c9d3353839ce.jpg",
    title: "Khám phá Viện Hải Dương Học Nha Trang",
    description:
      "Địa chỉ Viện Hải Dương Học Nha Trang là vấn đề được rất nhiều người quan tâm và thắc mắc. Nơi đây là một trong những điểm đến thú vị cho những ai yêu thích những sinh vật biển độc đáo.",
    date: "01/04/2024",
    category: "Khám phá",
    readTime: "15 phút đọc",
    author: {
      name: "Bảo Châu",
      avatar: "/api/placeholder/40/40",
      bio: "Hướng dẫn viên khu vực Nam Trung Bộ, yêu khoa học biển",
    },
    content: `Viện Hải Dương Học Nha Trang được thành lập từ năm 1922, là một trong những cơ sở nghiên cứu khoa học biển lâu đời nhất Việt Nam, vừa là trung tâm nghiên cứu vừa là điểm tham quan giáo dục hấp dẫn.

Trải nghiệm thực tế và hoạt động cụ thể
Bước vào viện, bạn sẽ được chiêm ngưỡng bộ xương cá voi khổng lồ dài gần 26m, cùng hàng nghìn mẫu vật sinh vật biển như san hô, giáp xác, cá rạn, sinh vật thân mềm. Các bể nuôi sinh vật sống cho phép quan sát cá mập, rùa biển, sao biển ở khoảng cách rất gần. Viện còn có khu triển lãm về hệ sinh thái biển Việt Nam, phòng chiếu phim tài liệu và khu vực trải nghiệm cho trẻ em.

Mùa đẹp nhất để đi
Có thể tham quan quanh năm, nhưng thời gian lý tưởng nhất là mùa khô từ tháng 1 đến tháng 8, trời nắng đẹp, thuận tiện kết hợp với các hoạt động du lịch biển khác ở Nha Trang.

Ẩm thực và đặc sản
Viện không phục vụ ăn uống, nhưng xung quanh có nhiều quán hải sản tươi ngon. Bạn có thể thưởng thức bún sứa, bún cá hoặc ghé các quán hải sản ven biển Trần Phú sau chuyến tham quan.

Mẹo du lịch và chi phí
Viện nằm cách trung tâm thành phố Nha Trang khoảng 6km, có thể đi taxi hoặc xe máy. Giá vé tham quan là 40.000 đồng/người lớn và 20.000 đồng/trẻ em. Thời gian tham quan trung bình từ 1-2 giờ. Nên mang mũ hoặc ô nếu đi vào buổi trưa vì phải di chuyển giữa các khu nhà ngoài trời. Nếu đi cùng trẻ nhỏ, nên chuẩn bị đồ ăn nhẹ và nước uống mang theo.`,
  },
];

// =============== HÀM FORMAT NGÀY ===============
const formatDate = (dateStr: string) => {
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const [day, month, year] = dateStr.split("/");
  return `${parseInt(day)} ${months[parseInt(month) - 1]}, ${year}`;
};

// =============== COMPONENT CHÍNH ===============
const BlogDetail = () => {
  const { id } = useParams();
  // const [readingProgress, setReadingProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Tìm bài hiện tại
  const post = blogPosts.find((p) => p.id === id);

  // ==== LIÊN QUAN: LẤY HẾT, KHÔNG CẮT ====
  // Nếu muốn lọc theo cùng category:
  // const relatedPosts = blogPosts.filter(p => p.id !== id && p.category === post?.category);
  const relatedPosts = blogPosts.filter((p) => p.id !== id);

  // ==== PAGINATION CHO RELATED ====
  const [relPage, setRelPage] = useState(1);
  const relPerPage = 4; // số bài/ trang
  const relTotalPages = Math.ceil(relatedPosts.length / relPerPage);
  const relStart = (relPage - 1) * relPerPage;
  const relCurrent = relatedPosts.slice(relStart, relStart + relPerPage);

  const relBoxRef = useRef<HTMLDivElement | null>(null);
  const handleRelPageChange = (p: number) => {
    if (p < 1 || p > relTotalPages) return;
    setRelPage(p);
    requestAnimationFrame(() => {
      relBoxRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    });
  };
  const getRelPages = () => {
    const maxVisible = 5;
    let start = Math.max(1, relPage - Math.floor(maxVisible / 2));
    let end = Math.min(relTotalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // ==== SCROLL PROGRESS ====
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Removed readingProgress logic since it's unused
    // const handleScroll = () => {
    //   const totalScroll = document.documentElement.scrollTop;
    //   const windowHeight =
    //     document.documentElement.scrollHeight -
    //     document.documentElement.clientHeight;
    //   const scroll = `${totalScroll / windowHeight}`;
    //   setReadingProgress(Math.round(parseFloat(scroll) * 100));
    // };

    // window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

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
      <section
        className="relative isolate w-full min-h-screen"
        style={{ backgroundColor: "#f5eacc" }}
        aria-labelledby="blog-detail-heading"
      >
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
          style={{
            backgroundImage: "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg')",
            opacity: 0.5
          }}
        />

        <div className="relative z-10">
          {/* Navbar */}
          <Navbar />

          {/* Hero Section */}
          <div className="container mx-auto px-4 mb-8">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={post.url}
                alt={post.title}
                className="w-full h-[400px] md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Title Overlay */}
              <div className="absolute bottom-3 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-xl p-6 md:p-8">
                  <span className="inline-block mb-4 px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  <h1 id="blog-detail-heading" className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                    {post.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-8 pb-16">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Article - 70% */}
              <div className="w-full lg:w-[70%]">
                <div className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-xl">
                  <div className="p-6 md:p-12">
                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none">
                      <div className="text-lg text-gray-700 leading-8 whitespace-pre-line mb-8">
                        {post.content}
                      </div>
                    </div>

                    {/* Social Actions */}
                    <div className="flex items-center justify-between pt-6 border-t">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setIsLiked(!isLiked)}
                          className={`inline-flex items-center px-4 py-2 rounded-lg border transition-colors ${
                            isLiked
                              ? "text-red-600 border-red-200 bg-red-50"
                              : "text-gray-600 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 mr-2 ${
                              isLiked ? "fill-current" : ""
                            }`}
                          />
                          {isLiked ? "Đã thích" : "Thích bài viết"}
                        </button>
                        <button className="inline-flex items-center px-4 py-2 rounded-lg border text-gray-600 border-gray-200 hover:bg-gray-50 transition-colors">
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Hữu ích
                        </button>
                        <button className="inline-flex items-center px-4 py-2 rounded-lg border text-gray-600 border-gray-200 hover:bg-gray-50 transition-colors">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Bình luận
                        </button>
                      </div>
                      <button className="inline-flex items-center px-4 py-2 rounded-lg border text-gray-600 border-gray-200 hover:bg-gray-50 transition-colors">
                        <Share2 className="w-4 h-4 mr-2" />
                        Chia sẻ
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - 30% */}
              <div className="w-full lg:w-[30%] space-y-8">
                {/* Related Posts */}
                <div className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-xl sticky top-8">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-emerald-600" />
                      Bài viết liên quan
                    </h2>

                    {/* Danh sách có cuộn trong khung */}
                    <div
                      ref={relBoxRef}
                      className="space-y-6 max-h-[60vh] overflow-auto pr-1"
                    >
                      {relCurrent.map((relatedPost) => (
                        <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                          <div className="group cursor-pointer hover:bg-emerald-50 p-4 rounded-xl transition-all duration-300 border-b border-gray-100 last:border-b-0">
                            <div className="relative overflow-hidden rounded-lg mb-3">
                              <img
                                src={relatedPost.url}
                                alt={relatedPost.title}
                                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                              <div className="absolute top-2 left-2">
                                <span className="inline-block px-2 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded text-xs">
                                  {relatedPost.category}
                                </span>
                              </div>
                            </div>

                            <h4 className="font-bold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
                              {relatedPost.title}
                            </h4>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(relatedPost.date)}
                              </div>
                              <ChevronRight className="w-4 h-4 group-hover:text-emerald-600 transition-colors" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Pagination */}
                    {relTotalPages > 1 && (
                      <div className="mt-5 flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleRelPageChange(relPage - 1)}
                          disabled={relPage === 1}
                          className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                            relPage === 1
                              ? "text-gray-400 border-gray-200 cursor-not-allowed"
                              : "text-gray-700 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          Trước
                        </button>

                        {/* Trang đầu nếu cần */}
                        {getRelPages()[0] > 1 && (
                          <>
                            <button
                              onClick={() => handleRelPageChange(1)}
                              className="px-3 py-1.5 text-sm rounded-lg border text-gray-700 border-gray-200 hover:bg-gray-50"
                            >
                              1
                            </button>
                            {getRelPages()[0] > 2 && (
                              <span className="px-2 text-gray-400">…</span>
                            )}
                          </>
                        )}

                        {getRelPages().map((p) => (
                          <button
                            key={p}
                            onClick={() => handleRelPageChange(p)}
                            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                              relPage === p
                                ? "bg-emerald-600 border-emerald-600 text-white"
                                : "text-gray-700 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            {p}
                          </button>
                        ))}

                        {/* Trang cuối nếu cần */}
                        {getRelPages().slice(-1)[0] < relTotalPages && (
                          <>
                            {getRelPages().slice(-1)[0] < relTotalPages - 1 && (
                              <span className="px-2 text-gray-400">…</span>
                            )}
                            <button
                              onClick={() => handleRelPageChange(relTotalPages)}
                              className="px-3 py-1.5 text-sm rounded-lg border text-gray-700 border-gray-200 hover:bg-gray-50"
                            >
                              {relTotalPages}
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => handleRelPageChange(relPage + 1)}
                          disabled={relPage === relTotalPages}
                          className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                            relPage === relTotalPages
                              ? "text-gray-400 border-gray-200 cursor-not-allowed"
                              : "text-gray-700 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          Sau
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* End Sidebar */}
            </div>
          </div>

          {/* Footer */}
          <GreenFooter />
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;