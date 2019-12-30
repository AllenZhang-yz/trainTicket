import React, { useCallback, useEffect, useMemo } from "react";
import URI from "urijs";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../common/Header";
import Detail from "../common/Detail";
import Account from "./Account";
import Ticket from "./Ticket";
import Passengers from "./Passengers";
import Choose from "./Choose";
import Menu from "./Menu";
import "./App.css";

import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setSeatType,
  setDepartDate,
  setSearchParsed,
  fetchInitial,
  createAdult,
  createChild,
  removePassenger,
  updatePassenger,
  hideMenu,
  showGenderMenu,
  showFollowAdultMenu,
  showTicketTypeMenu
} from "./actions";

const App = ({
  trainNumber,
  departStation,
  arriveStation,
  seatType,
  departDate,
  arriveDate,
  departTimeStr,
  arriveTimeStr,
  durationStr,
  price,
  passengers,
  menu,
  isMenuVisible,
  searchParsed,
  dispatch
}) => {
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const { trainNumber, dStation, aStation, type, date } = URI.parseQuery(
      window.location.search
    );
    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setSeatType(type));
    dispatch(setDepartDate(dayjs(date).valueOf()));
    dispatch(setSearchParsed(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!searchParsed) {
      const url = new URI("/rest/order")
        .setSearch("dStation", departStation)
        .setSearch("aStation", arriveStation)
        .setSearch("type", seatType)
        .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
        .toString();
      dispatch(fetchInitial(url));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParsed, departStation, arriveStation, seatType, departDate]);

  const passengersCbs = useMemo(() => {
    return bindActionCreators(
      {
        createAdult,
        createChild,
        removePassenger,
        updatePassenger,
        showGenderMenu,
        showFollowAdultMenu,
        showTicketTypeMenu
      },
      dispatch
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuCbs = useMemo(() => {
    return bindActionCreators(
      {
        hideMenu
      },
      dispatch
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chooseCbs = useMemo(() => {
    return bindActionCreators(
      {
        updatePassenger
      },
      dispatch
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!searchParsed) {
    return null;
  }

  return (
      <div className="app">
          <div className="header-wrapper">
              <Header title="Fill in the order" onBack={onBack} />
          </div>
          <div className="detail-wrapper">
              <Detail
          departDate={departDate}
          arriveDate={arriveDate}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          trainNumber={trainNumber}
          departStation={departStation}
          arriveStation={arriveStation}
          durationStr={durationStr}
        >
                  <span style={{ display: "block" }} className="train-icon"></span>
              </Detail>
          </div>
          <Ticket price={price} type={seatType} />
          <Passengers passengers={passengers} {...passengersCbs} />
          {passengers.length > 0 && (
          <Choose passengers={passengers} {...chooseCbs} />
      )}
          <Account length={passengers.length} price={price} />
          <Menu show={isMenuVisible} {...menu} {...menuCbs} />
      </div>
  );
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
