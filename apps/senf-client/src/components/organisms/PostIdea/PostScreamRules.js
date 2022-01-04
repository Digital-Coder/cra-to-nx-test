/** @format */

import React, { useState, Fragment } from "react";
import { Trans, useTranslation } from "react-i18next";

import Dialog from "@material-ui/core/Dialog";
import { CustomButton } from "../../atoms/CustomButtons/CustomButton";
import styled from "styled-components";

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
    height: 400px;
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
      <a onClick={handleOpen} className="rules-link">
        {t("rules")}
      </a>
      <Dialog
        open={open}
        onClose={handleClose}
        width="md"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <div>
          <Card>
            <br />
            <span className="PostRulesHeader">{t("rules_title")}</span>
            <br />
            <br />
            <br />
            <span className="cookiesHeader">{t("rules_section1header")}</span>
            <br />

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
            <br />
            <br />
            <br />
            <span className="cookiesHeader">{t("rules_section2header")}</span>
            <br />
            <span>{t("rules_section2text")}</span>

            <CustomButton
              text={t("rules_understood")}
              backgroundColor="#353535"
              textColor="white"
              position="relative"
              top="50px"
              handleButtonClick={handleClose}
            />
          </Card>{" "}
        </div>
      </Dialog>
    </Fragment>
  );
};

export default PostScreamRules;
