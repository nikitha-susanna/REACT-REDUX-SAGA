import * as type from "../types";

const initialState = {
  users: [],
  loading: false,
  error: null
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case type.GET_USERS_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case type.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.users
      };
    case type.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case type.GET_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message
      };
    case type.ADD_NEW_USER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case type.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case type.UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
