import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaMoneyBillWave, FaUsers, FaBlog, FaBuilding } from "react-icons/fa";

const Dashboard = () => {
  const [generalStats, setGeneralStats] = useState<any>(null);
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<any>(null);
  const [packageCoverage, setPackageCoverage] = useState<any[]>([]);
  const [packageRevenue, setPackageRevenue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://14.225.217.24:8080/api/manageranalytics/general-statistics")
        .then((res) => res.json())
        .catch((err) => {
          console.error("[general-statistics] Lỗi fetch:", err);
          return {};
        }),
      fetch("http://14.225.217.24:8080/api/manageranalytics/active-users")
        .then((res) => res.json())
        .catch((err) => {
          console.error("[active-users] Lỗi fetch:", err);
          return {};
        }),
      fetch("http://14.225.217.24:8080/api/manageranalytics/blogs")
        .then((res) => res.json())
        .catch((err) => {
          console.error("[blogs] Lỗi fetch:", err);
          return {};
        }),
      fetch("http://14.225.217.24:8080/api/manageranalytics/monthy-statistics")
        .then((res) => res.json())
        .catch((err) => {
          console.error("[monthy-statistics] Lỗi fetch:", err);
          return {};
        }),
      fetch("http://14.225.217.24:8080/api/manageranalytics/package-coverage")
        .then((res) => res.json())
        .catch((err) => {
          console.error("[package-coverage] Lỗi fetch:", err);
          return {};
        }),
      fetch("http://14.225.217.24:8080/api/manageranalytics/package-revenue")
        .then((res) => res.json())
        .catch((err) => {
          console.error("[package-revenue] Lỗi fetch:", err);
          return {};
        }),
    ])
      .then(([stats, users, blogsData, monthly, coverage, revenue]) => {
        console.log("[general-statistics] Data:", stats);
        console.log("[active-users] Data:", users);
        console.log("[blogs] Data:", blogsData);
        console.log("[monthy-statistics] Data:", monthly);
        console.log("[package-coverage] Data:", coverage);
        console.log("[package-revenue] Data:", revenue);

        setGeneralStats(stats?.data || {});
        setActiveUsers(users?.data || []);
        setBlogs(blogsData?.data || []);
        setMonthlyStats(monthly?.data || {});
        setPackageCoverage(coverage?.data || []);
        setPackageRevenue(revenue?.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const numberFormat = (value: number) =>
    value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-screen">
      <Sidebar />
      <div className="flex-1 relative flex flex-col overflow-hidden">
        {/* Background ảnh */}
        <div
          className="absolute inset-0 bg-cover bg-center grayscale brightness-80"
          style={{
            backgroundImage:
              "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')",
          }}
        ></div>

        {/* Overlay vàng kem */}
        <div className="absolute inset-0 bg-[#f5eacc] opacity-60"></div>
        <div className="flex-1 relative flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 p-9 overflow-auto">
            <h1 className="text-center mb-8 text-3xl font-bold text-[#215b5b]">
              Dashboard
            </h1>

            {/* Cards thống kê */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card icon={<FaMoneyBillWave />} label="Tổng Doanh Thu" value={numberFormat(generalStats.monthyRevenue)} color="blue" />
              <Card icon={<FaUsers />} label="Tổng Người Dùng" value={generalStats?.totalUser ?? 0} color="green" />
              <Card icon={<FaBuilding />} label="Tổng Công Ty" value={generalStats?.totalCompany ?? 0} color="purple" />
              <Card icon={<FaBlog />} label="Số Blog" value={generalStats?.totalBlog ?? 0} color="orange" />
            </div>

            {/* Active Users & Blogs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <ChartContainer title="Người dùng hoạt động" type="line" data={activeUsers} dataKey="user" xKey="name" color="#2e7d32" />
              <ChartContainer title="Bài viết theo ngày" type="line" data={blogs} dataKey="blog" xKey="name" color="#ff9800" />
            </div>

            {/* Monthly Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-6 text-gray-700 border-b pb-2">
                Thống kê tháng này
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition">
                  <div className="p-3 bg-blue-500 text-white rounded-full text-xl">
                    <FaUsers />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Người dùng mới</p>
                    <p className="text-xl font-bold text-blue-700">
                      {monthlyStats?.newUser ?? 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-green-50 rounded-lg shadow-sm hover:shadow-md transition">
                  <div className="p-3 bg-green-500 text-white rounded-full text-xl">
                    <FaBuilding />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Công ty mới</p>
                    <p className="text-xl font-bold text-green-700">
                      {monthlyStats?.newCompany ?? 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-orange-50 rounded-lg shadow-sm hover:shadow-md transition">
                  <div className="p-3 bg-orange-500 text-white rounded-full text-xl">
                    <FaBlog />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Blog mới</p>
                    <p className="text-xl font-bold text-orange-700">
                      {monthlyStats?.newBlog ?? 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>


            {/* Package Coverage & Revenue */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Package Coverage</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={packageCoverage} dataKey="value" nameKey="name" outerRadius={100} label>
                      {packageCoverage.map((_, index) => (
                        <Cell key={index} fill={["#1976d2", "#2e7d32", "#ff9800", "#d32f2f"][index % 4]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Package Revenue</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={packageRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="uv" fill="#2e7d32" name="Doanh thu UV" />
                    <Bar dataKey="pv" fill="#1976d2" name="Doanh thu PV" />
                    <Bar dataKey="atm" fill="#ff9800" name="Doanh thu ATM" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// Component Card
type CardColor = "blue" | "green" | "purple" | "orange";

interface CardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: CardColor;
}

const Card = ({ icon, label, value, color }: CardProps) => {
  const bg = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  }[color as CardColor];
  const text = {
    blue: "text-blue-700",
    green: "text-green-700",
    purple: "text-purple-700",
    orange: "text-orange-700",
  }[color as CardColor];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow p-6 flex items-center gap-4">
      <div className={`${bg} p-4 rounded-full text-white text-2xl`}>{icon}</div>
      <div>
        <h2 className="text-sm font-medium text-gray-500">{label}</h2>
        <p className={`text-2xl font-bold ${text}`}>{value}</p>
      </div>
    </div>
  );
};

// Component ChartContainer
const ChartContainer = ({ title, type, data, dataKey, xKey, color }: any) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">{title}</h2>
    {type === "line" ? (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    ) : null}
  </div>
);

export default Dashboard;
