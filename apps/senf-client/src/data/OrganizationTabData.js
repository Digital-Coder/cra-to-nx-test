/** @format */
import React from "react";
import { Translation } from "react-i18next";

export const OrganizationTabData = [
  {
    text: (
      <Translation>
        {(t, { i18n }) => <span>{t("projectRooms")}</span>}
      </Translation>
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
