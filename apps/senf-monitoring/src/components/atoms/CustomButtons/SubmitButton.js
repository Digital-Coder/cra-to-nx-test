/** @format */
import React from "react";
import styled, { css, keyframes } from "styled-components";
import { CircularProgress } from "@material-ui/core";

const enterAnimation = keyframes`
       0% {
  opacity: 0;
  transform: translateY(10%) translateX(-50%);
}
50% {
  opacity: 0;
  transform: translateY(10%) translateX(-50%);
}

100% {
  opacity: 0.6;
  transform: translateY(0%) translateX(-50%); 
}
    `;

const WideButton = styled.button`
  border-radius: 30px;
  text-transform: none;
  white-space: nowrap;
  font-size: 14pt;
  height: ${(props) => (props.smallSubmitButton ? "40px" : "50px")};
  font-family: Futura PT W01 Book;
  box-shadow: rgb(38, 57, 77, 0.7) 0px 20px 30px -15px;
  padding-left: ${(props) => (props.smallSubmitButton ? "12px" : "30px")};
  padding-right: ${(props) => (props.smallSubmitButton ? "12px" : "30px")};
  min-width: ${(props) => (props.smallSubmitButton ? "70px" : "180px")};
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-50%);
  cursor: pointer;

  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : "50%")};

  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  bottom: ${(props) => props.bottom && props.bottom};
  left: ${(props) => props.left && props.left};
  top: ${(props) => props.top && props.top};

  position: ${(props) => props.position};
  z-index: ${(props) => props.zIndex};
  animation: ${(props) =>
    props.animation &&
    css`
      ${enterAnimation} 2s
    `};
`;

const LoaderWrapper = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const SubmitButton = ({
  text,
  backgroundColor,
  textColor,
  position,
  bottom,
  top,
  marginLeft,
  left,
  zIndex,
  animation,
  loading,
  disabled,

  handleButtonClick,
  smallSubmitButton,
  keySubmitRef,
}) => {
  return (
    <WideButton
      type="submit"
      backgroundColor={backgroundColor}
      textColor={textColor}
      position={position}
      bottom={bottom}
      left={left}
      top={top}
      marginLeft={marginLeft}
      zIndex={zIndex}
      animation={animation}
      disabled={disabled}
      onClick={handleButtonClick}
      smallSubmitButton={smallSubmitButton}
      ref={keySubmitRef}
    >
      {text}
      {loading && (
        <LoaderWrapper>
          <CircularProgress size={30} />{" "}
        </LoaderWrapper>
      )}
    </WideButton>
  );
};
