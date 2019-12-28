import React, { memo } from "react";
import PropTypes from "prop-types";
import "./Passengers.css";

const Passenger = memo(
  ({
    id,
    name,
    followAdult,
    ticketType,
    licenceNo,
    gender,
    birthday,
    onRemove,
    onUpdate
  }) => {
    return (
      <li className="passenger">
        <i className="delete" onClick={() => onRemove(id)}>
          —
        </i>
        <ol className="items">
          <li className="item">
            <label className="label name">Name</label>
            <input
              type="text"
              className="input name"
              placeholder="Passenger Name"
              value={name}
              onChange={e => onUpdate(id, { name: e.target.value })}
            />
            <label className="ticket-type">
              {ticketType === "adult" ? "Adult" : "Child"}
            </label>
          </li>
        </ol>
      </li>
    );
  }
);

Passenger.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  followAdult: PropTypes.number,
  ticketType: PropTypes.string.isRequired,
  licenceNo: PropTypes.string,
  gender: PropTypes.string,
  birthday: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

const Passengers = memo(
  ({
    passengers,
    createAdult,
    createChild,
    removePassenger,
    updatePassenger
  }) => {
    return (
      <div className="passengers">
        <ul>
          {passengers.map(passenger => (
            <Passenger
              {...passenger}
              key={passenger.id}
              onRemove={removePassenger}
              onUpdate={updatePassenger}
            />
          ))}
        </ul>
        <section className="add">
          <div className="adult" onClick={createAdult}>
            Add Adult
          </div>
          <div className="child" onClick={createChild}>
            Add Child
          </div>
        </section>
      </div>
    );
  }
);

Passengers.propTypes = {
  passengers: PropTypes.array.isRequired,
  createAdult: PropTypes.func.isRequired,
  createChild: PropTypes.func.isRequired
};

export default Passengers;
