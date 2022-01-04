/** @format */
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const enterAnimation = keyframes`
    0% {
      opacity: 0;
      transform: translateY(10%);
    }
    50% {
      opacity: 0;
      transform: translateY(10%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
`;

const TabWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-left: 0%;
  margin-top: ${(props) => props.marginTop};
  padding-bottom: ${(props) => props.marginBottom};
  overflow: hidden;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Tab = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  height: 100%;
  display: inline-flex;
  white-space: nowrap;
  padding-right: 10px;
  padding-left: 10px;
  animation: ${enterAnimation} ${(props) => props.i * 0.8}s;
  font-size: 18px;
  color: rgb(87, 87, 87);
  font-family: ${(props) =>
    props.active ? "Futura PT W01-Bold" : "Futura PT W01 Book;"};
`;

const TabGradientStart = styled.div`
  position: fixed;
  left: 0;
  height: 30px;
  width: 60px;
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 53%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const TabGradientEnd = styled.div`
  position: fixed;
  right: 0;
  height: 30px;
  width: 60px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 53%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const ScrollPadding = styled.div`
  padding: 5px;
  display: block;
  pointer-events: none;
`;

const ScrollTabs = ({
  loading,
  handleClick,
  order,
  tabLabels,
  marginTop,
  marginBottom,
}) => {
  const [start, setStart] = useState(true);
  const [end, setEnd] = useState(false);

  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollLeft + element.clientWidth >= element.scrollWidth - 4) {
      setEnd(true);
    } else if (element.scrollLeft <= 4) {
      setStart(true);
    } else {
      setStart(false);
      setEnd(false);
    }
  };

  return (
    <TabWrapper
      marginTop={marginTop}
      marginBottom={marginBottom}
      onScroll={handleScroll}
    >
      {!start && <TabGradientStart />}
      <ScrollPadding />
      {tabLabels.map((tabLabel, i) => {
        return (
          !loading && (
            <React.Fragment>
              <Tab
                i={i + 1}
                active={order === i + 1}
                onClick={() => handleClick(i + 1)}
              >
                {tabLabel}
              </Tab>
            </React.Fragment>
          )
        );
      })}
      <ScrollPadding />
      {!end && <TabGradientEnd />}
    </TabWrapper>
  );
};

export default ScrollTabs;
