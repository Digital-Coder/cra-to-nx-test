/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import CustomSelect from "../../atoms/Selects/CustomSelect";
import { OptionsProjects } from "../../../data/OptionsProjects";

const PostScreamSelectContainter = ({
  classes,
  locationDecided,
  handleLocationDecided,
  handleLocationDecidedNoLocation,
  projectSelected,
  address,
  handleDropdownProject,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="selectLocationContainer"
      style={
        !isMobileCustom && locationDecided
          ? { zIndex: 1 }
          : !isMobileCustom && !locationDecided
          ? { zIndex: 5 }
          : isMobileCustom && locationDecided
          ? {
              position: "fixed",
              bottom: "calc(90vh - 50px)",
              display: "none",
              zIndex: 999,
            }
          : {
              position: "fixed",
              bottom: "20px",
              display: "block",
              zIndex: 999,
            }
      }
    >
      {!isMobileCustom && (
        <div
          onClick={handleLocationDecided}
          style={
            locationDecided
              ? {
                  display: "block",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#000000",
                  position: "absolute",
                  zIndex: 99999,
                  opacity: 0.6,
                  borderRadius: "19px",
                }
              : {
                  display: "none",
                }
          }
        ></div>
      )}
      <div className="projectSelectContainer">
        <span className={classes.boldText}> {t("to")} </span>

        <CustomSelect
          name={"project"}
          value={projectSelected}
          initialValue={"Allgemein (Alle Ideen)"}
          options={OptionsProjects()}
          handleDropdown={handleDropdownProject}
        />
      </div>
      <br />
      <button
        className={
          projectSelected !== ""
            ? "buttonWide buttonSelectLocationNo_hide"
            : "buttonWide buttonSelectLocationNo"
        }
        onClick={handleLocationDecidedNoLocation}
      >
        {t("withoutLocationShort")}
      </button>
      <button
        className={
          address === "Ohne Ortsangabe"
            ? "buttonWide buttonSelectLocation_hide"
            : "buttonWide buttonSelectLocation"
        }
        onClick={handleLocationDecided}
      >
        {t("confirmLocation")}
      </button>
    </div>
  );
};

export default PostScreamSelectContainter;
