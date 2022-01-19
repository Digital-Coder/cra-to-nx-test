/** @format */

import styled from "styled-components";

export const Card = styled.div`
  background-color: white;
  width: 95%;
  display: flex;
  position: relative;
  box-shadow: 0 8px 40px -12px rgb(0 0 0 / 0%);

  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
  margin-bottom: 10px;
  height: ${(props) => (props.project ? "13.5em" : "11em")};
  overflow: hidden;
  animation: IdeaCardAnimation 0.8s;

  @keyframes IdeaCardAnimation {
    0% {
      opacity: 0;
      transform: translateY(50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

export const CardContent = styled.div`
  /* color: rgb(87, 87, 87); */
  width: 95%;
  padding: 15px;
  object-fit: cover;
`;

export const EngagementWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  top: 0;
  right: 18px;
  width: 250px;
  z-index: 11;
`;

export const ColorDot = styled.div`
  width: 15px;
  position: relative;
  height: 15px;
  border-radius: 100%;
  border: 0.5px solid white;
  background-color: ${(props) => props.color};
  opacity: 1;
  float: left;
`;

export const DistrictHeader = styled.div`
  float: left;
  height: 25px;
  margin-left: 10px;
  color: ${(props) => props.color};
`;

export const CardTitle = styled.div`
  clear: both;
  position: relative;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const BodyText = styled.p`
  white-space: none;
  position: relative;
  width: 100%;

  overflow: hidden;
  max-height: 4.8em;
  margin-top: 0;
`;

export const ProjectOpenButton = styled.button`
  background-color: #f8f8f8;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  left: 0;
  height: 50px;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  bottom: 0;
  border-radius: 0%;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  z-index: 10;
  color: #353535;
  font-size: 12pt;

  box-shadow: rgb(38, 57, 77, 0) 0px 20px 30px -15px;
  z-index: 99;
`;

export const Gradient = styled.div`
  width: 100%;
  bottom: 0;
  height: 80px;
  position: absolute;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 20%,
    rgba(255, 255, 255, 0) 100%
  );
`;
