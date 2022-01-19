/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

//Components
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

//images
import {
  ButtonsWrapper,
  ComponentInnerWrapper,
  ComponentWrapper,
  Title,
} from "../styles/sharedStyles";
import EditIcon from "../../../../images/icons/pen.png";
import CheckIcon from "../../../../images/icons/check.png";
import MissingIcon from "../../../../images/icons/close.png";
import ExpandButton from "../../../atoms/CustomButtons/ExpandButton";
import { set } from "lodash-es";
import {
  getProjects,
  reloadProjects,
} from "../../../../redux/actions/projectActions";
import { StyledH2 } from "../../../../styles/GlobalStyle";
import Navigation from "../Components/Navigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListItemWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`;
const ListItem = styled.div`
  height: 50px;
  width: calc(100% - 60px);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;
  border-radius: 20px;
  overflow: hidden;
`;

const ListItemTitle = styled.h3`
  margin-left: 20px;
  font-size: 18px;
`;
const ListItemStatus = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const FrameWrapper = styled.div`
  width: calc(100vw - 50px);
  height: calc(100vh - 160px);
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0.5);
  border: 10px solid white;
  max-width: 1200px;

  @media (min-width: 768px) {
    box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0.2);

    width: calc(100vw - 60px);
    height: calc(100vh - 350px);
  }
`;

const CreateProjectPagePreview = ({ onClickPrev, setClose, set }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openPreview, setOpenPreview] = useState(false);
  const [status, setStatus] = useState(false);

  const [infosProvided, setInfosProvided] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();

      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createProjectRoomOrganizationId"))
        .collection("projectRooms")
        .doc(localStorage.getItem("createProjectRoomId"))
        .get();

      if (!ref.exists) {
        console.log("No such document!");
      } else {
        const data = ref.data();
        if (data.status) {
          setStatus(true);
        }
        if (data.title && data.description) {
          setInfosProvided(true);
        }
      }
    }

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      fetchData();
    }
  }, []);

  const handleArchive = async () => {
    const db = firebase.firestore();

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createProjectRoomOrganizationId"))
        .collection("projectRooms")
        .doc(localStorage.getItem("createProjectRoomId"));

      return ref.update({ status: "archived" }).then(() => {
        dispatch(getProjects());

        setClose();
        //REMOVE LOCALSTORAGE
        localStorage.removeItem("createProjectRoomOrganizationId");
        localStorage.removeItem("createProjectRoomId");
        localStorage.removeItem("createProjectPostEdit");
      });
    } else {
    }
  };

  const handlePublish = async () => {
    const db = firebase.firestore();

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createProjectRoomOrganizationId"))
        .collection("projectRooms")
        .doc(localStorage.getItem("createProjectRoomId"));

      return ref.update({ status: "active" }).then(() => {
        dispatch(getProjects());

        setClose();

        //REMOVE LOCALSTORAGE
        localStorage.removeItem("createProjectRoomOrganizationId");
        localStorage.removeItem("createProjectRoomId");
        localStorage.removeItem("createProjectPostEdit");
      });
    }
  };
  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH2 fontWeight="900" textAlign="center">
            Übersicht
          </StyledH2>

          <ListItemWrapper>
            <ListItem>
              <ExpandButton handleButtonClick={() => set(2)} />
              <ListItemTitle>Infos</ListItemTitle>
              <img
                src={EditIcon}
                width="20px"
                style={{ paddingRight: "20px" }}
              />
            </ListItem>
            <ListItemStatus>
              <img src={infosProvided ? CheckIcon : MissingIcon} width="30px" />
            </ListItemStatus>{" "}
          </ListItemWrapper>
          <ListItemWrapper>
            <ListItem>
              <ListItemTitle>Gebiet</ListItemTitle>
              <img
                src={EditIcon}
                width="20px"
                style={{ paddingRight: "20px" }}
              />
            </ListItem>
            <ListItemStatus>
              <img
                src={infosProvided ? MissingIcon : MissingIcon}
                width="30px"
              />
            </ListItemStatus>{" "}
          </ListItemWrapper>

          {openPreview && (
            <FrameWrapper>
              <iframe
                src={`http://localhost:3000/projectrooms/${localStorage.getItem(
                  "createProjectRoomId"
                )}`}
                height="100%"
                width="100%"
                frameBorder="0"
              />
            </FrameWrapper>
          )}

          {status && (
            <SubmitButton
              text={t("Archivieren")}
              zIndex="9"
              backgroundColor="transparent"
              textColor="#353535"
              top={document.body.clientWidth > 768 ? "100px" : "70px"}
              left="0"
              handleButtonClick={handleArchive}
              /*  disabled={!data} */
              //   keySubmitRef={keySubmitRef}
            />
          )}
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("Veröffentlichen")}
        prevLabel={t("back")}
        handleNext={handlePublish}
        handlePrev={onClickPrev}
        // disabled={!data || nextClicked}
        // loading={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateProjectPagePreview;
