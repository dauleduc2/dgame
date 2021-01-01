import * as types from "../constants/uiConstants";

const initialState = {
  globalLoadingOpenning: false,
  confirmNoficationOpenning: false,
  requestData: null,
  signInNofication: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_LOADING:
      return {
        ...state,
        globalLoadingOpenning: true,
      };
    case types.HIDE_LOADING:
      return {
        ...state,
        globalLoadingOpenning: false,
      };
    case types.SHOW_CONFIRM_NOFICATION:
      return {
        ...state,
        confirmNoficationOpenning: true,
        requestData: action.payload,
      };
    case types.HIDE_CONFIRM_NOFICATION:
      if (action.payload) {
        return {
          ...state,
          confirmNoficationOpenning: false,
        };
      } else {
        return {
          ...state,
          confirmNoficationOpenning: false,
          requestData: null,
        };
      }
    case types.SHOW_LOGIN_NOFICATION:
      return {
        ...state,
        signInNofication: true,
      };
    case types.HIDE_LOGIN_NOFICATION:
      return {
        ...state,
        signInNofication: false,
      };
    default:
      return {
        ...state,
      };
  }
};
export default uiReducer;
