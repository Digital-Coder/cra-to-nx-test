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
import LocationIcon from "../../../images/icons/location.png";
import CustomSelect from "../../atoms/Selects/CustomSelect";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { OptionsTopics } from "../../../data/OptionsTopics";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import styled from "styled-components";
import { StyledH3, StyledH4, StyledText } from "../../../styles/GlobalStyle";

const Card = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 12;
  display: flex;
  margin-left: 2.5vw;
  margin-right: auto;

  /* height: calc(75vh - 70px); */
  height: ${(props) =>
    props.isAndroid ? "450px" : "calc((var(--vh, 1vh) * 100) - 150px)"};

  /* height:calc(80vh - 70px); */
  width: 95vw;
  border-radius: 20px;
  box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0);
  background-color: white;

  @media (min-width: 768px) {
    position: fixed;
    top: 135px;
    left: 0;
    margin-left: 210px;
    margin-right: auto;
    height: 50vh;
    width: 380px;
    border-radius: 20px;
    box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0);
    background-color: white;
    z-index: 2;
    animation: enteranimation 1s;
  }
`;

const Content = styled.div`
  padding: 25px;
  object-fit: cover;
  overflow: scroll;
  width: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const HideDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000000;
  position: absolute;
  z-index: 99999;
  opacity: 0.6;
  border-radius: 19px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const SelectContainer = styled.div`
  background-color: #f8f8f8;
  width: 90%;
  left: 0;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding-left: 5%;
  padding-right: 5%;
  position: absolute;
  bottom: 0;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  font-size: 20px;
`;

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
    <Card
      isAndroid={isAndroid}
      style={
        locationDecided && isMobileCustom
          ? { top: "80px", transition: "0.5s" }
          : !locationDecided && isMobileCustom
          ? { top: "100vh", transition: "0.5s" }
          : locationDecided && !isMobileCustom
          ? { zIndex: 5 }
          : { zIndex: 1 }
      }
    >
      {!isMobileCustom && (
        <HideDiv
          onClick={handleLocationDecided}
          show={locationDecided ? false : true}
        />
      )}

      <Content>
        <FlexWrapper onClick={handleLocationDecided}>
          <img
            src={LocationIcon}
            width="20px"
            height="20px"
            style={{ paddingRight: "5px" }}
          />
          <StyledH4> ~ {address} </StyledH4>
          <PostScreamRules />
        </FlexWrapper>
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
        <SelectContainer>
          <StyledH3>{t("topic")}: </StyledH3>

          <CustomSelect
            name={"topic"}
            value={topic}
            initialValue={"Wähle das Thema aus"}
            options={OptionsTopics()}
            handleDropdown={handleDropdown}
          />
        </SelectContainer>
      </Content>
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
    </Card>
  );
};
export default PostScreamFormContent;
