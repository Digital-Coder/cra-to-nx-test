/** @format */

import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import _ from "lodash";
//Components
import { ProjectCard, CreateProject } from "../../molecules/Cards/ProjectCard";

import { isMobileCustom } from "../../../util/customDeviceDetect";
import InfiniteScroll from "react-infinite-scroller";
import CreateProjectDialog from "../CreateProject/CreateProjectDialog";

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;

  overflow: hidden;
  position: fixed;
  overflow: scroll;
  animation: cardanimation 0.8s ease-in-out;

  @media (min-width: 768px) {
    margin-left: 200px;
    width: 400px;
  }
`;
const ProjectRoomDescription = styled.div`
  font-size: 14pt;
  color: rgb(65, 67, 69);
  width: 90%;
  text-align: left;
  margin-left: 5%;
  padding-bottom: 30px;
`;

const NoIdeasYet = styled.div`
  position: relative;
  font-size: 15pt;
  color: #414345;
  width: 80%;
  margin-left: 10%;
  text-align: center;
`;
const ProjectsPage = ({ projectsData }) => {
  const [isCreateProjectDialogIsOpen, setCreateProjectDialogIsOpen] =
    useState(false);
  const { t } = useTranslation();
  const loadingProjects = useSelector((state) => state.data.loadingProjects);

  const projects = _.orderBy(projectsData, "createdAt", "desc");

  // const prevdataFinalLength = usePrevious({ dataFinalLength });
  // const prevDropdown = usePrevious({ dropdown });

  useEffect(() => {
    if (!loadingProjects) {
      const element = document.getElementById("List");
      element?.scrollTo({
        top: 0,
        left: 0,
      });

      setListItems(1);
      sethasMoreItems(true);
    }
  }, [loadingProjects]);
  const itemsPerPage = 1;
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [listItems, setListItems] = useState(itemsPerPage);

  const showItems = (projects) => {
    var items = [];
    if (projects.length !== 0) {
      for (var i = 0; i < listItems; i++) {
        items.push(
          projects[i]?.project && (
            <ProjectCard key={projects[i]?.project} project={projects[i]} />
          )
        );
      }
      return items;
    }
  };

  const loadMore = () => {
    console.log(
      "loading more",
      "df.length",
      projects.length,
      "listItems:",
      listItems
    );

    if (!loadingProjects && projects.length === 0) {
      sethasMoreItems(false);
    }

    if (listItems === projects.length) {
      sethasMoreItems(false);
    } else {
      setTimeout(() => {
        setListItems(listItems + itemsPerPage);
      }, 100);
    }
  };

  return (
    <Wrapper>
      <CreateProjectDialog
        setCreateProjectDialogIsOpen={setCreateProjectDialogIsOpen}
        isCreateProjectDialogIsOpen={isCreateProjectDialogIsOpen}
      />

      {isMobileCustom ? (
        <div style={{ height: "110px" }} />
      ) : (
        <div style={{ height: "80px" }} />
      )}
      <ProjectRoomDescription>
        {t("projectrooms_description")}
      </ProjectRoomDescription>

      {!loadingProjects ? (
        <InfiniteScroll
          loadMore={() => loadMore()}
          hasMore={hasMoreItems}
          useWindow={false}
        >
          {showItems(projects)}
        </InfiniteScroll>
      ) : (
        <NoIdeasYet>{t("projectrooms_loader")}</NoIdeasYet>
      )}
      {!loadingProjects && projects.length === 0 && (
        <NoIdeasYet>{t("projectrooms_loading_error")}</NoIdeasYet>
      )}
      <br />
      <br />
      <br />

      <CreateProject
        setCreateProjectDialogIsOpen={setCreateProjectDialogIsOpen}
      />

      <br />
      <br />
      <br />
    </Wrapper>
  );
};

export default memo(ProjectsPage);
