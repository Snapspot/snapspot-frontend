import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

interface ProfileModalProps {
    onClose: () => void;
}

interface UserProfile {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    avatarUrl?: string;
    bio?: string;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get("/users/profile")
            .then(res => {
                setProfile(res.data.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        if (!profile) return;

        try {
            // Chỉ lấy các field cần update, không gửi userId
            const updateData = {
                fullName: profile.fullName,
                email: profile.email,
                phoneNumber: profile.phoneNumber,
                dob: profile.dob?.slice(0, 10), // chỉ lấy YYYY-MM-DD
                bio: profile.bio,
                avatarUrl: profile.avatarUrl
            };

            console.log("Sending updateData:", updateData); // Debug

            await axiosInstance.put(`/users/${profile.userId}`, updateData);

            // Lưu lại profile mới vào localStorage để navbar hiển thị ngay
            localStorage.setItem("userProfile", JSON.stringify({ ...profile, ...updateData }));
            window.dispatchEvent(new Event("profileUpdated"));

            onClose();
        } catch (err) {
            console.error("Cập nhật thất bại", err);
        }
    };


    if (loading) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Thông tin Admin</h2>

                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Họ và tên"
                        value={profile?.fullName || ""}
                        onChange={e => setProfile(p => ({ ...p!, fullName: e.target.value }))}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={profile?.email || ""}
                        onChange={e => setProfile(p => ({ ...p!, email: e.target.value }))}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        value={profile?.phoneNumber || ""}
                        onChange={e => setProfile(p => ({ ...p!, phoneNumber: e.target.value }))}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="date"
                        value={profile?.dob?.slice(0, 10) || ""}
                        onChange={e => setProfile(p => ({ ...p!, dob: e.target.value }))}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Link Avatar"
                        value={profile?.avatarUrl || ""}
                        onChange={e => setProfile(p => ({ ...p!, avatarUrl: e.target.value }))}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <textarea
                        placeholder="Bio"
                        value={profile?.bio || ""}
                        onChange={e => setProfile(p => ({ ...p!, bio: e.target.value }))}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 border rounded">
                        Hủy
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#215858] text-white rounded hover:bg-[#1b4a4a]"
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
}
