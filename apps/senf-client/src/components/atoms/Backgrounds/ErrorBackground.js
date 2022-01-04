/** @format */

import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Title = styled.div`
  position: relative;
  z-index: 9;
  margin-top: 5em;
  padding-bottom: 1em;
  font-size: 25pt;
  color: white;
  width: 100vw;
  text-align: center;
  font-family: "Playfair Display", serif;
  animation: enteranimation 1.5s;
`;

const ErrorBackground = ({ loading }) => {
  const { t } = useTranslation();
  const errors = useSelector((state) => state.UI.errors);
  return (
    !loading &&
    errors && (
      <div className="errorBackground">
             <Title> Ooops! </Title>
        <br />
        <span className="oopsText">{t("something_went_wrong")}</span>
      </div>
    )
  );
};

export default memo(ErrorBackground);
