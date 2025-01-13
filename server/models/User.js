const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: false,
            trim: true,
            minlength: 3,
            maxlength: 8,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
        },

        age: {
            type: Number,
            required: false,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        address: {
            type: {
                zipCode: Number,
                city: String,
            },
            required: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
