/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import CustomSelect from "../../atoms/Selects/CustomSelect";
import { OptionsProjects } from "../../../data/OptionsProjects";
import styled from "styled-components";
import { StyledH3, StyledH4 } from "../../../styles/GlobalStyle";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import LocationIcon from "../../../images/icons/location.png";
import { truncateString } from "../../../hooks/truncateString";

const Wrapper = styled.div`
  height: 130px;
  width: 95%;
  margin-left: 2.5%;
  background-color: #f8f8f8;
  border-radius: 20px;
  box-shadow: 0 8px 30px -12px rgba(0, 0, 0, 0.5);

  @media (min-width: 768px) {
    position: fixed;
    width: 380px;
    margin-left: 210px;
    top: 40px;
    z-index: 5;
    animation: enteranimation 0.5s;
  }
`;
const HideDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000000;
  position: absolute;
  z-index: 99999;
  opacity: 0.6;
  border-radius: 19px;
  display: ${(props) => (props.show ? "block" : "none")};
`;
const ProjectSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  margin-left: 5%;
  margin-right: 5%;
  position: relative;
  top: 0;
  border-bottom: 1px solid #353535;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const PostScreamSelectContainter = ({
  classes,
  locationDecided,
  handleLocationDecided,
  handleLocationDecidedNoLocation,
  projectSelected,
  address,
  handleDropdownProject,
}) => {
  const { t } = useTranslation();

  return (
    <Wrapper
      style={
        !isMobileCustom && locationDecided
          ? { zIndex: 1 }
          : !isMobileCustom && !locationDecided
          ? { zIndex: 5 }
          : isMobileCustom && locationDecided
          ? {
              position: "fixed",
              bottom: "calc(90vh - 50px)",
              display: "none",
              zIndex: 999,
            }
          : {
              position: "fixed",
              bottom: "20px",
              display: "block",
              zIndex: 999,
            }
      }
    >
      {!isMobileCustom && (
        <HideDiv
          onClick={handleLocationDecided}
          show={locationDecided ? true : false}
        />
      )}
      <ProjectSelectWrapper>
        <StyledH3> {t("to")} </StyledH3>

        <CustomSelect
          name={"project"}
          value={projectSelected}
          initialValue={"Allgemein (Alle Ideen)"}
          options={OptionsProjects()}
          handleDropdown={handleDropdownProject}
        />
      </ProjectSelectWrapper>
      <FlexWrapper>
        <img src={LocationIcon} width="20px" style={{ paddingRight: "5px" }} />
        <StyledH4 style={{ width: "130px" }}>
          {address ? truncateString(address, 30) : t("Ort festlegen")}
        </StyledH4>
        <SubmitButton
          text={t("confirmLocation")}
          zIndex="999"
          backgroundColor="#fed957"
          textColor="#353535"
          handleButtonClick={handleLocationDecided}
          shadow={false}
          marginLeft="auto"
          transformX="none"
          disabled={!address}
        />
      </FlexWrapper>
    </Wrapper>
  );
};

export default PostScreamSelectContainter;
