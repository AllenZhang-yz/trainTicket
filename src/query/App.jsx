import React, { useCallback } from "react";
import { connect } from "react-redux";

import Header from "../common/Header";
import Nav from "../common/Nav";
import List from "./List";
import Bottom from "./Bottom";

import "./App.css";

const App = ({ from, to }) => {
  const onBack = useCallback(() => {
    window.history.back();
  }, []);
  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from} -> ${to}`} onBack={onBack} />
      </div>
      <Nav />
      <List />
      <Bottom />
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
