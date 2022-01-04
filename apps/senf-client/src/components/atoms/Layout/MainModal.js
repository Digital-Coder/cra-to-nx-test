/** @format */

import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;

  z-index: ${(props) => (props.zIndex ? props.zIndex : 998)};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Background = styled.div`
  position: fixed;
  z-index: 991;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.6);
`;

const InnerWrapper = styled.div`
  width: 400px;
  max-width: 95%;
  min-height: 150px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: space-around;

  z-index: 99992;
  overflow: hidden;
`;

const MainModal = ({ handleButtonClick, children, zIndex }) => {
  return (
    <Wrapper zIndex={zIndex}>
      <InnerWrapper>{children}</InnerWrapper>
      <Background onClick={handleButtonClick} />
    </Wrapper>
  );
};

export default MainModal;
