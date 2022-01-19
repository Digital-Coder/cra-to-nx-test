/** @format */

import React, { useEffect } from "react";
import { useHistory } from "react-router";

//Translation
import { useTranslation } from "react-i18next";

//Images
import FirstImage from "../../../images/cityperson.png";
import FirstImageBad from "../../../images/citypersonBad.png";
import { LazyImage } from "react-lazy-images";

//MUI STuff
import withStyles from "@material-ui/core/styles/withStyles";

import { Link } from "react-router-dom";

//CHECK DEVICE
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { CustomButton } from "../../atoms/CustomButtons/CustomButton";
import Footer from "../../molecules/Footer/Footer";

const styles = {
  wrapper: {
    backgroundColor: "white",
    width: "100vw",
    height: "100vh",
    position: "fixed",
  },

  PlattformButton2: {
    position: "fixed",
    zIndex: 99,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "50vw",
    left: "25vw",
    bottom: "4em",
    borderRadius: "100px",
    color: "white",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
    backgroundColor: "#414345",
    textTransform: "none",
    fontSize: "14pt",
  },

  FirstImage: {
    position: "absolute",
    top: "9vh",
    width: "100vw",
    marginLeft: "0vw",
  },
};

const Welcome = ({ classes }) => {
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    if (!isMobileCustom) {
      history.push("/");
    }
  }, []);

  const handleButtonClick = () => {
    history.push("/start");
  };

  return (
    <div className={classes.wrapper}>
      <div className="wrapperMenu">
        {/* {navigator.language !== "de-DE" && (
          <p className="explanation">German expression saying – Contribute!</p>
        )} */}

        <LazyImage
          src={FirstImage}
          className={classes.FirstImage}
          alt="Person_Senftube"
          placeholder={({ imageProps, ref }) => (
            <img
              ref={ref}
              src={FirstImageBad}
              className={classes.FirstImage}
              alt="Person_Senftube"
            />
          )}
          actual={({ imageProps }) => (
            <img {...imageProps} alt="Person_Senftube" />
          )}
        />

        <CustomButton
          text={t("next")}
          backgroundColor="#353535"
          textColor="white"
          position="fixed"
          bottom="50px"
          handleButtonClick={handleButtonClick}
        />

        <Footer color="#353535" bottom="0px" />
      </div>
    </div>
  );
};

export default withStyles(styles)(Welcome);
