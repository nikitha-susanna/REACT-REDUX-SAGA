import { call, put, takeEvery, all } from "redux-saga/effects";
import * as type from "../redux/types";

const apiUrl = ""
function getApi() {
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      console.log(error);
    });
}

function* fetchUsers() {
  try {
    const users = yield call(getApi);
    yield put({ type: type.GET_USER_SUCCESS, users: users });
  } catch (error) {
    yield put({ type: type.GET_USER_FAILED, message: error.message });
  }
}

function deleteApi(action) {
   const id = action.userId;
  return fetch(apiUrl + "/" +id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      console.log(error);
    });
}

function* deleteUser (action) {
   try{
      yield call(deleteApi, action)
      const users = yield call(getApi);
      yield put({ type: type.GET_USER_SUCCESS, users: users });
      yield put({type: type.DELETE_USER_SUCCESS})
   } catch (error) {
      yield put({ type: type.GET_USER_FAILED, message: error.message });
    }
}

function* getUserSaga() {
  yield takeEvery("GET_USERS_REQUESTED", fetchUsers);
}

function* deleteSingleUser() {
   yield takeEvery(type.DELETE_USER, deleteUser)
}

export default function* rootSaga() {
   yield all([
      getUserSaga(),
      deleteSingleUser()
   ]);
 }

