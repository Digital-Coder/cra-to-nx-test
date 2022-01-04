/** @format */
import React from "react";
import { Translation } from "react-i18next";

export const ProjectTabData = [
  {
    text: (
      <Translation>{(t, { i18n }) => <span>{t("ideas")}</span>}</Translation>
    ),
  },
  {
    text: (
      <Translation>{(t, { i18n }) => <span>{t("info")}</span>}</Translation>
    ),
  },
  {
    text: (
      <Translation>{(t, { i18n }) => <span>{t("calendar")}</span>}</Translation>
    ),
  },
];
