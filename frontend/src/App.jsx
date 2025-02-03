import { Route, Routes } from "react-router-dom";
import "./css/App.css";
//Pages
import LandingPage from "./pages/LandingPage";
import RegistrationForm from "./pages/RegistrationForm";
import LoginForm from "./pages/LoginForm";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </>
    );
}

export default App;
