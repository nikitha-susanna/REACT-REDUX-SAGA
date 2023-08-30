import { call, put, takeEvery, all } from "redux-saga/effects";
import * as type from "../redux/types";

const apiUrl = "http://localhost:5000";
function getApi() {
  return fetch(apiUrl + "/usersList", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    }
  );
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
  return fetch(apiUrl + "/deleteUser?userId=" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    }
  );
}

function* deleteUser(action) {
  try {
    yield call(deleteApi, action);
    const users = yield call(getApi);
    yield put({ type: type.GET_USER_SUCCESS, users: users });
    yield put({ type: type.DELETE_USER_SUCCESS });
  } catch (error) {
    yield put({ type: type.GET_USER_FAILED, message: error.message });
  }
}

function addUserApi(action) {
  const data = action.data
  return fetch(apiUrl + "/addUser", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    }
  );
}

function* addUser(action) {
  try{
    yield call(addUserApi, action)
    const users = yield call(getApi);
    yield put({type: type.ADD_NEW_USER_SUCCESS})
    yield put({ type: type.GET_USER_SUCCESS, users: users });
  } catch (error) {
    yield put({ type: type.GET_USER_FAILED, message: error.message });
  }
}

const updateUserAPI = async (action, userId) => {
  const data = action
  return fetch(apiUrl + "/updateUser?userId=" + data.id, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    }
  );
};

function* updateExistingUser(action) {
  try {
    const updatedUser = yield call(updateUserAPI, action.data);
    const users = yield call(getApi);
    yield put({ type: type.UPDATE_USER_SUCCESS, payload: updatedUser });
    yield put({ type: type.GET_USER_SUCCESS, users: users });
  } catch (error) {
    yield put({ type: type.UPDATE_USER_FAILURE, payload: error.message });
  }
}

function* getUserSaga() {
  yield takeEvery(type.GET_USERS_REQUESTED, fetchUsers);
}

function* deleteSingleUser() {
  yield takeEvery(type.DELETE_USER, deleteUser);
}

function* addNewUser() {
  yield takeEvery(type.ADD_NEW_USER, addUser)
}

function* updateUser(){
  yield takeEvery(type.UPDATE_USER_REQUEST, updateExistingUser)
}

export default function* rootSaga() {
  yield all([
    getUserSaga(), 
    deleteSingleUser(),
    addNewUser(),
    updateUser()
  ]);
}
