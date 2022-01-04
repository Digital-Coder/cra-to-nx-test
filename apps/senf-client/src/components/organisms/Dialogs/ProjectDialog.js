/** @format */

import React, { useState, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
// Redux stuff
import { closeProject } from "../../../redux/actions/projectActions";
import { clearErrors } from "../../../redux/actions/errorsActions";
import {
  setMapBounds,
  setMapViewport,
} from "../../../redux/actions/mapActions";

//Components
import CalendarComponent from "../../atoms/calendar/CalendarComponent";

import IdeaList from "../IdeaList/IdeaList";
import ProjectHeader from "../../molecules/Headers/ProjectHeader";
import ProjectInfo from "../../molecules/DialogInlineComponents/ProjectInfo";
import styled from "styled-components";
import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import {
  BackgroundDesktop,
  BackgroundMobile,
} from "../../atoms/Backgrounds/GradientBackgrounds";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";

import _ from "lodash";

const Break = styled.div`
  position: relative;
  height: 110px;
  width: 100%;

  @media (min-width: 768px) {
    height: 30px;
  }
`;

const ProjectDialog = ({ projectsData, loadingProjects }) => {
  const [open, setOpen] = useState(false);

  const [oldPath, setOldPath] = useState("");
  const [newPath, setNewPath] = useState("");
  const [path, setPath] = useState("");
  const [order, setOrder] = useState(1);
  const [dropdown, setDropdown] = useState("newest");

  const openProject = useSelector((state) => state.UI.openProject);
  const project = useSelector((state) => state.data.project);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.UI.loading);
  const mapBounds = useSelector((state) => state.data.mapBounds);

  const mapLoaded = useSelector((state) => state.data.mapLoaded);
  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );
  const selectedTopics = useSelector((state) => state.data.topics);

  const {
    title,
    owner,
    imgUrl,
    description,
    startDate,
    endDate,
    geoData,
    weblink,
    contact,
    calendar,
  } = project;

  useEffect(() => {
    dispatch(handleTopicSelectorRedux("all"));
    setPath(window.location.pathname);
  }, [openProject]);

  const handleClose = useCallback(() => {
    console.log(initialMapViewport);
    dispatch(closeProject());
    dispatch(clearErrors());
    dispatch(setMapViewport(initialMapViewport));
  }, [dispatch, initialMapViewport]);

  const handleClick = useCallback(
    (order) => {
      setOrder(order);

      if (order === 2) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }

      dispatch(clearErrors());
    },
    [dispatch]
  );

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const dataRar = project.screams;

  const [searchTerm, setSearchTerm] = useState("");
  const screamsSearched = dataRar?.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.Stadtteil?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.Stadtbezirk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.locationHeader?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return val;
    }
  });

  const sortedScreams =
    dropdown === "newest"
      ? _.orderBy(screamsSearched, "createdAt", "desc")
      : _.orderBy(screamsSearched, "likeCount", "desc");

  const dataFinal = sortedScreams.filter(
    ({ Thema, status, lat, long }) =>
      selectedTopics.includes(Thema) &&
      lat <= mapBounds?.latitude1 &&
      lat >= mapBounds?.latitude2 &&
      long >= mapBounds?.longitude2 &&
      long <= mapBounds?.longitude3 &&
      status === "None"
  );

  const dataFinalLength = dataFinal.length;

  return (
    openProject && (
      <React.Fragment>
        <ProjectHeader
          imgUrl={imgUrl}
          title={title}
          loading={loading}
          calendar={calendar}
          order={order}
          path={path}
          project={project}
          handleClose={handleClose}
          handleClick={handleClick}
        />

        <div className="projectDialog">
          {isMobileCustom && order !== 1 ? (
            <BackgroundMobile />
          ) : !isMobileCustom ? (
            <BackgroundDesktop />
          ) : null}
          {order === 1 && (
            <IdeaList
              type="projectIdeas"
              loading={loading}
              order={order}
              dataFinal={dataFinal}
              dataFinalLength={dataFinalLength}
              geoData={geoData}
              handleDropdown={handleDropdown}
              projectsData={projectsData}
              loadingProjects={loadingProjects}
              project={project}
              dropdown={dropdown}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />
          )}
          {order === 2 && (
            <div
              style={{
                overflow: "scroll",
                height: "100vh",
                pointerEvents: "all",
              }}
            >
              <Break />

              <MainAnimations
                transition="0.5s"
                display="block"
                paddingBottom="2em"
                height="100%"
              >
                <ProjectInfo
                  description={description}
                  weblink={weblink}
                  contact={contact}
                  startDate={startDate}
                  endDate={endDate}
                  owner={owner}
                />
                <br />
              </MainAnimations>
            </div>
          )}
          {order === 3 && (
            <React.Fragment>
              <Break />

              <MainAnimations
                transition="0.5s"
                display="block"
                paddingBottom="2em"
                height="100%"
                position={document.body.clientWidth > 768 && "fixed"}
                top={document.body.clientWidth > 768 && "100px"}
              >
                <CalendarComponent
                  projectScreams={project.screams}
                  handleClick={handleClick}
                ></CalendarComponent>
              </MainAnimations>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    )
  );
};

export default memo(ProjectDialog);
