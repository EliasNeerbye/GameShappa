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
        <div>
            {game ? (
                <div>
                    <h1>{game.title}</h1>
                    <p>
                        <strong>Price:</strong> ${game.originalPrice}
                    </p>
                    <p>
                        <strong>Discount:</strong> {game.discount}%
                    </p>
                    <p>
                        <strong>Description:</strong> {game.description}
                    </p>
                    {game.shortDescription && (
                        <p>
                            <strong>Short Description:</strong> {game.shortDescription}
                        </p>
                    )}
                    <p>
                        <strong>Publisher:</strong> {game.publisher}
                    </p>
                    {game.developer.length > 0 && (
                        <div>
                            <strong>Developers:</strong>
                            <ul>
                                {game.developer.map((dev, index) => (
                                    <li key={index}>{dev}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <p>
                        <strong>Release Date:</strong> {new Date(game.releaseDate).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Status:</strong> {game.status}
                    </p>

                    {game.images && game.images.length > 0 && (
                        <div>
                            <strong>Images:</strong>
                            <div>
                                {game.images.map((image, index) => (
                                    <img key={index} src={image} alt={`Game Image ${index + 1}`} width="300" />
                                ))}
                            </div>
                        </div>
                    )}

                    {game.tags && game.tags.length > 0 && (
                        <div>
                            <strong>Tags:</strong>
                            <ul>
                                {game.tags.map((tag, index) => (
                                    <li key={index}>{tag.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {game.reviews && game.reviews.length > 0 && (
                        <div>
                            <strong>Reviews:</strong>
                            <ul>
                                {game.reviews.map((review, index) => (
                                    <li key={index}>
                                        <strong>{review.author}</strong>: {review.content} <br />
                                        <em>Rating: {review.rating}/10</em> {/* Assuming the Review object has 'author', 'content', and 'rating' fields */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <p>No game found.</p>
            )}
        </div>
    );
}
