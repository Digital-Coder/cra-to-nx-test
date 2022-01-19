/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { isMobileCustom } from "../../util/customDeviceDetect";
import _ from "lodash";

//Redux
import { getAllFullScreams } from "../../redux/actions/monitoringScreamActions";
import { getProjects } from "../../redux/actions/projectActions";

//ICONS
import Not_connected from "../../images/Not_connected.png";

import { MonitoringDesktopSidebar } from "../molecules/Navigation/MonitoringDesktopSidebar";

// import { ExportToExcel } from "../atoms/CustomButtons/ExportToExcel";

//Components
import MonitoringEditScream from "../organisms/SideBars/MonitoringEditScream";
import MonitoringToolbar from "../molecules/Toolbar/MonitoringToolbar";
import MonitoringList from "../molecules/List/MonitoringList";
import { CustomButton } from "../atoms/CustomButtons/CustomButton";
import LoginRegistration from "../organisms/Auth/LoginRegistration";
import styled from "styled-components";
import { StyledText } from "../../styles/GlobalStyle";
import ErrorBackground from "../atoms/Backgrounds/ErrorBackground";
const NoAuthorizationWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  position: relative;
`;
const TitleWrapper = styled.div`
  margin-top: 25vh;
  text-align: center;
`;
const Title = styled.h3`
  text-align: center;
  font-family: PlayfairDisplay-Bold;
  font-size: 22px;
`;
const MonitoringBoard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { cookie_settings } = useSelector((state) => state.data);

  const history = useHistory();

  const full_screams = useSelector((state) => state.data.full_screams);
  const user = useSelector((state) => state.user);
  const openMonitoringScream = useSelector(
    (state) => state.UI.openMonitoringScream
  );

  const loading = useSelector((state) => state.data.loading);
  const loadingProjects = useSelector((state) => state.UI.loadingProjects);

  const projects = useSelector((state) => state.data.projects);
  const selectedTopics = useSelector((state) => state.data.topics);

  const [order, setOrder] = useState(1);
  const mapBounds = useSelector((state) => state.data.mapBounds);
  const mapViewport = useSelector((state) => state.data.mapViewport);

  const [dropdown, setDropdown] = useState("newest");

  useEffect(() => {
    if (
      cookie_settings !== "all" &&
      cookie_settings !== "minimum" &&
      isMobileCustom
    ) {
      history.push("/intro");
    } else {
      dispatch(getAllFullScreams(mapViewport)).then(() => {
        dispatch(getProjects(mapViewport));
      });
    }
  }, []);
  const handleClick = (order) => {
    setOrder(order);

    // dispatch(closeScream());
    // dispatch(closeProject());
    // dispatch(closeAccountFunc());

    // handleTopicSelector("all");

    // if (order === 2) {
    //   window.history.pushState(null, null, "/projects");
    //   window.scrollTo({
    //     top: 0,
    //     left: 0,
    //     behavior: "smooth",
    //   });
    // }

    // if (order === 3) {
    //   window.scrollTo({
    //     top: 0,
    //     left: 0,
    //     behavior: "smooth",
    //   });
    // }
  };
  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const sortedScreams =
    dropdown === "newest"
      ? _.orderBy(full_screams, "createdAt", "desc")
      : _.orderBy(full_screams, "likeCount", "desc");

  const dataFinal = sortedScreams.filter(
    ({ Thema, lat, long, status }) =>
      selectedTopics.includes(Thema) &&
      // lat <= mapBounds.latitude1 &&
      // lat >= mapBounds.latitude2 &&
      // long >= mapBounds.longitude2 &&
      // long <= mapBounds.longitude3 &&
      status === "None"
  );

  let dataFinalLength = dataFinal.length;

  return user.isAdmin === true ? (
    <div>
      <ErrorBackground loading={loading} />

      <MonitoringDesktopSidebar
        loading={loading}
        authenticated={user.authenticated}
        handleClick={handleClick}
        order={order}
        channelOrder={order}
        loadingProjects={loadingProjects}
        projectsData={projects}
      ></MonitoringDesktopSidebar>

      <MonitoringToolbar />
      <div
        style={{
          marginTop: "120px",
          marginLeft: "210px",
          width: "calc(100vw - 650px)",
        }}
      >
        {!loading ? (
          <MonitoringList
            type="monitoring"
            loading={loading}
            dropdown={dropdown}
            dataFinal={dataFinal}
            dataFinalLength={dataFinalLength}
            projectsData={projects}
          />
        ) : (
          <div className="no-ideas-yet" style={{ marginTop: "100px" }}>
            {" "}
            Lade Daten...{" "}
          </div>
        )}
      </div>

      <div className="monitoringBottombar">
        {/* <ExportToExcel
          apiData={dataFinal}
          fileName={"hi"}
          dataFinal={dataFinal}
        /> */}
      </div>

      <div
        style={{
          position: "fixed",
          zIndex: 99,
          right: "20px",

          width: "400px",
          height: "calc(100vh - 40px)",

          bottom: "20px",
          backgroundColor: "white",

          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img
          src={Not_connected}
          width="90%"
          alt="no-selected-idea-illustration"
          style={{ marginBottom: "50px" }}
        ></img>
        <div className="no-ideas-yet">
          Wähle eine Idee aus, um diesen Bereich zu aktivieren
        </div>
        {openMonitoringScream && (
          <MonitoringEditScream
            monitoringEditScreamOpen={openMonitoringScream}
          />
        )}
      </div>
    </div>
  ) : (
    <NoAuthorizationWrapper>
      <TitleWrapper>
        <Title>Keine Berechtigung</Title>
        <StyledText>
          Du hast leider keine Berechtigung, um diese Unterseite zu sehen
        </StyledText>
      </TitleWrapper>
      {!user.authenticated | !user.isAdmin && (
        <CustomButton
          text="Melde dich an"
          backgroundColor="#353535"
          textColor="white"
          position="relative"
          top="20px"
          left="0"
          zIndex="0"
        >
          <LoginRegistration />
        </CustomButton>
      )}
    </NoAuthorizationWrapper>
  );
};

export default MonitoringBoard;
