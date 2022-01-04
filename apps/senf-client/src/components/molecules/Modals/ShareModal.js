/** @format */

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

//SHARE
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";

//SHAREICONS
import { EmailIcon, FacebookIcon, WhatsappIcon } from "react-share";
import MainModal from "../../atoms/Layout/MainModal";

const styles = {
  functions: {
    zIndex: "999",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",

    height: "auto",
    width: "100%",
    top: "0.5em",
  },

  shareButtons: {
    position: "relative",
    width: "13%",
    height: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    zIndex: "990",
  },

  faceButton: {
    zIndex: 9999,
  },
};

const ShareModal = ({ classes, path, setShareOpen }) => {
  return (
    <MainModal handleButtonClick={() => setShareOpen(false)}>
      <p
        style={{
          fontFamily: "Futura PT W01-Bold",
          fontSize: "15pt",
          color: "#414345",
          width: "100%",
          textAlign: "center",
          marginLeft: "0",
          left: 0,
          zIndex: "999",
          position: "relative",
          top: "1em",
          marginBottom: "0.5em",
        }}
      >
        Teile den Link per
      </p>

      <div className={classes.functions}>
        <WhatsappShareButton url={path} className={classes.shareButtons}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>

        <FacebookShareButton url={path} className={classes.shareButtons}>
          <FacebookIcon className={classes.faceButton} size={32} round={true} />
        </FacebookShareButton>

        <EmailShareButton url={path} className={classes.shareButtons}>
          <EmailIcon className={classes.faceButton} size={32} round={true} />
        </EmailShareButton>
      </div>
    </MainModal>
  );
};

export default withStyles(styles)(ShareModal);
