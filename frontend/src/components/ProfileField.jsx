import PropTypes from "prop-types";
import "../css/components/ProfileField.css";

const ProfileField = ({ label, value, children }) => {
    return (
        <div className="profile-field">
            <div className="profile-field-label">{label}</div>
            <div className="profile-field-value">{children || value || "Not provided"}</div>
        </div>
    );
};

ProfileField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node,
};

export default ProfileField;
