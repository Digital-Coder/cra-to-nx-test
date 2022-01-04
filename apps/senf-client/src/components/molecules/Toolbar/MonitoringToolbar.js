/** @format */

import React from "react";
import { OptionsProjects } from "../../../data/OptionsProjects";
import { OptionsTopics } from "../../../data/OptionsTopics";
import CustomSelect from "../../atoms/Selects/CustomSelect";
import SortingSelect from "../../atoms/Selects/SortingSelect";

//icons
import LikeIcon from "../../../images/icons/handsFull.png";
import CommentIcon from "../../../images/icons/chat_full.png";
import CreatedAtIcon from "../../../images/icons/calendar.png";

const MonitoringToolbar = ({
  project,
  topic,
  handleDropdown,
  handleDropdownProject,
}) => {
  return (
    <div
      style={{
        marginLeft: "200px",
        width: "calc(100vw - 640px)",
        position: "fixed",
        top: "0",
        zIndex: "99",
        backgroundColor: "#ffd19b",
        height: "110px",
      }}
    >
      <div
        style={{
          position: "relative",
          marginLeft: "0px",

          marginTop: "20px",
          zIndex: 9,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            marginLeft: "10px",
            fontFamily: "Playfair Display",
            fontSize: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#414345",
          }}
        >
          <CustomSelect
            name={"project"}
            value={project}
            initialValue={"Allgemein (Alle Ideen)"}
            options={OptionsProjects()}
            handleDropdown={handleDropdownProject}
          />
        </div>
        <div
          style={{
            marginLeft: "auto",
          }}
        >
          <CustomSelect
            name={"topic"}
            value={topic}
            initialValue={"Wähle das Thema aus"}
            options={OptionsTopics()}
            handleDropdown={handleDropdown}
          />
        </div>
        <div
          style={{
            marginLeft: "10px",
          }}
        >
          <SortingSelect handleDropdown={handleDropdown} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: "10px",

          position: "relative",
          marginTop: "15px",
          height: "35px",
          borderBottom: "1px solid #353535",

          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "300px",
            margin: "10px",

            marginLeft: "50px",
          }}
        >
          Titel{" "}
        </div>
        <div style={{ width: "110px", margin: "10px" }}> Ort </div>
        <div style={{ width: "110px", margin: "10px" }}> Nutzer:in </div>

        <div
          style={{
            width: "20px",
            margin: "10px",
            marginTop: "5px",
            marginLeft: "5px",
          }}
        >
          <img alt="like-icon" src={LikeIcon} width="22px"></img>{" "}
        </div>
        <div style={{ width: "20px", margin: "10px", marginTop: "8px" }}>
          <img alt="comments-icon" src={CommentIcon} width="20px"></img>{" "}
        </div>
        <div
          style={{
            width: "70px",
            margin: "10px",
            marginTop: "8px",
            textAlign: "center",
          }}
        >
          <img alt="calendar-icon" src={CreatedAtIcon} width="20px"></img>{" "}
        </div>
      </div>
    </div>
  );
};

export default MonitoringToolbar;
