import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import PixelButton from "../components/PixelButton";
import PixelInput from "../components/PixelInput";
import PixelFormContainer from "../components/PixelFormContainer";

import "../css/pages/RegistrationForm.css";

const registerUrl = import.meta.env.VITE_BACKEND_URL + "/api/auth/register";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [registrationError, setRegistrationError] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username) {
            newErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
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
        // Clear any previous registration errors when user makes changes
        setRegistrationError("");
    };

    const sendRegistrationRequest = async (userData) => {
        try {
            const response = await axios.post(
                registerUrl,
                {
                    username: userData.username,
                    email: userData.email,
                    password: userData.password,
                    confirmPassword: userData.confirmPassword,
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
                // The server responded with a status code outside of 2xx
                throw new Error(error.response.data.message || "Registration failed");
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error("No response from server. Please try again.");
            } else {
                // Something happened in setting up the request
                throw new Error("Failed to send request. Please try again.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            setRegistrationError("");

            try {
                const response = await sendRegistrationRequest(formData);
                setRegistrationSuccess(true);

                // Handle the response data
                if (response.token) {
                    // Store the token if your backend sends one
                    localStorage.setItem("token", response.token);
                }

                if (response.message) {
                    // Show the success message from the server
                    setRegistrationSuccess(response.message);
                }

                // Give user time to see the success message before redirect
                setTimeout(() => {
                    window.location.href = "/login";
                }, 3000);
            } catch (error) {
                setRegistrationError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const togglePasswordVisibility = (field) => {
        if (field === "password") {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    return (
        <PixelFormContainer title="Create Account">
            <form className="pixel-form" onSubmit={handleSubmit}>
                {registrationError && <div className="error-message pixel-error">{registrationError}</div>}

                {registrationSuccess && (
                    <div className="success-message pixel-success">
                        {typeof registrationSuccess === "string" ? registrationSuccess : "Registration successful! Redirecting to login..."}
                    </div>
                )}

                <PixelInput
                    label="USERNAME"
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    error={errors.username}
                    autoComplete="username"
                    disabled={isLoading}
                />

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
                    autoComplete="new-password"
                    disabled={isLoading}
                    icon={
                        <button type="button" onClick={() => togglePasswordVisibility("password")}>
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    }
                />

                <PixelInput
                    label="CONFIRM PASSWORD"
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    autoComplete="new-password"
                    disabled={isLoading}
                    icon={
                        <button type="button" onClick={() => togglePasswordVisibility("confirm")}>
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    }
                />

                <PixelButton type="submit" disabled={isLoading}>
                    {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                </PixelButton>
            </form>

            <div className="register-footer">
                Already have an account?{" "}
                <PixelButton variant="secondary" onClick={() => (window.location.href = "/login")} disabled={isLoading}>
                    Login here
                </PixelButton>
            </div>
        </PixelFormContainer>
    );
};

export default RegistrationForm;