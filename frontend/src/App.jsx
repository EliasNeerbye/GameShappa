import { Route, Routes } from "react-router-dom";
import "./css/App.css";
//Pages
import LandingPage from "./pages/LandingPage";
import RegistrationForm from "./pages/RegistrationForm";
import LogoutPage from "./pages/LogoutPage";
import LoginForm from "./pages/LoginForm";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/logout" element={<LogoutPage />} />
            </Routes>
        </>
    );
}

export default App;
