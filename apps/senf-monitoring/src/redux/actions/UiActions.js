/** @format */

import {
  SET_TOPICS,
  SET_SWIPEPOSITION_DOWN,
  SET_SWIPEPOSITION_UP,
} from "../types";

export const handleTopicSelectorRedux = (topic) => (dispatch) => {
  dispatch({
    type: SET_TOPICS,
    payload: topic,
  });
};
export const setSwipePositionUp = () => (dispatch) => {
  dispatch({
    type: SET_SWIPEPOSITION_UP,
  });
};
export const setSwipePositionDown = () => (dispatch) => {
  dispatch({
    type: SET_SWIPEPOSITION_DOWN,
  });
};
