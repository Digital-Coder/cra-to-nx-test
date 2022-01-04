/** @format */

import React from "react";

/** @format */
import {
  setInitialMapBounds,
  setInitialMapViewport,
  setMapBounds,
  setMapViewport,
} from "./redux/actions/mapActions";
import { isMobileCustom } from "./util/customDeviceDetect";
import store from "./redux/store";

export const setViewport = () => {
  window.store = store;

  const TopViewport = {
    latitude:
      typeof Storage !== "undefined" && localStorage.getItem("latitude")
        ? Number(localStorage.getItem("latitude"))
        : 50.93864020643174,
    longitude:
      typeof Storage !== "undefined" && localStorage.getItem("longitude")
        ? Number(localStorage.getItem("longitude"))
        : 6.958725744885521,

    zoom: isMobileCustom ? 8 : 9.2,
    duration: 0,
  };
  store.dispatch(setMapViewport(TopViewport));

  const zoomedViewport = {
    latitude:
      typeof Storage !== "undefined" && localStorage.getItem("latitude")
        ? Number(localStorage.getItem("latitude"))
        : 50.93864020643174,
    longitude:
      typeof Storage !== "undefined" && localStorage.getItem("longitude")
        ? Number(localStorage.getItem("longitude"))
        : 6.958725744885521,

    zoom: isMobileCustom ? 9.3 : 10.5,
    duration: 2700,
    pitch: 30,
  };

  store.dispatch(setInitialMapViewport(zoomedViewport));
  setBeforeMapbounds();
};

export const setBeforeMapbounds = () => {
  console.log(localStorage.getItem("latitude"));
  const bounds = {
    latitude1:
      typeof Storage !== "undefined" && localStorage.getItem("latitude")
        ? Number(localStorage.getItem("latitude")) + 1
        : 50.93864020643174 + 1,
    latitude2:
      typeof Storage !== "undefined" && localStorage.getItem("latitude")
        ? Number(localStorage.getItem("latitude")) - 1
        : 50.93864020643174 - 1,
    longitude2:
      typeof Storage !== "undefined" && localStorage.getItem("longitude")
        ? Number(localStorage.getItem("longitude")) - 1
        : 6.958725744885521 - 1,
    longitude3:
      typeof Storage !== "undefined" && localStorage.getItem("longitude")
        ? Number(localStorage.getItem("longitude")) + 1
        : 6.958725744885521 + 1,
  };

  console.log(bounds, "localStorage?:", localStorage.getItem("longitude"));
  store.dispatch(setMapBounds(bounds));
};
