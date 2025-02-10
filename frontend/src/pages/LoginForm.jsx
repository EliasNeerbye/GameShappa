import { useContext, useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import PixelButton from "../components/PixelButton";
import PixelInput from "../components/PixelInput";
import PixelFormContainer from "../components/PixelFormContainer";
import PixelToast from "../components/PixelToast";
import { AuthContext } from "../auth/AuthContext";

const loginUrl = import.meta.env.VITE_BACKEND_URL + "/api/auth/login";

const LoginForm = () => {
    const { user } = useContext(AuthContext);

    if (user) {
        window.location.href = "/profile";
    }

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "", visible: false });

    const validateForm = () => {
        const newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setToast({ message: "", type: "", visible: false });
    };

    const sendLoginRequest = async (userData) => {
        try {
            const response = await axios.post(
                loginUrl,
                {
                    email: userData.email,
                    password: userData.password,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || "Login failed");
            } else if (error.request) {
                throw new Error("No response from server. Please try again.");
            } else {
                throw new Error("Failed to send request. Please try again.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            setToast({ message: "", type: "", visible: false });

            try {
                const response = await sendLoginRequest(formData);
                if (response.success) {
                    setToast({
                        message: "Login successful! Redirecting...",
                        type: "success",
                        visible: true,
                    });
                    setTimeout(() => {
                        window.location.href = "/profile";
                    }, 3000);
                } else {
                    setToast({
                        message: response.message || "Login failed",
                        type: "error",
                        visible: true,
                    });
                }
            } catch (error) {
                setToast({
                    message: error.message,
                    type: "error",
                    visible: true,
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <PixelFormContainer title="Login">
            <form className="pixel-form" onSubmit={handleSubmit}>
                <PixelInput
                    label="EMAIL"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    autoComplete="email"
                    disabled={isLoading}
                />

                <PixelInput
                    label="PASSWORD"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    autoComplete="current-password"
                    disabled={isLoading}
                    icon={
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    }
                />

                <PixelButton type="submit" disabled={isLoading}>
                    {isLoading ? "LOGGING IN..." : "LOGIN"}
                </PixelButton>
            </form>

            <div className="register-footer">
                Don&apos;t have an account?{" "}
                <PixelButton variant="secondary" onClick={() => (window.location.href = "/register")} disabled={isLoading}>
                    Register here
                </PixelButton>
            </div>

            <PixelToast message={toast.message} type={toast.type} isVisible={toast.visible} onClose={() => setToast({ ...toast, visible: false })} />
        </PixelFormContainer>
    );
};

export default LoginForm;