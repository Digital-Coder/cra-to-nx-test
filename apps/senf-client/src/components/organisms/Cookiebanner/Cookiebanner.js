/** @format */

import { Dialog, DialogContent } from "@material-ui/core";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCookies } from "../../../redux/actions/cookiesActions";
import { setInfoPageClosed } from "../../../redux/actions/UiActions";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { CustomButton } from "../../atoms/CustomButtons/CustomButton";

const Cookiebanner = () => {
  const cookie_settings = useSelector((state) => state.data.cookie_settings);
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleOpenCookiePreferences = () => {
    window.open("/cookieConfigurator", "_blank");
  };

  const handleCookies = (cookie_settings) => {
    dispatch(setCookies(cookie_settings));

    if (window.location.pathname !== "/") {
      dispatch(setInfoPageClosed());
    }
  };

  return cookie_settings !== "all" &&
    cookie_settings !== "minimum" &&
    isMobileCustom ? (
    <React.Fragment>
      <div className="cookiesText">
        {" "}
        <span className="cookiesHeader">{t("cookiebanner_title")}</span>
        <br />
        <Trans i18nKey="cookiebanner_text">
          Für die Bereitstellung einiger Funktionen und die Verbesserung dieses
          Services brauchen wir Cookies. Falls du wirklich nur die technisch
          notwendigsten Cookies akzeptieren willst, klicke{" "}
          <span className="Terms" onClick={() => handleCookies("minimum")}>
            hier
          </span>
          &nbsp;oder konfiguriere deine{" "}
          <span className="Terms" onClick={handleOpenCookiePreferences}>
            Cookie-Einstellungen
          </span>
          .
        </Trans>
      </div>
      <CustomButton
        text={t("accept")}
        backgroundColor="white"
        textColor="#353535"
        position="fixed"
        bottom="50px"
        handleButtonClick={() => handleCookies("all")}
      />
      <span className="footerIntro">
        <Link to="/impressum" className="footerIntroText">
          <span className="impressumIntro"> {t("imprint")} </span>
        </Link>
        <Link to="/datenschutz" className="footerIntroText">
          <span className="datenschutzInto"> | {t("dataPrivacy")} |</span>
        </Link>
        <Link to="/agb" className="footerIntroText">
          <span> {t("termsAndConditions")} </span>
        </Link>
      </span>{" "}
    </React.Fragment>
  ) : (
    cookie_settings !== "all" &&
      cookie_settings !== "minimum" &&
      !isMobileCustom && (
        <Dialog
          scroll={"paper"}
          open={openInfoPage}
          className="dialogOverlayContent"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          maxWidth={"sm"}
          PaperProps={{
            style: { borderRadius: "20px" },
          }}
        >
          <DialogContent style={{ height: "200px" }}>
            <div className="cookiesText">
              {" "}
              <span className="cookiesHeader">{t("cookiebanner_title")}</span>
              <br />
              <Trans i18nKey="cookiebanner_text">
                Für die Bereitstellung einiger Funktionen und die Verbesserung
                dieses Services brauchen wir Cookies. Falls du wirklich nur die
                technisch notwendigsten Cookies akzeptieren willst, klicke{" "}
                <span
                  className="Terms"
                  onClick={() => handleCookies("minimum")}
                >
                  hier
                </span>
                &nbsp;oder konfiguriere deine{" "}
                <span
                  className="Terms"
                  onClick={() => {
                    window.open("/cookieConfigurator", "_blank");
                  }}
                >
                  Cookie-Einstellungen
                </span>
                .
              </Trans>
            </div>

            <CustomButton
              text={t("accept")}
              backgroundColor="#353535"
              textColor="white"
              position="relative"
              top="30px"
              handleButtonClick={() => handleCookies("all")}
            />
          </DialogContent>
        </Dialog>
      )
  );
};

export default Cookiebanner;
