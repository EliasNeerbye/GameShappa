import { useContext } from "react";
import { CalendarCheck, User, Loader } from "lucide-react";
import { AuthContext } from "../auth/AuthContext";
import PixelFormContainer from "../components/PixelFormContainer";
import ProfileField from "../components/ProfileField";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader className="animate-spin" size={24} />
                <span className="ml-2">Loading profile...</span>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "Invalid Date";
            return new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }).format(date);
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Invalid Date";
        }
    };

    return (
        <PixelFormContainer>
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-banner">
                    <div className="profile-avatar">
                        <User size={64} />
                    </div>
                    <div className="profile-title">
                        <h2 className="profile-username">{user.username || "Anonymous User"}</h2>
                        <div className="profile-meta">
                            <CalendarCheck className="inline-block mr-2" size={16} />
                            Member since {formatDate(user.createdAt)}
                        </div>
                        <div className="profile-role">{user.role || "Regular Member"}</div>
                    </div>
                </div>
            </div>

            {/* Basic Info Section */}
            <div className="profile-section">
                <h3 className="section-title">
                    <User className="inline-block mr-2" size={20} />
                    Basic Information
                </h3>
                <div className="profile-grid">
                    <ProfileField label="Username" value={user.username} />
                    <ProfileField label="Email" value={user.email} />
                    <ProfileField label="Age" value={user.age || "Not specified"} />
                    <ProfileField label="Location" value={user.address?.city ? `${user.address.city}, ${user.address.zipCode}` : "Not specified"} />
                    <ProfileField label="Member Type" value={user.role || "Regular Member"} />
                </div>
            </div>
        </PixelFormContainer>
    );
};

export default ProfilePage;
