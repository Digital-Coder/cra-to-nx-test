/** @format */

import React from "react";
import { isMobileCustom } from "../util/customDeviceDetect";

//REDUX STUFF
import { useSelector } from "react-redux";

//Icons
import CircularProgress from "@material-ui/core/CircularProgress";

//Images
import Celebrate from "../images/celebrateImage.png";
import Fast_geschafft from "../images/headlines/Fast_geschafft.png";

//COMPONENT
import LoginRegistration from "../components/organisms/Auth/LoginRegistration";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import { CustomIconButton } from "../components/atoms/CustomButtons/CustomButton";
import { useHistory } from "react-router-dom";

const styles = {
  question: {
    fontSize: "14pt",
    border: "1px #414345 solid",
    borderRadius: "100%",
    position: "fixed",
    bottom: "2vh",
    right: "2vh",
    zIndex: 99,
    width: "1.5em",
    height: "1.5em",
    lineHeight: "22pt",
    textAlign: "center",
  },
};

const Verification = ({ classes }) => {
  const loading = useSelector((state) => state.UI.loading);
  const history = useHistory();
  const handleClick = () => {
    alert(
      "Abhängig davon, welchen E-Mail Dienstleister du nutzt, kann die Verifizierungs-E-Mail verzögert eintreffen. Falls wirklich keine E-Mail eintreffen sollte, bitte melde dich bei uns: dein@senf.koeln"
    );
  };

  const handleClose = () => {
    history.push("/");
  };

  return (
    <div>
      {!loading ? (
        <div>
          {!isMobileCustom && (
            <CustomIconButton
              name="Close"
              position="fixed"
              margin="40px"
              handleButtonClick={handleClose}
            />
          )}

          <img
            src={Fast_geschafft}
            className="VerifyHeader"
            alt="Fast_geschafft_headline"
          />

          <div className="VerifySubHeader">
            Du bekommst in den nächsten Minuten von uns eine E-Mail. <br />{" "}
            &#40;
            {history.location.state && history.location.state.email}
            , evtl. im Junk-Ordner&#41; <br />
            <br /> Bitte öffne sie und klicke auf den Link um deinen Account zu
            verifizieren. Danach kannst du dich anmelden!
          </div>

          <button className="buttonWide buttonVerify">
            Zur Anmeldung <LoginRegistration />
          </button>

          <img src={Celebrate} className="CelebrateVerify" alt="EndImage" />

          <div className={classes.question} onClick={() => handleClick()}>
            ?
          </div>
        </div>
      ) : (
        <div className="white">
          <div className="spinnerDiv">
            <CircularProgress size={50} thickness={2} />
          </div>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(Verification);
