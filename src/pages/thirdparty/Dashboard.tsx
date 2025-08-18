import { useEffect, useState } from "react";
import Sidebar from "../../components/thirdparty/Sidebar";
import Navbar from "../../components/thirdparty/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CompanyInfo {
  avarta: string;
  rating: number;
  agencyCount: number;
  companyName: string;
  email: string;
  phoneNumber: string;
  address: string;
  website: string;
}

interface ViewData {
  date: string;
  views: number;
}

interface Agency {
  id: number;
  name: string;
  views: number;
  rating: number;
}

export default function ThirdPartyDashboard() {
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [viewsData, setViewsData] = useState<ViewData[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    fetch("http://14.225.217.24:8080/api/thirdpartyanalytic/company-info")
      .then((res) => res.json())
      .then((data) => setCompany(data.data));

    fetch("http://14.225.217.24:8080/api/thirdpartyanalytic/views")
      .then((res) => res.json())
      .then((data) => setViewsData(data.data));

    fetch("http://14.225.217.24:8080/api/thirdpartyanalytic/agencies")
      .then((res) => res.json())
      .then((data) => setAgencies(data.data));
  }, []);

  return (
    <div className="flex h-screen w-screen">
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

        {/* Nội dung chính */}
        <div className="flex-1 relative flex flex-col overflow-hidden">
          <div className="relative z-10 h-16 flex-shrink-0">
            <Navbar />
          </div>

          <main className="p-6 space-y-6 overflow-auto">
            <h1 className="text-center flex items-center justify-center h-[50px] mt-4"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '40px',
                letterSpacing: '0.1em',
                color: '#215b5b',
              }}>
              Thông số
            </h1>
            {/* Company Info */}
            {company && (
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 grid grid-cols-2 gap-6 items-center">
                {/* Left side */}
                <div className="flex flex-col items-center text-center">
                  <img
                    src={company.avarta}
                    alt="logo"
                    className="w-28 h-28 rounded-full object-cover border-2 border-gray-200 shadow-sm mb-3"
                  />
                  <h2 className="text-2xl font-bold text-gray-800">{company.companyName}</h2>
                  <div className="flex items-center justify-center gap-1 text-yellow-500 mt-1">
                    <span>⭐</span>
                    <span>{company.rating} / 5</span>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col gap-1 text-gray-600 items-start">
                  <p>🏢 Chi nhánh: {company.agencyCount}</p>
                  <p>📧 {company.email}</p>
                  <p>📞 {company.phoneNumber}</p>
                  <p>📍 {company.address}</p>
                  <p>
                    🌐{" "}
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {company.website}
                    </a>
                  </p>
                </div>
              </div>
            )}


            {/* Views Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">
                Lượt xem theo ngày
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#215b5b"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Agencies Table */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">
                Danh sách chi nhánh
              </h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 border">Tên chi nhánh</th>
                    <th className="p-3 border">Lượt xem</th>
                    <th className="p-3 border">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {agencies.map((agency) => (
                    <tr key={agency.id} className="hover:bg-gray-50">
                      <td className="p-3 border">{agency.name}</td>
                      <td className="p-3 border">{agency.views}</td>
                      <td className="p-3 border">⭐ {agency.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
