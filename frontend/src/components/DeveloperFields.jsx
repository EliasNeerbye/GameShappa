import { Plus, X } from "lucide-react";
import PropTypes from "prop-types";
import "../css/components/DeveloperFields.css";

const DeveloperFields = ({ developers, onUpdate, error, disabled }) => {
    const handleDeveloperChange = (index, value) => {
        const newDevelopers = [...developers];
        newDevelopers[index] = value;
        onUpdate(newDevelopers);
    };

    const addDeveloper = () => {
        onUpdate([...developers, ""]);
    };

    const removeDeveloper = (index) => {
        if (developers.length > 1) {
            const newDevelopers = developers.filter((_, i) => i !== index);
            onUpdate(newDevelopers);
        }
    };

    return (
        <div className="developer-fields">
            <label>DEVELOPERS</label>
            {developers.map((dev, index) => (
                <div key={index} className="developer-input-group">
                    <input
                        type="text"
                        value={dev}
                        onChange={(e) => handleDeveloperChange(index, e.target.value)}
                        className={`developer-input ${error ? "error" : ""}`}
                        disabled={disabled}
                        placeholder="Developer name"
                    />
                    {developers.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeDeveloper(index)}
                            className="remove-developer-btn"
                            disabled={disabled}
                            aria-label="Remove developer"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={addDeveloper} className="add-developer-btn" disabled={disabled}>
                <Plus size={20} /> Add Developer
            </button>
            {error && <span className="pixel-error-message">{error}</span>}
        </div>
    );
};

DeveloperFields.propTypes = {
    developers: PropTypes.arrayOf(PropTypes.string).isRequired,
    onUpdate: PropTypes.func.isRequired,
    error: PropTypes.string,
    disabled: PropTypes.bool,
};

DeveloperFields.defaultProps = {
    error: "",
    disabled: false,
};

export default DeveloperFields;
