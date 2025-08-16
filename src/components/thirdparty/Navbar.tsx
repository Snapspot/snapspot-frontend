import { FiSearch, FiBell, FiUser } from 'react-icons/fi';
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
                {/* Search */}
                <div className="flex items-center rounded-md px-3 py-1 w-1/3" style={{ backgroundColor: '#215858' }}>
                    <FiSearch className="mr-2" style={{ color: '#faebce' }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent focus:outline-none w-full placeholder-[#faebce]"
                        style={{ color: '#faebce' }}
                    />
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-6 text-gray-600">
                    <button aria-label="Notifications" className="hover:text-gray-800 transition">
                        <FiBell size={20} />
                    </button>
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
