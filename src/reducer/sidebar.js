import * as types from "../constants/dashboardConstants";

let initialState = {
  openning: false,
};

const sideBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_SIDE_BAR:
      return {
        openning: true,
        ...state,
      };
    case types.HIDE_SIDE_BAR:
      return {
        openning: false,
        ...state,
      };
    case types.TOGGLE_SIDE_BAR:
      return {
        ...state,
        openning: !action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default sideBarReducer;
