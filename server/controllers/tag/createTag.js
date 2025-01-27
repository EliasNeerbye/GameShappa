const Tag = require("../../models/Tag");

const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const newTag = new Tag({ name });
        await newTag.save();
        res.status(200).json({ message: "Tag created!", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error!", success: true });
    }
};

module.exports = createTag;
