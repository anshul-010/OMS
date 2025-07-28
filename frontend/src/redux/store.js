// redux/store.js or redux/reducer/index.js
import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./AuthReducer/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
