import PropTypes from "prop-types";
import { X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import "../css/components/PixelToast.css";

const PixelToast = ({ message, type = "success", duration = 3000, onClose, isVisible = false }) => {
    const [shouldRender, setShouldRender] = useState(isVisible);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setShouldRender(false);
            if (onClose) onClose();
        }, 300); // Match the CSS animation duration
    }, [onClose]);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
            setIsClosing(false);

            const timer = setTimeout(() => {
                handleClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, handleClose]);

    if (!shouldRender) return null;

    return (
        <div className={`pixel-toast ${type} ${isClosing ? "closing" : ""} ${isVisible ? "visible" : ""}`} role="alert">
            <div className="pixel-toast-content">{message}</div>
            <button className="pixel-toast-close" onClick={handleClose} aria-label="Close notification">
                <X size={16} />
            </button>
        </div>
    );
};

PixelToast.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["success", "error", "info", "warning"]),
    duration: PropTypes.number,
    onClose: PropTypes.func,
    isVisible: PropTypes.bool,
};

export default PixelToast;
