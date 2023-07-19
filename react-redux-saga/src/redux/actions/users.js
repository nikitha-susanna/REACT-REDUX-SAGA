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

export function deleteUserSuccess(){
   return {type:type.DELETE_USER_SUCCESS};
}
