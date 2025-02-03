import PropTypes from "prop-types";

import "../css/components/PixelInput.css";

const PixelInput = ({
    label = "",
    id,
    error = "",
    icon = null,
    className = "",
    children = null,
    type = "text",
    disabled = false,
    required = false,
    ...props
}) => {
    return (
        <div className="pixel-input-group">
            {label && (
                <label className="pixel-label" htmlFor={id}>
                    {label}
                </label>
            )}
            <div className="pixel-input-wrapper">
                <input
                    id={id}
                    type={type}
                    className={`pixel-input ${error ? "error" : ""} ${className}`.trim()}
                    disabled={disabled}
                    required={required}
                    {...props}
                />
                {icon && <div className="pixel-input-icon">{icon}</div>}
                {children}
            </div>
            {error && <span className="pixel-error-message">{error}</span>}
        </div>
    );
};

PixelInput.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    error: PropTypes.string,
    icon: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    autoComplete: PropTypes.string,
};

export default PixelInput;
