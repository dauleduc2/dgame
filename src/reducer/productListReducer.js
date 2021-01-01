import * as types from "../constants/dataActionConstants";

let initialState = {
  productList: [],
};

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default productListReducer;
