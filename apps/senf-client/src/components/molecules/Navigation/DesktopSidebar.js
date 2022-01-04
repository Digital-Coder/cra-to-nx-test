/** @format */

import React, { useEffect, memo } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";

import {
  openAccountFunc,
  getMyScreams,
} from "../../../redux/actions/accountActions";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";
//Components
import RegistrationAndLogin from "../../organisms/Auth/LoginRegistration";
import InlineInformationPageDesktop from "../../organisms/infocomponents/InlineInformationPageDesktop";
import SelectLanguageButton from "../../atoms/CustomButtons/SelectLanguageButton";
import TopicFilter from "../Filters/TopicFilter";
import { MenuItem } from "./MenuItem";
import { MenuData } from "../../../data/MenuData";

//ICONS
import LogoImg from "../../../images/logo.png";
import Insta from "../../../images/icons/socialmedia/insta.png";
import Facebook from "../../../images/icons/socialmedia/facebook.png";
import profile_yellow from "../../../images/icons/profile_yellow.png";
import profile_grey from "../../../images/icons/profile_grey.png";
import Noprofile from "../../../images/noprofile.png";
import PostScream from "../../organisms/PostIdea/PostScream";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import { closeScream } from "../../../redux/actions/screamActions";
import { closeProject } from "../../../redux/actions/projectActions";
import { Logo, Tabs } from "./styles/sharedStyles";
import { CustomButton } from "../../atoms/CustomButtons/CustomButton";
import styled from "styled-components";

const DesktopSidebar = ({ order, handleClick, setChangeLocationModalOpen }) => {
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openAccount = useSelector((state) => state.UI.openAccount);
  const projects = useSelector((state) => state.data.projects);
  const loadingProjects = useSelector((state) => state.data.loadingProjects);

  const authenticated = useSelector((state) => state.user.authenticated);
  const userId = useSelector((state) => state.user.userId);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const openTheAccount = () => {
    dispatch(openAccountFunc(userId));

    dispatch(closeScream());
    dispatch(closeProject());

    dispatch(handleTopicSelectorRedux("all"));
  };
  useEffect(() => {
    if (userId && openAccount) {
      if (userId) {
        dispatch(getMyScreams(userId));
      }
    }
  }, [openAccount, userId]);

  return (
    !isMobileCustom && (
      <div className={openInfoPage ? "sideBar_hide" : "sideBar"}>
        <Logo>
          <img src={LogoImg} width="100px" alt="logoWeb"></img>
        </Logo>
        <SelectLanguageButton />
        <InlineInformationPageDesktop />
        {!authenticated ? (
          <Tabs>
            <RegistrationAndLogin />
            <img
              src={Noprofile}
              width="35"
              alt="EndImage"
              style={{ paddingRight: "10px" }}
            />
            {t("login")}
          </Tabs>
        ) : (
          <Tabs>
            <ExpandButton
              handleButtonClick={openTheAccount}
              dataCy="profile-button"
            />
            <img
              src={openAccount ? profile_grey : profile_yellow}
              width="35"
              alt="EndImage"
              style={{ paddingRight: "10px" }}
            />
            {t("profile")}
          </Tabs>
        )}
        <PostScream loadingProjects={loadingProjects} projectsData={projects} />
        {MenuData.map((item, i) => (
          <MenuItem
            key={i}
            order={order}
            index={i + 1}
            isSelectedIcon={item.isSelectedIcon}
            isNotSelectedIcon={item.isNotSelectedIcon}
            text={item.text}
            handleClick={handleClick}
            openAccount={openAccount}
          ></MenuItem>
        ))}
        <div
          style={{
            position: "relative",
            left: "20px",
            width: "160px",
            height: "1px",
            backgroundColor: "lightgrey",
            top: "90px",
            marginBottom: "30px",
          }}
        ></div>
        <TopicFilter column />
        <div
          style={{
            position: "relative",
            left: "20px",
            width: "160px",
            height: "100px",
          }}
        ></div>{" "}
        {process.env.REACT_APP_INTERNATIONAL &&
          process.env.REACT_APP_INTERNATIONAL === "true" && (
            <CustomButton handleButtonClick={setChangeLocationModalOpen}>
              Standort ändern
            </CustomButton>
          )}
        <a
          href="https://www.facebook.com/senf.koeln/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div
            className="facebook"
            style={openInfoPage ? { left: "-200px" } : null}
          >
            <img src={Facebook} width="25" alt="EndImage" />
          </div>
        </a>
        <a
          href="https://www.instagram.com/senf.koeln/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div
            className="insta"
            style={openInfoPage ? { left: "-200px" } : null}
          >
            <img src={Insta} width="25" alt="EndImage" />
          </div>{" "}
        </a>
      </div>
    )
  );
};

export default memo(DesktopSidebar);
