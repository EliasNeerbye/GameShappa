import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import PixelButton from "../components/PixelButton";
import PixelInput from "../components/PixelInput";
import PixelFormContainer from "../components/PixelFormContainer";

const loginUrl = import.meta.env.VITE_BACKEND_URL + "/api/auth/login";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);

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
        setLoginError(""); // Clear error when user makes changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            setLoginError("");

            try {
                const response = await axios.post(
                    loginUrl,
                    {
                        email: formData.email,
                        password: formData.password,
                    },
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                // Handle successful login
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                }

                setLoginSuccess(true);
                setTimeout(() => {
                    window.location.href = "/"; // Redirect to home page
                }, 2000);
            } catch (error) {
                if (error.response) {
                    setLoginError(error.response.data.message || "Login failed");
                } else if (error.request) {
                    setLoginError("No response from server. Please try again.");
                } else {
                    setLoginError("Failed to send request. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <PixelFormContainer title="Login">
            <form className="pixel-form" onSubmit={handleSubmit}>
                {loginError && <div className="error-message pixel-error">{loginError}</div>}
                {loginSuccess && <div className="success-message pixel-success">Login successful! Redirecting...</div>}

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
        </PixelFormContainer>
    );
};

export default LoginForm;