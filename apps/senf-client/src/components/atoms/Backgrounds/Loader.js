/** @format */

import React from "react";
import styled from "styled-components";
//ICONS
import lamploader from "../../../images/lamp.png";
import Logo from "../../../images/AddPlease.png";

const Wrapper = styled.div`
  z-index: 99;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: transparent;

  background-attachment: fixed;
  background-image: linear-gradient(to bottom, #ffd19b, #ffda53, #ffffff);
  background-repeat: no-repeat;
  background: -webkit-linear-gradient(to left, #ffd19b, #ffda53, #ffffff);

  /* background-color: #e9e9e9;
  opacity: 1;
  background-image: linear-gradient(white 2.6px, transparent 2.6px),
    linear-gradient(90deg, white 2.6px, transparent 2.6px),
    linear-gradient(white 1.3px, transparent 1.3px),
    linear-gradient(90deg, white 1.3px, #f8f8f8 1.3px);
  background-size: 65px 65px, 65px 65px, 13px 13px, 13px 13px;
  background-position: -2.6px -2.6px, -2.6px -2.6px, -1.3px -1.3px,
    -1.3px -1.3px; */
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;

  @media (min-width: 768px) {
    position: fixed;
    width: 400px;
    height: 100vh;
    top: 0;
  }
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
const Loader = () => {
  return (
    <Wrapper>
      <LoaderImg src={lamploader} alt="loader-icon" />

      {/* <div
        style={{
          width: "100%",
          height: "120px",
          backgroundColor: "#fed947",
          bottom: 0,
          position: "fixed",
          borderRadius: "20px 20px 0 0px",
        }}
      /> */}

      {/* <img src={lamploader} className="lamploader" alt="loader-icon" /> */}
    </Wrapper>
  );
};

export default Loader;
