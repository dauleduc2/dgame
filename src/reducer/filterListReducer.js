import * as types from "../constants/dataActionConstants";

const initialState = {
  filterList: [],
};

const filterListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILTER_LIST_SUCCESS:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default filterListReducer;
