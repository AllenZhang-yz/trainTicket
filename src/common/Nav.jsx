import React, { useMemo, memo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import dayjs from "dayjs";
import "./Nav.css";

const Nav = memo(({ date, prev, next, isPrevDisabled, isNextDisabled }) => {
  const currentString = useMemo(() => {
    const d = dayjs(date);
    return d.format("DD-MM") + " " + d.format("ddd");
  }, [date]);
  return (
      <div className="nav">
          <span
        onClick={prev}
        className={classnames("nav-prev", { "nav-disabled": isPrevDisabled })}
      >
        Prev
          </span>
          <span className="nav-current">{currentString}</span>
          <span
        onClick={next}
        className={classnames("nav-next", { "nav-disabled": isNextDisabled })}
      >
        Next
          </span>
      </div>
  );
});

export default Nav;

Nav.propTypes = {
  date: PropTypes.number.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  isPrevDisabled: PropTypes.bool.isRequired,
  isNextDisabled: PropTypes.bool.isRequired
};
