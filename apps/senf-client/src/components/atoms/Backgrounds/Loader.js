/** @format */

import React from "react";
import styled from "styled-components";
//ICONS
import lamploader from "../../../images/lamp.png";
import Logo from "../../../images/AddPlease.png";
import { Background } from "./GradientBackgrounds";

const Wrapper = styled.div`
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  height: 100%;
  width: ${(props) => (props.width ? props.width : "100%")};
  top: 0;
  left: ${(props) => (props.left ? props.left : 0)};
  position: fixed;

  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(254, 217, 87, 1) 6%,
    rgba(255, 218, 83, 1) 41%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const LoaderImg = styled.img`
  z-index: 999;
  margin-top: -5vh;
  width: 150px;
  transform: scale(1);
  animation: lampAnimation 10s ease-in-out infinite;

  @keyframes lampAnimation {
    0% {
      transform: scale(1);
    }

    10% {
      transform: scale(1.3);
    }

    20% {
      transform: scale(1);
    }

    30% {
      transform: scale(1.3);
    }

    40% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.3);
    }

    60% {
      transform: scale(1);
    }

    70% {
      transform: scale(1.3);
    }

    80% {
      transform: scale(1);
    }

    90% {
      transform: scale(1.3);
    }

    100% {
      transform: scale(1);
    }
  }
`;
const Loader = ({ left, width }) => {
  return (
    <Wrapper left={left} width={width}>
      <LoaderImg src={lamploader} alt="loader-icon" />
    </Wrapper>
  );
};

export default Loader;
