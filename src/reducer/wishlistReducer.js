import * as types from "../constants/wishlisActionConstants";

const initialState = {
  wishlist: [],
};
let findIndex = (state, product) => {
  let result = null;
  state.forEach((FEProduct, index) => {
    if (FEProduct.productId === product.productId) {
      result = index;
    }
  });
  return result;
};
const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: action.payload,
      };
    case types.ADD_TO_WISHLIST_SUCCESS:
      let data = action.payload;
      let decoyWishlist = state.wishlist.concat(data);
      return {
        ...state,
        wishlist: decoyWishlist,
      };
    case types.DELETE_FROM_WISHLIST_SUCCESS:
      let index = findIndex(state.wishlist, action.payload);
      let deleteDecoyWishlist = state.wishlist;
      deleteDecoyWishlist.splice(index, 1);
      return {
        ...state,
        wishlist: deleteDecoyWishlist,
      };
    default:
      return {
        ...state,
      };
  }
};
export default wishlistReducer;
