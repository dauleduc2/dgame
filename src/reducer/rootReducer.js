import cartReducer from "./cartReducer";
import uiReducer from "./uiReducer";
import productListReducer from "./productListReducer";
import sideBarReducer from "./sidebar";
import { reducer as formReducer } from "redux-form";
import accountReducer from "./accountData";
import filterListReducer from "./filterListReducer";
import wishlistReducer from "./wishlistReducer";
const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  sideBar: sideBarReducer,
  productList: productListReducer,
  cart: cartReducer,
  ui: uiReducer,
  accountData: accountReducer,
  filterList: filterListReducer,
  wishlist: wishlistReducer,
  form: formReducer,
});

export default rootReducer;
