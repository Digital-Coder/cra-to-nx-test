/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { NoContent, NoMore } from "./styles/sharedStyles";

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

export const NoMoreProjectRooms = ({ dataFinalLength }) => {
  const { t } = useTranslation();

  return dataFinalLength && dataFinalLength > 0 ? (
    <NoMore>
      ... <br /> {t("noMoreProjectRooms")} <br />
    </NoMore>
  ) : (
    <NoContent>{t("noProjectRooms")}</NoContent>
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
  const project = useSelector((state) => state.data.project);

  const { t } = useTranslation();

  return !loading && dataFinalLength && dataFinalLength > 0 ? (
    <NoMore>
      ... <br /> {t("noMoreIdeas")} <br />
    </NoMore>
  ) : !loading &&
    (project?.screams === undefined || project?.screams?.length === 0) ? (
    <NoContent>{t("noProjectIdeas")}</NoContent>
  ) : (
    <NoContent>{t("noContentIdeas")}</NoContent>
  );
};
