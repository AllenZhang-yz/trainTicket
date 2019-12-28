import React, { memo, useState, useCallback, useMemo, useContext } from "react";
import PropTypes from "prop-types";
import URI from "urijs";
import dayjs from "dayjs";
import { TrainContext } from "./context";
import "./Candidate.css";

const Channel = memo(({ name, desc, type }) => {
  const { trainNumber, departStation, arriveStation, departDate } = useContext(
    TrainContext
  );

  const src = useMemo(() => {
    return new URI("order.html")
      .setSearch("trainNumber", trainNumber)
      .setSearch("dStation", departStation)
      .setSearch("aStation", arriveStation)
      .setSearch("type", type)
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .toString();
  }, [trainNumber, departStation, arriveStation, departDate, type]);
  return (
    <div className="channel">
      <div className="middle">
        <div className="name">{name}</div>
        <div className="desc">{desc}</div>
      </div>
      <a href={src} className="buy-wrapper">
        <div className="buy">Buy</div>
      </a>
    </div>
  );
});

Channel.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

const Seat = memo(
  ({ type, priceMsg, ticketsLeft, channels, expanded, onToggle, index }) => {
    return (
      <li>
        <div className="bar" onClick={() => onToggle(index)}>
          <span className="seat">{type}</span>
          <span className="price">
            <i>￥</i>
            {priceMsg}
          </span>
          <span className="btn">{expanded ? "Book" : "Retract"}</span>
          <span className="num">{ticketsLeft}</span>
        </div>
        <div
          className="channels"
          style={{ height: expanded ? channels.length * 55 + "px" : 0 }}
        >
          {channels.map(channel => (
            <Channel key={channel.name} {...channel} type={type} />
          ))}
        </div>
      </li>
    );
  }
);

Seat.propTypes = {
  type: PropTypes.string.isRequired,
  priceMsg: PropTypes.string.isRequired,
  ticketsLeft: PropTypes.string.isRequired,
  channels: PropTypes.array.isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

const Candidate = memo(({ tickets }) => {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const onToggle = useCallback(
    index => {
      setExpandedIndex(index === expandedIndex ? -1 : index);
    },
    [expandedIndex]
  );
  return (
    <div className=" candidate">
      <ul>
        {tickets.map((ticket, index) => (
          <Seat
            {...ticket}
            index={index}
            key={ticket.type}
            expanded={expandedIndex === index}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
});

Candidate.propTypes = {
  tickets: PropTypes.array.isRequired
};

export default Candidate;
