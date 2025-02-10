import { useState } from "react";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
import PixelButton from "../components/PixelButton";
import PixelInput from "../components/PixelInput";
import PixelFormContainer from "../components/PixelFormContainer";
import TagSelector from "../components/TagSelector";
import StatusSelect from "../components/StatusSelect";
import DeveloperFields from "../components/DeveloperFields";
import PixelToast from "../components/PixelToast";

import "../css/pages/GameForm.css";

const createGameUrl = import.meta.env.VITE_BACKEND_URL + "/api/games";

const GameForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        originalPrice: "",
        discount: 0,
        description: "",
        shortDescription: "",
        publisher: "",
        developer: [""],
        releaseDate: "",
        status: "In Development",
        tags: [],
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "", visible: false });

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title) {
            newErrors.title = "Title is required";
        }

        if (!formData.originalPrice) {
            newErrors.originalPrice = "Original price is required";
        } else if (isNaN(formData.originalPrice) || formData.originalPrice < 0) {
            newErrors.originalPrice = "Price must be a valid positive number";
        }

        if (!formData.description) {
            newErrors.description = "Description is required";
        }

        if (!formData.shortDescription) {
            newErrors.shortDescription = "Short description is required";
        } else if (formData.shortDescription.length > 250) {
            newErrors.shortDescription = "Short description must be less than 250 characters";
        }

        if (!formData.publisher) {
            newErrors.publisher = "Publisher is required";
        }

        if (!formData.developer[0]) {
            newErrors.developer = "At least one developer is required";
        }

        if (!formData.releaseDate) {
            newErrors.releaseDate = "Release date is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setToast({ message: "", type: "", visible: false });
    };

    const handleTagsChange = (selectedTags) => {
        setFormData((prev) => ({
            ...prev,
            tags: selectedTags,
        }));
    };

    const handleDevelopersChange = (developers) => {
        setFormData((prev) => ({
            ...prev,
            developer: developers,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            setToast({ message: "", type: "", visible: false });

            try {
                const response = await axios.post(createGameUrl, formData, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.data.success) {
                    setToast({
                        message: "Game created successfully! Redirecting...",
                        type: "success",
                        visible: true,
                    });
                    setFormData({
                        title: "",
                        originalPrice: "",
                        discount: 0,
                        description: "",
                        shortDescription: "",
                        publisher: "",
                        developer: [""],
                        releaseDate: "",
                        status: "In Development",
                        tags: [],
                    });
                    setTimeout(() => {
                        window.location.href = `/games/${response.data.gameId}`;
                    }, 3000);
                } else {
                    setToast({
                        message: response.data.message || "Failed to create game",
                        type: "error",
                        visible: true,
                    });
                }
            } catch (error) {
                setToast({
                    message: error.response?.data?.message || "An error occurred while creating the game",
                    type: "error",
                    visible: true,
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <PixelFormContainer title="Create New Game">
            <form className="pixel-form" onSubmit={handleSubmit}>
                <PixelInput
                    label="TITLE"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    error={errors.title}
                    disabled={isLoading}
                    required
                />

                <PixelInput
                    label="ORIGINAL PRICE"
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    error={errors.originalPrice}
                    disabled={isLoading}
                    required
                />

                <PixelInput
                    label="DISCOUNT (%)"
                    id="discount"
                    name="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={handleChange}
                    error={errors.discount}
                    disabled={isLoading}
                />

                <PixelInput
                    label="SHORT DESCRIPTION"
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    error={errors.shortDescription}
                    disabled={isLoading}
                    required
                    maxLength={250}
                />

                <div className="pixel-input-group">
                    <label className="pixel-label" htmlFor="description">
                        DESCRIPTION
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`pixel-textarea ${errors.description ? "error" : ""}`}
                        disabled={isLoading}
                        required
                    />
                    {errors.description && <span className="pixel-error-message">{errors.description}</span>}
                </div>

                <PixelInput
                    label="PUBLISHER"
                    id="publisher"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    error={errors.publisher}
                    disabled={isLoading}
                    required
                />

                <DeveloperFields developers={formData.developer} onUpdate={handleDevelopersChange} error={errors.developer} disabled={isLoading} />

                <PixelInput
                    label="RELEASE DATE"
                    id="releaseDate"
                    name="releaseDate"
                    type="date"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    error={errors.releaseDate}
                    disabled={isLoading}
                    required
                    icon={<CalendarIcon size={20} />}
                />

                <StatusSelect value={formData.status} onChange={(e) => handleChange(e)} disabled={isLoading} />

                <div className="pixel-input-group">
                    <label className="pixel-label">TAGS</label>
                    <TagSelector selectedTags={formData.tags} onTagsChange={handleTagsChange} disabled={isLoading} />
                </div>

                <PixelButton type="submit" disabled={isLoading}>
                    {isLoading ? "CREATING GAME..." : "CREATE GAME"}
                </PixelButton>
            </form>

            <PixelToast message={toast.message} type={toast.type} isVisible={toast.visible} onClose={() => setToast({ ...toast, visible: false })} />
        </PixelFormContainer>
    );
};

export default GameForm;
