/** @format */

import React, { useState, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
// Redux stuff
import { openProjectRoomFunc } from "../../../redux/actions/projectActions";
import { clearErrors } from "../../../redux/actions/errorsActions";
import {
  setMapBounds,
  setMapViewport,
} from "../../../redux/actions/mapActions";

//Components
import CalendarComponent from "../../atoms/calendar/CalendarComponent";

import SwipeList from "../SwipeLists/SwipeList";
import Header from "../../molecules/Headers/Header";
import ProjectInfo from "../../molecules/DialogInlineComponents/ProjectInfo";
import styled from "styled-components";
import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";

import _ from "lodash";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { useTranslation } from "react-i18next";
import PostScream from "../PostIdea/PostScream";
import { ProjectRoomTabData } from "../../../data/ProjectRoomTabData";

const Wrapper = styled.div`
  @media (min-width: 768px) {
    padding-top: 70px;
  }
`;

const Break = styled.div`
  position: relative;
  height: 110px;
  width: 100%;

  @media (min-width: 768px) {
    height: 30px;
  }
`;

const MapHider = styled.div`
  width: calc(100% - 600px);
  height: 100%;
  position: fixed;
  top: 0;
  left: 600px;
  background-color: #000;
  opacity: 0.6;
  z-index: 9;
`;

const ProjectDialog = ({
  viewport,
  projectsData,
  loadingProjects,
  dataFinalMap,
}) => {
  const { t } = useTranslation();
  const [path, setPath] = useState("");
  const [order, setOrder] = useState(0);
  const [dropdown, setDropdown] = useState("newest");

  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);

  const project = useSelector((state) => state.data.project);
  const projects = useSelector((state) => state.data.projects);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.data.loading);
  const mapBounds = useSelector((state) => state.data.mapBounds);

  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );
  const selectedTopics = useSelector((state) => state.data.topics);

  useEffect(() => {
    dispatch(handleTopicSelectorRedux("all"));
    setPath(window.location.pathname);
  }, [openProjectRoom]);

  const handleClose = useCallback(() => {
    console.log(initialMapViewport);
    dispatch(openProjectRoomFunc(null, false));
    dispatch(clearErrors());
    dispatch(setMapViewport(initialMapViewport));
  }, [dispatch, initialMapViewport]);

  const handleClick = useCallback(
    (order) => {
      setOrder(order);

      if (order === 0) {
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

  const dataRar = project?.screams;

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

  const TabSlicer = project?.calendar ? 3 : 1;

  return (
    <React.Fragment>
      <Header
        imgUrl={project?.imgUrl}
        title={project?.title}
        owner={project?.owner}
        loading={loading}
        calendar={project?.calendar}
        order={order}
        path={path}
        handleClose={handleClose}
        handleClick={handleClick}
      />

      {isMobileCustom && (order === 1 || order === 3) && (
        <PostScream
          loadingProjects={loadingProjects}
          projectsData={projects}
          project={project}
        />
      )}
      {!isMobileCustom && order === 0 && <MapHider />}
      <Wrapper>
        {!isMobileCustom || (isMobileCustom && order === 0 && <Background />)}

        {(order === 1 || order === 3) && (
          <SwipeList
            swipeListType={order === 1 ? "ideas" : "projectRoomOverview"}
            type="projectIdeas"
            tabLabels={ProjectRoomTabData.map((item) => item.text).slice(
              0,
              TabSlicer
            )}
            loading={loading}
            order={order}
            dataFinal={dataFinal}
            geoData={project?.geoData}
            viewport={viewport}
            handleDropdown={handleDropdown}
            dropdown={dropdown}
            projectsData={projectsData}
            loadingProjects={loadingProjects}
            dataFinalMap={dataFinalMap}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            handleClick={handleClick}
          />
        )}
        {order === 0 && (
          <div
            style={{
              overflow: "scroll",
              height: "100vh",
              pointerEvents: "all",
            }}
          >
            <SubmitButton
              text={t("showIdeas")}
              zIndex="9"
              backgroundColor={"#353535"}
              textColor={"white"}
              position="fixed"
              bottom={"10px"}
              left={"0"}
              marginLeft={isMobileCustom ? "50%" : "400px"}
              handleButtonClick={() => handleClick(1)}
            />

            {!isMobileCustom && (
              <SubmitButton
                text={t("showIdeas")}
                zIndex="9"
                backgroundColor={"white"}
                textColor={"#353535"}
                position="fixed"
                bottom={"50%"}
                left={"calc(600px + ((100% - 600px)/2)) "}
                marginLeft={isMobileCustom ? "50%" : "0"}
                handleButtonClick={() => handleClick(1)}
              />
            )}

            <ProjectInfo
              description={project?.description}
              weblink={project?.weblink}
              contact={project?.contact}
              startDate={project?.startDate}
              endDate={project?.endDate}
              owner={project?.owner}
            />
          </div>
        )}
        {/* {order === 2 && (
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
                projectScreams={project?.screams}
                handleClick={handleClick}
              />
            </MainAnimations>
          </React.Fragment>
        )} */}
      </Wrapper>
    </React.Fragment>
  );
};

export default memo(ProjectDialog);
