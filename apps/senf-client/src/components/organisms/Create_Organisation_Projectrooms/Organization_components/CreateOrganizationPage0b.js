/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { useTranslation } from "react-i18next";
import styled from "styled-components";
//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";
import organizationTypes from "../../../../data/organizationTypes";

const CoverWrapper = styled.div`
  margin-left: 10%;
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px 10px;
  grid-template-areas:
    ". ."
    ". .";
`;
const Covers = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9;
  float: left;
  position: relative;
  animation: ${(props) => props.animation};
  overflow: hidden;
  border-radius: 25px;
  background-color: white;
  margin: 0;
  padding: 0;
  outline: ${(props) =>
    props.selectedOrganization ? "3px solid #353535 " : ""};

  outline-offset: -3px;
`;
const CoverImg = styled.img`
  width: 100%;
  height: 100%;
`;
const CoverTitle = styled.span`
  font-size: 18px;
  font-weight: 900;
  /* font-family: PlayfairDisplay-Bold; */
  color: #353535;
  text-align: center;
  width: 100%;
  position: absolute;
  top: 30px;
`;

const CreateOrganizationPage1 = ({ onClickNext, onClickPrev }) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);
  const [organizationType, setOrganizationType] = useState(null);

  const userId = useSelector((state) => state.user.userId);

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
        setOrganizationType(data.organizationType);
      }
    }

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      fetchData();
    }
  }, []);

  const handleNext = async () => {
    setNextClicked(true);
    const db = firebase.firestore();

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      //UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        organizationType: organizationType,
      };

      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"));

      return ref.update(updateProject).then(() => {
        setTimeout(() => {
          onClickNext();
        }, 200);
      });
    } else {
      //CREATING A NEW ORGANIZATION
      const newOrganization = {
        organizationType: organizationType,
        userIds: [userId],
        createdAt: new Date().toISOString(),
        status: "uncompleted",
      };

      const userRef = await db.collection("users").doc(userId);
      const organizatinRef = await db.collection("organizations");

      organizatinRef
        .add(newOrganization)
        .then((doc) => {
          localStorage.setItem("createOrganizationId", doc.id);

          userRef.update({
            organizationId: firebase.firestore.FieldValue.arrayUnion(doc.id),
          });
        })

        .then(() => {
          setTimeout(() => {
            onClickNext();
          }, 200);
        });
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH2 fontWeight="900" textAlign="center">
            Welche Art von Organisation seid ihr?
          </StyledH2>
          <StyledH3 textAlign="center" margin="20px">
            sdjhaskjdhas jkhashda skjdh asjkdhaskjdhs shjajkdsh
          </StyledH3>

          <CoverWrapper>
            {organizationTypes.map(({ name, label, img }) => (
              <Covers
                animation="coverAnimation 0.5s ease-in-out"
                onClick={() => setOrganizationType(name)}
                selectedOrganization={organizationType === name}
              >
                <CoverTitle>{label}</CoverTitle>
                <CoverImg src={img} alt="organizationType-cover" />
              </Covers>
            ))}
          </CoverWrapper>
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
        disabled={!organizationType || nextClicked}
        loading={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPage1;
