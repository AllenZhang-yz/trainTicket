import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Header from "./Header.jsx";
import "./DateSelector.css";
import { h0 } from "../common/fp";

const Day = ({ day, onSelect }) => {
  if (!day) {
    return <td className="null"></td>;
  }
  const classes = [];
  const now = h0();
  if (day < now) {
    classes.push("disabled");
  }
  if ([6, 0].includes(new Date(day).getDay())) {
    classes.push("weekend");
  }
  const dateString = now === day ? "Today" : new Date(day).getDate();
  return (
    <td className={classnames(classes)} onClick={() => onSelect(day)}>
      {dateString}
    </td>
  );
};

Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired
};

const Week = ({ days, onSelect }) => {
  return (
    <tr className={"date-table-days"}>
      {days.map((day, index) => (
        <Day key={index} day={day} onSelect={onSelect} />
      ))}
    </tr>
  );
};

Week.propTypes = {
  days: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

const Month = ({ startingTimeInMonth, onSelect }) => {
  const startDay = new Date(startingTimeInMonth);
  const currentDay = new Date(startingTimeInMonth);
  let days = [];
  while (currentDay.getMonth() === startDay.getMonth()) {
    days.push(currentDay.getTime());
    currentDay.setDate(currentDay.getDate() + 1);
  }
  days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
    .fill(null)
    .concat(days);
  const lastDay = new Date(days[days.length - 1]);
  days = days.concat(
    new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
  );

  const weeks = [];
  for (let row = 0; row < days.length / 7; row++) {
    const week = days.slice(row * 7, (row + 1) * 7);
    weeks.push(week);
  }
  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>
              {startDay.getMonth() + 1}/{startDay.getFullYear()}
            </h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="data-table-weeks">
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th className="weekend">Sat</th>
          <th className="weekend">Sun</th>
        </tr>
        {weeks.map((week, index) => (
          <Week key={index} days={week} onSelect={onSelect} />
        ))}
      </tbody>
    </table>
  );
};

Month.propTypes = {
  startingTimeInMonth: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};

const DateSelector = ({ show, onSelect, onBack }) => {
  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setDate(1);

  const monthSequence = [now.getTime()];

  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());

  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());

  return (
    <div className={classnames("date-selector", { hidden: !show })}>
      <Header title="Select Date" onBack={onBack} />
      <div className="date-selector-tables">
        {monthSequence.map(month => (
          <Month key={month} startingTimeInMonth={month} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default DateSelector;

DateSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};
