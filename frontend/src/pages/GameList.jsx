import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "../components/GameCard";
import "../css/pages/GameList.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL + "/api/games";

const GameList = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get(backendUrl);
                setGames(response.data.games);
            } catch (err) {
                console.log(err);
                setError("Failed to fetch games.");
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) return <p>Loading games...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="game-list">
            <h1>Game Listings</h1>
            <div className="game-list-container">{games ? games.map((game) => <GameCard key={game._id} game={game} />) : <p>No games available.</p>}</div>
        </div>
    );
};

export default GameList;
