export const ACTION_SET_FROM = "SET_FROM";
export const ACTION_SET_TO = "SET_TO";
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE =
  "SET_IS_CITY_SELECTOR_VISIBLE";
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY =
  "SET_CURRENT_SELECTING_LEFT_CITY";
export const ACTION_SET_CITY_DATA = "SET_CITY_DATA";
export const ACTION_SET_IS_LOADING_CITY_DATA = "SET_IS_LOADING_CITY_DATA";
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE =
  "SET_IS_DATE_SELECTOR_VISIBLE";
export const ACTION_SET_DEPART_DATE = "ACTION_SET_DEPART_DATE";
export const ACTION_SET_HIGH_SPEED = "SET_HIGH_SPEED";

export const setFrom = from => {
  return {
    type: ACTION_SET_FROM,
    payload: from
  };
};

export const setTo = to => {
  return {
    type: ACTION_SET_TO,
    payload: to
  };
};

export const setIsLoadingCityData = isLoadingCityData => {
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: isLoadingCityData
  };
};

export const setCityData = cityData => {
  return {
    type: ACTION_SET_CITY_DATA,
    payload: cityData
  };
};

export const setDepartDate = date => {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: date
  };
};

export const toggleHighSpeed = () => {
  return (dispatch, getState) => {
    const { highSpeed } = getState();
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !highSpeed
    });
  };
};

export const showCitySelector = currentSelectingLeftCity => {
  return dispatch => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true
    });
    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity
    });
  };
};

export const hideCitySelector = () => {
  return {
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false
  };
};

export const setSelectedCity = city => {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState();
    currentSelectingLeftCity ? dispatch(setFrom(city)) : dispatch(setTo(city));
    dispatch(hideCitySelector());
  };
};

export const showDateSelector = () => {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: true
  };
};

export const hideDateSelector = () => {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: false
  };
};

export const exchangeFromTo = () => {
  return (dispatch, getState) => {
    const { from, to } = getState();
    dispatch(setFrom(to));
    dispatch(setTo(from));
  };
};

export const fetchCityData = () => {
  return (dispatch, getState) => {
    const { isLoadingCityData } = getState();
    if (isLoadingCityData) {
      return;
    }

    const cache = JSON.parse(localStorage.getItem("city_data_cache") || "{}");
    if (Date.now() < cache.expires) {
      dispatch(setCityData(cache.data));
      return;
    }

    dispatch(setIsLoadingCityData(true));
    fetch("/rest/cities?_" + Date.now())
      .then(res => res.json())
      .then(cityData => {
        dispatch(setCityData(cityData));
        localStorage.setItem(
          "city_data_cache",
          JSON.stringify({
            expires: Date.now() + 60 * 1000,
            data: cityData
          })
        );
        dispatch(setIsLoadingCityData(false));
      })
      .catch(() => {
        dispatch(setIsLoadingCityData(false));
      });
  };
};
