/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LoginRegistration from "../../organisms/Auth/LoginRegistration";
import { CustomButton } from "../../atoms/CustomButtons/CustomButton";
import CommentForm from "../../atoms/Forms/CommentForm";
import { StyledH2 } from "../../../styles/GlobalStyle";

const Card = styled.div`
  display: flex;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  border-radius: 20px;
  min-height: auto;
  position: relative;
`;

const InnerWrapper = styled.div`
  width: 95%;
  margin-top: 20px;
  text-align: center;
  margin-left: 2.5%;
  padding-bottom: 25px;
`;

const ShareYourOpinionCard = ({ screamId, clicked }) => {
  const { t } = useTranslation();
  const authenticated = useSelector((state) => state.user.authenticated);
  return (
    <Card>
      <InnerWrapper>
        {!authenticated && (
          <StyledH2 fontWeight="900">
            {t("dialogScream_what_do_you_think")} <br />
          </StyledH2>
        )}
        <StyledH2 fontWeight="900">{t("dialogScream_opinion")}</StyledH2>

        {!authenticated ? (
          <CustomButton
            text={t("login2")}
            backgroundColor="#353535"
            textColor="white"
            position="relative"
            top="10px"
            zIndex="0"
          >
            <LoginRegistration />
          </CustomButton>
        ) : (
          <CommentForm screamId={screamId} clicked={clicked} />
        )}
      </InnerWrapper>
    </Card>
  );
};

export default ShareYourOpinionCard;
