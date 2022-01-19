/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import FinishedCreating from "../../../atoms/Backgrounds/FinishedCreating";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";
import { Title } from "../styles/sharedStyles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FinishedCreatingOrganization = ({ setCreateOrganizationIsOpen, set }) => {
  const { t } = useTranslation();

  const handleFinish = () => {
    set(1);
    setCreateOrganizationIsOpen(false);
  };
  return (
    <FinishedCreating setCreateOrganizationIsOpen={setCreateOrganizationIsOpen}>
      <Wrapper>
        <Title> Super, deine Organisation ist jetzt öffentlich</Title>
        <SubmitButton
          text={t("schließen")}
          zIndex="9"
          backgroundColor="white"
          textColor="#353535"
          transformX="none"
          marginLeft="0"
          position="relative"
          top={document.body.clientWidth > 768 ? "100px" : "70px"}
          handleButtonClick={handleFinish}
          // disabled={!formikCreateProjectStore.isValid}
          // keySubmitRef={keySubmitRef}
        />
      </Wrapper>
    </FinishedCreating>
  );
};

export default FinishedCreatingOrganization;
