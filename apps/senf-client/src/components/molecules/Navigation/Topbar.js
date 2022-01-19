/** @format */
import React, { useEffect, memo } from "react";
import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { useDispatch, useSelector } from "react-redux";

//REDUX
import {
  openAccountFunc,
  getMyScreams,
} from "../../../redux/actions/accountActions";

//COMPONENTS
import LoginRegistration from "../../organisms/Auth/LoginRegistration";
import InlineInformationPage from "../../organisms/infocomponents/InlineInformationPage";
import ScrollTabs from "../../atoms/Tabs/ScrollTabs";
import { MenuData } from "../../../data/MenuData";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";

//ICONS
import Logo from "../../../images/logo.png";
import profile_yellow from "../../../images/icons/profile_grey.png";
import Noprofile from "../../../images/icons/profile_grey.png";
import ProfileShape from "../../../images/shapes/profileShape.png";

import Info from "../../../images/icons/info_grey.png";
import InsightsIcon from "../../../images/icons/insights_yellow.png";
import Circle_grey from "../../../images/icons/circle_grey.png";

import Header from "../../../images/header.png";
import { StyledH2 } from "../../../styles/GlobalStyle";

const Wrapper = styled.div`
  position: fixed;

  width: 100vw;
  /* height: 7.5em; */

  /* background-color: white;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2); */
  top: ${(props) => (props.moveUp ? "-90px" : "0px")};
  transition: 0.4s;
  z-index: 1;
  /* animation: TopbarEnterAnimation 2s;

  @keyframes TopbarEnterAnimation {
    0% {
      transform: translateY(-100%);
    }
    50% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    } */
  }
`;

const LogoContainer = styled.div`
  position: fixed;
  top: 10px;
  height: 50px;
  width: 150px;
  margin-left: calc(50% - 75px);
  z-index: 99;
  text-align: center;
  background-color: rgb(255, 255, 255, 0.6);
  border-radius: 18px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.8);
`;

const ProfileButtonContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  width: 50px;
  right: 23px;
  top: 23px;
  height: 50px;
  font-size: 0;
  pointer-events: pointer;
  background-color: rgb(255, 255, 255, 0.6);
  border-radius: 100%;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.8);
`;

const CenteredImg = styled.img`
  position: absolute;
`;

const InsightsButtonContainer = styled.div`
  position: absolute;
  z-index: 999;
  width: 30px;
  right: 60px;
  top: 18px;
  height: 30px;
  font-size: 0;
  pointer-events: pointer;
`;

const InlineInfoButtonContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  width: 50px;
  left: 23px;
  top: 23px;
  height: 50px;
  font-size: 0;
  pointer-events: pointer;
  background-color: rgb(255, 255, 255, 0.6);
  border-radius: 100%;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.8);
`;

const Topbar = ({ order, handleClick }) => {
  const loading = useSelector((state) => state.data.loading);
  const user = useSelector((state) => state.user);
  const openScream = useSelector((state) => state.UI.openScream);
  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);
  const openAccount = useSelector((state) => state.UI.openAccount);
  const openOrganization = useSelector((state) => state.UI.openOrganization);
  const swipePosition = useSelector((state) => state.UI.swipePosition);

  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  const openTheAccount = () => {
    dispatch(openAccountFunc(userId));
  };

  useEffect(() => {
    if (userId && openAccount) {
      if (userId) {
        dispatch(getMyScreams(userId));
      }
    }
  }, [openAccount, userId]);
  return (
    !loading &&
    isMobileCustom && (
      <Wrapper
        moveUp={
          openScream ||
          openProjectRoom ||
          openAccount ||
          openOrganization ||
          swipePosition === "top"
        }
      >
        <InlineInfoButtonContainer>
          <InlineInformationPage />
          <img src={Info} width="30" alt="EndImage" />
        </InlineInfoButtonContainer>

        {/* <LogoContainer>
          <img src={Logo} width="100px" alt="logo"></img>
        </LogoContainer> */}

        {/* <InsightsButtonContainer onClick={() => handleClick(4)}>
          <img src={InsightsIcon} width="30" alt="profilePlaceHolderImage" />
        </InsightsButtonContainer> */}

        {!user.authenticated ? (
          <ProfileButtonContainer>
            <LoginRegistration />

            <CenteredImg
              src={Noprofile}
              width="30"
              alt="profilePlaceHolderImage"
            />
          </ProfileButtonContainer>
        ) : (
          <ProfileButtonContainer>
            <ExpandButton
              handleButtonClick={openTheAccount}
              dataCy="profile-button"
            />

            <StyledH2 fontWeight="600" zIndex="9">
              {user?.handle?.slice(0, 1)}
            </StyledH2>
            <CenteredImg src={Circle_grey} width="30" alt="profileImage" />
          </ProfileButtonContainer>
        )}
        {/* <ScrollTabs
          loading={loading}
          handleClick={handleClick}
          order={order}
          tabLabels={MenuData.map((item) => item.text)}
          marginTop={"57px"}
          marginBottom={"0px"}
        ></ScrollTabs> */}
      </Wrapper>
    )
  );
};

export default memo(Topbar);
