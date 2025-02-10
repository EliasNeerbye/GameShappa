import PropTypes from "prop-types";

import "../css/components/GameCard.css";

const GameCard = ({ game }) => {
    const { _id, title, originalPrice, discount, shortDescription, publisher, developer, releaseDate, status } = game;

    const discountedPrice = originalPrice * (1 - discount / 100);

    return (
        <div className="game-card">
            <h2>{title}</h2>
            <p>
                <strong>Publisher:</strong> {publisher}
            </p>
            <p>
                <strong>Developer:</strong> {developer.join(", ")}
            </p>
            <p>
                <strong>Release Date:</strong> {new Date(releaseDate).toLocaleDateString()}
            </p>
            <p>
                <strong>Status:</strong> {status}
            </p>
            <p>{shortDescription}</p>
            <p>
                <strong>Price:</strong> ${discountedPrice.toFixed(2)}
                {discount > 0 && <s> ${originalPrice.toFixed(2)}</s>}
            </p>

            <button className="pixel-button" onClick={() => (window.location.href = `/game/${_id}`)}>
                More Information
            </button>
        </div>
    );
};

GameCard.propTypes = {
    game: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        originalPrice: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
        shortDescription: PropTypes.string.isRequired,
        publisher: PropTypes.string.isRequired,
        developer: PropTypes.arrayOf(PropTypes.string).isRequired,
        releaseDate: PropTypes.string.isRequired,
        status: PropTypes.oneOf(["In Development", "Alpha", "Beta", "Early Access", "Released"]).isRequired,
    }).isRequired,
};

export default GameCard;
