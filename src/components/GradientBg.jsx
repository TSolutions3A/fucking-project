import { PropTypes } from "prop-types";

const GradientBg = ({ children }) => {
  return (
    <div className="w-full h-full max-h-82 bg-[#12172C] p-3  flex items-center justify-center rounded-3xl relative ">
      {children}

      <div className="absolute inset-0 z-[-1] w-full h-full ">
        <img
          src="/assets/images/glow.svg"
          className="max-w-full h-auto object-cover"
          alt=""
        />
      </div>
    </div>
  );
};
GradientBg.propTypes = {
  children: PropTypes.any,
};
export default GradientBg;
