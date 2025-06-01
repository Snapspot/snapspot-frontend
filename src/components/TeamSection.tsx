// src/components/TeamSection.tsx
import React from "react";

const team = [
  { name: "Lan Anh", role: "Chuyên gia chăm sóc da", img: "/team1.jpg" },
  { name: "Minh Thư", role: "Bác sĩ da liễu", img: "/team2.jpg" },
  { name: "Ngọc Trâm", role: "Skin Therapist", img: "/team3.jpg" },
];

const TeamSection = () => {
  return (
    <section className="bg-sand text-white py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Gặp gỡ đội ngũ chuyên gia</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {team.map((member, idx) => (
          <div key={idx} className="text-center">
            <img
              src={member.img}
              alt={member.name}
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-sm opacity-80">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
