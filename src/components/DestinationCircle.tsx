const DestinationCircle = () => {
  return (
    <div className="flex justify-center gap-6 p-6">
      {[1, 2, 3].map((_, idx) => (
        <div
          key={idx}
          className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white shadow-lg"
        />
      ))}
    </div>
  );
};
export default DestinationCircle;
