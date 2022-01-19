/** @format */

import React, { useState, useEffect, memo } from "react";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { openScreamFunc } from "../../../redux/actions/screamActions";
import {
  setMapLoaded,
  setMapViewport,
} from "../../../redux/actions/mapActions";

//Icons
import Pin from "../../../images/pin3.png";

//Map Stuff
import MapGL, {
  Source,
  Layer,
  Marker,
  NavigationControl,
  Image,
} from "@urbica/react-map-gl";
import bbox from "@turf/bbox";

import NoLocationPopUp from "./NoLocationPopUp";
import { MapFilter } from "./MapFilter";
import { PatternBackground } from "./styles/sharedStyles";
import { useParams } from "react-router";

import Bubble1 from "../../../images/bubbles/bubble1.png";
import Bubble2 from "../../../images/bubbles/bubble2.png";
import Bubble3 from "../../../images/bubbles/bubble3.png";
import Bubble4 from "../../../images/bubbles/bubble4.png";
import Bubble5 from "../../../images/bubbles/bubble5.png";
import Bubble6 from "../../../images/bubbles/bubble6.png";
import Bubble7 from "../../../images/bubbles/bubble7.png";

import { openProjectRoomFunc } from "../../../redux/actions/projectActions";
import { setSwipePositionDown } from "../../../redux/actions/UiActions";

const Wrapper = styled.div`
  z-index: 9;
  margin: 0px;
  top: 0;
  left: 0;
  position: fixed;

  /* margin: 0px;
    top: 0;
    left: 600px;
    position: fixed; */
`;
const PinComponent = styled.img`
  position: absolute;
  width: 100px;
  transform: translateY(-95%) translateX(-50%) rotate(0deg);
  transform-origin: bottom center;

  z-index: -1;
`;

const ClickBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 9999;
  position: fixed;
  top: 0;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: 0.5s;
  pointer-events: ${(props) => (props.show ? "all" : "none")};
`;

const Bar = styled.div`
  position: fixed;
  width: 40px;
  height: 4px;
  border-radius: 10px;
  left: calc(47.5% - 20px);
  background-color: white;
  top: 10px;
