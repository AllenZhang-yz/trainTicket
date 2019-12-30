import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import URI from "urijs";
import "./List.css";

const ListItem = memo(
  ({
    dTime,
    aTime,
    dStation,
    aStation,
    trainNumber,
    date,
    time,
    priceMsg,
    dayAfter
  }) => {
    const url = useMemo(() => {
      return new URI("ticket.html")
        .setSearch("aStation", aStation)
        .setSearch("dStation", dStation)
        .setSearch("trainNumber", trainNumber)
        .setSearch("date", date)
        .toString();
    }, [aStation, dStation, trainNumber, date]);

    return (
        <li className="list-item">
            <a href={url}>
                <span className="item-time">
                    <em>{dTime}</em>
                    <br />
                    <em className="em-light">
                        {aTime}
                        <i className="time-after">{dayAfter}</i>
                    </em>
                </span>
                <span className="item-stations">
                    <em className="em-light">
                        <i className="train-station train-start">D</i>
                        {dStation}
                    </em>
                    <br />
                    <em>
                        <i className="train-station train-end">A</i>
                        {aStation}
                    </em>
                </span>
                <span className="item-train">
                    <em className="em-light">{trainNumber}</em>
                    <br />
                    <em>{time}</em>
                </span>
                <span className="item-ticket">
                    <em>{priceMsg}</em>
                    <br />
                    <em className="em-light-orange">Available</em>
                </span>
            </a>
        </li>
    );
  }
);

ListItem.propTypes = {
  dTime: PropTypes.string.isRequired,
  aTime: PropTypes.string.isRequired,
  dStation: PropTypes.string.isRequired,
  aStation: PropTypes.string.isRequired,
  trainNumber: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  priceMsg: PropTypes.string.isRequired,
  dayAfter: PropTypes.string.isRequired
};

const List = memo(({ list }) => {
  return (
      <ul className="list">
          {list.map(item => (
              <ListItem {...item} key={item.trainNumber} />
      ))}
      </ul>
  );
});

List.propTypes = {
  list: PropTypes.array.isRequired
};

export default List;
