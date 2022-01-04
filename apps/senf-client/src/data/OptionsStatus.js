/** @format */

import { useTranslation } from "react-i18next";

export function OptionsStatus() {
  const { t } = useTranslation();

  return [
    { name: "None", label: "Offen" },
    { name: "Submitted", label: "Eingereicht" },
    {
      name: "Implemented",
      label: t("Bereits umgesetzt"),
    },
  ];
}
