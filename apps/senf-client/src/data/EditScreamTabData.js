/** @format */
import React from "react";
import { Translation } from "react-i18next";

export const EditScreamTabData = [
  {
    text: (
      <Translation>{(t, { i18n }) => <span>{t("details")}</span>}</Translation>
    ),
  },
  {
    text: (
      <Translation>
        {(t, { i18n }) => <span>{t("monitoring")}</span>}
      </Translation>
    ),
  },
];
