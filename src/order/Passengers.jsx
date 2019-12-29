import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import "./Passengers.css";

const Passenger = memo(
  ({
    id,
    name,
    // followAdult,
    ticketType,
    licenceNo,
    gender,
    birthday,
    onRemove,
    onUpdate,
    showGenderMenu,
    showFollowAdultMenu,
    showTicketTypeMenu,
    followAdultName
  }) => {
    const isAdult = ticketType === "adult";

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
            <label
              className="ticket-type"
              onClick={() => showTicketTypeMenu(id)}
            >
              {isAdult ? "Adult" : "Child"}
            </label>
          </li>
          {isAdult && (
            <li className="item">
              <label className="label licenceNo">ID No.</label>
              <input
                type="text"
                className="input licenceNo"
                placeholder="ID Number"
                value={licenceNo}
                onChange={e => onUpdate(id, { licenceNo: e.target.value })}
              />
            </li>
          )}
          {!isAdult && (
            <li className="item arrow">
              <label className="label gender">Gender</label>
              <input
                type="text"
                className="input gender"
                onClick={() => showGenderMenu(id)}
                placeholder="Please choose"
                value={
                  gender === "male"
                    ? "Male"
                    : gender === "female"
                    ? "Female"
                    : ""
                }
                readOnly
              />
            </li>
          )}
          {!isAdult && (
            <li className="item">
              <label className="label birthday">DOB</label>
              <input
                type="text"
                className="input birthday"
                placeholder="ex: 19951010"
                value={birthday}
                onChange={e => onUpdate(id, { birthday: e.target.value })}
              />
            </li>
          )}
          {!isAdult && (
            <li className="item arrow">
              <label className="label followAdult">Peer Adult</label>
              <input
                type="text"
                className="input followAdult"
                onClick={() => showFollowAdultMenu(id)}
                placeholder="Please choose"
                value={followAdultName}
                readOnly
              />
            </li>
          )}
        </ol>
      </li>
    );
  }
);

Passenger.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  followAdult: PropTypes.number,
  followAdultName: PropTypes.string,
  ticketType: PropTypes.string.isRequired,
  licenceNo: PropTypes.string,
  gender: PropTypes.string,
  birthday: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  showGenderMenu: PropTypes.func.isRequired,
  showFollowAdultMenu: PropTypes.func.isRequired,
  showTicketTypeMenu: PropTypes.func.isRequired
};

const Passengers = memo(
  ({
    passengers,
    createAdult,
    createChild,
    removePassenger,
    updatePassenger,
    showGenderMenu,
    showFollowAdultMenu,
    showTicketTypeMenu
  }) => {
    const nameMap = useMemo(() => {
      const ret = {};
      for (const passenger of passengers) {
        ret[passenger.id] = passenger.name;
      }
      return ret;
    }, [passengers]);

    return (
      <div className="passengers">
        <ul>
          {passengers.map(passenger => (
            <Passenger
              {...passenger}
              key={passenger.id}
              followAdultName={nameMap[passenger.followAdult]}
              onRemove={removePassenger}
              onUpdate={updatePassenger}
              showGenderMenu={showGenderMenu}
              showFollowAdultMenu={showFollowAdultMenu}
              showTicketTypeMenu={showTicketTypeMenu}
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
  createChild: PropTypes.func.isRequired,
  showGenderMenu: PropTypes.func.isRequired,
  showFollowAdultMenu: PropTypes.func.isRequired,
  showTicketTypeMenu: PropTypes.func.isRequired
};

export default Passengers;
