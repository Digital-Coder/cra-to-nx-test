/** @format */
import React from "react";
import styled, { css, keyframes } from "styled-components";
//import { CircularProgress } from "@material-ui/core";
import ContactIcon from "../../../images/icons/mail.png";
import WeblinkIcon from "../../../images/icons/weblink.png";

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

const plopAnimation = keyframes`
  0% {
      opacity: 0;
      transform: scale(0.7) translateX(-50%);
    }

    80% {
      opacity: 0;
      transform: scale(0.7) translateX(-50%);
    }

    90% {
      opacity: 1;
      transform: scale(1.1) translateX(-50%);
    }

    100% {
      opacity: 1;
      transform: scale(1) translateX(-50%);
    }
`;

const WideButton = styled.button`
  border-radius: 30px;
  text-transform: none;
  white-space: nowrap;
  height: ${(props) => (props.small ? "35px" : "50px")};
  font-size: ${(props) => props.small && "15px"};
  box-shadow: ${(props) =>
    props.shadow === false ? "" : "rgb(38, 57, 77, 0.7) 0px 20px 30px -15px;"};
  padding-left: ${(props) => (props.small ? "15px" : "30px")};
  padding-right: ${(props) => (props.small ? "15px" : "30px")};
  min-width: ${(props) => (props.small ? "70px" : "180px")};
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${(props) =>
    props.transformX ? props.transformX : "translateX(-50%)"};
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
    props.animation === true
      ? css`
          ${enterAnimation} 2s
        `
      : props.animation === "plop" &&
        css`
          ${plopAnimation} 2s
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

const Icons = {
  Contact: ContactIcon,
  Weblink: WeblinkIcon,
};
export const SubmitButton = ({
  text,
  backgroundColor,
  textColor,
  position,
  bottom,
  top,
  marginLeft,
  transformX,
  left,
  zIndex,
  animation,
  loading,
  disabled,
  shadow,

  handleButtonClick,
  small,
  keySubmitRef,

  iconRight,
  name,
  iconWidth,
}) => {
  const Icon = Icons[name];

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
      transformX={transformX}
      zIndex={zIndex}
      animation={animation}
      disabled={disabled}
      onClick={handleButtonClick}
      small={small}
      ref={keySubmitRef}
      shadow={shadow}
    >
      {text}
      {iconRight && (
        <img
          src={Icon}
          width={iconWidth ? iconWidth : "20px"}
          alt="icon"
          style={{ paddingLeft: "10px" }}
        />
      )}

      {loading && (
        <LoaderWrapper>
          {/*  <CircularProgress size={30} />{" "} */}
        </LoaderWrapper>
      )}
    </WideButton>
  );
};
export default SubmitButton;
