import * as types from "../constants/accountActionConstants";

export const getAccountList = () => {
  return {
    type: types.GET_ACCOUNT_LIST,
  };
};
export const getAccountListSuccess = (data) => {
  return {
    type: types.GET_ACCOUNT_LIST_SUCCESS,
    payload: data,
  };
};
export const getAccountListFailed = (error) => {
  return {
    type: types.GET_ACCOUNT_LIST_FAILED,
    payload: error,
  };
};

export const addNewAccount = (data) => {
  return {
    type: types.ADD_NEW_ACCOUNT,
    payload: data,
  };
};
export const addNewAccountSuccess = (data) => {
  return {
    type: types.ADD_NEW_ACCOUNT_SUCCESS,
    payload: data,
  };
};
export const addNewAccountFailed = (error) => {
  return {
    type: types.ADD_NEW_ACCOUNT_FAILED,
    payload: error,
  };
};

export const signInSuccess = (userId, serverId) => {
  return {
    type: types.SIGNIN_SUCCESS,
    payload: {
      userId,
      serverId,
    },
  };
};
export const signInFailed = () => {
  return {
    type: types.SIGNIN_FAILED,
  };
};

export const logOut = () => {
  return {
    type: types.LOG_OUT,
  };
};
