const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        recommended: {
            type: Boolean,
            required: false,
        },
        stars: {
            type: Number,
            required: false,
            max: 10,
            min: 1,
        },
        game: {
            type: Schema.Types.ObjectId,
            ref: "Game",
            required: true,
        },
    },
    { timestamps: true }
);

const Reviews = mongoose.model("Review", reviewsSchema);
module.exports = Reviews;
