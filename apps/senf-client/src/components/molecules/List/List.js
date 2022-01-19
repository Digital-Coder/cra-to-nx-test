/** @format */

import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import IdeaCard from "../Cards/IdeaCard";
import {
  NoMoreMainContent,
  NoMoreMyContent,
  NoMoreProjectsContent,
  NoMoreProjectRooms,
} from "./NoMoreContent";
import { isMobileCustom } from "../../../util/customDeviceDetect";

import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import { usePrevious } from "../../../hooks/usePrevious";
import { ProjectCard } from "../Cards/ProjectCard";
import { useTranslation } from "react-i18next";
import { NoMore } from "./styles/sharedStyles";

const NoIdeasYet = styled.div`
  position: relative;
  font-size: 15pt;
  color: #414345;
  width: 80%;
  margin-left: 10%;
  text-align: center;
`;

const List = ({
  swipeListType,
  type,
  order,
  handleClick,
  loading,
  dropdown,
  dataFinal,
  projectsData,
}) => {
  const dataFinalLength = dataFinal.length;
  const { t } = useTranslation();
  const mapBounds = useSelector((state) => state.data.mapBounds);
  const prevdataFinalLength = usePrevious({ dataFinalLength });
  const prevDropdown = usePrevious({ dropdown });

  useEffect(() => {
    if (
      (dataFinalLength &&
        prevdataFinalLength &&
        prevdataFinalLength.dataFinalLength !== dataFinalLength) ||
      (dropdown && prevDropdown && prevDropdown.dropdown !== dropdown)
    ) {
      const element = document.getElementById("List");

      element?.scrollTo({
        top: 0,
        left: 0,
      });

      setListItems(1);
      sethasMoreItems(true);
    }
  }, [loading, dropdown, dataFinalLength]);
  const itemsPerPage = 1;
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [listItems, setListItems] = useState(itemsPerPage);

  const showItems = (dataFinal) => {
    var items = [];
    if (dataFinalLength !== 0) {
      for (var i = 0; i < listItems; i++) {
        if (swipeListType === "projectRoomOverview") {
          items.push(
            dataFinal[i]?.projectRoomId && (
              <ProjectCard
                key={dataFinal[i]?.projectRoomId}
                project={dataFinal[i]}
              />
            )
          );
        } else {
          items.push(
            dataFinal[i]?.screamId && (
              <IdeaCard
                loading={loading}
                key={dataFinal[i]?.screamId}
                title={dataFinal[i]?.title}
                body={dataFinal[i]?.body}
                screamId={dataFinal[i]?.screamId}
                likeCount={dataFinal[i]?.likeCount}
                commentCount={dataFinal[i]?.commentCount}
                Stadtteil={dataFinal[i]?.Stadtteil}
                project={dataFinal[i]?.project}
                color={dataFinal[i]?.color}
                projectsData={projectsData}
              />
            )
          );
        }
      }
      return items;
    }
  };

  const loadMore = () => {
    if (listItems === dataFinal.length) {
      sethasMoreItems(false);
    } else {
      setTimeout(() => {
        setListItems(listItems + itemsPerPage);
      }, 100);
    }
  };

  return (
    !loading &&
    mapBounds && (
      <React.Fragment>
        <InfiniteScroll
          id="List"
          loadMore={() => loadMore()}
          hasMore={hasMoreItems}
          // loader={<SkeletonCard dataFinalLength={dataFinalLength === 0} />}
          useWindow={false}
        >
          {showItems(dataFinal)}
        </InfiniteScroll>

        {swipeListType === "ideas" &&
        !hasMoreItems | (dataFinalLength === 0) ? (
          <React.Fragment>
            {type === "myIdeas" ? (
              <NoMoreMyContent dataFinalLength={dataFinalLength} />
            ) : type === "projectIdeas" ? (
              <NoMoreProjectsContent dataFinalLength={dataFinalLength} />
            ) : (
              <NoMoreMainContent dataFinalLength={dataFinalLength} />
            )}
          </React.Fragment>
        ) : !hasMoreItems | (dataFinalLength === 0) ? (
          <NoMoreProjectRooms dataFinalLength={dataFinalLength} />
        ) : null}

        {swipeListType === "projectRoomOverview" && loading && (
          <NoIdeasYet>{t("projectrooms_loader")}</NoIdeasYet>
        )}
        {/* {swipeListType === "projectRoomOverview" &&
          !loading &&
          dataFinal.length === 0 && (
            <NoIdeasYet>{t("projectrooms_loading_error")}</NoIdeasYet>
          )} */}

        <div style={isMobileCustom ? { height: "70%" } : { height: "500px" }} />
      </React.Fragment>
    )
  );
};

export default memo(List);
