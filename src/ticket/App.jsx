import React, { useEffect, useCallback, useMemo, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import dayjs from "dayjs";
import URI from "urijs";
import { h0 } from "../common/fp";
import useNav from "../common/useNav";
import Header from "../common/Header";
import Nav from "../common/Nav";
import Detail from "../common/Detail";
import Candidate from "./Candidate";
import { TrainContext } from "./context";
import "./App.css";

import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setDepartDate,
  setSearchParsed,
  prevDate,
  nextDate,
  setDepartTimeStr,
  setArriveTimeStr,
  setArriveDate,
  setDurationStr,
  setTickets,
  toggleIsScheduleVisible
} from "./actions";

const Schedule = lazy(() => import("./Schedule"));

const App = ({
  departDate,
  arriveDate,
  departTimeStr,
  arriveTimeStr,
  departStation,
  arriveStation,
  trainNumber,
  durationStr,
  tickets,
  isScheduleVisible,
  searchParsed,
  dispatch
}) => {
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const { aStation, dStation, date, trainNumber } = URI.parseQuery(
      window.location.search
    );
    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setDepartDate(h0(dayjs(date).valueOf())));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setSearchParsed(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = trainNumber;
  }, [trainNumber]);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }
    const url = new URI("/rest/ticket")
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .setSearch("trainNumber", trainNumber)
      .toString();

    fetch(url)
      .then(res => res.json())
      .then(result => {
        const { detail, candidates } = result;
        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr
        } = detail;

        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setTickets(candidates));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParsed, departDate, trainNumber]);

  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate
  );

  const detailsCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleIsScheduleVisible
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
              <Header title={trainNumber} onBack={onBack} />
          </div>
          <div className="nav-wrapper">
              <Nav
          date={departDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prev={prev}
          next={next}
        />
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
                  <span className="left"></span>
                  <span
            className="schedule"
            onClick={detailsCbs.toggleIsScheduleVisible}
          >
            Schedule
                  </span>
                  <span className="right"></span>
              </Detail>
          </div>
          <TrainContext.Provider
        value={{ trainNumber, departStation, arriveStation, departDate }}
      >
              <Candidate tickets={tickets} />
          </TrainContext.Provider>
          {isScheduleVisible && (
          <div
          className="mask"
          onClick={() => dispatch(toggleIsScheduleVisible())}
        >
              <Suspense fallback={<div>loading</div>}>
                  <Schedule
              date={departDate}
              trainNumber={trainNumber}
              departStation={departStation}
              arriveStation={arriveStation}
            />
              </Suspense>
          </div>
      )}
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
