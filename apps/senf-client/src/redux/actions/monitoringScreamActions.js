/** @format */

import firebase from "firebase/app";
import "firebase/firestore";
import setColorByTopic from "../../data/setColorByTopic";
import {
  LOADING_DATA,
  LOADING_UI,
  SET_SCREAM,
  STOP_LOADING_UI,
  SET_FULL_SCREAMS,
  OPEN_MONITORING_SCREAM,
  CLOSE_MONITORING_SCREAM,
} from "../types";

// Get all ideas with full data
export const getAllFullScreams = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });

  const db = firebase.firestore();
  const ref = await db.collection("screams").orderBy("createdAt", "desc").get();

  const screams = [];
  ref.docs.forEach((doc) => {
    const docData = {
      screamId: doc.id,
      ...doc.data(),
      color: setColorByTopic(doc.data().Thema),
    };

    screams.push(docData);
  });

  dispatch({
    type: SET_FULL_SCREAMS,
    payload: screams,
  });
};

//Open an idea on the monitoring board
export const openMonitoringScream = (screamId) => async (dispatch) => {
  const db = firebase.firestore();
  const ref = await db.collection("screams").doc(screamId).get();

  if (!ref.exists) {
    console.log("No such document!");
  } else {
    const scream = ref.data();
    scream.id = ref.id;

    dispatch({ type: LOADING_UI });
    dispatch({ type: CLOSE_MONITORING_SCREAM });

    // const newPath = `/${screamId}`;
    // window.history.pushState(null, null, newPath);
    dispatch({ type: SET_SCREAM, payload: scream });
    dispatch({ type: OPEN_MONITORING_SCREAM });
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const closeMonitoringScream = () => (dispatch) => {
  dispatch({ type: CLOSE_MONITORING_SCREAM });
  window.history.pushState(null, null, "/monitoring");
};
