/** @format */

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { closeScream } from "./screamActions";
import {
  LOADING_ORGANIZATIONS_DATA,
  SET_ORGANIZATIONS,
  OPEN_CREATE_ORGANIZATION,
  OPEN_ORGANIZATION,
  SET_ORGANIZATION,
  LOADING_DATA,
  STOP_LOADING_DATA,
} from "../types";

// Get all projects
export const getOrganizations = (mapViewport) => async (dispatch) => {
  dispatch({ type: LOADING_ORGANIZATIONS_DATA });

  const db = firebase.firestore();
  const storageRef = firebase.storage().ref();

  const ref = await db
    .collection("organizations")
    // .where("centerLat", "<", Number(mapViewport.latitude) + 1)
    // .where("centerLat", ">", Number(mapViewport.latitude) - 1)
    // .orderBy("createdAt", "desc")
    .where("status", "==", "active")
    .get();

  // : await db.collection("projects").orderBy("createdAt", "desc").get();

  const organizations = [];
  ref.docs.forEach((doc) => {
    storageRef
      .child(`/organizationsData/${doc.id}/logo/logo`)
      .getDownloadURL()
      .then(onResolve, onReject);

    function onResolve(image) {
      const docData = {
        ...doc.data(),
        organizationId: doc.id,
        imgUrl: image,
      };
      organizations.push(docData);
      if (organizations.length === ref.size) {
        dispatch({
          type: SET_ORGANIZATIONS,
          payload: organizations,
        });
      }
    }

    function onReject() {
      console.log("error loading organizations");
      organizations.push(doc.data());
    }
  });
};

export const stateCreateOrganizationsFunc = (state) => async (dispatch) => {
  console.log(state);
  dispatch({
    type: OPEN_CREATE_ORGANIZATION,
    payload: state,
  });
};

export const openOrganizationFunc =
  (state, organizationId) => async (dispatch) => {
    if (state === true) {
      dispatch({ type: LOADING_DATA });
      dispatch({
        type: OPEN_ORGANIZATION,
        payload: state,
      });
      dispatch(loadOrganizationData(organizationId));
      dispatch(closeScream());
      const newPath = `/organizations/${organizationId}`;
      window.history.pushState(null, null, newPath);
    } else {
      dispatch({ type: SET_ORGANIZATION, payload: null });

      dispatch({
        type: OPEN_ORGANIZATION,
        payload: null,
      });
      window.history.pushState(null, null, "/organizations");
    }
  };

export const loadOrganizationData = (organizationId) => async (dispatch) => {
  // dispatch({ type: LOADING_UI });

  const db = firebase.firestore();
  const storageRef = firebase.storage().ref();

  const ref = await db.collection("organizations").doc(organizationId).get();

  const projectRoomsRef = await db
    .collection("organizations")
    .doc(organizationId)
    .collection("projectRooms")
    .where("status", "==", "active")
    .orderBy("createdAt", "desc")
    .get();

  const archivedProjectRoomsRef = await db
    .collection("organizations")
    .doc(organizationId)
    .collection("projectRooms")
    .where("status", "==", "archived")
    .orderBy("createdAt", "desc")
    .get();

  if (!ref.exists) {
    console.log("No such document!");
  } else {
    const organization = ref.data();

    storageRef
      .child(`/organizationsData/${ref.id}/logo/logo`)
      .getDownloadURL()
      .then(onResolveOrg, onRejectOrg);

    function onResolveOrg(organizationImage) {
      organization.imgUrl = organizationImage;
      organization.organizationId = ref.id;
      organization.projectRooms = [];

      if (!projectRoomsRef.exists) {
        dispatch({ type: SET_ORGANIZATION, payload: organization });
        dispatch({ type: STOP_LOADING_DATA });
      }

      projectRoomsRef.docs.forEach((doc) => {
        storageRef
          .child(
            `/organizationsData/${organization.organizationId}/${doc.id}/thumbnail`
          )
          .getDownloadURL()
          .then(onResolvePr, onRejectPr);

        function onResolvePr(projectRoomImage) {
          organization.projectRooms.push({
            ...doc.data(),
            projectRoomId: doc.id,
            imgUrl: projectRoomImage,
          });
          dispatch({ type: SET_ORGANIZATION, payload: organization });
          dispatch({ type: STOP_LOADING_DATA });
        }
        function onRejectPr(error) {
          console.log("error Pr");
        }
      });

      archivedProjectRoomsRef.docs.forEach((doc) => {
        storageRef
          .child(
            `/organizationsData/${organization.organizationId}/${doc.id}/thumbnail`
          )
          .getDownloadURL()
          .then(onResolvePr, onRejectPr);

        function onResolvePr(projectRoomImage) {
          organization.projectRooms.push({
            ...doc.data(),
            projectRoomId: doc.id,
            imgUrl: projectRoomImage,
          });
          dispatch({ type: SET_ORGANIZATION, payload: organization });
          dispatch({ type: STOP_LOADING_DATA });
        }
        function onRejectPr(error) {
          console.log("error Pr");
        }
      });
    }

    function onRejectOrg(error) {
      console.log("error Org");
    }
  }
};
