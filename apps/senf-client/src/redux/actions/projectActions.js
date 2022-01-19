/** @format */

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { closeScream } from "./screamActions";
import {
  LOADING_DATA,
  STOP_LOADING_DATA,
  LOADING_PROJECTS_DATA,
  SET_PROJECTS,
  SET_PROJECT,
  OPEN_PROJECTROOM,
  CLOSE_PROJECT,
  OPEN_CREATE_PROJECTROOM,
} from "../types";
import setColorByTopic from "../../data/setColorByTopic";
import { setSwipePositionDown } from "./UiActions";
import setColorByOrganizationType from "../../data/setColorByOrganizationType";

// Get all projects
export const getProjects = (mapViewport) => async (dispatch) => {
  dispatch({ type: LOADING_PROJECTS_DATA });

  const db = firebase.firestore();
  const storageRef = firebase.storage().ref();

  const ref = await db
    .collectionGroup("projectRooms")
    // .where("centerLat", "<", Number(mapViewport?.latitude) + 1)
    // .where("centerLat", ">", Number(mapViewport?.latitude) - 1)
    .where("status", "==", "active")
    .orderBy("createdAt", "desc")
    .get();
  // : await db.collection("projects").orderBy("createdAt", "desc").get();

  const projects = [];
  ref.docs.forEach((doc) => {
    storageRef
      .child(
        `/organizationsData/${doc.data().organizationId}/${doc.id}/thumbnail`
      )
      .getDownloadURL()
      .then(onResolve, onReject);

    function onResolve(image) {
      const docData = {
        projectRoomId: doc.data().projectRoomId,

        title: doc.data().title,
        description: doc.data().description.substr(0, 180),
        owner: doc.data().owner,
        createdAt: doc.data().createdAt,
        startDate: doc.data().startDate,
        endDate: doc.data().endDate,
        status: doc.data().status,
        geoData: doc.data().geoData,
        centerLat: doc.data().centerLat,
        centerLong: doc.data().centerLong,
        zoom: doc.data().zoom,

        calendar: doc.data().calendar,
        organizationId: doc.data().organizationId,
        // weblink: doc.data().weblink,
        Thema: doc.data().Thema,
        organizationType: doc.data().organizationType,
        imgUrl: image,
        color: setColorByOrganizationType(doc.data().organizationType),
      };
      projects.push(docData);
      if (projects.length === ref.size) {
        dispatch({
          type: SET_PROJECTS,
          payload: projects,
        });
      }
    }
    function onReject(error) {
      projects.push(doc.data());
    }
  });
};

// Open a project

export const openProjectRoomFunc =
  (projectRoomId, state) => async (dispatch) => {
    if (state === true) {
      dispatch({ type: LOADING_DATA });
      dispatch({ type: OPEN_PROJECTROOM });
      dispatch(setSwipePositionDown());
      dispatch(loadProjectRoomData(projectRoomId));
      dispatch(closeScream());
      const newPath = `/projectRooms/${projectRoomId}`;
      window.history.pushState(null, null, newPath);
    } else {
      dispatch({ type: SET_PROJECT, payload: null });
      dispatch({ type: CLOSE_PROJECT });

      window.history.pushState(null, null, "/projectRooms");
    }
  };
export const loadProjectRoomData = (projectRoomId) => async (dispatch) => {
  const db = firebase.firestore();
  const storageRef = firebase.storage().ref();

  const ref = await db
    .collectionGroup("projectRooms")
    .where("projectRoomId", "==", projectRoomId)
    .get();

  const screamsRef = await db
    .collection("screams")
    .where("project", "==", projectRoomId)
    .orderBy("createdAt", "desc")
    .get();

  ref.docs.forEach((doc) => {
    storageRef
      .child(
        `/organizationsData/${doc.data().organizationId}/${doc.id}/thumbnail`
      )
      .getDownloadURL()
      .then((image) => {
        const projectRoom = doc.data();
        projectRoom.imgUrl = image;
        projectRoom.screams = [];

        screamsRef.docs.forEach((doc) =>
          projectRoom.screams.push({
            ...doc.data(),
            screamId: doc.id,
            color: setColorByTopic(doc.data().Thema),
            body: doc.data().body.substr(0, 120),
          })
        );

        dispatch({ type: SET_PROJECT, payload: projectRoom });
        dispatch({ type: STOP_LOADING_DATA });
      });
  });
};

export const openCreateProjectRoomFunc = (state) => async (dispatch) => {
  dispatch({
    type: OPEN_CREATE_PROJECTROOM,
    payload: state,
  });
};
