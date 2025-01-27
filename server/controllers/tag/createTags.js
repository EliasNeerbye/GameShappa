const Tag = require("../../models/Tag");

const createTags = async (req, res) => {
    try {
        let names = req.body.names;

        if (!Array.isArray(names)) names = [names];

        const savedTags = await Promise.all(
            names.map(async (name) => {
                if (name && typeof name === "string" && name.trim()) {
                    const newTag = new Tag({ name: name.trim() });
                    return await newTag.save();
                }
                return null;
            })
        );

        const validTags = savedTags.filter((tag) => tag !== null);

        res.status(201).json({
            message: validTags.length > 0 ? "Tags created successfully" : "No valid tags to create",
            tags: validTags,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = createTags;
