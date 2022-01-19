import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

const ButtonsWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0;
  z-index: 9999;
  height: 70px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffe898;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2);
`;

const Navigation = ({
  nextLabel,
  prevLabel,
  handleNext,
  handlePrev,
  disabled,
  loading,
  color,
  backgroundColor,
}) => {
  const { t } = useTranslation();
  return (
    <ButtonsWrapper>
      {prevLabel && (
        <SubmitButton
          text={prevLabel}
          zIndex="9"
          backgroundColor="transparent"
          shadow={false}
          textColor="#353535"
          left="0"
          transformX="none"
          marginLeft="0"
          handleButtonClick={handlePrev}
          //   keySubmitRef={keySubmitRef}
        />
      )}
      {nextLabel && (
        <SubmitButton
          text={nextLabel}
          zIndex="9"
          backgroundColor="white"
          textColor="#353535"
          left="0"
          transformX="none"
          handleButtonClick={handleNext}
          disabled={disabled}
          loading={loading}
          marginLeft="0"
          //   keySubmitRef={keySubmitRef}
        />
      )}
    </ButtonsWrapper>
  );
};

export default Navigation;
