/** @format */

import React, { useState, useEffect } from "react";
import IdeaCardMonitoring from "../Cards/IdeaCardMonitoring";
import {
  NoMoreMainContent,
  NoMoreMyContent,
  NoMoreProjectsContent,
} from "./NoMoreContent";
import { isMobileCustom } from "../../../util/customDeviceDetect";

import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import SkeletonCard from "../Cards/SkeletonCard";
import { usePrevious } from "../../../hooks/usePrevious";

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  width: 100%;
  top: 0;

  animation: cardanimation 0.8s ease-in-out;
`;
const MonitoringList = ({
  type,
  loading,
  dropdown,
  dataFinal,
  dataFinalLength,
  projectsData,
}) => {
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
      element.scrollTo({
        top: 0,
        left: 0,
      });
      setListItems(1);
      sethasMoreItems(true);
    }
  }, [dropdown, dataFinalLength]);
  const itemsPerPage = 1;
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [listItems, setListItems] = useState(itemsPerPage);

  const showItems = (dataFinal) => {
    var items = [];
    if (dataFinalLength !== 0) {
      for (var i = 0; i < listItems; i++) {
        items.push(
          <IdeaCardMonitoring
            loading={loading}
            key={dataFinal[i]?.screamId}
            title={dataFinal[i]?.title}
            body={dataFinal[i]?.body}
            screamId={dataFinal[i]?.screamId}
            likeCount={dataFinal[i]?.likeCount}
            commentCount={dataFinal[i]?.commentCount}
            userHandle={dataFinal[i]?.userHandle}
            Stadtteil={dataFinal[i]?.Stadtteil}
            project={dataFinal[i]?.project}
            color={dataFinal[i]?.color}
            projectsData={projectsData}
          />
        );
      }
      return items;
    }
  };

  const loadMore = () => {
    console.log(
      "loading more",
      "df.length",
      dataFinal.length,
      "listItems:",
      listItems
    );
    if ((listItems === dataFinal.length) | (dataFinalLength === 0)) {
      sethasMoreItems(false);
    } else {
      setTimeout(() => {
        setListItems(listItems + itemsPerPage);
        //(posts.length-listItems)>10? setlistItems(listItems + 10):setlistItems(listItems+15);
      }, 100);
    }
  };

  return (
    !loading && (
      <Wrapper id="List">
        <InfiniteScroll
          loadMore={() => loadMore()}
          hasMore={hasMoreItems}
          loader={<SkeletonCard dataFinalLength={dataFinalLength === 0} />}
          useWindow={false}
        >
          {showItems(dataFinal)}
        </InfiniteScroll>

        {!hasMoreItems | (dataFinalLength === 0) ? (
          <React.Fragment>
            {type === "myIdeas" ? (
              <NoMoreMyContent dataFinalLength={dataFinalLength} />
            ) : type === "projectIdeas" ? (
              <NoMoreProjectsContent dataFinalLength={dataFinalLength} />
            ) : (
              <NoMoreMainContent dataFinalLength={dataFinalLength} />
            )}
          </React.Fragment>
        ) : null}
        {isMobileCustom ? (
          <div style={{ height: "70%" }} />
        ) : (
          <div style={{ height: "500px" }} />
        )}
      </Wrapper>
    )
  );
};

export default MonitoringList;
