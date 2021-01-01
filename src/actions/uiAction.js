import * as types from "../constants/uiConstants";

export const showLoading = () => {
  return {
    type: types.SHOW_LOADING,
  };
};

export const hideLoading = () => {
  return {
    type: types.HIDE_LOADING,
  };
};

export const showConfirmNofication = (productRequest) => {
  return {
    type: types.SHOW_CONFIRM_NOFICATION,
    payload: productRequest,
  };
};

export const hideConfirmNofication = (acept) => {
  return {
    type: types.HIDE_CONFIRM_NOFICATION,
    payload: acept,
  };
};

export const showLoginNofication = () => {
  return {
    type: types.SHOW_LOGIN_NOFICATION,
  };
};

export const hideLoginNofication = () => {
  return {
    type: types.HIDE_LOGIN_NOFICATION,
  };
};
