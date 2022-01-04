/** @format */

import styled from "styled-components";

export const FixedWrapper = styled.div`
  z-index: 91;
  position: fixed;
  width: 95%;

  height: 80px;
  background-color: white;
  top: ${(props) => (props.moveUp ? "-90px" : "10px")};
  left: 2.5%;
  border-radius: 20px 20px;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2);
  animation: downAnimation 1.7s ease-in-out;

  @media (min-width: 768px) {
    left: 210px;
    width: 380px;
    animation: none;
  }

  @keyframes downAnimation {
    0% {
      transform: translateY(-100%);
    }
    50% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    }
  }
`;

export const FlexWrapper = styled.div`
  position: relative;
  width: 97.5%;
  height: 50px;
  top: 0px;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ImgWrapperMobile = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.8);
`;

export const TitleWrapper = styled.div`
  font-size: 18px;
  font-family: PlayfairDisplay-Bold;
  color: #353535;
  text-align: center;
  width: 73%;
  margin-top: 15px;
  margin-bottom: 20px;
  max-width: 290px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
