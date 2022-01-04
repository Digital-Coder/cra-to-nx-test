/** @format */
import React from "react";
import { Translation } from "react-i18next";

export const AccountTabData = [
  {
    text: (
      <Translation>
        {(t, { i18n }) => <span>{t("your_ideas")}</span>}
      </Translation>
    ),
  },
  {
    text: (
      <Translation>
        {(t, { i18n }) => <span>{t("your_settings")}</span>}
      </Translation>
    ),
  },
];
