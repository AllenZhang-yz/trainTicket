import React, { useMemo } from "react";
import dayjs from "dayjs";
// import PropTypes from "prop-types";
import "./DepartDate.css";
import { h0 } from "../common/fp";

const DepartDate = ({ time, onClick }) => {
  // console.log(time);
  const h0ofDepart = h0(time);
  const departDate = new Date(h0ofDepart);

  const departDateString = useMemo(() => {
    return dayjs(h0ofDepart).format("YYYY-MM-DD");
  }, [h0ofDepart]);

  const isToday = h0ofDepart === h0();

  const weekString =
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][departDate.getDay()] +
    (isToday ? "(Today)" : "");

  return (
      <div className="depart-date" onClick={onClick}>
          <input type="hidden" name="date" value={departDateString} />
          {departDateString}
          <span className="depart-week">{weekString}</span>
      </div>
  );
};

export default DepartDate;
