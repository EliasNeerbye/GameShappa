// Models
const Game = require("../../models/Game");

const postGame = async (req, res) => {
    const { title, originalPrice, description, shortDescription, publisher, developer, releaseDate, status } = req.body;

    const newGame = new Game({
        title,
        originalPrice,
        description,
        shortDescription,
        publisher,
        developer,
        releaseDate,
        status,
    });

    console.log(newGame);

    res.send("Cool");
};

module.exports = postGame;
