/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

//Components
import Weblink from "../../../molecules/Modals/Post_Edit_ModalComponents/Weblink";
import { CustomIconButton } from "../../../atoms/CustomButtons/CustomButton";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

//images
import {
  ButtonsWrapper,
  ComponentInnerWrapper,
  ComponentWrapper,
  SubTitle,
  Title,
} from "../styles/sharedStyles";
import Contact from "../../../molecules/Modals/Post_Edit_ModalComponents/Contact";
import Geocoder from "react-mapbox-gl-geocoder";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButttonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const GeocoderWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const CreateOrganizationPage2 = ({ onClickNext, onClickPrev }) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);

  const [address, setAddress] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

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
        localStorage.getItem("createOrganizationId")
      ) {
        const ref = await db
          .collection("organizations")
          .doc(localStorage.getItem("createOrganizationId"))
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

          if (data.address) {
            setAddress(data.address);
          }
        }
      }
    }
    fetchData();
  }, []);

  const MyInput = (props) => (
    <input
      {...props}
      placeholder={address ? address : "Addresse eingeben..."}
      id="geocoder"
      autocomplete="off"
    />
  );

  const geocode = (viewport) => {
    const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
    const geocodingClient = mbxGeocoding({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    });
    geocodingClient
      .reverseGeocode({
        query: [viewport.longitude, viewport.latitude],
        limit: 1,
      })
      .send()
      .then((response) => {
        const match = response.body;
        setAddress(match.features[0].place_name);
        setLongitude(match.features[0].center[0]);
        setLatitude(match.features[0].center[1]);
      });
  };

  const handleNext = async () => {
    setNextClicked(true);

    const db = firebase.firestore();
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      //UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        weblinkTitle: weblinkTitle,
        weblink: weblink,
        contactTitle: contactTitle,
        contact: contact,
        address: address,
        longitude: longitude,
        latitude: latitude,
      };
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"));
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
          <StyledH3 textAlign="center" margin="20px">
            Füge deine Kontaktdaten (E-mail, Link) hinzu, um erreichbar zu sein
            und deine Organisation zu vertreten.{" "}
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

          <GeocoderWrapper>
            <Geocoder
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              onSelected={geocode}
              // {...viewport}
              hideOnSelect={true}
              limit={3}
              // queryParams={queryParams}
              id="geocoder-edit"
              className="geocoder-edit"
              inputComponent={MyInput}
              updateInputOnSelect
            />
          </GeocoderWrapper>
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPage2;