`;

const Map = ({
  loadingProjects,
  dataFinal,
  geoData,
  openProjectRoom,
  _onViewportChange,
  mapRef,
  projects,
  order,
}) => {
  const dispatch = useDispatch();
  const { screamId } = useParams();
  const mapViewport = useSelector((state) => state.data.mapViewport);
  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );
  const mapLoaded = useSelector((state) => state.data.mapLoaded);
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openScream = useSelector((state) => state.UI.openScream);
  const scream = useSelector((state) => state.data.scream);
  const [hoverId, setHoverId] = useState("");
  const swipePosition = useSelector((state) => state.UI.swipePosition);

  const setSwipeDown = () => {
    dispatch(setSwipePositionDown());
  };

  const handlleMapLoaded = () => {
    dispatch(setMapLoaded());

    if (
      !screamId &&
      !openProjectRoom &&
      initialMapViewport !== null &&
      mapLoaded
    ) {
      setTimeout(() => {
        dispatch(setMapViewport(initialMapViewport));
      }, 1000);
    }
  };
  useEffect(() => {
    if (!initialMapViewport) return;
    setTimeout(() => {
      dispatch(setMapViewport(initialMapViewport));
    }, 1000);
  }, [initialMapViewport]);

  const data =
    !loadingProjects &&
    geoData !== undefined &&
    geoData !== "" &&
    JSON.parse(geoData);

  let dataNoLocation = [];
  let dataFinalMap = [];
  let geojsonIdeas = { type: "FeatureCollection", features: [] };
  let geojsonProjectRooms = { type: "FeatureCollection", features: [] };

  if (dataFinal !== undefined && dataFinal.length > 0) {
    dataFinal.forEach((element) => {
      if (element.lat === 50.93864020643174) {
        dataNoLocation.push(element);
      }
    });
  }

  if (dataFinal !== undefined && dataNoLocation.length > 1) {
    dataFinal.forEach((element) => {
      if (element.lat !== 50.93864020643174) {
        dataFinalMap.push(element);
      }
    });
  }
  if (dataFinal !== undefined && dataNoLocation.length < 2) {
    dataFinal.forEach((element) => {
      dataFinalMap.push(element);
    });
  }

  for (let point of dataFinalMap) {
    let properties = point;
    properties.circleRadius = 5 + point.likeCount / 7;
    properties.circleBlurRadius = 14 + point.likeCount / 7;

    delete properties.longitude;
    delete properties.latitude;

    const unique =
      dataFinalMap.filter((item) => item.long === point.long).length === 1;

    if (unique) {
      let feature = {
        type: "Feature",
        geometry: { type: "Point", coordinates: [point.long, point.lat] },
        properties: properties,
      };
      geojsonIdeas.features.push(feature);
    } else {
      function generateHash(string) {
        var hash = 0;
        if (string.length == 0) return hash;
        for (let i = 0; i < string.length; i++) {
          var charCode = string.charCodeAt(i);
          hash = (hash << 7) - hash + charCode;
          hash = hash & hash;
        }
        return hash;
      }

      function reversedNum(num) {
        return (
          parseFloat(num.toString().split("").reverse().join("")) *
          Math.sign(num)
        );
      }
      const hash = generateHash(point.screamId);

      point.long = point.long + hash / 100000000000000;
      point.lat = point.lat + reversedNum(hash) / 100000000000000;

      let feature = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [point.long, point.lat],
        },
        properties: properties,
      };
      geojsonIdeas.features.push(feature);
    }
  }

  for (let point of projects) {
    let properties = point;

    let feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [point.centerLong, point.centerLat],
      },
      properties: properties,
    };
    geojsonProjectRooms.features.push(feature);
  }
  const onHoverIdea = (event) => {
    if (event.features.length > 0) {
      setHoverId(event.features[0].properties.screamId);
    }
  };

  const onLeaveIdea = (event) => {
    setHoverId("");
  };

  const onClickIdea = (event) => {
    if (event.features.length > 0) {
      dispatch(openScreamFunc(event.features[0].properties.screamId));
    }
  };

  const onHoverProjectRoom = (event) => {
    if (event.features.length > 0) {
      setHoverId(event.features[0].properties.projectRoomId);
    }
  };

  const onLeaveProjectRoom = (event) => {
    setHoverId("");
  };

  const onClickProjectRoom = (event) => {
    if (event.features.length > 0) {
      dispatch(
        openProjectRoomFunc(event.features[0].properties.projectRoomId, true)
      );
    }
  };

  return (
    mapViewport && (
      <React.Fragment>
        {!mapLoaded && <PatternBackground />}

        <MapGL
          ref={mapRef}
          style={
            openInfoPage
              ? {
                  position: "fixed",
                  width: "100%",
                  height: "100%",
                  transform: "scale(1)",
                  left: 0,
                }
              : isMobileCustom
              ? {
                  position: "fixed",
                  width: "100vw",
                  left: "0",
                  height: "100vh",
                  top: "0",
                  transform: "scale(1)",
                }
              : {
                  position: "fixed",
                  width: "calc(100% - 600px)",
                  left: "600px",
                  top: "0",
                  height: "100%",
                  transform: "scale(1)",
                  zIndex: "-1",
                }
          }
          mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          minZoom={7}
          latitude={mapViewport.latitude}
          longitude={mapViewport.longitude}
          pitch={mapViewport.pitch}
          bearing={mapViewport.bearing}
          zoom={mapViewport.zoom}
          onViewportChange={_onViewportChange}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: mapViewport.duration,
          }}
          onLoad={handlleMapLoaded}
        >
          {isMobileCustom && !openScream && (
            <ClickBackground
              show={swipePosition === "top"}
              onClick={setSwipeDown}
            />
          )}
          {!isMobileCustom && (
            <NavigationControl showCompass showZoom position="top-right" />
          )}
          {openProjectRoom &&
            !loadingProjects &&
            geoData !== undefined &&
            geoData !== "" && (
              <React.Fragment>
                <Source id="maine" type="geojson" data={data} />
                <Layer
                  id="maine"
                  type="fill"
                  source="maine"
                  paint={{
                    "fill-color": "#fed957",
                    "fill-opacity": 0.3,
                  }}
                />
              </React.Fragment>
            )}

          {order === 1 || openScream || openProjectRoom ? (
            <React.Fragment>
              {!openInfoPage && !openScream && !openProjectRoom && (
                <MapFilter viewport={mapViewport} mapRef={mapRef} />
              )}

              <Source id="geojsonIdeas" type="geojson" data={geojsonIdeas} />
              <Layer
                id="geojsonIdeasblur"
                source="geojsonIdeas"
                type="circle"
                paint={{
                  "circle-radius": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    ["*", 0, ["get", "circleBlurRadius"]],

                    10,
                    ["*", 0, ["get", "circleBlurRadius"]],

                    14,
                    ["*", 4, ["get", "circleRadius"]],
                    20,
                    ["*", 0, ["get", "circleRadius"]],
                  ],
                  "circle-color": "#000",

                  "circle-blur": 1,
                  "circle-opacity": 0.15,
                }}
              />

              <Layer
                id="geojsonIdeas"
                source="geojsonIdeas"
                type="circle"
                onHover={onHoverIdea}
                onLeave={onLeaveIdea}
                onClick={onClickIdea}
                paint={{
                  // "circle-radius": {
                  //   base: ["get", "likeCount"],
                  //   stops: [
                  //     [12, 3],
                  //     [22, 180],
                  //   ],
                  // },

                  "circle-radius": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    // when zoom is 0, set each feature's circle radius to the value of its "rating" property
                    0,
                    ["*", 0.1, ["get", "circleRadius"]],

                    10,
                    ["*", 0.4, ["get", "circleRadius"]],

                    // when zoom is 10, set each feature's circle radius to four times the value of its "rating" property
                    14,
                    ["*", 1.5, ["get", "circleRadius"]],
                    20,
                    ["*", 1.2, ["get", "circleRadius"]],
                  ],
                  "circle-color": ["get", "color"],
                  // "circle-color": [
                  //   "match",
                  //   ["get", "Thema"],
                  //   "Rad",
                  //   "blue",
                  //   "Umwelt und Grün",
                  //   "#223b53",
                  //   "Verkehr",
                  //   "#e55e5e",
                  //   "Asian",
                  //   "#3bb2d0",
                  //   /* other */ "#ccc",
                  // ],
                  "circle-stroke-color": "#fff",
                  "circle-stroke-width": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    // when zoom is 0, set each feature's circle radius to the value of its "rating" property
                    0,
                    0.1,

                    10,
                    0.4,

                    // when zoom is 20, set each feature's circle radius to four times the value of its "rating" property
                    20,
                    3,
                  ],
                }}
              />

              <Layer
                id="geojsonIdeasText"
                source="geojsonIdeas"
                type="symbol"
                filter={["==", ["get", "screamId"], hoverId]}
                layout={{
                  "text-field": ["get", "title"],
                  "text-anchor": "left",
                  "text-offset": [1, 0],
                  "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
                  "text-justify": "left",
                  "text-size": 16,
                }}
              />
              {openScream && scream.lat && (
                <Marker
                  key={scream.screamId}
                  longitude={scream.long}
                  latitude={scream.lat}
                >
                  <PinComponent
                    src={Pin}
                    likeCount={scream.likeCount}
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 82%, 0 82%)",
                    }}
                    alt="ChatIcon"
                  />
                </Marker>
              )}

              <NoLocationPopUp dataNoLocation={dataNoLocation} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Image id="Bubble1" image={Bubble1} />
              <Image id="Bubble2" image={Bubble2} />
              <Image id="Bubble3" image={Bubble3} />
              <Image id="Bubble4" image={Bubble4} />
              <Image id="Bubble5" image={Bubble5} />
              <Image id="Bubble6" image={Bubble6} />
              <Image id="Bubble7" image={Bubble7} />
              <Source
                id="geojsonProjectRooms"
                type="geojson"
                data={geojsonProjectRooms}
              />
              <Layer
                id="geojsonProjectRooms"
                source="geojsonProjectRooms"
                type="symbol"
                onHover={onHoverProjectRoom}
                onLeave={onLeaveProjectRoom}
                onClick={onClickProjectRoom}
                layout={{
                  "icon-image": [
                    "match",
                    ["get", "organizationType"],
                    "Vereine",
                    "Bubble6",
                    "Inititiven",
                    "Bubble2",
                    "Planungsbüros",
                    "Bubble3",
                    "Politik",
                    "Bubble1",
                    "Stadtverwaltung",
                    "Bubble5",
                    "Presse",
                    "Bubble4",
                    "Bubble7",
                  ],
                  "icon-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    // when zoom is 0, set each feature's circle radius to the value of its "rating" property
                    0,
                    0.01,

                    10,
                    0.05,

                    // when zoom is 10, set each feature's circle radius to four times the value of its "rating" property
                    20,
                    0.4,
                  ],
                  "icon-anchor": "bottom",
                  "icon-allow-overlap": true,
                }}
              />
              <Layer
                id="geojsonProjectRoomsText"
                source="geojsonProjectRooms"
                type="symbol"
                filter={["==", ["get", "projectRoomId"], hoverId]}
                layout={{
                  "text-field": ["get", "title"],
                  "text-anchor": "left",
                  "text-offset": [0.5, -1.5],
                  "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
                  "text-justify": "left",
                  "text-size": 16,
                  "text-allow-overlap": true,
                }}
              />
            </React.Fragment>
          )}
        </MapGL>
      </React.Fragment>
    )
  );
};

export default memo(Map);
