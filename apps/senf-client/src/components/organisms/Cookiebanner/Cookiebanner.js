/** @format */

import { Dialog, DialogContent } from "@material-ui/core";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setCookies } from "../../../redux/actions/cookiesActions";
import { setInfoPageClosed } from "../../../redux/actions/UiActions";
import { StyledH2, StyledText } from "../../../styles/GlobalStyle";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { CustomButton } from "../../atoms/CustomButtons/CustomButton";
import Footer from "../../molecules/Footer/Footer";

const Wrapper = styled.div`
  z-index: 9995;
  position: fixed;
  width: 95vw;
  height: 20em;
  padding: 2.5vw;
  color: white;
  text-align: center;
  background-color: #414345;

  margin-left: 0vw;
  bottom: 0em;
  left: 0;

  @media (min-width: 768px) {
    z-index: 9999;
    position: relative;
    width: auto;
    height: auto;
    padding: 0;
    color: #353535;
    text-align: center;
    background-color: transparent;
    font-size: 13pt;

    top: 0;
    left: 0;
    border-radius: 20px;
  }
`;

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
      <Wrapper>
        <StyledH2 fontWeight="900" textAlign="center">
          {t("cookiebanner_title")}
        </StyledH2>
        <br />
        <StyledText color="white" textAlign="center">
          <Trans i18nKey="cookiebanner_text">
            Für die Bereitstellung einiger Funktionen und die Verbesserung
            dieses Services brauchen wir Cookies. Falls du wirklich nur die
            technisch notwendigsten Cookies akzeptieren willst, klicke{" "}
            <span className="Terms" onClick={() => handleCookies("minimum")}>
              hier
            </span>
            &nbsp;oder konfiguriere deine{" "}
            <span className="Terms" onClick={handleOpenCookiePreferences}>
              Cookie-Einstellungen
            </span>
            .
          </Trans>
        </StyledText>
      </Wrapper>
      <CustomButton
        text={t("accept")}
        backgroundColor="white"
        textColor="#353535"
        position="fixed"
        bottom="50px"
        zIndex="9999"
        handleButtonClick={() => handleCookies("all")}
      />
      <Footer color="#c9c9c9" bottom="0px" />
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
          <DialogContent style={{ height: "250px" }}>
            <Wrapper>
              {" "}
              <StyledH2 fontWeight="900" textAlign="center">
                {t("cookiebanner_title")}
              </StyledH2>
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
            </Wrapper>

            <CustomButton
              text={t("accept")}
              backgroundColor="#353535"
              textColor="white"
              position="relative"
              top="30px"
              zIndex="9999"
              handleButtonClick={() => handleCookies("all")}
            />
          </DialogContent>
        </Dialog>
      )
  );
};

export default Cookiebanner;
