import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL + "/api/auth/getUser";

        axios
            .get(backendUrl, { withCredentials: true })
            .then((response) => {
                setUser(response.data.user);
            })
            .catch((err) => {
                console.error("Error fetching user:", err);
                setUser(null);
            });
    }, []);

    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

// ✅ Prop validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
