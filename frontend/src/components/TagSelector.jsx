import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import PropTypes from "prop-types";
import "../css/components/TagSelector.css";

const TagSelector = ({ selectedTags, onTagsChange, disabled, error }) => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [isCreatingTag, setIsCreatingTag] = useState(false);
    const [tagError, setTagError] = useState("");

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tags`, {
                credentials: "include",
            });
            const data = await response.json();
            if (response.ok) {
                setTags(data.tags);
            } else {
                setTagError("Failed to fetch tags");
            }
        } catch (error) {
            console.error("Failed to fetch tags:", error);
            setTagError("Error loading tags. Please try again.");
        }
    };

    const createTag = async () => {
        if (!newTag.trim()) {
            setTagError("Tag name cannot be empty");
            return;
        }
        setIsCreatingTag(true);
        setTagError("");
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tags`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ names: newTag.trim() }),
            });
            const data = await response.json();
            if (response.ok) {
                await fetchTags();
                setNewTag("");
                if (data.tags[0]) {
                    handleTagSelect(data.tags[0]._id);
                }
            } else {
                setTagError(data.message || "Failed to create tag");
            }
        } catch (error) {
            console.error("Failed to create tag:", error);
            setTagError("Error creating tag. Please try again.");
        } finally {
            setIsCreatingTag(false);
        }
    };

    const handleTagSelect = (tagId) => {
        const isSelected = selectedTags.includes(tagId);
        const updatedTags = isSelected ? selectedTags.filter((id) => id !== tagId) : [...selectedTags, tagId];
        onTagsChange(updatedTags);
    };

    return (
        <div className="tag-selector">
            <div className="tag-list">
                {tags.map((tag) => (
                    <button
                        key={tag._id}
                        type="button"
                        onClick={() => handleTagSelect(tag._id)}
                        className={`tag-button ${selectedTags.includes(tag._id) ? "selected" : ""}`}
                        disabled={disabled}
                    >
                        {tag.name}
                        {selectedTags.includes(tag._id) && <X size={14} />}
                    </button>
                ))}
            </div>
            <div className="new-tag-input">
                <input
                    type="text"
                    value={newTag}
                    onChange={(e) => {
                        setNewTag(e.target.value);
                        setTagError("");
                    }}
                    placeholder="New tag name"
                    className={`pixel-input ${tagError || error ? "error" : ""}`}
                    disabled={disabled || isCreatingTag}
                />
                <button type="button" onClick={createTag} className="add-tag-btn" disabled={disabled || isCreatingTag || !newTag.trim()}>
                    <Plus size={20} />
                </button>
            </div>
            {(error || tagError) && <span className="pixel-error-message">{error || tagError}</span>}
        </div>
    );
};

TagSelector.propTypes = {
    selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    onTagsChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.string,
};

TagSelector.defaultProps = {
    disabled: false,
    error: "",
};

export default TagSelector;
