import { FiUser } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import ProfileModal from '../admin/ProfileModal';

interface UserProfile {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    avatarUrl?: string;
    bio?: string;
}

export default function Navbar() {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            setUserProfile(JSON.parse(storedProfile));
        }

        // Lắng nghe event cập nhật profile
        const handleProfileUpdate = () => {
            const updatedProfile = localStorage.getItem('userProfile');
            if (updatedProfile) {
                setUserProfile(JSON.parse(updatedProfile));
            }
        };

        window.addEventListener('profileUpdated', handleProfileUpdate);
        return () => {
            window.removeEventListener('profileUpdated', handleProfileUpdate);
        };
    }, []);

    return (
        <>
            <header className="bg-[#fff5e2] shadow px-6 h-20 flex items-center justify-between">

                {/* User Info */}
                <div className="flex items-center space-x-6 text-gray-600">
                    <button
                        aria-label="User Profile"
                        className="hover:text-gray-800 transition flex items-center space-x-2"
                        onClick={() => setIsModalOpen(true)}
                    >
                        {userProfile?.avatarUrl ? (
                            <img
                                src={userProfile.avatarUrl}
                                alt="Avatar"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <FiUser size={20} />
                        )}
                        <span className="hidden sm:inline text-gray-800 font-medium">
                            Hi, {userProfile?.fullName || 'User'}
                        </span>
                    </button>
                </div>
            </header>

            {/* Profile Modal */}
            {isModalOpen && <ProfileModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
