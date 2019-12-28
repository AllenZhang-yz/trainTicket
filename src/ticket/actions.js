import { h0 } from "../common/fp";

export const ACTION_SET_DEPART_DATE = "SET_DEPART_DATE";
export const ACTION_SET_ARRIVE_DATE = "SET_ARRIVE_DATE";
export const ACTION_SET_DEPART_TIME_STR = "SET_DEPART_TIME_STR";
export const ACTION_SET_ARRIVE_TIME_STR = "SET_ARRIVE_TIME_STR";
export const ACTION_SET_DEPART_STATION = "SET_DEPART_STATION";
export const ACTION_SET_ARRIVE_STATION = "SET_ARRIVE_STATION";
export const ACTION_SET_TRAIN_NUMBER = "SET_TRAIN_NUMBER";
export const ACTION_SET_DURATION_STR = "SET_DURATION_STR";
export const ACTION_SET_TICKETS = "SET_TICKETS";
export const ACTION_SET_IS_SCHEDULE_VISIBLE = "SET_IS_SCHEDULE_VISIBLE";
export const ACTION_SET_SEARCH_PARSED = "SET_SEARCH_PARSED";

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
export const setTrainNumber = trainNumber => {
  return {
    type: ACTION_SET_TRAIN_NUMBER,
    payload: trainNumber
  };
};
export const setDurationStr = durationStr => {
  return {
    type: ACTION_SET_DURATION_STR,
    payload: durationStr
  };
};
export const setTickets = tickets => {
  return {
    type: ACTION_SET_TICKETS,
    payload: tickets
  };
};
export const setIsScheduleVisible = isScheduleVisible => {
  return {
    type: ACTION_SET_IS_SCHEDULE_VISIBLE,
    payload: isScheduleVisible
  };
};
export const toggleIsScheduleVisible = () => {
  return (dispatch, getState) => {
    const { isScheduleVisible } = getState();

    dispatch(setIsScheduleVisible(!isScheduleVisible));
  };
};
export const setSearchParsed = searchParsed => {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed
  };
};
export const nextDate = () => {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(h0(departDate) + 86400 * 1000));
  };
};

export const prevDate = () => {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
  };
};
