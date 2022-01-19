/** @format */

import React, { useState } from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import {
  BackgroundDesktop,
  BackgroundMobile,
} from "../Backgrounds/GradientBackgrounds";

const portalRoot = document.getElementById("portal-root-dialog");

const Wrapper = styled.div`
  position: fixed;
  z-index: 1300;
  inset: 0px;

  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;

  /* background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(254, 217, 87, 1) 6%,
    rgba(255, 218, 83, 1) 41%,
    rgba(255, 255, 255, 1) 100%
  ); */
  background-color: #fed957;
  /* background-attachment: fixed;
  background-image: linear-gradient(to bottom, #ffd19b, #ffda53, #ffffff);
  background-repeat: no-repeat;
  background: -webkit-linear-gradient(to left, #ffd19b, #ffda53, #ffffff); */
  animation: mainDialogAnimation 0.2s;
  opacity: 1;
  overflow-y: scroll;

  @keyframes mainDialogAnimation {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }

    50% {
      opacity: 0.1;
      transform: translateY(50%);
    }

    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
`;
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;
const MainDialog = ({ isOpen, setIsOpen, children }) => {
  return ReactDOM.createPortal(
    isOpen && (
      <Wrapper>
        <InnerWrapper>{children}</InnerWrapper>
        <Background
        // onClick={() => setIsOpen(false)}
        />
      </Wrapper>
    ),
    portalRoot
  );
};

export default MainDialog;
