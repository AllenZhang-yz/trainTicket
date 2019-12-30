import React, { useCallback, useMemo } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./App.css";
import Header from "../common/Header";
import DepartDate from "./DepartDate.jsx";
import HighSpeed from "./HighSpeed.jsx";
import Journey from "./Journey.jsx";
import Submit from "./Submit.jsx";

import CitySelector from "../common/CitySelector.jsx";
import DateSelector from "../common/DateSelector.jsx";

import { h0 } from "../common/fp";

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
  toggleHighSpeed
} from "./actions";

const App = ({
  from,
  to,
  isCitySelectorVisible,
  isDateSelectorVisible,
  cityData,
  isLoadingCityData,
  dispatch,
  departDate,
  highSpeed
}) => {
  const onBack = useCallback(() => {
    window.history.back();
  }, []);
  // const doExchangeFromTo = useCallback(() => {
  //   dispatch(exchangeFromTo());
  // }, [dispatch]);
  // const doshowCitySelector = useCallback(
  //   m => {
  //     dispatch(showCitySelector(m));
  //   },
  //   [dispatch]
  // );

  const callbacks = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector
      },
      dispatch
    );
    // eslint-disable-next-line
  }, []);

  const CitySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector,
        fetchCityData,
        onSelect: setSelectedCity
      },
      dispatch
    );
    // eslint-disable-next-line
  }, []);

  const departDateCbs = useMemo(() => {
    return bindActionCreators(
      {
        onClick: showDateSelector
      },
      dispatch
    );
    // eslint-disable-next-line
  }, []);

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideDateSelector
      },
      dispatch
    );
    // eslint-disable-next-line
  }, []);

  const HighSpeedCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggle: toggleHighSpeed
      },
      dispatch
    );
    // eslint-disable-next-line
  }, []);

  const onSelectDate = useCallback(day => {
    if (!day) {
      return;
    }
    if (day < h0()) {
      return;
    }
    dispatch(setDepartDate(day));
    dispatch(hideDateSelector());
    // eslint-disable-next-line
  }, []);

  return (
      <div>
          <div className="header-wrapper">
              <Header title="Train Tickets" onBack={onBack} />
          </div>
          <form action="./query.html" className="form">
              <Journey from={from} to={to} {...callbacks} />
              <DepartDate time={departDate} {...departDateCbs} />
              <HighSpeed highSpeed={highSpeed} {...HighSpeedCbs} />
              <Submit />
          </form>
          <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...CitySelectorCbs}
      />
          <DateSelector
        show={isDateSelectorVisible}
        {...dateSelectorCbs}
        onSelect={onSelectDate}
      />
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
