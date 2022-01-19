/** @format */
import React from "react";
import { Translation } from "react-i18next";
import Image from "../images/insightsCovers/agegroups-cover.jpg";

const organizationTypes = [
  {
    name: "Vereine", //  Association
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_association")}</span>}
      </Translation>
    ),
    color: "#f8a9a0",
    img: Image,
  },
  {
    name: "Initiativen", //  Initiatives
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_initiatives")}</span>}
      </Translation>
    ),
    color: "#d2a6e5",
    img: Image,
  },
  {
    name: "Planungsbüros", //  Planners
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_planners")}</span>}
      </Translation>
    ),
    color: "#92b7b2",
    img: Image,
  },
  {
    name: "Politik", //  Politics
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_politics")}</span>}
      </Translation>
    ),
    color: "#ffc473",
    img: Image,
  },
  {
    name: "Stadverwaltung", //  Administration
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_administration")}</span>}
      </Translation>
    ),
    color: "#d92d46",
    img: Image,
  },
  {
    name: "Presse", //  Press
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_press")}</span>}
      </Translation>
    ),
    color: "#7293b9",
    img: Image,
  },
  {
    name: "Sonstige", //  Others
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_other")}</span>}
      </Translation>
    ),
    color: "#f1cb00",
    img: Image,
  },
];

export default organizationTypes;
