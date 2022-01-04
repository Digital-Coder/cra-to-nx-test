/** @format */

import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { openProjectFunc } from "../../../redux/actions/projectActions";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import AddIcon from "../../../images/icons/plus_grey.png";
import { useTranslation } from "react-i18next";

import styled from "styled-components";

const ProjectCardDesign = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  min-height: 100px;
  width: 95%;
  border-radius: 20px;
  /* box-shadow: 0 8px 40px -12px rgba(0,0,0,0); */
  max-height: 14em;
  /* background-color: rgb(255,255,255,0.6); */

  border-radius: 20px;
  overflow: hidden;
  /* background: transparent;
    box-shadow:  9px 9px 18px #f6d254,
                -9px -9px 18px #ffe05a; */

  animation: ProjectCardAnimation 0.8s;

  @keyframes ProjectCardAnimation {
    0% {
      opacity: 0;
      transform: translateY(50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const LeftWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  background-color: white;
  border-radius: 20px;

  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  overflow: hidden;
`;
// what about the LeftWrapper img?
/* .leftWrapper img{
    width: 100%;
    margin-left: 0%;
  } */

const RightWrapper = styled.div`
  margin-left: 10px;
  height: 120px;
  width: 60%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Owner = styled.div`
  font-family: Futura PT W01 Book;
  color: #353535;
`;
const Title = styled.div`
  font-size: 18px;
  font-family: Futura PT W01-Bold;
  color: #353535;
`;
const Date = styled.div`
  margin-top: 10px;
  font-family: Futura PT W01 Book;
  color: #353535;
`;

export const ProjectCard = (props) => {
  const {
    project: { title, owner, imgUrl, project, startDate, endDate },
  } = props;
  const dispatch = useDispatch();
  const pushScreamId = (project) => {
    dispatch(openProjectFunc(project));
  };

  return (
    <ProjectCardDesign>
      <ExpandButton handleButtonClick={() => pushScreamId(project)} />

      <LeftWrapper>
        <img src={imgUrl} width="100%" alt="profile" />
      </LeftWrapper>
      <RightWrapper>
        <Owner> {owner} </Owner>
        <Title>{title}</Title>

        {endDate ? (
          <Date>
            {" "}
            {startDate} – {endDate}{" "}
          </Date>
        ) : (
          <Date>{startDate} </Date>
        )}
      </RightWrapper>
    </ProjectCardDesign>
  );
};

export const CreateProject = ({ setCreateProjectDialogIsOpen }) => {
  const { t } = useTranslation();
  const isOrgModerator = useSelector((state) => state.user.isOrgModerator);
  const handle = useSelector((state) => state.user.handle);

  const requestProject = () => {
    var link =
      "mailto:dein@senf.koeln" + "?subject=" + escape("Projektraum-Anfrage");
    // +
    // "&body=" +
    // escape(
    //   "Projektraum-Titel:" +
    //     "\n" +
    //     "\n" +
    //     "Worum geht's:" +
    //     "\n" +
    //     "\n" +
    //     "Projektzeitraum:" +
    //     "\n" +
    //     "\n" +
    //     "Logo + Cover-Bild:"
    // );
    window.location.href = link;
  };

  return (
    <ProjectCardDesign>
      <ExpandButton
        handleButtonClick={
          !isOrgModerator ? requestProject : setCreateProjectDialogIsOpen
        }
      />
      <LeftWrapper>
        <img
          src={AddIcon}
          width="100%"
          alt="profile"
          style={{ width: "50%", marginLeft: "25%" }}
        />
      </LeftWrapper>
      <RightWrapper>
        {!isOrgModerator ? (
          <React.Fragment>
            <Owner> {t("projectrooms_request_overTitle")} </Owner>
            <Title> {t("projectrooms_request_title")}</Title>
            <Date>{t("projectrooms_request_subTitle")}</Date>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Owner>
              {" "}
              {t("für")} {handle}
            </Owner>
            <Title> {t("Projektraum erstellen")}</Title>
            <Date>{t("projectrooms_request_subTitle")}</Date>
          </React.Fragment>
        )}
      </RightWrapper>
    </ProjectCardDesign>
  );
};
