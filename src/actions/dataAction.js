import * as types from "../constants/dataActionConstants";

export const getProductList = (keyword) => {
  return {
    type: types.GET_PRODUCT_LIST,
  };
};
export const getProductListSuccess = (data) => {
  return {
    type: types.GET_PRODUCT_LIST_SUCCESS,
    payload: data,
  };
};
export const getProductListFailed = (error) => {
  return {
    type: types.GET_PRODUCT_LIST_FAILED,
    payload: error,
  };
};

export const filterList = (keyword) => {
  return {
    type: types.FILTER_LIST,
    payload: keyword,
  };
};
export const filterListSuccess = (data) => {
  return {
    type: types.FILTER_LIST_SUCCESS,
    payload: data,
  };
};
export const filterListFailed = (error) => {
  return {
    type: types.FILTER_LIST_FAILED,
    payload: error,
  };
};
