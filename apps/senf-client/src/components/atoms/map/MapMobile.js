/** @format */

import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { openScreamFunc } from "../../../redux/actions/screamActions";

//MAPSTUF
import MapGL, { Source, Layer, Marker } from "@urbica/react-map-gl";
import NoLocationPopUp from "./NoLocationPopUp";
import {
  setMapLoaded,
  setMapViewport,
} from "../../../redux/actions/mapActions";

//Icons
import Pin from "../../../images/pin3.png";
import { PatternBackground } from "./styles/sharedStyles";
import { useParams } from "react-router";

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const PinComponent = styled.img`
  position: absolute;
  width: 100px;
  transform: translateY(-95%) translateX(-50%) rotate(0deg);
  transform-origin: bottom center;

  z-index: -1;
`;

const MapMobile = ({
  dataFinal,
  openProject,
  _onViewportChange,
  zoomBreak,
  loadingProjects,
  geoData,
  mapRef,
}) => {
  const dispatch = useDispatch();
  const { screamId } = useParams();

  const openScream = useSelector((state) => state.UI.openScream);
  const scream = useSelector((state) => state.data.scream);

  const mapLoaded = useSelector((state) => state.data.mapLoaded);
  const mapViewport = useSelector((state) => state.data.mapViewport);

  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );

  const handlleMapLoaded = () => {
    dispatch(setMapLoaded());
    if (!screamId && !openProject && initialMapViewport !== null && mapLoaded) {
      setTimeout(() => {
        dispatch(setMapViewport(initialMapViewport));
      }, 1000);
    }
  };
  // useEffect(() => {
  //   if (!initialMapViewport) return;
  //   setTimeout(() => {
  //     dispatch(setMapViewport(initialMapViewport));
  //   }, 500);
  // }, [initialMapViewport]);

  const onClick = (event) => {
    if (event.features.length > 0) {
      dispatch(openScreamFunc(event.features[0].properties.screamId));
    }
  };

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

  if (dataFinal !== undefined && dataFinal.length > 0) {
    dataFinal.forEach((element) => {
      if (element.lat === 50.93864020643174) {
        dataNoLocation.push(element);
      }
    });
  }

  let dataFinalMap = [];
  const dataFinalMapArray = dataFinal;

  if (dataFinalMapArray !== undefined && dataNoLocation.length > 1) {
    dataFinalMapArray.forEach((element) => {
      if (element.lat !== 50.93864020643174) {
        dataFinalMap.push(element);
      }
    });
  }
  if (dataFinalMapArray !== undefined && dataNoLocation.length < 2) {
    dataFinalMapArray.forEach((element) => {
      dataFinalMap.push(element);
    });
  }

  let mygeojson = { type: "FeatureCollection", features: [] };

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

  return (
    isMobileCustom &&
    mapViewport && (
      <Wrapper>
        {!mapLoaded && <PatternBackground />}
        <MapGL
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
          }}
          mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          minZoom={7}
          {...mapViewport}
          onViewportChange={_onViewportChange}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: 2700,
          }}
          onLoad={handlleMapLoaded}
        >
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
            // onClick={onClick}
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

          <Layer
            id="clickLayer"
            source="mygeojson"
            type="circle"
            onClick={onClick}
            paint={{
              "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                // when zoom is 0, set each feature's circle radius to the value of its "rating" property
                0,
                ["*", 0.1, ["get", "circleRadius"]],

                10,
                ["*", 1.4, ["get", "circleRadius"]],

                // when zoom is 10, set each feature's circle radius to four times the value of its "rating" property
                14,
                ["*", 2.8, ["get", "circleRadius"]],
                20,
                ["*", 2, ["get", "circleRadius"]],
              ],
              "circle-color": "#fff",
              "circle-opacity": 0,
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
          <NoLocationPopUp dataNoLocation={dataNoLocation} />
        </MapGL>
      </Wrapper>
    )
  );
};

export default memo(MapMobile);
