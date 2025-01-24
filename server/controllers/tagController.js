const Tag = require("../models/Tag");

const getTags = require("./tag/getTags");
const getTag = require("./tag/getTag");

const gameController = {
    get: {
        all: getTags,
        one: getTag,
    },
    create: async (req, res) => {
        try {
            const { name } = req.body;
            const newTag = Tag.new({ name });
            await newTag.save();
            res.status(200).json({ message: "Tag created!", success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error!", success: true });
        }
    },
    edit: async (req, res) => {
        try {
            await Tag.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).json({ message: "Tag updated successfully!", success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error!", success: true });
        }
    },
    delete: async (req, res) => {
        try {
            await Tag.findByIdAndDelete(req.params.id);
            res.status(202).json({ message: "Tag deleted successfully!", success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error!", success: true });
        }
    },
};

module.exports = gameController;
