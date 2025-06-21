import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';

const Location = () => {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      
      {/* Container phần còn lại */}
      <div className="flex-1 relative flex flex-col overflow-hidden">
        
        {/* Background ảnh thiên nhiên mờ xám trắng */}
        <div
          className="absolute inset-0 bg-cover bg-center filter grayscale brightness-125 opacity-40"
          style={{ backgroundImage: "url('https://static1.squarespace.com/static/63f8b23b0626755198127ae3/63fc8c7f15e5ba00f5bf5e84/63fd08a2e559cd5c7086f8b2/1677527755377/vietnam-halong-bay-01.jpg?format=1500w')" }}
        ></div>
                {/* Overlay nâu tối phủ lên ảnh */}
        <div className="absolute inset-0 bg-[rgba(130,90,50,0.15)]"></div>

        {/* Nội dung Navbar + Main */}
        <div className="relative flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6 bg-transparent text-gray-900 overflow-auto">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to the management dashboard.</p>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Location;