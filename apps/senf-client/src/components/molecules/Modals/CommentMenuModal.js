/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import MainModal from "../../atoms/Layout/MainModal";
import { deleteComment } from "../../../redux/actions/commentActions";

const ButtonWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.standalone ? "100px" : "50px")};
  position: relative;
  z-index: 999;
  overflow: hidden;
  white-space: nowrap;
  background-color: ${(props) =>
    props.warning ? "rgba(232, 144, 126, 0.4)" : "none"};
`;
const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: grey;
  position: relative;
`;
const Headline = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 12pt;
`;

const CommentMenuModal = ({
  setCommentMenuOpen,
  commentId,
  screamId,
  userHandle,
}) => {
  const { authenticated, handle, isAdmin, isModerator } = useSelector(
    (state) => state.user
  );

  const user = useSelector((state) => state.user);
  const [confirmMenu, setConfirmMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const goBack = () => {
    setCommentMenuOpen(true);
    setConfirmMenuOpen(false);
  };

  const openConfirmMenu = () => setConfirmMenuOpen(true);

  const deleteTheComment = () => {
    dispatch(
      deleteComment(commentId, user, screamId, isAdmin, isModerator)
    ).then(() => {
      setCommentMenuOpen(false);
      setConfirmMenuOpen(false);
    });
  };

  const reportComment = () => {
    const thisPath = `/users/${userHandle}/scream/${screamId}`;
    const siteLink = "senf.koeln" + thisPath;

    var link =
      "mailto:dein@senf.koeln" +
      "?subject=" +
      escape("Meldung: Beitrag beinhaltet unangebrachten Kommentar ") +
      "&body=" +
      escape(
        "Dieser Beitrag beinhaltet einen unangebrachten Kommentar:" +
          "\n" +
          "\n" +
          siteLink +
          "\n" +
          "\n" +
          "Kommentar-ID:" +
          "\n" +
          "\n" +
          commentId
      );
    window.location.href = link;
  };
  const { t } = useTranslation();
  return (
    <React.Fragment>
      {!confirmMenu ? (
        <MainModal handleButtonClick={() => setCommentMenuOpen(false)}>
          {authenticated && userHandle === handle && (
            <ButtonWrapper>
              <ExpandButton handleButtonClick={openConfirmMenu}>
                {t("delete_comment")}
              </ExpandButton>
            </ButtonWrapper>
          )}

          {authenticated && (isAdmin === true || isModerator === true) && (
            <ButtonWrapper>
              <ExpandButton handleButtonClick={openConfirmMenu}>
                {t("delete_comment_admin")}
              </ExpandButton>
            </ButtonWrapper>
          )}

          <ButtonWrapper
            standalone={
              (authenticated && userHandle === handle) || isAdmin || isModerator
                ? false
                : true
            }
          >
            <ExpandButton handleButtonClick={reportComment}>
              {t("report")}
            </ExpandButton>
          </ButtonWrapper>
          <Line />
          <ButtonWrapper>
            <ExpandButton handleButtonClick={() => setCommentMenuOpen(false)}>
              {t("cancel")}
            </ExpandButton>
          </ButtonWrapper>
        </MainModal>
      ) : (
        <MainModal handleButtonClick={goBack}>
          <Headline>{t("delete_comment_confirm")}</Headline>

          <Line />
          <ButtonWrapper warning>
            <ExpandButton handleButtonClick={deleteTheComment}>
              {t("delete")}
            </ExpandButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <ExpandButton handleButtonClick={goBack}>
              {t("cancel")}
            </ExpandButton>
          </ButtonWrapper>
        </MainModal>
      )}
    </React.Fragment>
  );
};

export default CommentMenuModal;
