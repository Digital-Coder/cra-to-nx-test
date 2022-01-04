/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";
import topics from "../../../data/topics";
import { useTranslation } from "react-i18next";

import styled, { keyframes } from "styled-components";
import { setSwipePositionDown } from "../../../redux/actions/UiActions";
import MapClickContainer from "./MapClickContainer";

const enterAnimation = keyframes`
       0% {
        margin-left: 100%;
}
80% {
        margin-left: 100%;
}


100% {
  margin-left: calc(100% - 120px);
}
    `;
const TopicFilterWrapperMobile = styled.div`
  z-index: 15;
  position: fixed;

  top: ${(props) => (props.openScream ? "10px" : "90px")};
  width: 100%;

  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  transition: 1s;
  padding-bottom: 20px;
  padding-top: 20px;
  margin-top: -20px;
`;

const OpenButtonMobile = styled.div`
  position: absolute;
  width: 110px;

  height: 30px;
  z-index: 10;
  margin-left: -20px;
  margin-top: 0px;
  border-radius: 15px;
  display: ${(props) => (props.hide ? "block" : "none")};
`;

const TopicFilterInnerWrapperMobile = styled.div`
  border-radius: 20px 0 0 20px;
  backdrop-filter: blur(5px);
  background-color: rgb(255, 255, 255, 0.5);
  box-shadow: 0 -18px 40px 12px rgba(0, 0, 0, 0.2);
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 5px;
  margin-left: calc(100% - 120px);
  animation: ${enterAnimation} 3.5s ease-out;
  z-index: 15;
  display: flex;
  flex-direction: row;
  width: max-content;
`;

const TopicFilterWrapperDesktop = styled.div`
  position: relative;
  width: 100%;
  left: 20px;
  top: 70px;
  background-color: transparent;
  padding: 0px;
  height: auto;
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  flex-wrap: wrap;
`;

export function TopicFilter({ loading, inline, column }) {
  const openScream = useSelector((state) => state.UI.openScream);
  const selectedTopics = useSelector((state) => state.data.topics);
  const [moveLeft, setMoveLeft] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (openScream) {
      setMoveLeft(false);
    }
  }, [openScream]);

  useEffect(() => {
    if (
      isMobileCustom &&
      !inline &&
      document.getElementById("Wrapper") !== null
    ) {
      const el = document.getElementById("Wrapper");
      if (moveLeft) {
        el.scroll({
          top: 0,
          left: window.innerWidth - 125,
          behavior: "smooth",
        });
      } else {
        el.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [moveLeft, inline]);

  // Handler at index 0 is for the "all" checkbox
  const topicFilters = topics.map((topic, i) => {
    return (
      <Checkbox
        color="default"
        icon={<FiberManualRecordIcon />}
        checkedIcon={<FiberManualRecordIcon className="activelegenditem" />}
        onChange={() => dispatch(handleTopicSelectorRedux(topic.name))}
        data-cy={topic.name}
        checked={
          selectedTopics.includes(topic.name) && selectedTopics.length !== 7
        }
        style={{ color: topic.color }}
      />
    );
  });

  return isMobileCustom && !loading && !inline ? (
    <TopicFilterWrapperMobile openScream={openScream} id="Wrapper">
      <MapClickContainer />
      <TopicFilterInnerWrapperMobile>
        <OpenButtonMobile
          onClick={() => setMoveLeft(!moveLeft)}
          hide={selectedTopics.length === 7}
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<FiberManualRecordIcon />}
              checkedIcon={
                <FiberManualRecordIcon className="activelegenditem" />
              }
              data-cy="topic-all"
              onChange={() => dispatch(handleTopicSelectorRedux("all"))}
              checked={selectedTopics.length === 7}
              style={{ color: "#000000" }}
            />
          }
          label={t("topics_all")}
        />
        {topics.map((topic, i) => (
          <FormControlLabel
            key={`${topic.name}-${i}`}
            control={topicFilters[i]}
            label={topic.label}
          />
        ))}
      </TopicFilterInnerWrapperMobile>
    </TopicFilterWrapperMobile>
  ) : (
    <TopicFilterWrapperDesktop column={column}>
      <FormControlLabel
        control={
          <Checkbox
            icon={<FiberManualRecordIcon />}
            checkedIcon={<FiberManualRecordIcon className="activelegenditem" />}
            data-cy="topic-all"
            onChange={() => dispatch(handleTopicSelectorRedux("all"))}
            checked={selectedTopics.length === 7}
            style={{ color: "#000000" }}
          />
        }
        label={t("topics_all")}
      />
      {topics.map((topic, i) => (
        <FormControlLabel
          key={`${topic.name}-${i}`}
          control={topicFilters[i]}
          label={topic.label}
        />
      ))}
    </TopicFilterWrapperDesktop>
  );
}

export default React.memo(TopicFilter);
