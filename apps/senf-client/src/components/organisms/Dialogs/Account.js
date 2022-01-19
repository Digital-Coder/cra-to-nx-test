/** @format */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
import { closeAccountFunc } from "../../../redux/actions/accountActions";

//Components
import SwipeList from "../SwipeLists/SwipeList";
import Header from "../../molecules/Headers/Header";
import AccountSettings from "../../molecules/DialogInlineComponents/AccountSettings";
import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";

import _ from "lodash";
import { AccountTabData } from "../../../data/AccountTabData";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  @media (min-width: 768px) {
    padding-top: 70px;
  }
`;
const Break = styled.div`
  position: relative;
  height: 110px;
  width: 100%;

  @media (min-width: 768px) {
    height: 30px;
  }
`;

const MapHider = styled.div`
  width: calc(100% - 600px);
  height: 100%;
  position: fixed;
  top: 0;
  left: 600px;
  background-color: #000;
  opacity: 0.6;
  z-index: 9;
`;

const Account = ({ dataFinalMap }) => {
  const { t } = useTranslation();
  const loadingMyScreams = useSelector((state) => state.data.loadingMyScreams);
  const mapViewport = useSelector((state) => state.data.mapViewport);
  const mapBounds = useSelector((state) => state.data.mapBounds);
  const selectedTopics = useSelector((state) => state.data.topics);
  const myScreams = useSelector((state) => state.data.myScreams);
  // const user = useSelector((state) => state.user);

  const [dropdown, setDropdown] = useState("newest");
  const [order, setOrder] = useState(1);
  const dispatch = useDispatch();

  const handleClose = () => {
    window.history.pushState(null, null, `/`);
    dispatch(closeAccountFunc());
    dispatch(handleTopicSelectorRedux("all"));
  };

  const handleClick = (order) => {
    setOrder(order);
  };

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const screamsSearched = myScreams?.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.Stadtteil?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.Stadtbezirk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.locationHeader?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return val;
    }
  });

  const sortedScreams =
    dropdown === "newest"
      ? _.orderBy(screamsSearched, "createdAt", "desc")
      : _.orderBy(screamsSearched, "likeCount", "desc");

  const dataFinal = sortedScreams
    ? sortedScreams.filter(
        ({ Thema, status, lat, long }) =>
          selectedTopics.includes(Thema) &&
          lat <= mapBounds?.latitude1 &&
          lat >= mapBounds?.latitude2 &&
          long >= mapBounds?.longitude2 &&
          long <= mapBounds?.longitude3 &&
          status === "None"
      )
    : [];

  return (
    <React.Fragment>
      <Header
        type="account"
        loading={loadingMyScreams}
        order={order}
        handleClose={handleClose}
        handleClick={handleClick}
      />
      {!isMobileCustom && order === 0 && <MapHider />}

      <Wrapper>
        {!isMobileCustom || (isMobileCustom && order !== 1 && <Background />)}
        {order === 1 && (
          <SwipeList
            swipeListType="ideas"
            type="myIdeas"
            tabLabels={AccountTabData.map((item) => item.text).slice(0, 1)}
            loading={loadingMyScreams}
            order={order}
            dataFinal={dataFinal}
            dataFinalLength={dataFinal.length}
            viewport={mapViewport}
            handleDropdown={handleDropdown}
            dropdown={dropdown}
            dataFinalMap={dataFinalMap}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />
        )}

        {order === 0 && (
          <div
            style={{
              overflow: "scroll",
              height: "100vh",
              pointerEvents: "all",
            }}
          >
            <SubmitButton
              text={t("showIdeas")}
              zIndex="9"
              backgroundColor={isMobileCustom ? "#353535" : "white"}
              textColor={isMobileCustom ? "white" : "#353535"}
              position="fixed"
              bottom={isMobileCustom ? "10px" : "50%"}
              left={isMobileCustom ? "0" : "calc(600px + ((100% - 600px)/2)) "}
              marginLeft={isMobileCustom ? "50%" : "0"}
              handleButtonClick={() => handleClick(1)}
            />
            <Break />
            <MainAnimations
              transition="0.5s"
              display="block"
              paddingBottom="2em"
              height="100%"
            >
              <AccountSettings />
            </MainAnimations>
          </div>
        )}
      </Wrapper>
    </React.Fragment>
  );
};

export default Account;
