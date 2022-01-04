/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";

const NoMore = styled.div`
  color: rgb(87, 87, 87);
  position: absolute;
  font-size: 20pt;
  margin-top: 0vh;
  margin-left: 0vw;
  width: 100%;
  text-align: center;
  font-family: Playfair Display;
`;

const NoContent = styled.div`
  position: relative;
  font-size: 15pt;
  color: #414345;
  width: 80%;
  margin-left: 10%;
  text-align: center;
  z-index: 10;
`;

export const NoMoreMainContent = ({ dataFinalLength }) => {
  const { t } = useTranslation();

  return dataFinalLength && dataFinalLength > 0 ? (
    <NoMore>
      ... <br /> {t("noMoreIdeas")} <br />
    </NoMore>
  ) : (
    <NoContent>{t("noContentIdeas")}</NoContent>
  );
};

export const NoMoreMyContent = ({ dataFinalLength, loading }) => {
  const myScreams = useSelector((state) => state.data.myScreams);

  const { t } = useTranslation();

  return !loading && dataFinalLength && dataFinalLength > 0 ? (
    <NoMore>
      ... <br /> {t("noMoreIdeas")} <br />
    </NoMore>
  ) : myScreams === undefined || myScreams === 0 ? (
    <NoContent>{t("noSharedIdeas")}</NoContent>
  ) : (
    <NoContent> {t("noIdeasWithFilter")}</NoContent>
  );
};

export const NoMoreProjectsContent = ({ dataFinalLength, loading }) => {
  const screams = useSelector((state) => state.data.project.screams);

  const { t } = useTranslation();

  return !loading && dataFinalLength && dataFinalLength > 0 ? (
    <NoMore>
      ... <br /> {t("noMoreIdeas")} <br />
    </NoMore>
  ) : !loading && (screams.length === 0 || screams === undefined) ? (
    <NoContent>{t("noProjectIdeas")}</NoContent>
  ) : (
    <NoContent>{t("noContentIdeas")}</NoContent>
  );
};
