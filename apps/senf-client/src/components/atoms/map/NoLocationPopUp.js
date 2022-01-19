/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setResetMapBounds } from "../../../redux/actions/mapActions";

import CloseIcon from "../../../images/icons/close.png";
//Map Stuff
import { Marker } from "@urbica/react-map-gl";
import { Trans, useTranslation } from "react-i18next";
import { CustomButton } from "../CustomButtons/CustomButton";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { setSwipePositionUp } from "../../../redux/actions/UiActions";
import { closeScream } from "../../../redux/actions/screamActions";
import { StyledH2 } from "../../../styles/GlobalStyle";

const NoLocationPopUp = ({ dataNoLocation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openNoLocation, setOpenNoLocation] = useState(false);

  const noLocationNumber = dataNoLocation.length;

  const handleNoLocation = () => {
    const bounds = {
      latitude1: 50.93892,
      latitude2: 50.93864,
      longitude2: 6.9586,
      longitude3: 6.9588,
    };

    dispatch(setResetMapBounds(bounds));
    setOpenNoLocation(false);
    dispatch(closeScream());
    if (isMobileCustom) {
      dispatch(setSwipePositionUp());
    }
  };

  return (
    <React.Fragment>
      {dataNoLocation.length > 1 && (
        <Marker
          key={"123456"}
          longitude={6.958725744885521}
          latitude={50.93864020643174}
        >
          <div
            style={{
              zIndex: 999,
              position: "absolute",
              width: "20px",
              marginLeft: "-10px",
              height: "20px",
              marginTop: "-10px",
              borderRadius: "100%",
              border: "1px white solid",
              backgroundColor: "#414345",
              opacity: "1",
            }}
            onClick={() => setOpenNoLocation(true)}
          >
            <div
              style={{
                position: "absolute",
                width: "100%",
                textAlign: "center",
                color: "white",
                marginTop: "0px",
              }}
            >
              {dataNoLocation.length}
            </div>
          </div>
        </Marker>
      )}

      {openNoLocation && (
        <Marker
          key={"1"}
          longitude={6.958725744885521}
          latitude={50.93864020643174}
        >
          <div
            style={{
              position: "absolute",
              marginLeft: "-10px",
              marginTop: "10px",
            }}
          >
            <div className="noLocationPopUp">
              <img
                src={CloseIcon}
                width="20px"
                style={{ position: "absolute", top: "10px", left: "10px" }}
                onClick={() => setOpenNoLocation(false)}
              />
              <StyledH2
                fontWeight="900"
                style={{
                  paddingRight: "2px",
                  paddingLeft: "2px",
                  marginTop: "10px",
                  marginBottom: "30px",
                }}
              >
                {t("withoutLocation")}
              </StyledH2>
              <CustomButton
                text={
                  <Trans
                    i18nKey="show_noLocationNumber_ideas"
                    noLocationNumber={noLocationNumber}
                  >
                    Show {{ noLocationNumber }} ideas
                  </Trans>
                }
                backgroundColor="#353535"
                textColor="white"
                position="relative"
                bottom="10px"
                handleButtonClick={() => handleNoLocation()}
              />
            </div>
          </div>
        </Marker>
      )}
    </React.Fragment>
  );
};
export default NoLocationPopUp;
