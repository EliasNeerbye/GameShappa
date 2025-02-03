import PropTypes from "prop-types";

import "../css/components/PixelFormContainer.css";

const PixelFormContainer = ({ title = "", children, className = "", ...props }) => {
    return (
        <div className={`pixel-form-container ${className}`.trim()} {...props}>
            {title && <h1 className="pixel-form-title">{title}</h1>}
            {children}
        </div>
    );
};

PixelFormContainer.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default PixelFormContainer;
