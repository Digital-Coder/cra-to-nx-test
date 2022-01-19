/** @format */
import React from "react";
import styled, { keyframes } from "styled-components";
import Line from "../../../images/line.png";
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

  width: 100%;
  margin-left: 0%;
  margin-top: ${(props) => props.marginTop};
  padding-bottom: ${(props) => props.marginBottom};
`;
const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Tab = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  height: 100%;
  width: auto;
  padding-right: 15px;
  padding-left: 15px;
  animation: ${enterAnimation} ${(props) => props.i * 0.3}s;

  opacity: ${(props) => (props.active ? "1" : "0.6")};
  pointer-events: all;
`;
const TabText = styled.h2``;

const UnderLine = styled.div`
  height: 2px;
  width: calc(100% - 30px);
  background-color: #353535;
  border-radius: 15px;
  margin-left: 15px;
`;

const ImgWrapper = styled.div`
  opacity: ${(props) => (props.active ? "1" : "0")};
  top: 70%;
  position: absolute;
  width: -webkit-fill-available;
  z-index: 1;
  height: 30px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  animation: ${(props) => (props.active ? "ImgWrapperAnimation 0.5s" : "none")};

  @keyframes ImgWrapperAnimation {
    0% {
      clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    }
    100% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
`;

const Tabs = ({
  loading,
  handleClick,
  order,
  tabLabels,
  marginTop,
  marginBottom,
}) => {
  const tab = tabLabels.map((tabLabel, i) => {
    return (
      !loading && (
        <React.Fragment>
          {tabLabel && (
            <Tab
              i={i + 1}
              active={order === i + 1}
              onClick={() => handleClick(i + 1)}
            >
              <TabText>{tabLabel}</TabText>
              <ImgWrapper active={order === i + 1}>
                <img
                  src={Line}
                  style={{ width: "108% ", marginLeft: "-5%" }}
                  height="20px"
                />
              </ImgWrapper>
            </Tab>
          )}
          {/* {i !== tabLabels.length - 1 && (
            <TabLine i={i + 1.5} lineColor={lineColor} />
          )}{" "} */}
        </React.Fragment>
      )
    );
  });

  return (
    <TabWrapper marginTop={marginTop} marginBottom={marginBottom}>
      <FlexWrapper>{tab}</FlexWrapper>
      {/* <TabLine order={order} /> */}
    </TabWrapper>
  );
};

export default Tabs;
