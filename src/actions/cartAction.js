import * as types from "../constants/cartConstants";

export const addToCart = (product, amount) => ({
  type: types.ADD_TO_CART,
  payload: {
    product,
    amount,
  },
});
export const addToCartSuccess = (data) => ({
  type: types.ADD_TO_CART_SUCCESS,
  payload: data,
});
export const addToCartFailed = (error) => ({
  type: types.ADD_TO_CART_FAILED,
  payload: error,
});

export const addAmountOfProduct = (id, amount = 1) => {
  return {
    type: types.ADD_AMOUNT_OF_PRODUCT,
    payload: {
      id,
      amount,
    },
  };
};
export const addAmountOfProductSuccess = (data) => {
  return {
    type: types.ADD_AMOUNT_OF_PRODUCT_SUCCESS,
    payload: data,
  };
};
export const addAmountOfProductFailed = () => {
  return {
    type: types.ADD_AMOUNT_OF_PRODUCT_FAILED,
  };
};

export const minusAmountOfProduct = (product) => {
  return {
    type: types.MINUS_AMOUNT_OF_PRODUCT,
    payload: product,
  };
};
export const minusAmountOfProductSuccess = (productId) => {
  return {
    type: types.MINUS_AMOUNT_OF_PRODUCT_SUCCESS,
    payload: productId,
  };
};
export const minusAmountOfProductFailed = (error) => {
  return {
    type: types.MINUS_AMOUNT_OF_PRODUCT_FAILED,
    payload: error,
  };
};

export const getCartList = () => {
  return {
    type: types.GET_CART_LIST,
  };
};
export const getCartListSuccess = (data) => {
  return {
    type: types.GET_CART_LIST_SUCCESS,
    payload: data,
  };
};
export const getCartListFailed = (error) => {
  return {
    type: types.GET_CART_LIST_FAILED,
    payload: error,
  };
};

export const deleteProductFromCart = (product) => {
  return {
    type: types.DELETE_PRODUCT_FROM_CART,
    payload: product,
  };
};
export const deleteProductFromCartSuccess = (data) => {
  return {
    type: types.DELETE_PRODUCT_FROM_CART_SUCCESS,
    payload: data,
  };
};
export const deleteProductFromCartFailed = (error) => {
  return {
    type: types.DELETE_PRODUCT_FROM_CART_FAILED,
    payload: error,
  };
};

export const clearCart = () => {
  return {
    type: types.CLEAR_CART,
  };
};
