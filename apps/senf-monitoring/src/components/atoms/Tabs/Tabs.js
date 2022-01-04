/** @format */
import React from "react";
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
  justify-content: center;
  width: 100%;
  margin-left: 0%;
  margin-top: ${(props) => props.marginTop};
  padding-bottom: ${(props) => props.marginBottom};
`;

const Tab = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  height: 100%;
  width: auto;
  padding-right: 15px;
  padding-left: 15px;
  animation: ${enterAnimation} ${(props) => props.i * 0.3}s;
  font-size: 18px;
  color: rgb(87, 87, 87);
  font-family: ${(props) =>
    props.active ? "Futura PT W01-Bold" : "Futura PT W01 Book;"};
`;

// const TabLine = styled.div`
//   margin-top: 3px;
//   height: 20px;
//   width: 2px;
//   background-color: ${(props) => props.lineColor};
//   animation: ${enterAnimation} ${(props) => props.i * 0.8}s;
// `;

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
          <Tab
            i={i + 1}
            active={order === i + 1}
            onClick={() => handleClick(i + 1)}
          >
            {tabLabel}{" "}
          </Tab>{" "}
          {/* {i !== tabLabels.length - 1 && (
            <TabLine i={i + 1.5} lineColor={lineColor} />
          )}{" "} */}
        </React.Fragment>
      )
    );
  });

  return (
    <TabWrapper marginTop={marginTop} marginBottom={marginBottom}>
      {tab}
    </TabWrapper>
  );
};

export default Tabs;
