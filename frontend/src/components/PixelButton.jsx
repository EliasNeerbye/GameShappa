import PropTypes from "prop-types";

import "../css/components/PixelButton.css";

const PixelButton = ({ children, type = "button", variant = "primary", disabled = false, className = "", onClick = () => {}, ...props }) => {
    const baseClass = "pixel-button";
    const variantClass = variant === "secondary" ? `${baseClass}--secondary` : "";
    const classes = `${baseClass} ${variantClass} ${className}`.trim();

    return (
        <button type={type} className={classes} disabled={disabled} onClick={onClick} {...props}>
            {children}
        </button>
    );
};

PixelButton.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    variant: PropTypes.oneOf(["primary", "secondary"]),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default PixelButton;
