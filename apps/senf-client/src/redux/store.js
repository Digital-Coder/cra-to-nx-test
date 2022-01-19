/** @format */

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// import throttle from "lodash/throttle";

import userReducer from "./reducers/userReducer";
import formDataReducer from "./reducers/formDataReducer";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";
// import {
//   loadStateCreateProjectData,
//   saveStateCreateProjectData,
// } from "./persistedState";

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  formData: formDataReducer,
  UI: uiReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

// const persistedState = loadStateCreateProjectData();
const initialState = {};

const store = createStore(reducers, initialState, enhancer);

// store.subscribe(
//   throttle(() => {
//     if (store.getState().formData.createProjectFormData !== null) {
//       saveStateCreateProjectData({
//         formData: store.getState().formData,
//       });
//     }
//   }, 1000)
// );

export default store;
