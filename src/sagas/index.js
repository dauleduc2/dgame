import {
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import * as STATUS_CODE from "../constants/statusCode";
import { deleteList, getList, postList, updateList } from "../api/apis";
import * as productTypes from "../constants/dataActionConstants";
import * as cartTypes from "../constants/cartConstants";
import * as accountTypes from "../constants/accountActionConstants";
import * as wishlistTypes from "../constants/wishlisActionConstants";
import {
  getProductListFailed,
  getProductListSuccess,
} from "../actions/dataAction";
import {
  addAmountOfProduct,
  addAmountOfProductFailed,
  addAmountOfProductSuccess,
  addToCart,
  addToCartFailed,
  addToCartSuccess,
  deleteProductFromCart,
  deleteProductFromCartFailed,
  deleteProductFromCartSuccess,
  getCartListFailed,
  getCartListSuccess,
  minusAmountOfProductFailed,
  minusAmountOfProductSuccess,
} from "../actions/cartAction";
import { hideLoading, showLoading } from "../actions/uiAction";
import {
  addNewAccountFailed,
  addNewAccountSuccess,
  getAccountList,
  getAccountListFailed,
  getAccountListSuccess,
} from "../actions/accountDataAction";
import { failedNofication, successNofication } from "../commons/ToastHelper";
import {
  addToWishlistSuccess,
  deleteFromWishlistSuccess,
  getWishlistSuccess,
} from "../actions/wishlistAction";
import { dataBase } from "../constants/dataBase";
import { ownerDocument } from "@material-ui/core";

var ID = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};

var findIndex = (state, userId) => {
  let result = null;
  state.forEach((product, index) => {
    if (product.userId === userId) {
      result = index;
    }
  });
  return result;
};
// ----------------------------------------
var ID = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};
function* getProductListSaga() {
  yield put(showLoading());

  const response = yield call(getList, "Data");
  let { data, status } = response;
  if (status === STATUS_CODE.SUCCESS_CODE) {
    yield put(getProductListSuccess(data));
  } else {
    yield put(getProductListFailed(data));
  }
  yield put(hideLoading());
}
// ----------------get cart list-----------------------------
function* getCartListSaga() {
  yield put(showLoading());
  const serverId = yield select((state) => state.accountData.serverId);
  const response = yield call(getList, `user/${serverId}/cart`);
  let { data, status } = response;
  if (status === STATUS_CODE.SUCCESS_CODE) {
    yield put(getCartListSuccess(data));
  } else {
    yield put(getCartListFailed(data));
  }
  yield put(hideLoading());
}
// ----------------add to cart-----------------------------
function* addToCartSaga(data) {
  yield put(showLoading());
  const serverId = yield select((state) => state.accountData.serverId);
  let { product, amount } = data.payload;
  let { alt, src, price, sale, status, content, productId } = product;

  const response = yield call(postList, `user/${serverId}/cart`, {
    alt,
    src,
    price,
    sale,
    amount,
    status,
    content,
    productId,
  });
  let { data: responseData, status: responseStatus } = response;
  if (responseStatus === STATUS_CODE.CREATED_CODE) {
    yield put(addToCartSuccess(responseData));
    successNofication("Add to cart success");
  } else {
    yield put(addToCartFailed(responseData));
  }
  yield put(hideLoading());
}
// ----------------add amount-----------------------------
function* addAmountOfProductSaga(data) {
  yield put(showLoading());
  const serverId = yield select((state) => state.accountData.serverId);
  let { amount, id } = data.payload;
  const productDataFromSever = yield call(getList, `user/${serverId}/cart`, id);
  let { data: dataFromServer } = productDataFromSever;
  let { amount: amountFromServer } = dataFromServer;
  const response = yield call(updateList, `user/${serverId}/cart`, id, {
    amount: amountFromServer + amount,
  });
  let { data: dataResponse, status } = response;
  if (status === STATUS_CODE.SUCCESS_CODE) {
    yield put(addAmountOfProductSuccess(dataResponse));
  } else {
    yield put(addAmountOfProductFailed(dataResponse));
  }
  yield put(hideLoading());
}

