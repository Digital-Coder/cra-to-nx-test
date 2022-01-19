/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

//Components
import Weblink from "../../../molecules/Modals/Post_Edit_ModalComponents/Weblink";
import { CustomIconButton } from "../../../atoms/CustomButtons/CustomButton";

//images
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import Contact from "../../../molecules/Modals/Post_Edit_ModalComponents/Contact";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";

const ButttonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CreateProjectPage2 = ({ onClickNext, onClickPrev }) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);

  const [weblinkOpen, setWeblinkOpen] = useState(false);
  const [weblink, setWeblink] = useState(null);
  const [weblinkTitle, setWeblinkTitle] = useState(null);

  const [contactOpen, setContactOpen] = useState(false);
  const [contact, setContact] = useState(null);
  const [contactTitle, setContactTitle] = useState(null);

  const handleCloseWeblink = () => {
    setWeblinkOpen(false);
    setWeblink(null);
    setWeblinkTitle(null);
  };
  const handleSaveWeblink = () => {
    setWeblinkOpen(false);
  };

  const handleCloseContact = () => {
    setContactOpen(false);
    setContact(null);
    setContactTitle(null);
  };
  const handleSaveContact = () => {
    setContactOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();
      if (
        typeof Storage !== "undefined" &&
        localStorage.getItem("createProjectRoomId")
      ) {
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

          if (data.contact) {
            setContact(data.contact);
            setContactTitle(data.contactTitle);
          }
          if (data.weblink) {
            setWeblink(data.weblink);
            setWeblinkTitle(data.weblinkTitle);
          }
        }
      }
    }
    fetchData();
  }, []);

  const handleNext = async () => {
    setNextClicked(true);

    const db = firebase.firestore();
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      //UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        weblinkTitle: weblinkTitle,
        weblink: weblink,
        contactTitle: contactTitle,
        contact: contact,
      };
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createProjectRoomOrganizationId"))
        .collection("projectRooms")
        .doc(localStorage.getItem("createProjectRoomId"));
      return ref.update(updateProject).then(() => {
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
          {ReactDOM.createPortal(
            <React.Fragment>
              {weblinkOpen && (
                <Weblink
                  handleCloseWeblink={handleCloseWeblink}
                  handleSaveWeblink={handleSaveWeblink}
                  weblinkTitle={weblinkTitle}
                  weblink={weblink}
                  setWeblinkTitle={setWeblinkTitle}
                  setWeblink={setWeblink}
                  setWeblinkOpen={setWeblinkOpen}
                />
              )}
            </React.Fragment>,
            document.getElementById("portal-root-modal")
          )}

          {ReactDOM.createPortal(
            <React.Fragment>
              {contactOpen && (
                <Contact
                  handleCloseContact={handleCloseContact}
                  handleSaveContact={handleSaveContact}
                  contactTitle={contactTitle}
                  contact={contact}
                  setContactTitle={setContactTitle}
                  setContact={setContact}
                  setContactOpen={setContactOpen}
                />
              )}
            </React.Fragment>,
            document.getElementById("portal-root-modal")
          )}

          <StyledH2 fontWeight="900" textAlign="center">
            Kontaktdaten hinzufügen
          </StyledH2>

          <StyledH3 fontWeight="900" textAlign="center" margin="20px">
            Füge deine Kontaktdaten (E-mail, Link) hinzu, um erreichbar zu sein
            und deine .
          </StyledH3>

          <ButttonsWrapper>
            <CustomIconButton
              name="Weblink"
              position="relative"
              iconWidth="80%"
              backgroundColor={
                weblink !== null && weblinkTitle !== null ? "#fed957" : "white"
              }
              handleButtonClick={() => setWeblinkOpen(true)}
            />

            <CustomIconButton
              name="Contact"
              position="relative"
              marginLeft="20px"
              iconWidth="80%"
              zIndex={0}
              backgroundColor={
                contact !== null && contactTitle !== null ? "#fed957" : "white"
              }
              handleButtonClick={() => setContactOpen(true)}
            />
          </ButttonsWrapper>
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
        disabled={nextClicked}
        loading={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage2;
