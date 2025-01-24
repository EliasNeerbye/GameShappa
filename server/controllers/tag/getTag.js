const Tag = require("../../models/Tag");

const getTag = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) return res.status(404).json({ message: "No tag found!", success: false, tags: null });
        return res.status(200).json({ message: "Tag found!", success: true, tag });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error!", success: true });
    }
};

module.exports = getTag;