// ----------------minus amount-----------------------------
function* minusAmountOfProductSaga(data) {
  yield put(showLoading());
  const serverId = yield select((state) => state.accountData.serverId);
  let { id, amount } = data.payload;
  const response = yield call(updateList, `user/${serverId}/cart`, id, {
    amount: amount - 1,
  });
  let { data: dataResponse, status } = response;

  if (status === STATUS_CODE.SUCCESS_CODE) {
    yield put(minusAmountOfProductSuccess(dataResponse));
  } else {
    yield put(minusAmountOfProductFailed(dataResponse));
  }
  yield put(hideLoading());
}
// ----------------delete product from cart-----------------------------
function* deleteProductFromCartSaga(action) {
  yield put(showLoading());
  const serverId = yield select((state) => state.accountData.serverId);
  let { payload } = action;
  let { id } = payload;
  const response = yield call(deleteList, `user/${serverId}/cart`, id);
  let { status, data } = response;
  if (status === STATUS_CODE.SUCCESS_CODE) {
    yield put(deleteProductFromCartSuccess(data));
    successNofication("Delete success!");
  } else {
    yield put(deleteProductFromCartFailed(data));
  }
  yield put(hideLoading());
}
// ----------------get account listt-----------------------------
function* getAccountListSaga() {
  yield put(showLoading());
  const response = yield call(getList, "user");
  let { data: resData, status } = response;
  if (status === STATUS_CODE.SUCCESS_CODE) {
    yield put(getAccountListSuccess(resData));
  } else {
    yield put(getAccountListFailed());
  }
  yield put(hideLoading());
}
// ----------------add new account-----------------------------
function* addNewAccountSaga(data) {
  yield put(showLoading());
  let { userName, password, email } = data.payload;
  const response = yield call(postList, "user", {
    userName,
    password,
    email,
    userId: ID(),
  });
  let { status, data: resData } = response;
  if (status === STATUS_CODE.CREATED_CODE) {
    yield put(addNewAccountSuccess(resData));
    successNofication("Created!");
  } else {
    yield put(addNewAccountFailed(data));
  }
  yield put(hideLoading());
}
// --------------------------filter list saga --------------------
function* filterListSaga(data) {}
// -----------------------------get wishlist -------------------------
function* getWishlistSaga() {
  yield put(showLoading());
  let serverId = yield select((state) => state.accountData.serverId);
  const response = yield call(getList, `user/${serverId}/wishlist`);
  let { status, data } = response;
  if (status === STATUS_CODE.SUCCESS_CODE) {
    yield put(getWishlistSuccess(data));
  } else {
  }
  yield put(hideLoading());
}
// ----------------------add to wishlist-----------------------------
function* addToWishlistSaga(data) {
  yield put(showLoading());
  let product = data.payload.product;
  let { alt, price, sale, status, content, productId, src } = product;
  let serverId = yield select((state) => state.accountData.serverId);
  const response = yield call(postList, `user/${serverId}/wishlist`, {
    alt,
    price,
    sale,
    status,
    content,
    productId,
    src,
  });
  let { data: resData, status: resStatus } = response;
  if (resStatus === STATUS_CODE.CREATED_CODE) {
    yield put(addToWishlistSuccess(resData));
    successNofication("Add to your wishlist success");
  } else {
    failedNofication("error");
  }
  yield put(hideLoading());
}
// ----------------------delete from wishlist-----------------------
function* deleteFromWishlistSaga(data) {
  yield put(showLoading());
  let { product } = data.payload;
  let { productId } = product;
  const serverId = yield select((state) => state.accountData.serverId);
  const wishlist = yield select((state) => state.wishlist.wishlist);
  let index = null;
  wishlist.forEach((product) => {
    if (product.productId === productId) {
      index = product.id;
    }
  });
  const response = yield call(deleteList, `user/${serverId}/wishlist`, index);
  let { data: resData, status } = response;
  if (status === STATUS_CODE.SUCCESS_CODE) {
    yield put(deleteFromWishlistSuccess(resData));
    successNofication("Remove from your wishlist success");
  } else {
    failedNofication("error");
  }
  yield put(hideLoading());
}
// ----------------root saga-----------------------------
function* rootSaga() {
  yield takeLatest(productTypes.GET_PRODUCT_LIST, getProductListSaga);
  yield takeLatest(cartTypes.GET_CART_LIST, getCartListSaga);
  yield takeEvery(cartTypes.ADD_TO_CART, addToCartSaga);
  yield takeEvery(cartTypes.ADD_AMOUNT_OF_PRODUCT, addAmountOfProductSaga);
  yield takeEvery(cartTypes.MINUS_AMOUNT_OF_PRODUCT, minusAmountOfProductSaga);
  yield takeEvery(
    cartTypes.DELETE_PRODUCT_FROM_CART,
    deleteProductFromCartSaga
  );
  yield takeLatest(accountTypes.GET_ACCOUNT_LIST, getAccountListSaga);
  yield takeLatest(accountTypes.ADD_NEW_ACCOUNT, addNewAccountSaga);
  yield takeLatest(productTypes.FILTER_LIST, filterListSaga);
  yield takeEvery(wishlistTypes.GET_WISHLIST, getWishlistSaga);
  yield takeEvery(wishlistTypes.ADD_TO_WISHLIST, addToWishlistSaga);
  yield takeEvery(wishlistTypes.DELETE_FROM_WISHLIST, deleteFromWishlistSaga);
}
export default rootSaga;
