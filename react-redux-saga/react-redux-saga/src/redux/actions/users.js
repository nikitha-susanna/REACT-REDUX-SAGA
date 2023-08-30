import * as type from "../types";

export function getUsers(users) {
  return {
    type: type.GET_USERS_REQUESTED,
    payload: users
  };
}

export function deleteUser(id) {
  return { type: type.DELETE_USER, userId: id };
}

export function deleteUserSuccess() {
  return { type: type.DELETE_USER_SUCCESS };
}

export function addNewUser(payload) {
  return {
    type: type.ADD_NEW_USER,
    data: payload
  };
}

export function addUserSuccessfully() {
  return {
    type: type.ADD_NEW_USER_SUCCESS
  };
}

export function updateUser(user) {
  return {
    type: type.UPDATE_USER_REQUEST,
    data: user,
  };
}
