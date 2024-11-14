import PropTypes from "prop-types";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import "./button.css";

const Button = ({
  backgroundColor = null,
  label,
  iconComponent: IconComponent = null, // Default icon is null, so it won’t be shown if not passed
  loading = false,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center rounded-lg border border-black bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
      style={backgroundColor && { backgroundColor }}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="loader h-5 w-5 border-2 border-t-2 border-black rounded-full animate-spin mr-2" />
      ) : (
        IconComponent && (
          <IconComponent aria-hidden="true" className="-ml-0.5 h-5 w-5 mr-2" />
        )
      )}
      {label}
    </button>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  iconComponent: PropTypes.elementType, // Allow custom icon component to be passed
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
