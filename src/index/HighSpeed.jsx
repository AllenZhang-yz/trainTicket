import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./HighSpeed.css";

const HighSpeed = ({ highSpeed, toggle }) => {
  return (
    <div className="high-speed">
      <div className="high-speed-label">Only High Speed Trains</div>
      <div className="high-speed-switch" onClick={toggle}>
        <input type="hidden" name="highSpeed" value={highSpeed} />
        <div className={classnames("high-speed-track", { checked: highSpeed })}>
          <span
            className={classnames("high-speed-handle", { checked: highSpeed })}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default HighSpeed;

HighSpeed.propTypes = {
  highSpeed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};
