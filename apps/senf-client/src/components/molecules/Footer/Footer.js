import { Link } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { StyledText } from "../../../styles/GlobalStyle";

const Wrapper = styled.div`
  position: ${(props) => (props.position ? props.position : "fixed")};
  bottom: ${(props) => (props.bottom ? props.bottom : "none")};
  top: ${(props) => (props.top ? props.top : "none")};
  width: 100%;
  z-index: 99999;
  height: 2em;
  padding-top: 0.5em;
  text-align: center;
  left: 0;
  display: flex;
  justify-content: center;
`;
const Footer = ({ color, position, top, bottom }) => {
  const { t } = useTranslation();
  return (
    <Wrapper position={position} top={top} bottom={bottom}>
      <Link to="/impressum">
        <StyledText color={color}>{t("imprint")}</StyledText>
      </Link>

      <Link to="/datenschutz">
        <StyledText
          color={color}
          style={{ paddingLeft: "5px", paddingRight: "5px" }}
        >
          | {t("dataPrivacy")} |
        </StyledText>
      </Link>
      <Link to="/agb">
        <StyledText color={color}>{t("termsAndConditions")}</StyledText>
      </Link>
    </Wrapper>
  );
};

export default Footer;
