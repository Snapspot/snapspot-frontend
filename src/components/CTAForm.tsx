import React from "react";

const CTAForm = () => {
  return (
    <section className="bg-sand py-12 px-6 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Nhận tư vấn miễn phí</h2>
      <p className="mb-6">Để lại thông tin và đội ngũ chuyên gia của chúng tôi sẽ liên hệ bạn.</p>
      <form className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Họ và tên"
          className="w-full p-3 rounded-xl text-black"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl text-black"
        />
        <input
          type="tel"
          placeholder="Số điện thoại"
          className="w-full p-3 rounded-xl text-black"
        />
        <button
          type="submit"
          className="bg-white text-sand font-semibold py-3 px-6 rounded-xl hover:bg-opacity-90 transition"
        >
          Gửi thông tin
        </button>
      </form>
    </section>
  );
};

export default CTAForm;
