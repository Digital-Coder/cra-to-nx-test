/** @format */

import React, { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { CustomButton, CustomIconButton } from "../CustomButtons/CustomButton";
import { closeScream } from "../../../redux/actions/screamActions";
import {
  setMapBounds,
  setMapViewport,
} from "../../../redux/actions/mapActions";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { SubmitButton } from "../CustomButtons/SubmitButton";
import { setSwipePositionUp } from "../../../redux/actions/UiActions";

export const MapFilter = memo(({ viewport, mapRef }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.data.loading);
  const initialMapBounds = useSelector((state) => state.data.initialMapBounds);

  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );
  const [waitTime, setWaitTime] = useState(null);

  const handleMapBoundsSet = (viewport) => {
    const map = mapRef.current.getMap();
    var canvas = map.getCanvas(),
      w = canvas.width,
      h = canvas.height,
      NW = map.unproject([0, 0]).toArray(),
      SE = map.unproject([w, h]).toArray();
    var boundsRar = [NW, SE];

    const bounds = {
      latitude1: boundsRar[0][1],
      latitude2: boundsRar[1][1],
      longitude2: boundsRar[0][0],
      longitude3: boundsRar[1][0],
    };

    dispatch(setMapBounds(bounds));
    dispatch(setSwipePositionUp());

    setWaitTime(true);

    setTimeout(() => {
      setWaitTime(null);
    }, 3000);

    dispatch(closeScream());

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleMapBoundsReset = () => {
    dispatch(setMapViewport(initialMapViewport));
    dispatch(setMapBounds(initialMapBounds));

    dispatch(closeScream());
  };

  return (
    !loading &&
    viewport !== initialMapViewport &&
    !waitTime && (
      <SubmitButton
        text={t("Ideen im Bereich anzeigen")}
        backgroundColor="rgb(255, 255, 255, 0.6)"
        textColor="#353535"
        position="fixed"
        top={isMobileCustom ? "30px" : "40px"}
        animation="plop"
        handleButtonClick={() => handleMapBoundsSet(viewport)}
        smallSubmitButton={isMobileCustom && true}
        backdropFilter={true}
      />
    )
  );
});
