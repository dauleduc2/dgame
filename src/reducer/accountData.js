import * as types from "../constants/accountActionConstants";

const initialState = {
  accountList: [],
  loginSuccess: false,
  userId: null,
  serverId: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ACCOUNT_LIST_SUCCESS:
      return {
        ...state,
        accountList: action.payload,
      };
    case types.ADD_NEW_ACCOUNT_SUCCESS:
      let addNewAccountDecoy = state.accountList;
      addNewAccountDecoy = addNewAccountDecoy.concat(action.payload);
      return {
        ...state,
        accountList: addNewAccountDecoy,
      };
    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
        userId: action.payload.userId,
        serverId: action.payload.serverId,
      };
    case types.SIGNIN_FAILED:
      return {
        ...state,
        loginSuccess: false,
      };
    case types.LOG_OUT:
      return {
        serverId: null,
        userId: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default accountReducer;
