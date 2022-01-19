/** @format */

import styled from "styled-components";
import { animated } from "@react-spring/web";

export const PageWrapper = styled(animated.div)`
  top: 70px;
  width: 100vw;
  height: calc(100vh - 140px);
  position: fixed;
  overflow: scroll;
`;
export const ComponentWrapper = styled.div`
  height: calc(100% - 70px);
  width: 100vw;
  top: 70px;

  @media (min-width: 768px) {
    max-width: 600px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
`;

export const ComponentInnerWrapper = styled.div`
  height: 100%;

  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
`;

export const SubTitle = styled.h3`
  width: 80%;
  margin: auto;

  align-self: center;
  margin-bottom: 30px;
  margin-top: 10px;
`;

export const Title = styled.h2`
  font-size: 22px;
  align-self: center;
  margin-top: 10px;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

export const ButtonsWrapper = styled.div`
  margin-top: 30px;
`;
