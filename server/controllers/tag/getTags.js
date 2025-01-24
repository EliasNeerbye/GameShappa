const Tag = require("../../models/Tag");

const getTags = async (req, res) => {
    const tags = await Tag.find();
    if (tags.length < 1) return res.status(404).json({ message: "No tags found!", success: false, tags: null });
    return res.status(200).json({ message: "Tags found!", success: true, tags });
};

module.exports = getTags;
