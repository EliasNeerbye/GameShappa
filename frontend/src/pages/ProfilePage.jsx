import { useContext, useState, useEffect } from "react";
import { CalendarCheck, User, Loader } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import PixelFormContainer from "../components/PixelFormContainer";
import ProfileField from "../components/ProfileField";
import PixelButton from "../components/PixelButton";
import PixelInput from "../components/PixelInput";
import PixelToast from "../components/PixelToast";

const updateProfileUrl = import.meta.env.VITE_BACKEND_URL + "/api/auth/updateProfile";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "", visible: false });
    const [formData, setFormData] = useState({
        username: "",
        age: "",
        city: "",
        zipCode: "",
    });
    const [errors, setErrors] = useState({});

    // Initialize form data once user data is available
    useEffect(() => {
        if (user && !isInitialized) {
            setFormData({
                username: user.username ?? "",
                age: user.age ?? "",
                city: user.address?.city ?? "",
                zipCode: user.address?.zipCode ?? "",
            });
            setIsInitialized(true);
            console.log(user);
        }
    }, [user, isInitialized]);

    // Redirect if not authenticated
    useEffect(() => {
        const checkAuth = setTimeout(() => {
            if (!user && isInitialized) {
                window.location.href = "/login";
            }
        }, 1000); // Give AuthProvider time to load

        return () => clearTimeout(checkAuth);
    }, [user, isInitialized]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (formData.username && formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }
        if (formData.username && formData.username.length > 8) {
            newErrors.username = "Username must be less than 8 characters";
        }

        if (formData.age && (isNaN(formData.age) || formData.age < 0)) {
            newErrors.age = "Age must be a valid number";
        }

        if (formData.zipCode && (isNaN(formData.zipCode) || formData.zipCode.toString().length !== 4)) {
            newErrors.zipCode = "Zip code must be a 4-digit number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            try {
                const response = await axios.put(
                    updateProfileUrl,
                    {
                        username: formData.username,
                        age: formData.age ? Number(formData.age) : undefined,
                        address: {
                            city: formData.city,
                            zipCode: formData.zipCode ? Number(formData.zipCode) : undefined,
                        },
                    },
                    {
                        withCredentials: true,
                    }
                );

                if (response.data.success) {
                    setToast({
                        message: "Profile updated successfully!",
                        type: "success",
                        visible: true,
                    });
                    setIsEditing(false);
                    setTimeout(() => window.location.reload(), 2000);
                }
            } catch (error) {
                setToast({
                    message: error.response?.data?.message || "Failed to update profile",
                    type: "error",
                    visible: true,
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <PixelFormContainer title="Profile">
            <div className="profile-header">
                <div className="profile-title">
                    <h2 className="text-2xl">
                        <User className="inline-block mr-2" size={24} />
                        {user.username || "Anonymous User"}
                    </h2>
                    <div className="profile-meta">
                        <CalendarCheck className="inline-block mr-2" size={16} />
                        Member since {user.createdAt ? formatDate(user.createdAt) : "N/A"}
                    </div>
                </div>
                <div className="profile-actions">
                    {!isEditing && (
                        <>
                            <PixelButton onClick={() => setIsEditing(true)}>Edit Profile</PixelButton>
                            <PixelButton variant="secondary" onClick={() => (window.location.href = "/settings")}>
                                Settings
                            </PixelButton>
                        </>
                    )}
                </div>
            </div>

            {isEditing ? (
                <form className="pixel-form" onSubmit={handleSubmit}>
                    <PixelInput
                        label="USERNAME"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={errors.username}
                        disabled={isLoading}
                    />

                    <PixelInput
                        label="AGE"
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        error={errors.age}
                        disabled={isLoading}
                    />

                    <PixelInput label="CITY" id="city" name="city" value={formData.city} onChange={handleChange} error={errors.city} disabled={isLoading} />

                    <PixelInput
                        label="ZIP CODE"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        error={errors.zipCode}
                        disabled={isLoading}
                    />

                    <div className="profile-form-actions">
                        <PixelButton type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
                        </PixelButton>
                        <PixelButton type="button" variant="secondary" onClick={() => setIsEditing(false)} disabled={isLoading}>
                            Cancel
                        </PixelButton>
                    </div>
                </form>
            ) : (
                <div className="profile-grid">
                    <ProfileField label="Username" value={user.username || "Not set"} />
                    <ProfileField label="Email" value={user.email} />
                    <ProfileField label="Age" value={user.age || "Not set"} />
                    <ProfileField label="City" value={user.address?.city || "Not set"} />
                    <ProfileField label="Zip Code" value={user.address?.zipCode || "Not set"} />
                    <ProfileField label="Role" value={user.role || "User"} />
                </div>
            )}

            <PixelToast message={toast.message} type={toast.type} isVisible={toast.visible} onClose={() => setToast({ ...toast, visible: false })} />
        </PixelFormContainer>
    );
};

export default ProfilePage;
