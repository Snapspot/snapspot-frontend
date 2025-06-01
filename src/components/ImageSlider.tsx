const ImageSlider = () => {
  return (
    <div className="p-4 flex gap-4 overflow-x-auto">
      {/* Render hình ảnh nhỏ dạng thẻ */}
      {[1, 2, 3, 4, 5].map((_, idx) => (
        <div
          key={idx}
          className="min-w-[200px] h-[120px] bg-gray-300 rounded-md"
        />
      ))}
    </div>
  );
};

export default ImageSlider;
