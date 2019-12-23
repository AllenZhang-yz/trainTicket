import React from "react";
import switchImg from "./img/switch.svg";
import "./Journey.css";

const Journey = ({ from, to, exchangeFromTo, showCitySelector }) => {
  return (
    <div className="journey">
      <div className="journey-station" onClick={() => showCitySelector(true)}>
        <input
          type="text"
          readOnly
          name="from"
          value={from}
          className="journey-input journey-from"
        />
      </div>
      <div className="journey-switch" onClick={() => exchangeFromTo()}>
        <img src={switchImg} width="70" height="40" alt="switch" />
      </div>
      <div className="journey-station" onClick={() => showCitySelector(false)}>
        <input
          type="text"
          readOnly
          name="to"
          value={to}
          className="journey-input journey-to"
        />
      </div>
    </div>
  );
};

export default Journey;
