/** @format */

import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  OPEN_SCREAM,
  CLOSE_SCREAM,
  OPEN_PROJECT,
  CLOSE_PROJECT,
  CLEAR_LOADING_ERRORS,
  OPEN_MONITORING_SCREAM,
  CLOSE_MONITORING_SCREAM,
  VOTED_TRUE,
  VOTED_FALSE,
  OPEN_ACCOUNT,
  CLOSE_ACCOUNT,
  SET_SWIPEPOSITION_UP,
  SET_SWIPEPOSITION_DOWN,
} from "../types";

const initialState = {
  loading: false,
  openScream: false,
  openMonitoringScream: false,

  openProject: false,
  openAccount: false,
  errors: null,
  openInfoPage: false,
  voted: false,
  swipePosition: "bottom",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case CLEAR_LOADING_ERRORS:
      return {
        ...state,
        loading: false,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };

    case OPEN_SCREAM:
      return {
        ...state,
        openScream: true,
      };

    case CLOSE_SCREAM:
      return {
        ...state,
        openScream: false,
      };

    case OPEN_MONITORING_SCREAM:
      return {
        ...state,
        openMonitoringScream: true,
      };

    case CLOSE_MONITORING_SCREAM:
      return {
        ...state,
        openMonitoringScream: false,
      };

    case OPEN_PROJECT:
      return {
        ...state,
        openProject: true,
      };

    case CLOSE_PROJECT:
      return {
        ...state,
        openProject: false,
      };

    case OPEN_ACCOUNT:
      return {
        ...state,
        openAccount: true,
      };

    case CLOSE_ACCOUNT:
      return {
        ...state,
        openAccount: false,
      };

    case VOTED_TRUE:
      return {
        ...state,
        voted: true,
      };
    case VOTED_FALSE:
      return {
        ...state,
        voted: false,
      };

    case SET_SWIPEPOSITION_UP:
      return {
        ...state,
        swipePosition: "top",
      };

    case SET_SWIPEPOSITION_DOWN:
      return {
        ...state,
        swipePosition: "bottom",
      };

    default:
      return state;
  }
}
