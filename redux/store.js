import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./combinedReducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
