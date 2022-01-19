/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as linkify from "linkifyjs";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";
import LikeButton from "../../atoms/CustomButtons/LikeButton";
import dayjs from "dayjs";
import { openProjectRoomFunc } from "../../../redux/actions/projectActions";

// Icons
import CalendarIcon from "../../../images/icons/calendar.png";
import PenIcon from "../../../images/icons/pen.png";
import LocationIcon from "../../../images/icons/location.png";

import WeblinkIcon from "../../../images/icons/weblink.png";
import contactIcon from "../../../images/icons/mail.png";
import ProjectRoomIcon from "../../../images/icons/projectRoomIcon.png";

import {
  CardTitle,
  ColorDot,
  DistrictHeader,
  EngagementWrapper,
  ProjectOpenButton,
} from "./styles/sharedStyles";
import CommentButton from "../../atoms/CustomButtons/CommentButton";
import {
  StyledH2,
  StyledSmallText,
  StyledText,
} from "../../../styles/GlobalStyle";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";

const Card = styled.div`
  z-index: 99;
  position: relative;
  display: flex;
  margin-top: 2vh;
  margin-left: 2.5%;
  width: 95%;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0);
  padding-bottom: ${(props) => props.project && "50px"};

  @media (min-width: 768px) {
    margin-top: 10px;
  }
`;
const Content = styled.div`
  width: 95%;
  padding: 15px;
  object-fit: cover;
`;

const BodyText = styled.p`
  white-space: none;
  position: relative;
  width: 100%;

  overflow: hidden;
  max-height: 4.8em;
  margin-top: 0;
`;

const Button = styled.button`
  border-radius: 20px;
  text-transform: none;
  font-size: 14px;
  background-color: white;
  height: 40px;
  box-shadow: none;
  padding-right: 15px;
  padding-left: 15px;
  background-color: rgb(254, 217, 87);
  margin-right: 5px;
  box-shadow: rgb(38, 57, 77, 0) 0px 20px 30px -16px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const styles = {
  header: {
    paddingTop: "10px",
    marginLeft: "0vw",
    width: "90%",
    objectFit: "cover",
  },

  content: {
    width: "95%",
    padding: 15,
    objectFit: "cover",
  },

  locationOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",

    height: "25px",
    alignItems: "center",
  },
  selectedDatesOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",

    height: "auto",
    paddingBottom: "10px",
    alignItems: "center",
  },

  district: {
    float: "left",
    marginLeft: "10px",
    color: "rgb(255, 205, 6)",
    height: "25px",
    pointerEvents: "none",
  },

  districtHeader: {
    color: "rgb(255, 205, 6)",
    float: "left",
    paddingRight: "2%",
    width: "100%",
    pointerEvents: "none",
  },
};

const IdeaCardBig = ({ classes, setClicked }) => {
  const dispatch = useDispatch();

  const {
    screamId,
    locationHeader,
    Stadtteil,
    title,
    body,
    createdAt,
    likeCount,
    commentCount,
    userHandle,
    color,
    project,
    weblink,
    weblinkTitle,
    contact,
    contactTitle,
    selectedUnix,
  } = useSelector((state) => state.data.scream);
  const projects = useSelector((state) => state.data.projects);

  const convertedLinkRaw = weblink && linkify.find(weblink);
  const convertedLink =
    weblink && convertedLinkRaw[0] !== undefined && convertedLinkRaw[0].href;

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  const openTheProject = (project) => {
    dispatch(openProjectRoomFunc(project, true));
  };

  const openLink = (convertedLink) => {
    window.open(convertedLink, "_blank");
  };
  const openMail = (contact) => {
    window.location.href = "mailto:" + contact;
  };

  const projectsDataFinal = [];
  if (projects) {
    projects.forEach(({ projectRoomId, title }) => {
      if (project === projectRoomId) {
        projectsDataFinal.push(title);
      }
    });
  }

  let selectedDates = [];
  const selectedUnixArray = selectedUnix;
  const options = {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (selectedUnixArray !== undefined && selectedUnixArray !== null) {
    if (selectedUnixArray.length > 0) {
      selectedUnixArray.forEach((element) => {
        selectedDates.push(
          <div>
            {new Date(element * 1000).toLocaleTimeString("de-DE", options)}{" "}
            <br />{" "}
          </div>
        );
      });
    } else {
      selectedDates = (
        <div>
          {new Date(selectedUnix * 1000).toLocaleTimeString("de-DE", options)}{" "}
          <br />{" "}
        </div>
      );
    }
  }

  return (
    <Card project={project ? true : false}>
      <Content>
        <ColorDot color={color} />
        <DistrictHeader color={color}>
          <h4>{Stadtteil}</h4>
        </DistrictHeader>
        <EngagementWrapper>
          <LikeButton screamId={screamId} />
          <h4>{likeCount} </h4>

          <CommentButton handleButtonClick={() => handleClick()} />
          <h4>{commentCount}</h4>
        </EngagementWrapper>
        <CardTitle>
          <StyledH2 fontWeight="900">{title}</StyledH2>
        </CardTitle>
        <BodyText>
          <StyledText>{body} </StyledText>
        </BodyText>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {weblink && (
            <SubmitButton
              text={weblinkTitle}
              zIndex="999"
              backgroundColor="#fed957"
              textColor="#353535"
              onClick={() => openLink(convertedLink)}
              shadow={false}
              smallSubmitButton={true}
              iconRight={true}
              name="Weblink"
              marginLeft="0"
              transformX="none"
              iconWidth="16px"
            />
          )}
          {contact && (
            <SubmitButton
              text={contactTitle}
              zIndex="999"
              backgroundColor="#fed957"
              textColor="#353535"
              onClick={() => openMail(contact)}
              shadow={false}
              smallSubmitButton={true}
              iconRight={true}
              name="Contact"
              marginLeft="10px"
              transformX="none"
              iconWidth="22px"
            />
          )}
        </div>

        <div className={classes.header}>
          {selectedUnixArray !== undefined && selectedUnixArray !== null && (
            <div className={classes.selectedDatesOuter}>
              <img
                src={CalendarIcon}
                width="20px"
                style={{ paddingRight: "5px", alignSelf: "center" }}
                al="CalendarIcon"
              />

              <div className={classes.locationHeader}> {selectedDates} </div>
            </div>
          )}
          <div className={classes.locationOuter}>
            <img
              src={LocationIcon}
              width="20px"
              height="20px"
              style={{ paddingRight: "5px", alignSelf: "center" }}
              alt="locationIcon"
            />

            <StyledSmallText> {locationHeader} </StyledSmallText>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
            }}
          >
            <img
              src={PenIcon}
              width="20px"
              style={{ paddingRight: "5px", alignSelf: "center" }}
              alt="CreatorIcon"
            />

            <StyledSmallText>
              {userHandle}
              &nbsp;am&nbsp;
            </StyledSmallText>
            <StyledSmallText>
              {dayjs(createdAt).format("DD.MM.YYYY")}
            </StyledSmallText>
          </div>

          {project && (
            <ProjectOpenButton onClick={() => openTheProject(project)}>
              <img
                src={ProjectRoomIcon}
                width="20px"
                style={{ paddingRight: "10px", alignSelf: "center" }}
                alt="ProjectRoomIcon"
              />

              {projectsDataFinal}
            </ProjectOpenButton>
          )}
        </div>
      </Content>
    </Card>
  );
};

export default withStyles(styles)(IdeaCardBig);
