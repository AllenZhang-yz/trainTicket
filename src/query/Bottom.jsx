import React, { memo, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Slider from "./Slider";
import "./Bottom.css";
import { ORDER_DEPART } from "./constant";

const Filter = memo(({ name, checked, value, toggle }) => {
  return (
      <li className={classnames({ checked })} onClick={() => toggle(value)}>
          {name}
      </li>
  );
});

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired
};

const Option = memo(({ title, options, checkedMap, update }) => {
  const toggle = useCallback(
    value => {
      const newCheckedMap = { ...checkedMap };
      if (value in checkedMap) {
        delete newCheckedMap[value];
      } else {
        newCheckedMap[value] = true;
      }
      update(newCheckedMap);
    },
    [checkedMap, update]
  );

  return (
      <div className="option">
          <h3>{title}</h3>
          <ul>
              {options.map(option => (
                  <Filter
            key={option.value}
            {...option}
            checked={option.value in checkedMap}
            toggle={toggle}
          />
        ))}
          </ul>
      </div>
  );
});

Option.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  checkedMap: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
};

const BottomModal = memo(
  ({
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
    toggleIsFiltersVisible
  }) => {
    const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(
      () => {
        return {
          ...checkedTicketTypes
        };
      }
    );

    const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(() => {
      return {
        ...checkedTrainTypes
      };
    });

    const [
      localCheckedDepartStations,
      setLocalCheckedDepartStations
    ] = useState(() => {
      return {
        ...checkedDepartStations
      };
    });

    const [
      localCheckedArriveStations,
      setLocalCheckedArriveStations
    ] = useState(() => {
      return {
        ...checkedArriveStations
      };
    });

    const [localDepartTimeStart, setLocalDepartTimeStart] = useState(
      departTimeStart
    );
    const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
    const [localArriveTimeStart, setLocalArriveTimeStart] = useState(
      arriveTimeStart
    );
    const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);

    const optionGroup = [
      {
        title: "Ticket Types",
        options: ticketTypes,
        checkedMap: localCheckedTicketTypes,
        update: setLocalCheckedTicketTypes
      },
      {
        title: "Train Types",
        options: trainTypes,
        checkedMap: localCheckedTrainTypes,
        update: setLocalCheckedTrainTypes
      },
      {
        title: "Depart Station",
        options: departStations,
        checkedMap: localCheckedDepartStations,
        update: setLocalCheckedDepartStations
      },
      {
        title: "Arrive Station",
        options: arriveStations,
        checkedMap: localCheckedArriveStations,
        update: setLocalCheckedArriveStations
      }
    ];

    const sure = () => {
      setCheckedTicketTypes(localCheckedTicketTypes);
      setCheckedTrainTypes(localCheckedTrainTypes);
      setCheckedDepartStations(localCheckedDepartStations);
      setCheckedArriveStations(localCheckedDepartStations);

      setDepartTimeStart(localDepartTimeStart);
      setDepartTimeEnd(localDepartTimeEnd);

      setArriveTimeStart(localArriveTimeStart);
      setArriveTimeEnd(localArriveTimeEnd);

      toggleIsFiltersVisible();
    };

    const reset = () => {
      if (isResetDisabled) {
        return;
      }
      setLocalCheckedTicketTypes({});
      setLocalCheckedTrainTypes({});
      setLocalCheckedDepartStations({});
      setLocalCheckedArriveStations({});
      setLocalDepartTimeStart(0);
      setLocalDepartTimeEnd(24);
      setLocalArriveTimeStart(0);
      setLocalArriveTimeEnd(24);
    };

    const isResetDisabled = useMemo(() => {
      return (
        Object.keys(localCheckedTicketTypes).length === 0 &&
        Object.keys(localCheckedTrainTypes).length === 0 &&
        Object.keys(localCheckedDepartStations).length === 0 &&
        Object.keys(localCheckedArriveStations).length === 0 &&
        localDepartTimeStart === 0 &&
        localDepartTimeEnd === 24 &&
        localArriveTimeStart === 0 &&
        localArriveTimeEnd === 24
      );
    }, [
      localCheckedTicketTypes,
      localCheckedTrainTypes,
      localCheckedDepartStations,
      localCheckedArriveStations,
      localDepartTimeStart,
      localDepartTimeEnd,
      localArriveTimeStart,
      localArriveTimeEnd
    ]);

    return (
        <div className="bottom-modal">
            <div className="bottom-dialog">
                <div className="bottom-dialog-content">
                    <div className="title">
                        <span
                className={classnames("reset", { disabled: isResetDisabled })}
                onClick={reset}
              >
                Reset
                        </span>
                        <span className="ok" onClick={sure}>
                OK
                        </span>
                    </div>
                    <div className="options">
                        {optionGroup.map(group => (
                            <Option key={group.title} {...group} />
              ))}
                        <Slider
                title="Depart Time"
                currentStartHours={localDepartTimeStart}
                currentEndHours={localDepartTimeEnd}
                onStartChanged={setLocalDepartTimeStart}
                onEndChanged={setLocalDepartTimeEnd}
              />
                        <Slider
                title="Arrive Time"
                currentStartHours={localArriveTimeStart}
                currentEndHours={localArriveTimeEnd}
                onStartChanged={setLocalArriveTimeStart}
                onEndChanged={setLocalArriveTimeEnd}
              />
                    </div>
                </div>
            </div>
        </div>
    );
  }
);

