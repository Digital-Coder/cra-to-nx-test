/** @format */

import { CLEAR_ERRORS, CLEAR_LOADING_ERRORS } from "../types";

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearLoadingErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_LOADING_ERRORS });
};
