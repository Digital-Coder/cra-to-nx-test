import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 1;
  height: 70px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffe898;
  /* box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2); */
`;

const ProgressLine = styled.div`
  height: 10px;
  width: 50%;
  max-width: 400px;
  top: 10px;

  background-color: #fed957;
  border-radius: 10px;
  position: relative;
`;
const CurrentStep = styled.div`
  height: 100%;

  width: ${(props) => props.index && `${props.index}%`};
  transition: 1s;
  border-radius: 5px;
  background-color: white;
`;

export const Title = styled.h4`
  height: 30px;
  position: relative;
  text-align: center;
  width: 100%;
  top: 20px;
`;

const TopNavigation = ({ index, title }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <ProgressLine>
        <CurrentStep index={index} />
      </ProgressLine>
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default TopNavigation;
