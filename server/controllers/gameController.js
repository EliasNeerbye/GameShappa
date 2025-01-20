const getGames = require("./game/getGames");
const getGame = require("./game/getGame");
const createGame = require("./game/createGame");
const updateGame = require("./game/updateGame");
const deleteGame = require("./game/deleteGame");

const gameController = {
    get: {
        game: getGame,
        games: getGames,
    },
    post: {
        game: createGame,
    },
    put: {
        game: updateGame,
    },
    delete: {
        game: deleteGame,
    },
};

module.exports = gameController;
