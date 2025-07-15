import { Dialog } from "@headlessui/react";
import { useEffect, useRef } from "react";

interface LocationData {
  url: string;
  name: string;
  location: string;
  description: string;
  rating: number;
  bestTime: string;
  features: string[];
  gallery: string[];
  tips: string[];
}

interface LocationModalProps {
  data: LocationData | null;
  isOpen: boolean;
  onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ data, isOpen, onClose }) => {
  const dummyRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [isOpen]);

  if (!data) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      initialFocus={dummyRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop blur layer */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal content */}
      <div
        ref={dummyRef}
        className="relative z-50 bg-white max-w-3xl w-full p-6 rounded-lg overflow-y-auto max-h-[90vh]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold focus:outline-none"
          aria-label="Đóng"
        >
          ×
        </button>

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{data.name}</h2>
            <p className="text-sm text-gray-600">📍 {data.location}</p>
          </div>
          <div className="bg-yellow-400 text-white text-sm font-bold px-3 py-1 rounded-full">
            ⭐ {data.rating}
          </div>
        </div>

        {/* Cover Image */}
        <img
          src={data.url}
          alt={data.name}
          className="rounded-lg mb-4 w-full h-64 object-cover"
        />

        {/* Description */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Giới thiệu</h3>
          <p className="text-sm text-gray-700">{data.description}</p>
        </div>

        {/* Best time */}
        <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-md p-2">
          🕒 <span className="font-semibold">Thời gian tốt nhất:</span> {data.bestTime}
        </div>

        {/* Features */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Điểm nổi bật</h3>
          <div className="flex flex-wrap gap-2">
            {data.features.map((f, i) => (
              <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Thư viện ảnh</h3>
          <div className="flex gap-3 overflow-x-auto">
            {data.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`gallery-${i}`}
                className="h-24 w-36 object-cover rounded-lg shadow"
              />
            ))}
          </div>
        </div>

        {/* Tips */}
        <div>
          <h3 className="font-semibold mb-2">Lời khuyên du lịch</h3>
          <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
            {data.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </Dialog>
  );
};

export default LocationModal;
