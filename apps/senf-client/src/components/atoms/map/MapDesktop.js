/** @format */

import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { openScreamFunc } from "../../../redux/actions/screamActions";
import {
  setMapLoaded,
  setMapViewport,
} from "../../../redux/actions/mapActions";
//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";

//Icons
import Pin from "../../../images/pin3.png";

//Map Stuff
import MapGL, {
  Source,
  Layer,
  Marker,
  NavigationControl,
} from "@urbica/react-map-gl";

import NoLocationPopUp from "./NoLocationPopUp";
import { DesktopMapButtons } from "./DesktopMapButtons";
import { PatternBackground } from "./styles/sharedStyles";
import { useParams } from "react-router";

const PinComponent = styled.img`
  position: absolute;
  width: 100px;
  transform: translateY(-95%) translateX(-50%) rotate(0deg);
  transform-origin: bottom center;

  z-index: -1;
`;

const styles = {
  root: {
    backgroundColor: "lightgrey",
  },
  title: {
    position: "absolute",
    width: "200px",
    display: "block",
    fontSize: "14px",
    lineHeight: "16px",
    fontFamily: "Futura PT W01-Bold",
    textShadow: "2px 2px 18px #FFFFFF",
    opacity: 1,
    transition: "0.2s",
    PointerEvents: "none",
  },
};

const MapDesktop = ({
  loadingProjects,
  classes,
  dataFinal,
  geoData,
  openProject,
  _onViewportChange,
  zoomBreak,
  mapRef,
}) => {
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openScream = useSelector((state) => state.UI.openScream);

  const scream = useSelector((state) => state.data.scream);

  const dispatch = useDispatch();
  const [hoverScreamId, setHoverScreamId] = useState("");
  const [hoverLat, setHoverLat] = useState("");
  const [hoverLong, setHoverLong] = useState("");
  const [hoverTitle, setHoverTitle] = useState("");
  const [hoverLikeCount, setHoverLikeCount] = useState("");

  const mapViewport = useSelector((state) => state.data.mapViewport);
  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );
  const mapLoaded = useSelector((state) => state.data.mapLoaded);
  const { screamId } = useParams();

  const handlleMapLoaded = () => {
    dispatch(setMapLoaded());

    if (!screamId && !openProject && initialMapViewport !== null && mapLoaded) {
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
    !loadingProjects && geoData !== undefined && geoData !== ""
      ? {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [JSON.parse(geoData)],
          },
        }
      : null;

  let dataNoLocation = [];
  let dataFinalMap = [];
  let mygeojson = { type: "FeatureCollection", features: [] };

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
      mygeojson.features.push(feature);
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
      mygeojson.features.push(feature);
    }
  }

  const onHover = (event) => {
    if (event.features.length > 0) {
      setHoverScreamId(event.features[0].properties.screamId);
      setHoverLat(event.features[0].properties.lat);
      setHoverLong(event.features[0].properties.long);
      setHoverTitle(event.features[0].properties.title);
      setHoverLikeCount(event.features[0].properties.likeCount);
    }
  };

  const onLeave = (event) => {
    setHoverScreamId("");
    setHoverLat("");
    setHoverLong("");
    setHoverTitle("");
    setHoverLikeCount("");
  };

  const onClick = (event) => {
    if (event.features.length > 0) {
      dispatch(openScreamFunc(event.features[0].properties.screamId));
    }
  };

  return (
    !isMobileCustom &&
    mapViewport && (
      <div className="mapWrapper">
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
              : {
                  position: "fixed",
                  width: "calc(100% - 600px)",
                  left: "600px",
                  height: "100%",
                  transform: "scale(1)",
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
          <NavigationControl showCompass showZoom position="top-right" />
          {openProject &&
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
          <DesktopMapButtons viewport={mapViewport} mapRef={mapRef} />

          <Source id="mygeojson" type="geojson" data={mygeojson} />
          <Layer
            id="mygeojsonblur"
            source="mygeojson"
            type="circle"
            paint={{
              "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                // when zoom is 0, set each feature's circle radius to the value of its "rating" property
                0,
                ["*", 0, ["get", "circleBlurRadius"]],

                10,
                ["*", 0, ["get", "circleBlurRadius"]],

                // when zoom is 10, set each feature's circle radius to four times the value of its "rating" property

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
            id="mygeojson"
            source="mygeojson"
            type="circle"
            onHover={onHover}
            onLeave={onLeave}
            onClick={onClick}
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

                // when zoom is 10, set each feature's circle radius to four times the value of its "rating" property
                20,
                3,
              ],
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
                zoomBreak={zoomBreak}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 82%, 0 82%)",
                }}
                alt="ChatIcon"
              />
            </Marker>
          )}

          <Marker key={hoverScreamId} longitude={hoverLong} latitude={hoverLat}>
            <div
              style={{
                position: "absolute",
                width: (7 + hoverLikeCount / 4) * zoomBreak + "px",
                marginLeft: -(7 + hoverLikeCount / 4) * zoomBreak + "px",
                height: (7 + hoverLikeCount / 4) * zoomBreak + "px",
                marginTop: -(7 + hoverLikeCount / 4) * zoomBreak + "px",
                borderRadius: "100%",
                // border: "1px white solid",
                // backgroundColor: "rgb(0,0,0,0.2)",

                opacity: "1",
                pointerEvents: "none",
              }}
            >
              <div
                className={classes.title}
                style={{
                  marginLeft: +(18 + hoverLikeCount / 4) * zoomBreak + "px",
                  marginTop: +(5 + hoverLikeCount / 6) * zoomBreak + "px",
                  transform: "translateY(-50%)",
                }}
              >
                {hoverTitle}
              </div>
            </div>
          </Marker>

          <NoLocationPopUp dataNoLocation={dataNoLocation}></NoLocationPopUp>
        </MapGL>
      </div>
    )
  );
};

export default withStyles(styles)(MapDesktop);
