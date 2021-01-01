import * as types from "../constants/cartConstants";

let initialState = {
  cartList: [],
};
let findIndex = (state, productId) => {
  let result = null;
  state.forEach((product, index) => {
    if (product.productId === productId) {
      result = index;
    }
  });
  return result;
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_CART_SUCCESS:
      let decoyCartList = state.cartList.concat(action.payload);
      return {
        ...state,
        cartList: decoyCartList,
      };
    case types.ADD_AMOUNT_OF_PRODUCT_SUCCESS:
      let index = findIndex(state.cartList, action.payload.productId);
      let addDecoyState = state.cartList;
      addDecoyState[index] = action.payload;
      return {
        ...state,
        cartList: addDecoyState,
      };
    case types.MINUS_AMOUNT_OF_PRODUCT_SUCCESS:
      console.log("minus amount reducer");

      let minusIndex = findIndex(state.cartList, action.payload.productId);
      let minusDecoyState = state.cartList;
      minusDecoyState[minusIndex] = action.payload;
      return {
        ...state,
        cartList: minusDecoyState,
      };
    case types.GET_CART_LIST_SUCCESS:
      return {
        ...state,
        cartList: action.payload,
      };
    case types.DELETE_PRODUCT_FROM_CART_SUCCESS:
      let data = action.payload;
      let { productId } = data;
      let decoyState = state.cartList;
      let deleteProductFromCartIndex = findIndex(state.cartList, productId);
      decoyState.splice(deleteProductFromCartIndex, 1);

      return {
        ...state,
        cartList: decoyState,
      };
    case types.CLEAR_CART:
      return {
        ...state,
        cartList: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export default cartReducer;
