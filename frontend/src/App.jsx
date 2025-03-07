import { Route, Routes } from "react-router-dom";
import "./css/App.css";
//Pages
import LandingPage from "./pages/LandingPage";
import RegistrationForm from "./pages/RegistrationForm";
import LogoutPage from "./pages/LogoutPage";
import LoginForm from "./pages/LoginForm";
import GameForm from "./pages/GameForm";
import ProfilePage from "./pages/ProfilePage";
import GameList from "./pages/GameList";
import GamePage from "./pages/GamePage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/games" element={<GameList />} />
                <Route path="/game/:id" element={<GamePage />} />
            </Routes>
        </>
    );
}

export default App;
