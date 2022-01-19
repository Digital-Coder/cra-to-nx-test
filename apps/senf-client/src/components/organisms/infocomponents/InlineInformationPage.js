/** @format */

import React, { Fragment, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import { useTranslation } from "react-i18next";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";

// Redux stuff
import { Link } from "react-router-dom";

//LazyLoad
import { LazyImage } from "react-lazy-images";

//IMAGES

import Insta from "../../../images/icons/socialmedia/insta.png";
import Facebook from "../../../images/icons/socialmedia/facebook.png";

import TopPath from "../../../images/topPathNew.png";
import First from "../../../images/first.png";
import Second from "../../../images/secondImage.png";
import Third from "../../../images/letstalkbubble.png";

//IMAGES BAD
import TopPathBad from "../../../images/toppathbad.png";
import FirstBad from "../../../images/firstbad.png";

//ICON TO OPEN THE INFOMENU
import CloseIcon from "../../../images/icons/close_yellow.png";

import Logo from "../../../images/logo.png";
import { CustomButton } from "../../atoms/CustomButtons/CustomButton";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import MyButtonStyle from "../../atoms/CustomButtons/MyButtonStyle";
import MyButton from "../../../util/MyButton";
import Footer from "../../molecules/Footer/Footer";

const styles = {
  root: {
    backgroundColor: "white",
    padding: "0",
  },

  paper: {
    backgroundColor: "white",
    boxShadow: "none",
    padding: "0",
  },

  closeButton: {
    zIndex: 9999,
    position: "fixed",
    top: "0px",
    left: "15px",
    width: "40px",
    marginTop: "10px",
    color: "#ffd388",
    transform: "scale(1.5)",
  },

  nav: {
    width: "100vw",
    height: "80px",
    position: "fixed",
    backgroundColor: "white",
    zIndex: 98,
  },

  TopPath: {
    position: "absolute",
    top: "0",
    width: "100vw",
  },

  FirstImage: {
    position: "absolute",
    top: "24vw",
    width: "75vw",
    marginLeft: "15.3vw",
  },
};

const InlineInformationPage = ({ classes }) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const handleButtonContactClick = () => {
    var link = "mailto:dein@senf.koeln";
    window.location.href = link;
  };

  return (
    <Fragment>
      <ExpandButton
        handleButtonClick={() => setOpen(true)}
        dataCy="InlineInfo-button"
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
        fullScreen
      >
        <MyButton
          onClick={() => setOpen(false)}
          btnClassName={classes.closeButton}
        >
          <img src={CloseIcon} width="20px" />
        </MyButton>
        <div className="logo1">
          <img src={Logo} width="100px" alt="logo1"></img>
        </div>

        <div className={classes.nav} />

        <a
          href="https://www.facebook.com/senf.koeln/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="facebook">
            <img src={Facebook} width="25" alt="EndImage" />
          </div>
        </a>
        <a
          href="https://www.instagram.com/senf.koeln/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="insta">
            <img src={Insta} width="25" alt="EndImage" />
          </div>{" "}
        </a>

        <div className="wrapperMenu">
          <div className="StartBackground" />

          <LazyImage
            src={TopPath}
            className={classes.TopPath}
            width="100%"
            alt="Top_image_person_with_mustard_tube_good_quality"
            placeholder={({ imageProps, ref }) => (
              <img
                ref={ref}
                src={TopPathBad}
                className={classes.TopPath}
                width="100%"
                alt="Top_image_person_with_mustard_tube_bad_quality"
              />
            )}
            actual={({ imageProps }) => (
              <img
                {...imageProps}
                alt="Top_image_person_with_mustard_tube_good_quality"
              />
            )}
          />

          <div className="FirstWrapper">
            <span className="title1">{t("infopage_block1_title")}</span>

            <span className="subTitle1">{t("infopage_block1_subtitle")}</span>
            <LazyImage
              src={First}
              className="First"
              width="100%"
              alt="First_image_persons_idea_good_quality"
              placeholder={({ imageProps, ref }) => (
                <img
                  ref={ref}
                  src={FirstBad}
                  className="First"
                  width="100%"
                  alt="First_image_persons_idea_bad_quality"
                />
              )}
              actual={({ imageProps }) => (
                <img
                  {...imageProps}
                  alt="First_image_persons_idea_good_quality"
                />
              )}
            />
          </div>

          <span className="title2">{t("infopage_block2_title")}</span>

          <span className="subTitle2">{t("infopage_block2_subtitle")}</span>
          <img src={Second} className="Second" alt="TopPath" />

          <span className="title3">{t("infopage_block3_title")}</span>

          <span className="subTitle3">{t("infopage_block3_subtitle")}</span>

          <img src={Third} className="Third" alt="TopPath" />

          <CustomButton
            text={t("showIdeas")}
            backgroundColor="#353535"
            textColor="white"
            position="absolute"
            top="1700px"
            handleButtonClick={() => setOpen(false)}
          />
          <CustomButton
            text={t("contact")}
            backgroundColor="white"
            textColor="#353535"
            position="absolute"
            top="1760px"
            handleButtonClick={handleButtonContactClick}
          />

          <Footer color="#353535" position="absolute" top="1850px" />
        </div>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(InlineInformationPage);
