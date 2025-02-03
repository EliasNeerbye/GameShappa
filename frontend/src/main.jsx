import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import "./css/index.css";
import App from "./App.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";

//Components
import NavBar from "./components/NavBar.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <NavBar />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
);