BottomModal.propTypes = {
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  setCheckedTicketTypes: PropTypes.func.isRequired,
  setCheckedTrainTypes: PropTypes.func.isRequired,
  setCheckedDepartStations: PropTypes.func.isRequired,
  setCheckedArriveStations: PropTypes.func.isRequired,
  setDepartTimeStart: PropTypes.func.isRequired,
  setDepartTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired
};

const Bottom = ({
  toggleOrderType,
  toggleHighSpeed,
  toggleOnlyTickets,
  toggleIsFiltersVisible,
  highSpeed,
  orderType,
  onlyTickets,
  isFiltersVisible,
  ticketTypes,
  trainTypes,
  departStations,
  arriveStations,
  checkedTicketTypes,
  checkedTrainTypes,
  checkedDepartStations,
  checkedArriveStations,
  departTimeStart,
  departTimeEnd,
  arriveTimeStart,
  arriveTimeEnd,
  setCheckedTicketTypes,
  setCheckedTrainTypes,
  setCheckedDepartStations,
  setCheckedArriveStations,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd
}) => {
  const noChecked = useMemo(() => {
    return (
      Object.keys(checkedTicketTypes).length === 0 &&
      Object.keys(checkedTrainTypes).length === 0 &&
      Object.keys(checkedDepartStations).length === 0 &&
      Object.keys(checkedArriveStations).length === 0 &&
      departTimeStart === 0 &&
      departTimeEnd === 24 &&
      arriveTimeStart === 0 &&
      arriveTimeEnd === 24
    );
  }, [
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd
  ]);

  return (
      <div className="bottom">
          <div className="bottom-filters">
              <span className="item" onClick={toggleOrderType}>
                  <i className="icon">&#xf065;</i>
                  {orderType === ORDER_DEPART ? "Departure Time" : "Time Span"}
              </span>
              <span
          className={classnames("item", { "item-on": highSpeed })}
          onClick={toggleHighSpeed}
        >
                  <i className="icon">{highSpeed ? "\uf43f" : "\uf43e"}</i>
          Only HighSpeed
              </span>
              <span
          className={classnames("item", { "item-on": onlyTickets })}
          onClick={toggleOnlyTickets}
        >
                  <i className="icon">{onlyTickets ? "\uf43d" : "\uf43c"}</i>
          Tickets Available
              </span>
              <span
          className={classnames("item", {
            "item-on": isFiltersVisible || !noChecked
          })}
          onClick={toggleIsFiltersVisible}
        >
                  <i className="icon">{noChecked ? "\uf0f7" : "\uf446"}</i>
          Filter
              </span>
          </div>
          {isFiltersVisible && (
          <BottomModal
          ticketTypes={ticketTypes}
          trainTypes={trainTypes}
          departStations={departStations}
          arriveStations={arriveStations}
          checkedTicketTypes={checkedTicketTypes}
          checkedTrainTypes={checkedTrainTypes}
          checkedDepartStations={checkedDepartStations}
          checkedArriveStations={checkedArriveStations}
          departTimeStart={departTimeStart}
          departTimeEnd={departTimeEnd}
          arriveTimeStart={arriveTimeStart}
          arriveTimeEnd={arriveTimeEnd}
          setCheckedTicketTypes={setCheckedTicketTypes}
          setCheckedTrainTypes={setCheckedTrainTypes}
          setCheckedDepartStations={setCheckedDepartStations}
          setCheckedArriveStations={setCheckedArriveStations}
          setDepartTimeStart={setDepartTimeStart}
          setDepartTimeEnd={setDepartTimeEnd}
          setArriveTimeStart={setArriveTimeStart}
          setArriveTimeEnd={setArriveTimeEnd}
          toggleIsFiltersVisible={toggleIsFiltersVisible}
        />
      )}
      </div>
  );
};

Bottom.propTypes = {
  toggleOrderType: PropTypes.func.isRequired,
  toggleHighSpeed: PropTypes.func.isRequired,
  toggleOnlyTickets: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired,
  highSpeed: PropTypes.bool.isRequired,
  orderType: PropTypes.number.isRequired,
  onlyTickets: PropTypes.bool.isRequired,
  isFiltersVisible: PropTypes.bool.isRequired,
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  setCheckedTicketTypes: PropTypes.func.isRequired,
  setCheckedTrainTypes: PropTypes.func.isRequired,
  setCheckedDepartStations: PropTypes.func.isRequired,
  setCheckedArriveStations: PropTypes.func.isRequired,
  setDepartTimeStart: PropTypes.func.isRequired,
  setDepartTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired
};

export default Bottom;
