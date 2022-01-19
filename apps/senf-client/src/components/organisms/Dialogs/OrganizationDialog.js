/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
// Redux stuff
import { clearErrors } from "../../../redux/actions/errorsActions";

//Components

import Header from "../../molecules/Headers/Header";
import ProjectInfo from "../../molecules/DialogInlineComponents/ProjectInfo";
import styled from "styled-components";
import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";

import _ from "lodash";
import { openOrganizationFunc } from "../../../redux/actions/organizationActions";
import SwipeList from "../SwipeLists/SwipeList";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { useTranslation } from "react-i18next";
import { MenuData } from "../../../data/MenuData";

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

const OrganizationDialog = ({
  viewport,
  projectsData,
  loadingProjects,
  dataFinalMap,
}) => {
  const { t } = useTranslation();
  const [path, setPath] = useState("");
  const [order, setOrder] = useState(0);
  const [dropdown, setDropdown] = useState("newest");

  const openOrganization = useSelector((state) => state.UI.openOrganization);
  const organization = useSelector((state) => state.data.organization);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.UI.loading);
  const mapViewport = useSelector((state) => state.data.mapViewport);

  useEffect(() => {
    dispatch(handleTopicSelectorRedux("all"));
    setPath(window.location.pathname);
    console.log(organization);
  }, [openOrganization]);

  const handleClose = () => {
    dispatch(openOrganizationFunc(false));
    dispatch(clearErrors());
  };

  const handleClick = (order) => {
    setOrder(order);

    if (order === 2) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    dispatch(clearErrors());
  };

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const dataRar = organization?.projectRooms;

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

  const dataFinal = sortedScreams;
  // .filter(
  //   ({ Thema, status, lat, long }) =>
  //     selectedTopics.includes(Thema) &&
  //     lat <= mapBounds?.latitude1 &&
  //     lat >= mapBounds?.latitude2 &&
  //     long >= mapBounds?.longitude2 &&
  //     long <= mapBounds?.longitude3 &&
  //     status === "None"
  // );

  return (
    openOrganization && (
      <React.Fragment>
        <Header
          imgUrl={organization?.imgUrl}
          title={organization?.title}
          owner={organization?.organizationType}
          loading={loading}
          order={order}
          path={path}
          organization={organization}
          handleClose={handleClose}
          handleClick={handleClick}
        />
        {!isMobileCustom && order === 0 && <MapHider />}

        <Wrapper>
          {!isMobileCustom || (isMobileCustom && order !== 1 && <Background />)}

          {order === 1 && (
            <SwipeList
              swipeListType="projectRoomOverview"
              loading={loadingProjects}
              tabLabels={MenuData.map((item) => item.text).slice(1, 2)}
              order={order}
              dataFinal={dataFinal}
              dataFinalLength={dataFinal.length}
              dataFinalMap={dataFinalMap}
              viewport={mapViewport}
              handleDropdown={handleDropdown}
              projectsData={projectsData}
              dropdown={dropdown}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
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
                text={t("Projekträume anzeigen")}
                zIndex="9"
                backgroundColor={isMobileCustom ? "#353535" : "white"}
                textColor={isMobileCustom ? "white" : "#353535"}
                position="fixed"
                bottom={isMobileCustom ? "10px" : "50%"}
                left={
                  isMobileCustom ? "0" : "calc(600px + ((100% - 600px)/2)) "
                }
                marginLeft={isMobileCustom ? "50%" : "0"}
                handleButtonClick={() => handleClick(1)}
              />
              <Break />

              <MainAnimations
                transition="0.5s"
                display="block"
                paddingBottom="2em"
                height="100%"
              >
                <ProjectInfo
                  description={organization?.description}
                  weblink={organization?.weblink}
                  contact={organization?.contact}
                />
                <br />
              </MainAnimations>
            </div>
          )}
        </Wrapper>
      </React.Fragment>
    )
  );
};

export default OrganizationDialog;
