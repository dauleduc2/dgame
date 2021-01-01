import * as types from "../constants/dashboardConstants";
export const showSideBar = () => ({
  type: types.SHOW_SIDE_BAR,
});

export const hideSideBar = () => ({
  type: types.HIDE_SIDE_BAR,
});

export const toggleSideBar = (openning) => ({
  type: types.TOGGLE_SIDE_BAR,
  payload: openning,
});
