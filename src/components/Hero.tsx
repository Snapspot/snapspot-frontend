import bg from "../assets/bg.jpg";

const Hero = () => {
  return (
    <div
      className="h-[80vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
        Vịnh Hạ Long
      </h1>
    </div>
  );
};

export default Hero;
