/** @format */

import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { StyledH2, StyledH3 } from "../../../styles/GlobalStyle";

const Wrapper = styled.div`
  position: fixed;
  z-index: 99999999999;
  background-attachment: fixed;
  background-image: linear-gradient(to bottom, #ffd19b, #ffda53, #ffffff);
  background-repeat: no-repeat;

  height: 100vh;
  width: 100vw;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorBackground = ({ loading }) => {
  const { t } = useTranslation();
  const errors = useSelector((state) => state.UI.errors);
  return (
    !loading &&
    errors && (
      <Wrapper>
         
        <StyledH2 fontWeight="900" textAlign="center">
          Ooops!
        </StyledH2>
        <br />
        <StyledH3 textAlign="center">{t("something_went_wrong")}</StyledH3>
      </Wrapper>
    )
  );
};

export default memo(ErrorBackground);
