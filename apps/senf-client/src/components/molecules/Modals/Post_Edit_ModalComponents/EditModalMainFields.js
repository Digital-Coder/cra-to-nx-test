/** @format */

import { TextField } from "@material-ui/core";
import React from "react";
import Geocoder from "react-mapbox-gl-geocoder";
import { OptionsProjects } from "../../../../data/OptionsProjects";
import { OptionsTopics } from "../../../../data/OptionsTopics";
import { StyledH3 } from "../../../../styles/GlobalStyle";
import { CustomIconButton } from "../../../atoms/CustomButtons/CustomButton";
import CustomSelect from "../../../atoms/Selects/CustomSelect";

const EditModalMainFields = ({
  project,
  handleDropdownProject,
  onSelected,
  viewport,
  scream,
  title,
  body,
  topic,
  setTitle,
  setBody,
  handleDropdown,
  weblink,
  weblinkTitle,
  setWeblinkOpen,
  contact,
  contactTitle,
  setContactOpen,
  checkIfCalendar,
  selectedDays,
  setCalendarOpen,
}) => {
  const queryParams = {
    bbox: [6.7, 50.8, 7.2, 51],
  };

  const MyInput = (props) => (
    <input
      {...props}
      placeholder={scream.locationHeader}
      id="geocoder"
      autocomplete="off"
    />
  );
  return (
    <div className="textFields">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <StyledH3>An: </StyledH3>
        <CustomSelect
          name={"project"}
          value={project}
          initialValue={"Allgemein (Alle Ideen)"}
          options={OptionsProjects()}
          handleDropdown={handleDropdownProject}
        />
      </div>

      <Geocoder
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onSelected={onSelected}
        {...viewport}
        hideOnSelect={true}
        limit={3}
        queryParams={queryParams}
        id="geocoder-edit"
        className="geocoder-edit"
        inputComponent={MyInput}
        updateInputOnSelect
      />

      <TextField
        id="title"
        name="title"
        type="text"
        label="Titel"
        margin="normal"
        color="transparent"
        variant="outlined"
        className="textField"
        multiline
        maxRows="2"
        // error={errors.title ? true : false}
        // helperText={errors.title}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        style={{ marginTop: "5px", marginBottom: "5px" }}
      ></TextField>
      <TextField
        id="body"
        name="body"
        type="text"
        label="Beschreibung"
        margin="normal"
        color="transparent"
        variant="outlined"
        className="textField"
        multiline
        maxRows="12"
        // error={errors.body ? true : false}
        // helperText={errors.body}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        style={{ marginTop: "5px", marginBottom: "5px" }}
      ></TextField>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <StyledH3> Thema:</StyledH3>

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
          bottom: " -70px",
          height: "50px",
          position: "relative",
          zIndex: 0,
        }}
      >
        <CustomIconButton
          name="Weblink"
          position="absolute"
          bottom="70px"
          iconWidth="80%"
          backgroundColor={
            weblink !== null && weblinkTitle !== null ? "#fed957" : "white"
          }
          handleButtonClick={() => setWeblinkOpen(true)}
        />
        <CustomIconButton
          name="Contact"
          position="absolute"
          bottom="70px"
          left="60px"
          iconWidth="80%"
          backgroundColor={
            contact !== null && contactTitle !== null ? "#fed957" : "white"
          }
          handleButtonClick={() => setContactOpen(true)}
        />
        <div style={checkIfCalendar ? {} : { display: "none" }}>
          <CustomIconButton
            name="DatePicker"
            position="absolute"
            bottom="70px"
            left="120px"
            iconWidth="80%"
            backgroundColor={selectedDays.length === 0 ? "white" : "#fed957"}
            handleButtonClick={() => setCalendarOpen(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditModalMainFields;
