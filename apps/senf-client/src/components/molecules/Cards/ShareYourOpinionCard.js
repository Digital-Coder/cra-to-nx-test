/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LoginRegistration from "../../organisms/Auth/LoginRegistration";
import { CustomButton } from "../../atoms/CustomButtons/CustomButton";
import CommentForm from "../../atoms/Forms/CommentForm";

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

  font-family: Futura PT W01 Book;
  line-height: 1.8;
  font-size: 14pt;
  color: #414345;
`;

const ShareYourOpinionCard = ({ screamId, clicked }) => {
  const { t } = useTranslation();
  const authenticated = useSelector((state) => state.user.authenticated);
  return (
    <Card>
      <InnerWrapper>
        {!authenticated && (
          <span>
            {t("dialogScream_what_do_you_think")} <br />
          </span>
        )}
        <span>{t("dialogScream_opinion")}</span>

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
