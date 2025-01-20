const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        originalPrice: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            min: 0,
            max: 100,
            required: true,
            default: 0,
        },
        description: {
            type: String,
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
            maxLength: 250,
        },
        publisher: {
            type: String,
            required: true,
        },
        developer: [
            {
                type: String,
                required: true,
            },
        ],
        releaseDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["In Development", "Alpha", "Beta", "Early Access", "Released"],
            required: true,
        },
        images: [
            {
                type: String,
                required: false,
            },
        ],
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tags",
                required: false,
            },
        ],
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Reviews",
                required: false,
            },
        ],
    },
    { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
