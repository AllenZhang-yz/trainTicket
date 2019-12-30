import React, { memo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./Choose.css";

const Choose = memo(({ passengers, updatePassenger }) => {
  const createSeat = seatType => {
    return (
        <div>
            {passengers.map(passenger => (
                <p
            key={passenger.id}
            className={classnames("seat", {
              active: passenger.seat === seatType
            })}
            data-text={seatType}
            onClick={() => updatePassenger(passenger.id, { seat: seatType })}
          >
            &#xe02d;
                </p>
        ))}
        </div>
    );
  };

  return (
      <div className="choose">
          <p className="tip">Choose Seat Online</p>
          <div className="container">
              <div className="seats">
                  <div>Window</div>
                  {createSeat("A")}
                  {createSeat("B")}
                  {createSeat("C")}
                  <div>Isle</div>
                  {createSeat("D")}
                  {createSeat("F")}
                  <div>Window</div>
              </div>
          </div>
      </div>
  );
});

Choose.propTypes = {
  passengers: PropTypes.array.isRequired,
  updatePassenger: PropTypes.func.isRequired
};

export default Choose;
