/** @format */

import React, { useState, useEffect } from "react";

import Celebrate from "../../../images/celebrateImage.png";
import Thx from "../../../images/headlines/thx.png";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255, 0.1);
  background-image: linear-gradient(
    to bottom,
    rgba(255, 209, 155, 0.9),
    rgba(255, 218, 83, 0.9),
    #ffffff
  );
  background-repeat: no-repeat;
  z-index: 99999;
  display: flex;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  opacity: 1;

  max-width: 600px;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: Wishanimation 2s ease-in-out;

  @keyframes Wishanimation {
    0% {
      opacity: 0;
      transform: translateY(7%);
    }

    40% {
      opacity: 1;
      transform: translateY(0%);
    }

    60% {
      opacity: 1;
      transform: translateY(0%);
    }

    100% {
      opacity: 0;
      transform: translateY(-10%);
    }
  }
`;

const ThanksForTheVote = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <img src={Thx} width="70%" alt="ThankYouNote" />

        {/* <i> Danke für deine Stimme</i> */}
      </InnerWrapper>
      <img src={Celebrate} className="Celebrate" alt="EndImage" />
    </Wrapper>
  );
};

export default ThanksForTheVote;
