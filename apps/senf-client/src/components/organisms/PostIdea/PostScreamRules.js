/** @format */

import React, { useState, Fragment } from "react";
import { Trans, useTranslation } from "react-i18next";

import Dialog from "@material-ui/core/Dialog";
import { CustomButton } from "../../atoms/CustomButtons/CustomButton";
import styled from "styled-components";
import { StyledA, StyledH2, StyledText } from "../../../styles/GlobalStyle";

const Card = styled.div`
  z-index: 99997;
  position: fixed;
  padding: 2.5vw;
  color: #414345;
  text-align: center;
  background-color: white;
  font-size: 13pt;
  top: 50vh;
  margin-top: -200px;
  border-radius: 20px;
  left: 0;
  box-shadow: 0 8px 40px -12px rgb(0 0 0 / 20%);
  backdrop-filter: blur(10px);
  width: 90vw;
  margin-left: 2.5vw;
  height: 420px;

  @media (min-width: 768px) {
    margin-top: 0;
    top: 40px;
    width: 340px;
    margin-left: 210px;
    height: 420px;
    padding: 20px;
  }
`;

const PostScreamRules = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <StyledA
        textDecoration="underline"
        onClick={handleOpen}
        style={{ marginLeft: "auto" }}
      >
        {t("rules")}
      </StyledA>
      <Dialog
        open={open}
        onClose={handleClose}
        width="md"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Card>
          <br />
          <span className="PostRulesHeader">{t("rules_title")}</span>
          <br />

          <br />
          <StyledH2 fontWeight="900" textAlign="center">
            {t("rules_section1header")}
          </StyledH2>

          <StyledText textAlign="center">
            <Trans i18nKey="rules_section1text">
              Ideen, Wünsche und Anregungen sind hier erwünscht. Für
              Beschwerden, informier dich bitte
              <a
                className="Terms"
                href="https://www.stadt-koeln.de/service/onlinedienste/anregungen-beschwerden/index.html"
                rel="noopener noreferrer"
                target="_blank"
              >
                hier
              </a>{" "}
              .
            </Trans>
          </StyledText>
          <br />

          <br />
          <StyledH2 fontWeight="900" textAlign="center">
            {t("rules_section2header")}
          </StyledH2>
          <StyledText textAlign="center">{t("rules_section2text")}</StyledText>

          <CustomButton
            text={t("rules_understood")}
            backgroundColor="#353535"
            textColor="white"
            position="relative"
            top="50px"
            handleButtonClick={handleClose}
          />
        </Card>{" "}
      </Dialog>
    </Fragment>
  );
};

export default PostScreamRules;
