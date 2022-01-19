/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import {
  handleTopicSelectorRedux,
  handleOrganizationTypesSelectorRedux,
} from "../../../redux/actions/UiActions";
import topics from "../../../data/topics";
import organizationTypes from "../../../data/organizationTypes";

import { useTranslation } from "react-i18next";

import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";

const FilterWrapperMobile = styled.div`
  z-index: 15;
  position: ${(props) =>
    props.placing !== "list" && props.placing !== "insights" && isMobileCustom
      ? "fixed"
      : "relative"};

  top: ${(props) =>
    props.placing === "list"
      ? "0px"
      : props.placing === "insights"
      ? "20px"
      : "none"};

  bottom: ${(props) =>
    props.placing !== "list" && props.placing !== "insights" && isMobileCustom
      ? "100px"
      : "none"};
  width: 100%;

  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  transition: 1s;
  padding-bottom: 20px;
  padding-top: 20px;
  margin-top: -20px;
  padding-left: ${(props) => (props.openScream ? "60px" : "0px")};
  animation: FilterWrapperMobileAnimation 1s;
  @keyframes FilterWrapperMobileAnimation {
    0% {
      margin-left: 100%;
    }

    100% {
      margin-left: 10px;
    }
  }

  @media (min-width: 768px) {
    top: 0;
    padding-left: 0;
    padding-bottom: 0;
  }
`;

const FilterInnerWrapperMobile = styled.div`
  padding-left: 10px;
  padding-right: 20px;
  margin: 5px;
  margin-left: 10px;

  display: flex;
  flex-direction: row;
  width: max-content;

  @media (min-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: ${(props) => (props.column ? "column" : "row")};
    align-items: flex-start;

    text-align: left;
    flex-wrap: wrap;
    padding: 0px;
    margin-left: 0;
  }
`;

const Tag = styled.button`
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  cursor: pointer;
  justify-content: flex-start;

  align-items: center;
  background-color: white;
  padding: 7px;
  padding-right: 10px;
  margin-right: 5px;
  border-radius: 8px;
  box-shadow: ${(props) =>
    props.placing !== "list" && props.placing !== "insights"
      ? "0 8px 30px -12px rgba(0, 0, 0, 0.8)"
      : "none"};
  background-color: ${(props) =>
    props.checked
      ? ` rgb(255, 255, 255, 1)`
      : props.placing !== "list"
      ? "rgb(236, 236, 236, 0.6)"
      : "#FFE898"};

  outline-offset: -2px;
  backdrop-filter: blur(10px);

  @media (min-width: 768px) {
    box-shadow: none;
    margin-top: 5px;
    padding-right: 10px;
    font-size: 14px;

    &:hover {
      background-color: #ffe898;
    }
  }
`;

const Checkbox = styled.div`
  width: 13px;
  position: relative;
  height: 13px;
  border-radius: 6px;
  flex-grow: 0;

  background-color: ${(props) => props.color && props.color};

  margin-right: 10px;
  margin-left: 3px;
`;
const Span = styled.span``;

export function TagsFilter({ loading, placing, type, inline, column }) {
  const openScream = useSelector((state) => state.UI.openScream);
  const selectedTopics = useSelector((state) => state.data.topics);
  const selectedOrganizationTypes = useSelector(
    (state) => state.data.organizationTypes
  );
  const swipePosition = useSelector((state) => state.UI.swipePosition);
  const [moveLeft, setMoveLeft] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (openScream) {
      setMoveLeft(false);
    }
  }, [openScream]);

  return (
    !loading &&
    !inline && (
      <FilterWrapperMobile
        openScream={openScream}
        id="Wrapper"
        placing={placing}
        moveUp={swipePosition === "top"}
      >
        <FilterInnerWrapperMobile column={column}>
          <Tag
            placing={placing}
            onClick={
              type === "topics"
                ? () => dispatch(handleTopicSelectorRedux("all"))
                : () => dispatch(handleOrganizationTypesSelectorRedux("all"))
            }
            checked={
              type === "topics"
                ? selectedTopics.length === 7
                : selectedOrganizationTypes.length === 7
            }
            color="#000000"
          >
            <Checkbox color="#000000" />

            {type === "topics" ? t("topics_all") : t("organizationTypes_all")}
          </Tag>
          {type === "topics"
            ? topics.map((topic, i) => (
                <Tag
                  placing={placing}
                  onClick={() => dispatch(handleTopicSelectorRedux(topic.name))}
                  checked={
                    selectedTopics.includes(topic.name) &&
                    selectedTopics.length !== 7
                  }
                  color={topic.color}
                >
                  <Checkbox color={topic.color} data-cy={topic.name} />

                  <Span>{topic.label}</Span>
                </Tag>
              ))
            : organizationTypes.map((organizationTypes, i) => (
                <Tag
                  placing={placing}
                  onClick={() =>
                    dispatch(
                      handleOrganizationTypesSelectorRedux(
                        organizationTypes.name
                      )
                    )
                  }
                  checked={
                    selectedOrganizationTypes.includes(
                      organizationTypes.name
                    ) && selectedOrganizationTypes.length !== 7
                  }
                  color={organizationTypes.color}
                >
                  <Checkbox
                    color={organizationTypes.color}
                    data-cy={organizationTypes.name}
                  />

                  {organizationTypes.label}
                </Tag>
              ))}
        </FilterInnerWrapperMobile>
      </FilterWrapperMobile>
    )
  );
}

export default React.memo(TagsFilter);
