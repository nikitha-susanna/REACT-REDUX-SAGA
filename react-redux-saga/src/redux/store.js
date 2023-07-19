import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import createSagaMiddlewear from "redux-saga";
import rootSaga from "../saga/userSaga";
const sagaMiddlewear = createSagaMiddlewear();
const store = compose(applyMiddleware(sagaMiddlewear))(createStore)(
  rootReducer
);

sagaMiddlewear.run(rootSaga);

export default store;
