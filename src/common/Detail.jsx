import React, { memo, useMemo } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import "./Detail.css";

const format = d => {
  const date = dayjs(d);
  return date.format("MM-DD") + " " + date.format("ddd");
};

const Detail = memo(
  ({
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    trainNumber,
    departStation,
    arriveStation,
    durationStr,
    // toggleIsScheduleVisible,
    children
  }) => {
    const departDateStr = useMemo(() => format(departDate), [departDate]);
    const arriveDateStr = useMemo(() => format(arriveDate), [arriveDate]);
    return (
      <div className="detail">
        <div className="content">
          <div className="left">
            <p className="city">{departStation}</p>
            <p className="time">{departTimeStr}</p>
            <p className="date">{departDateStr}</p>
          </div>
          <div className="middle">
            <p className="train-name">{trainNumber}</p>
            <p className="train-mid">
              {/* <span className="left"></span>
              <span className="schedule" onClick={toggleIsScheduleVisible}>
                Schedule
              </span>
              <span className="right"></span> */}
              {children}
            </p>
            <p className="train-time">Duration{durationStr}</p>
          </div>
          <div className="right">
            <p className="city">{arriveStation}</p>
            <p className="time">{arriveTimeStr}</p>
            <p className="date">{arriveDateStr}</p>
          </div>
        </div>
      </div>
    );
  }
);

Detail.propTypes = {
  departDate: PropTypes.number.isRequired,
  arriveDate: PropTypes.number.isRequired,
  departTimeStr: PropTypes.string,
  arriveTimeStr: PropTypes.string,
  trainNumber: PropTypes.string.isRequired,
  departStation: PropTypes.string.isRequired,
  arriveStation: PropTypes.string.isRequired,
  durationStr: PropTypes.string
};

export default Detail;
