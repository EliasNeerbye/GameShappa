import { useEffect, useState } from "react";
import axios from "axios";
import PixelFormContainer from "../components/PixelFormContainer";

const logoutUrl = import.meta.env.VITE_BACKEND_URL + "/api/auth/logout";

const LogoutPage = () => {
    const [logoutMessage, setLogoutMessage] = useState("Logging out...");

    useEffect(() => {
        const performLogout = async () => {
            try {
                const response = await axios.post(
                    logoutUrl,
                    {},
                    {
                        withCredentials: true,
                    }
                );

                if (response.data.success) {
                    setLogoutMessage("Logout successful. Redirecting...");
                    setTimeout(() => (window.location.href = "/"), 2000); // Redirect to home after 2 seconds
                } else {
                    setLogoutMessage("Logout failed. Please try again.");
                }
            } catch (error) {
                console.error("Logout error:", error);
                setLogoutMessage("An error occurred during logout. Please try again.");
            }
        };

        performLogout();
    }, []);

    return (
        <PixelFormContainer title="Logout">
            <div className="pixel-message">{logoutMessage}</div>
        </PixelFormContainer>
    );
};

export default LogoutPage;
