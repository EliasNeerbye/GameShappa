import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PixelButton from "../components/PixelButton";
import PixelInput from "../components/PixelInput";
import PixelFormContainer from "../components/PixelFormContainer";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted:", formData);
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
                    icon={
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    }
                />

                <PixelButton type="submit">LOGIN</PixelButton>
            </form>

            <div className="register-footer">
                Don&apos;t have an account?{" "}
                <PixelButton variant="secondary" onClick={() => (window.location.href = "/register")}>
                    Register here
                </PixelButton>
            </div>
        </PixelFormContainer>
    );
};

export default LoginForm;
