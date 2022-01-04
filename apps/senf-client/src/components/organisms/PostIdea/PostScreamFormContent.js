/** @format */

import React from "react";
import { isAndroid } from "react-device-detect";
import { isMobileCustom } from "../../../util/customDeviceDetect";

import { useTranslation } from "react-i18next";

//MUI Stuff
import { TextField } from "@material-ui/core";

//Components
import PostScreamRules from "./PostScreamRules";

//Icons
import LocationYellowIcon from "../../../images/icons/location_yellow.png";
import CustomSelect from "../../atoms/Selects/CustomSelect";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { OptionsTopics } from "../../../data/OptionsTopics";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";

const PostScreamFormContent = ({
  classes,
  errors,
  address,
  handleLocationDecided,
  handleDropdown,
  weblink,
  weblinkTitle,
  contactTitle,
  contact,
  checkIfCalendar,
  selectedDays,
  topic,
  loading,
  Out,
  locationDecided,
  handleSubmit,
  body,
  title,
  setTitle,
  setBody,
  setWeblinkOpen,
  setContactOpen,
  setCalendarOpen,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={isAndroid === false ? "postCard" : "postCardAndroid"}
      style={
        locationDecided && isMobileCustom
          ? { top: "20vh", transition: "0.5s" }
          : !locationDecided && isMobileCustom
          ? { top: "100vh", transition: "0.5s" }
          : locationDecided && !isMobileCustom
          ? { zIndex: 5 }
          : { zIndex: 1 }
      }
    >
      {!isMobileCustom && (
        <div
          onClick={handleLocationDecided}
          style={
            locationDecided
              ? {
                  display: "none",
                }
              : {
                  display: "block",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#000000",
                  position: "absolute",
                  zIndex: 99999,
                  opacity: 0.6,
                  borderRadius: "19px",
                }
          }
        ></div>
      )}
      <div className={classes.content}>
        <div className={classes.locationOuter} onClick={handleLocationDecided}>
          <img
            src={LocationYellowIcon}
            width="20px"
            height="20px"
            style={{ paddingRight: "5px" }}
          />
          <div className={classes.locationHeader}> ~ {address} </div>
        </div>
        <PostScreamRules />
        <TextField
          name="title"
          type="text"
          label={t("postScream_ideaTitle")}
          multiline
          maxRows="2"
          placeholder=""
          error={errors.title ? true : false}
          helperText={errors.title}
          className={classes.textField}
          onChange={(event) => setTitle(event.target.value)}
          margin="normal"
          fullWidth
          inputProps={{ maxLength: 70 }}
        />
        <TextField
          name="body"
          type="text"
          label={t("postScream_ideaBody")}
          multiline
          maxRows="12"
          InputProps={{ disableUnderline: true }}
          placeholder=""
          error={errors.body ? true : false}
          helperText={errors.body}
          className={classes.textField}
          onChange={(event) => setBody(event.target.value)}
          margin="normal"
          fullWidth
          inputProps={{ maxLength: 800 }}
        />
        <CustomIconButton
          name="Weblink"
          position="absolute"
          bottom="70px"
          iconWidth="80%"
          zIndex={0}
          backgroundColor={
            weblink !== null && weblinkTitle !== null ? "#fed957" : "white"
          }
          handleButtonClick={() => setWeblinkOpen(true)}
        />
        <CustomIconButton
          name="Contact"
          position="absolute"
          bottom="70px"
          marginLeft="60px"
          iconWidth="80%"
          zIndex={0}
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
            marginLeft="120px"
            iconWidth="70%"
            zIndex={0}
            backgroundColor={selectedDays.length === 0 ? "white" : "#fed957"}
            handleButtonClick={() => setCalendarOpen(true)}
          />
        </div>{" "}
        <div className="topicSelectContainer">
          <span>{t("topic")}: </span>

          <CustomSelect
            name={"topic"}
            value={topic}
            initialValue={"Wähle das Thema aus"}
            options={OptionsTopics()}
            handleDropdown={handleDropdown}
          />
        </div>
      </div>
      {locationDecided && (
        <SubmitButton
          text={t("postScream_shareIdea")}
          zIndex="9"
          backgroundColor="white"
          textColor="#353535"
          position="absolute"
          bottom="-60px"
          loading={loading}
          disabled={body === "" || title === "" || Out === true}
          animation={true}
          handleButtonClick={handleSubmit}
        />
      )}
    </div>
  );
};
export default PostScreamFormContent;
