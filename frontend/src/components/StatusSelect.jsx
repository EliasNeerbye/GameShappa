import PropTypes from "prop-types";
import "../css/components/StatusSelect.css";

const StatusSelect = ({ value, onChange, disabled, error }) => {
    return (
        <div className="status-select">
            <label htmlFor="status">STATUS</label>
            <select id="status" name="status" value={value} onChange={onChange} disabled={disabled} className={error ? "error" : ""}>
                <option value="In Development">In Development</option>
                <option value="Alpha">Alpha</option>
                <option value="Beta">Beta</option>
                <option value="Early Access">Early Access</option>
                <option value="Released">Released</option>
            </select>
            {error && <span className="pixel-error-message">{error}</span>}
        </div>
    );
};

StatusSelect.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.string,
};

StatusSelect.defaultProps = {
    disabled: false,
    error: "",
};

export default StatusSelect;
