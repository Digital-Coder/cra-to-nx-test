/** @format */

import React, { useState, Fragment, memo } from "react";
import { useHistory } from "react-router";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { useTranslation } from "react-i18next";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";

//HANDLER
import RegistrationAndLogin from "../../organisms/Auth/LoginRegistration";

//ICONS
import AddIcon from "../../../images/icons/plus_white.png";

// REDUX STUFF
import { useDispatch, useSelector } from "react-redux";
import { postScream } from "../../../redux/actions/screamActions";
import { clearErrors } from "../../../redux/actions/errorsActions";

import { withRouter } from "react-router-dom";

//Components
import PostScreamFormContent from "./PostScreamFormContent";
import PostScreamMap from "./PostScreamMap";
import PostScreamSelectContainter from "./PostScreamSelectContainter";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import styled, { keyframes } from "styled-components";
import Weblink from "../../molecules/Modals/Post_Edit_ModalComponents/Weblink";
import Contact from "../../molecules/Modals/Post_Edit_ModalComponents/Contact";
import InlineDatePicker from "../../molecules/Modals/Post_Edit_ModalComponents/InlineDatePicker";

const OpenButtonMobile = styled.button`
  z-index: 99;
  width: 40px;
  height: 40px;
  padding: 22px;
  position: fixed;
  left: 50vw;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(87, 87, 87);
  border: 1px white solid;
  border-radius: 100%;
  font-size: 0;
  box-shadow: rgb(0, 0, 0, 0.8) 0px 20px 20px -15px;
  z-index: ${(props) => (props.openScream ? 0 : 999)};

  animation: Pulse 5s ease-in-out infinite, AddButtonEnterAnimation 2.5s;

  bottom: ${(props) => (props.isInstagram ? "35px" : "25px")};
  left: 50vw;

  @keyframes Pulse {
    0% {
      background-color: #ffd862;
    }

    50% {
      background-color: #414345;
    }

    100% {
      background-color: #ffd862;
    }
  }

  @keyframes AddButtonEnterAnimation {
    0% {
      transform: translateY(400%) translateX(-50%);
    }
    50% {
      transform: translateY(400%) translateX(-50%);
    }
    100% {
      transform: translateY(0%) translateX(-50%);
    }
  }
`;

const OpenButtonDesktop = styled.button`
  z-index: 9999;
  width: 160px;
  height: 40px;
  padding: 0;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  left: 20px;
  transform: none;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  background-color: #353535;

  border: 0px white solid;
  border-radius: 40px;
  top: 85px;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 12pt;
  color: white;
  font-family: Futura PT W01 Book;
  animation: none;

  box-shadow: rgb(0, 0, 0, 0) 0px 20px 20px -15px;
  transition: 0.5s;
`;

const styles = {
  root: {
    padding: "0",
    overflow: "hidden",
    backgroundColor: isMobileCustom ? "white" : "rgb(0,0,0,0.8)",
    backdropFilter: "blur(5px)",
  },

  paper: {
    boxShadow: "none",
    padding: "0",
    top: "0",
    overflow: "hidden",
    borderRadius: "0px",
    backgroundColor: "transparent",
  },

  progress: {
    position: "absolute",
    left: "50%",
    marginLeft: "-15px",
    bottom: "10px",
    zIndex: "9999",
  },

  content: {
    padding: 25,
    objectFit: "cover",
    overflow: "scroll",
    width: "100%",
  },

  textField: {
    marginTop: "0px",
    width: "100%",
  },

  locationOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    color: "rgb(255, 205, 6)",
    height: "10px",
    alignItems: "center",
  },
  locationHeader: {
    color: "rgb(255, 205, 6)",
    float: "left",
    paddingRight: "1%",
  },

  Authlink: {
    position: "fixed",
    top: "25vh",
    height: "80vh",
    zIndex: "99999",
    width: "100%",
  },

  AuthlinkDesktop: {
    zIndex: 992,
    position: "fixed",
    top: "40px",

    left: 0,
    marginLeft: "210px",
    marginRight: "auto",
    height: "600px",
    width: "380px",
    borderRadius: "20px",
    boxShadow: "0 0px 40px -12px rgba(0,0,0,0)",
  },
};

