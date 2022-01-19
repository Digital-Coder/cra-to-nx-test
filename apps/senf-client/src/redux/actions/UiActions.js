/** @format */

import {
  SET_INFOPAGE_OPEN,
  SET_INFOPAGE_CLOSED,
  SET_SWIPEPOSITION_DOWN,
  SET_SWIPEPOSITION_UP,
  SET_TOPICS,
  SET_ORGANIZATION_TYPES,
} from "../types";

export const setInfoPageOpen = () => (dispatch) => {
  dispatch({
    type: SET_INFOPAGE_OPEN,
  });
};
export const setInfoPageClosed = () => (dispatch) => {
  dispatch({
    type: SET_INFOPAGE_CLOSED,
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
export const handleTopicSelectorRedux = (topic) => (dispatch) => {
  dispatch({
    type: SET_TOPICS,
    payload: topic,
  });
};

export const handleOrganizationTypesSelectorRedux =
  (organizationType) => (dispatch) => {
    dispatch({
      type: SET_ORGANIZATION_TYPES,
      payload: organizationType,
    });
  };
