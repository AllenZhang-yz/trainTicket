export const ACTION_SET_TRAIN_NUMBER = "SET_TRAIN_NUMBER";
export const ACTION_SET_DEPART_STATION = "SET_DEPART_STATION";
export const ACTION_SET_ARRIVE_STATION = "SET_ARRIVE_STATION";
export const ACTION_SET_SEAT_TYPE = "SET_SEAT_TYPE";
export const ACTION_SET_DEPART_DATE = "SET_DEPART_DATE";
export const ACTION_SET_ARRIVE_DATE = "SET_ARRIVE_DATE";
export const ACTION_SET_DEPART_TIME_STR = "SET_DEPART_TIME_STR";
export const ACTION_SET_ARRIVE_TIME_STR = "SET_ARRIVE_TIME_STR";
export const ACTION_SET_DURATION_STR = "SET_DURATION_STR";
export const ACTION_SET_PRICE = "SET_PRICE";
export const ACTION_SET_PASSENGERS = "SET_PASSENGERS";
export const ACTION_SET_MENU = "SET_MENU";
export const ACTION_SET_IS_MENU_VISIBLE = "SET_IS_MENU_VISIBLE";
export const ACTION_SET_SEARCH_PARSED = "SET_SEARCH_PARSED";

export const setTrainNumber = trainNumber => {
  return {
    type: ACTION_SET_TRAIN_NUMBER,
    payload: trainNumber
  };
};
export const setDepartStation = departStation => {
  return {
    type: ACTION_SET_DEPART_STATION,
    payload: departStation
  };
};
export const setArriveStation = arriveStation => {
  return {
    type: ACTION_SET_ARRIVE_STATION,
    payload: arriveStation
  };
};
export const setSeatType = seatType => {
  return {
    type: ACTION_SET_SEAT_TYPE,
    payload: seatType
  };
};
export const setDepartDate = departDate => {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate
  };
};
export const setArriveDate = arriveDate => {
  return {
    type: ACTION_SET_ARRIVE_DATE,
    payload: arriveDate
  };
};
export const setDepartTimeStr = departTimeStr => {
  return {
    type: ACTION_SET_DEPART_TIME_STR,
    payload: departTimeStr
  };
};
export const setArriveTimeStr = arriveTimeStr => {
  return {
    type: ACTION_SET_ARRIVE_TIME_STR,
    payload: arriveTimeStr
  };
};
export const setDurationStr = durationStr => {
  return {
    type: ACTION_SET_DURATION_STR,
    payload: durationStr
  };
};
export const setPrice = price => {
  return {
    type: ACTION_SET_PRICE,
    payload: price
  };
};
export const setPassengers = passengers => {
  return {
    type: ACTION_SET_PASSENGERS,
    payload: passengers
  };
};
export const setMenu = menu => {
  return {
    type: ACTION_SET_MENU,
    payload: menu
  };
};
export const setIsMenuVisible = isMenuVisible => {
  return {
    type: ACTION_SET_IS_MENU_VISIBLE,
    payload: isMenuVisible
  };
};
export const setSearchParsed = searchParsed => {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed
  };
};

export const fetchInitial = url => {
  return (dispatch, getState) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr,
          price
        } = data;
        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setPrice(price));
      });
  };
};

let passengerIdSeed = 0;

export const createAdult = () => {
  return (dispatch, getState) => {
    const { passengers } = getState();
    for (let passenger of passengers) {
      const keys = Object.keys(passenger);
      for (let key of keys) {
        if (!passenger[key].toString()) {
          return;
        }
      }
    }
    dispatch(
      setPassengers([
        ...passengers,
        {
          id: passengerIdSeed++,
          name: "",
          ticketType: "adult",
          licenceNo: "",
          seat: "Z"
        }
      ])
    );
  };
};

export const createChild = () => {
  return (dispatch, getState) => {
    const { passengers } = getState();
    let adultFound = null;
    for (let passenger of passengers) {
      const keys = Object.keys(passenger);
      for (let key of keys) {
        if (!passenger[key].toString()) {
          return;
        }
      }
      if (passenger.ticketType === "adult") {
        adultFound = passenger.id;
      }
    }
    if (!adultFound.toString()) {
      alert("Please add at least 1 adult!");
      return;
    }

    dispatch(
      setPassengers([
        ...passengers,
        {
          id: passengerIdSeed++,
          name: "",
          gender: "none",
          birthday: "",
          followAdult: adultFound,
          ticketType: "child",
          seat: "Z"
        }
      ])
    );
  };
};

export const removePassenger = id => {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const newPassengers = passengers.filter(
      passenger => passenger.id !== id && passenger.followAdult !== id
    );
    dispatch(setPassengers(newPassengers));
  };
};

export const updatePassenger = (id, data, keysToBeRemoved = []) => {
  return (dispatch, getState) => {
    const { passengers } = getState();
    for (let i = 0; i < passengers.length; i++) {
      if (passengers[i].id === id) {
        const newPassengers = [...passengers];
        newPassengers[i] = Object.assign({}, passengers[i], data);
        for (let key of keysToBeRemoved) {
          delete newPassengers[i][key];
        }
        dispatch(setPassengers(newPassengers));
        break;
      }
    }
  };
};

export const showMenu = menu => {
  return (dispatch, getState) => {
    dispatch(setMenu(menu));
    dispatch(setIsMenuVisible(true));
  };
};

export const showGenderMenu = id => {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const passenger = passengers.find(passenger => passenger.id === id);
    if (!passenger) {
      return;
    }
    dispatch(
      showMenu({
        onPress(gender) {
          dispatch(updatePassenger(id, { gender }));
          dispatch(hideMenu());
        },
        options: [
          {
            title: "Male",
            value: "male",
            active: "male" === passenger.gender
          },
          {
            title: "Female",
            value: "female",
            active: "female" === passenger.gender
          }
        ]
      })
    );
  };
};

export const showFollowAdultMenu = id => {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const passenger = passengers.find(passenger => passenger.id === id);
    if (!passenger) {
      return;
    }
    dispatch(
      showMenu({
        onPress(followAdult) {
          dispatch(updatePassenger(id, { followAdult }));
          dispatch(hideMenu());
        },
        options: passengers
          .filter(passenger => passenger.ticketType === "adult")
          .map(adult => ({
            title: adult.name,
            value: adult.id,
            active: adult.id === passenger.followAdult
          }))
      })
    );
  };
};

export const showTicketTypeMenu = id => {
  return (dispatch, getState) => {
    const { passengers } = getState();
    const passenger = passengers.find(passenger => passenger.id === id);
    if (!passenger) {
      return;
    }
    dispatch(
      showMenu({
        onPress(ticketType) {
          if ("adult" === ticketType) {
            dispatch(
              updatePassenger(id, { ticketType, licenceNo: "" }, [
                "gender",
                "followAdult",
                "birthday"
              ])
            );
          } else {
            const adult = passengers.find(
              passenger =>
                passenger.id !== id && passenger.ticketType === "adult"
            );
            if (adult) {
              dispatch(
                updatePassenger(
                  id,
                  {
                    ticketType,
                    gender: "",
                    followAdult: adult.id,
                    birthday: ""
                  },
                  ["licenceNo"]
                )
              );
            } else {
              alert("No other adult passengers!");
            }
          }
          dispatch(hideMenu());
        },
        options: [
          {
            title: "Adult",
            value: "adult",
            active: "adult" === passenger.ticketType
          },
          {
            title: "Child",
            value: "child",
            active: "child" === passenger.ticketType
          }
        ]
      })
    );
  };
};

export const hideMenu = () => {
  return setIsMenuVisible(false);
};