const PostScream = ({ classes, loadingProjects, projectsData }) => {
  const dispatch = useDispatch();
  const openScream = useSelector((state) => state.UI.openScream);
  const loading = useSelector((state) => state.data.loading);

  const project = useSelector((state) => state.data.project);

  const user = useSelector((state) => state.user);
  const history = useHistory();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const mapViewport = useSelector((state) => state.data.mapViewport);
  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );

  const [viewport, setViewport] = useState(null);

  const [addressBarClickedState, setAddressBarClickedState] = useState(false);

  const [out, setOut] = useState(false);
  const [projectSelected, setProjectSeleted] = useState("");
  const [geoData, setGeoData] = useState("");
  const [checkIfCalendar, setCheckIfCalendar] = useState(false);

  const [address, setAddress] = useState("Ohne Ortsangabe");
  const [neighborhood, setNeighborhood] = useState("Ohne Ortsangabe");
  const [fulladdress, setFulladdress] = useState("Ohne Ortsangabe");

  const [allMainStates, setAllMainStates] = useState({
    errors: {},
    MapHeight: "100vh",
    locationDecided: false,
  });

  const { errors, MapHeight, locationDecided } = allMainStates;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  // const [project, setProject] = useState("");

  const [weblinkOpen, setWeblinkOpen] = useState(false);
  const [weblink, setWeblink] = useState(null);
  const [weblinkTitle, setWeblinkTitle] = useState(null);

  const [contactOpen, setContactOpen] = useState(false);
  const [contact, setContact] = useState(null);
  const [contactTitle, setContactTitle] = useState(null);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedUnix, setSelectedUnix] = useState([]);

  const handleOpen = (event) => {
    event.preventDefault();
    const projectSelected = project ? project.id : "";

    setOpen(true);
    setProjectSeleted(projectSelected);

    // setAllMainStates({ ...allMainStates, loading: false });

    projectsData.forEach((element) => {
      if (projectSelected === element.project) {
        const viewport = {
          zoom: element.zoom,
          latitude: element.centerLat,
          longitude: element.centerLong,
          transitionDuration: 1000,
        };
        setViewport(viewport);

        setGeoData(element.geoData);
        setCheckIfCalendar(element.calendar);
      }
      if (projectSelected === "") {
        const viewport = {
          zoom: mapViewport.zoom,
          latitude: mapViewport.latitude,
          longitude: mapViewport.longitude,
          transitionDuration: 1000,
        };
        setViewport(viewport);

        setGeoData("");
      }
    });
  };

  const handleClose = () => {
    dispatch(clearErrors());
    setOpen(false);
    setAllMainStates({ ...allMainStates, errors: {} });
  };

  const handleDropdown = (value) => {
    setTopic(value);
  };

  const handleDropdownProject = (value) => {
    // event.preventDefault();
    setProjectSeleted(value);

    projectsData.forEach((element) => {
      if (value === element.project) {
        const viewport = {
          zoom: element.zoom,
          latitude: element.centerLat,
          longitude: element.centerLong,
          transitionDuration: 1000,
        };
        setViewport(viewport);

        setGeoData(element.geoData);
        setCheckIfCalendar(element.calendar);
      }
      if (value === "") {
        if (initialMapViewport) {
          initialMapViewport.pitch = 0;
          setViewport(initialMapViewport);
        }

        setGeoData("");
        setCheckIfCalendar(false);
      }
    });
  };

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

  const handleChangeCalendar = (selectedDays) => {
    const selectedUnix = [];
    var i;
    for (i = 0; i < selectedDays.length; i++) {
      selectedUnix[i] = selectedDays[i]["unix"];
    }

    setSelectedDays(selectedDays);
    setSelectedUnix(selectedUnix);
  };

  const handleCloseCalendar = () => {
    setCalendarOpen(false);

    setSelectedDays([]);
    setSelectedUnix([]);
  };
  const handleSaveCalendar = () => {
    setCalendarOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const newScream = {
      body,
      title,
      locationHeader: address,
      fulladdress,
      neighborhood,
      lat: viewport.latitude,
      long: viewport.longitude,
      project: projectSelected,
      Thema: topic,
      weblinkTitle,
      weblink,
      contactTitle,
      contact,
    };

    if (selectedUnix.length > 0) {
      newScream.selectedUnix = selectedUnix;
    }
    dispatch(postScream(newScream, user, history)).then(() => {
      setOpen(false);
    });
  };

  const _onMarkerDragEnd = (newViewport) => {
    setViewport(newViewport);
    geocode(newViewport);

    setAddressBarClickedState(false);
  };

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
        console.log("Gesamt", match.features[0]);
        console.log(
          "Adresse",
          match.features[0].text,
          match.features[0].address
        );
        console.log("Stadtteil", match.features[0].context[1].text);

        const houseNumber =
          match.features[0].address !== undefined
            ? match.features[0].address
            : "";

        setNeighborhood(match.features[0].context[1].text);
        setAddress(match.features[0].text + " " + houseNumber);
        setFulladdress(match.features[0].place_name);
      });

    if (
      viewport.latitude > 51.08 ||
      viewport.latitude < 50.79 ||
      viewport.longitude < 6.712 ||
      viewport.longitude > 7.17
    ) {
      alert("Außerhalb von Köln kannst du leider noch keine Ideen teilen.");

      setOut(true);
    } else {
      setOut(false);
    }
  };

  const onSelected = (newViewport) => {
    setViewport(newViewport);

    setTimeout(() => {
      geocode(newViewport);
    }, 1000);
  };

  const addressBarClicked = () => {
    setAddressBarClickedState(true);
  };

  const handleLocationDecided = () => {
    if (locationDecided === false) {
      setAllMainStates({
        ...allMainStates,
        locationDecided: true,
        MapHeight: "30vh",
      });
    }

    if (locationDecided === true) {
      setAllMainStates({
        ...allMainStates,
        locationDecided: false,
        MapHeight: "100vh",
      });
    }
  };

  const handleLocationDecidedNoLocation = () => {
    if (locationDecided === false) {
      setNeighborhood("Ohne Ortsangabe");
      setAddress("Ohne Ortsangabe");
      setFulladdress("Ohne Ortsangabe");
      const viewport = {
        zoom: 12,
        latitude: 50.93864020643174,
        longitude: 6.958725744885521,
        transitionDuration: 1000,
      };
      setViewport(viewport);

      setAllMainStates({
        ...allMainStates,
        locationDecided: true,
        MapHeight: "30vh",
      });
    }

    if (locationDecided === true) {
      setAllMainStates({
        ...allMainStates,
        locationDecided: false,
        MapHeight: "100vh",
      });
    }
  };

  return (
    <Fragment>
      {!isMobileCustom ? (
        <OpenButtonDesktop onClick={handleOpen}>
          <img src={AddIcon} width="25" alt="AddIcon" />
          <span className="addText">{t("postScream_newIdea")}</span>
        </OpenButtonDesktop>
      ) : (
        !loading && (
          <OpenButtonMobile
            onClick={handleOpen}
            openScream={openScream}
            isInstagram={
              window.innerHeight === window.screen.height &&
              navigator.userAgent.match(/instagram/i)
            }
          >
            <img src={AddIcon} width="25" alt="AddIcon" />
          </OpenButtonMobile>
        )
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
      >
        {!user.authenticated && (
          <div
            className={
              isMobileCustom ? classes.Authlink : classes.AuthlinkDesktop
            }
            style={
              isMobileCustom && locationDecided
                ? { top: "27vh", transition: "0.5s" }
                : isMobileCustom && !locationDecided
                ? { top: "100vh", transition: "0.5s" }
                : null
            }
          >
            <RegistrationAndLogin />
          </div>
        )}

        {isMobileCustom && (
          <div
            style={
              locationDecided
                ? { marginTop: 0, transition: "0.5s" }
                : { marginTop: "100vh", transition: "0.5s" }
            }
          >
            <div
              className="backContainer"
              onClick={() => handleLocationDecided()}
            ></div>

            <div className="PostBackground"></div>
          </div>
        )}

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
        {calendarOpen && (
          <InlineDatePicker
            setCalendarOpen={setCalendarOpen}
            handleCloseCalendar={handleCloseCalendar}
            handleSaveCalendar={handleSaveCalendar}
            handleChangeCalendar={handleChangeCalendar}
            selectedDays={selectedDays}
          />
        )}

        <PostScreamMap
          MapHeight={MapHeight}
          geocode={geocode}
          _onMarkerDragEnd={_onMarkerDragEnd}
          geoData={geoData}
          viewport={viewport}
          clicked={addressBarClickedState}
          addressBarClicked={addressBarClicked}
          locationDecided={locationDecided}
          onSelected={onSelected}
          address={address}
          loadingProjects={loadingProjects}
        />

        <PostScreamSelectContainter
          classes={classes}
          locationDecided={locationDecided}
          handleLocationDecided={handleLocationDecided}
          handleLocationDecidedNoLocation={handleLocationDecidedNoLocation}
          projectSelected={projectSelected}
          address={address}
          handleDropdownProject={handleDropdownProject}
          open={open}
          loadingProjects={loadingProjects}
          projectsData={projectsData}
        />

        <PostScreamFormContent
          classes={classes}
          errors={errors}
          address={address}
          handleLocationDecided={handleLocationDecided}
          handleDropdown={handleDropdown}
          weblink={weblink}
          weblinkTitle={weblinkTitle}
          contactTitle={contactTitle}
          contact={contact}
          project={projectSelected}
          selectedDays={selectedDays}
          topic={topic}
          loading={loading}
          Out={out}
          locationDecided={locationDecided}
          handleSubmit={handleSubmit}
          body={body}
          title={title}
          setTitle={setTitle}
          setBody={setBody}
          setWeblinkOpen={setWeblinkOpen}
          setContactOpen={setContactOpen}
          setCalendarOpen={setCalendarOpen}
          checkIfCalendar={checkIfCalendar}
        />
        <CustomIconButton
          name="Close"
          position="fixed"
          margin={
            document.body.clientWidth > 768 ? "40px" : "18px 0px 0px 13px"
          }
          handleButtonClick={handleClose}
          zIndex="1"
        />
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(withRouter(memo(PostScream)));
