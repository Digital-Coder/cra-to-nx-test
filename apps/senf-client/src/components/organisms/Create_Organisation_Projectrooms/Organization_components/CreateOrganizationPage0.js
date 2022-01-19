/** @format */

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

//compoennts
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

//images
import NotDoneImage from "../../../../images/Not_connected.png";

//styles
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import { StyledH2 } from "../../../../styles/GlobalStyle";
import Navigation from "../Components/Navigation";

const CreateOrganizationPage0 = ({ onClickNext }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();

      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"))
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
      localStorage.getItem("createOrganizationId")
    ) {
      fetchData();
    }
  }, []);

  const handleRestart = () => {
    var answer = window.confirm(
      "Bist du sicher, dass du die Erstellung des Projektraums neustarten möchtest?"
    );
    if (answer) {
      localStorage.removeItem("createOrganizationId");
      onClickNext();
    } else {
      //some code
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH2 fontWeight="900" textAlign="center">
            Du bist noch dabei, deine Organisation {title && `"${title}"`}
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
        handleNext={onClickNext}
        handlePrev={handleRestart}
        // disabled={}
        // loading={}
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPage0;
