import * as types from "../constants/wishlisActionConstants";

export const getWishlist = () => ({
  type: types.GET_WISHLIST,
});
export const getWishlistSuccess = (data) => ({
  type: types.GET_WISHLIST_SUCCESS,
  payload: data,
});
export const getWishlistFailed = (error) => ({
  type: types.GET_WISHLIST_FAILED,
  payload: error,
});
// ----------------------------------------------------------
export const addToWishlist = (product) => ({
  type: types.ADD_TO_WISHLIST,
  payload: {
    product,
  },
});
export const addToWishlistSuccess = (data) => ({
  type: types.ADD_TO_WISHLIST_SUCCESS,
  payload: data,
});
export const addToWishlistFailed = (error) => ({
  type: types.ADD_TO_WISHLIST_FAILED,
  payload: error,
});
// ---------------------------------------------------------
export const deleteFromWishlist = (product) => ({
  type: types.DELETE_FROM_WISHLIST,
  payload: {
    product,
  },
});
export const deleteFromWishlistSuccess = (data) => ({
  type: types.DELETE_FROM_WISHLIST_SUCCESS,
  payload: data,
});
export const deleteFromWishlistFailed = (error) => ({
  type: types.DELETE_FROM_WISHLIST_FAILED,
  payload: error,
});
