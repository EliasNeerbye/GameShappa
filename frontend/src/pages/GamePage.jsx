import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../css/pages/GamePage.css";

export default function GamePage() {
    const { id } = useParams();

    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const retrieveGame = async () => {
            try {
                const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/api/games/${id}`;
                const response = await axios.get(backendUrl, { withCredentials: true });
                setGame(response.data.game);
            } catch (error) {
                console.error("Error fetching game:", error);
                setError("Failed to fetch game details.");
            } finally {
                setLoading(false);
            }
        };

        retrieveGame();
    }, [id]);

    if (loading) return <p>Loading game...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="game-page">
            <div className="game-header">
                <h1>{game.title}</h1>
                <div className="game-price">
                    <strong>${game.originalPrice}</strong>
                    {game.discount && <span>({game.discount}% off)</span>}
                </div>
            </div>

            <div className="game-info">
                <p>
                    <strong>Description:</strong> {game.description}
                </p>
                {game.shortDescription && (
                    <p>
                        <strong>Short Description:</strong> {game.shortDescription}
                    </p>
                )}
                <p>
                    <strong>Publisher:</strong> <span>{game.publisher}</span>
                </p>

                {game.developer.length > 0 && (
                    <section>
                        <strong>Developers:</strong>
                        <ul>
                            {game.developer.map((dev, index) => (
                                <li key={index}>{dev}</li>
                            ))}
                        </ul>
                    </section>
                )}

                <p>
                    <strong>Release Date:</strong> <span>{new Date(game.releaseDate).toLocaleDateString()}</span>
                </p>
                <p>
                    <strong>Status:</strong> <span>{game.status}</span>
                </p>
            </div>

            {game.images && game.images.length > 0 && (
                <section className="game-gallery">
                    <strong>Images:</strong>
                    <div>
                        {game.images.map((image, index) => (
                            <img key={index} src={image} alt={`Game Image ${index + 1}`} />
                        ))}
                    </div>
                </section>
            )}

            {game.tags && game.tags.length > 0 && (
                <section className="game-tags">
                    <strong>Tags:</strong>
                    <ul>
                        {game.tags.map((tag, index) => (
                            <li key={index}>{tag.name}</li>
                        ))}
                    </ul>
                </section>
            )}

            {game.reviews && game.reviews.length > 0 && (
                <section className="game-reviews">
                    <strong>Reviews:</strong>
                    <div>
                        {game.reviews.map((review, index) => (
                            <article className="game-review" key={index}>
                                <strong>{review.author}</strong>: {review.content} <br />
                                <em className="review-rating">Rating: {review.rating}/10</em>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );    
}
