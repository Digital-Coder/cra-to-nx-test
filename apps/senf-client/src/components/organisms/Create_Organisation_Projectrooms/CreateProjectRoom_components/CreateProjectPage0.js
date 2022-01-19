/** @format */

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import NotDoneImage from "../../../../images/Not_connected.png";
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import Navigation from "../Components/Navigation";
import { StyledH2 } from "../../../../styles/GlobalStyle";

const CreateProjectPage0 = ({ set }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(null);

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
        setTitle(data.title);
      }
    }

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      fetchData();
    }
  }, []);

  const handleRestart = () => {
    var answer = window.confirm(
      "Bist du sicher, dass du die Erstellung des Projektraums neustarten möchtest?"
    );
    if (answer) {
      localStorage.removeItem("createProjectRoomId");

      set(1);
    } else {
      //some code
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH2 fontWeight="900" textAlign="center">
            Du bist noch dabei, deinen Projektraum {title && `"${title}"`}
            zu erstellen{" "}
          </StyledH2>
          <br />

          <img
            src={NotDoneImage}
            width="60%"
            style={{ marginLeft: "20%", marginTop: "10%" }}
            alt="NotDoneImage"
          />
        </ComponentInnerWrapper>
      </ComponentWrapper>
      <Navigation
        nextLabel={t("continue_creation")}
        prevLabel={t("restart")}
        handleNext={() => set(2)}
        handlePrev={handleRestart}
        // disabled={}
        // loading={}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage0;
