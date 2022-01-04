/** @format */

import React, { Fragment, memo, useCallback } from "react";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";

// Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  setInfoPageOpen,
  setInfoPageClosed,
} from "../../../redux/actions/UiActions";

//LazyLoad
import { LazyImage } from "react-lazy-images";

import Headline from "../../../images/headline.png";
import FirstImageBad from "../../../images/bigbubblemanbad.png";

//IMAGES
import FirstImage from "../../../images/bigbubbleman.png";
import Mountain from "../../../images/bigbubblenew.png";

import { useTranslation } from "react-i18next";
import { isMobileCustom } from "../../../util/customDeviceDetect";

//Icons
import Info from "../../../images/icons/info.png";

import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import {
  CustomButton,
  CustomIconButton,
} from "../../atoms/CustomButtons/CustomButton";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import { SideBarTabs } from "../../../styles/GlobalStyle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const paperProps = {
  style: {
    borderRadius: "20px",
    width: "1000px",
    height: "900px",
    maxHeight: "calc(100vh - 80px)",
    overflowX: "hidden",
  },
};

const InlineInformationPageDesktop = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { cookie_settings } = useSelector((state) => state.data);
  const { loading, openInfoPage } = useSelector((state) => state.UI);

  const handleOpen = useCallback(() => {
    dispatch(setInfoPageOpen());
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(setInfoPageClosed());
  }, [dispatch]);

  const handleButtonContactClick = useCallback(() => {
    var link = "mailto:dein@senf.koeln";
    window.location.href = link;
  }, []);
  return (
    !isMobileCustom && (
      <Fragment>
        <SideBarTabs>
          <ExpandButton handleButtonClick={handleOpen} />
          <img src={Info} width="35" alt="EndImage" />
          <span className="inlineInfoIconText"> {t("info")}</span>
        </SideBarTabs>

        {!loading &&
        openInfoPage &&
        (cookie_settings === "all" || cookie_settings === "minimum") ? (
          <Dialog
            scroll={"paper"}
            open={openInfoPage}
            onClose={handleClose}
            className="dialogOverlayContent"
            TransitionComponent={Transition}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth={"lg"}
            PaperProps={paperProps}
          >
            <CustomIconButton
              name="Close"
              position="fixed"
              marginLeft="-100px"
              handleButtonClick={handleClose}
            ></CustomIconButton>

            <DialogContent>
              <img className="Gib" src={Headline} width="100px"></img>
              {/* {navigator.language !== "de-DE" && (
                <p className="explanation">
                  German expression saying – Contribute!
                </p>
              )} */}
              <LazyImage
                src={FirstImage}
                className="FirstImage"
                alt="Person_Senftube"
                placeholder={({ imageProps, ref }) => (
                  <img
                    ref={ref}
                    src={FirstImageBad}
                    className="FirstImage"
                    alt="Person_Senftube"
                  />
                )}
                actual={({ imageProps }) => (
                  <img {...imageProps} alt="Person_Senftube" />
                )}
              />
              <div className="SVGweb" alt="TopPath">
                <img src={Mountain} className="Mountain" alt="Mountain" />

                <div>
                  <span className="title1Web">
                    {t("infopage_block1_title")}
                  </span>
                  <span className="subTitle1Web">
                    {t("infopage_block1_subtitle")}
                  </span>
                </div>
                <span className="title2Web">{t("infopage_block2_title")}</span>
                <span className="subTitle2Web">
                  {t("infopage_block2_subtitle")}
                </span>
                <span className="title3Web">{t("infopage_block3_title")}</span>
                <span className="subTitle3Web">
                  {t("infopage_block3_subtitle")}
                </span>

                <CustomButton
                  text={t("showIdeas")}
                  backgroundColor="#353535"
                  textColor="white"
                  position="absolute"
                  top="2600px"
                  handleButtonClick={handleClose}
                />
                <CustomButton
                  text={t("contact")}
                  backgroundColor="white"
                  textColor="#353535"
                  position="absolute"
                  top="2660px"
                  handleButtonClick={handleButtonContactClick}
                />

                <span className="footer">
                  <Link to="/impressum">
                    <span className="impressum"> {t("imprint")}</span>
                  </Link>
                  <Link to="/datenschutz">
                    <span className="datenschutz">
                      {" "}
                      | {t("dataPrivacy")} |{" "}
                    </span>
                  </Link>
                  <Link to="/agb">
                    <span className="agb"> {t("termsAndConditions")} </span>
                  </Link>
                </span>
                <span className="footercopy">{t("infopage_illustrator")}</span>
              </div>
            </DialogContent>
          </Dialog>
        ) : null}
      </Fragment>
    )
  );
};

export default memo(InlineInformationPageDesktop);
