/** @format */

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export function OptionsProjects() {
  const projects = useSelector((state) => state.data.projects);
  const { t } = useTranslation();

  const optionsProjectsInitial = [
    { name: "", label: "Allgemein (Alle Ideen)" },
  ];
  const optionsProjectsArray = projects
    ?.sort(function (a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    })
    .map((project) => ({
      name: project.project,
      label: project.title,
      img: project.imgUrl,
    }));

  var optionsProjects = [...optionsProjectsInitial, ...optionsProjectsArray];

  return optionsProjects;
}
