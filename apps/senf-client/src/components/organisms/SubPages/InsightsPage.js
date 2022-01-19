/** @format */

import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
//Components
import Keyindicators from "../../molecules/graphs/Keyindicators";
import ThemenDialog from "../../molecules/graphs/themendialog";
import DistrictsDialog from "../../molecules/graphs/DistrictsDialog";
import AgegroupDialog from "../../molecules/graphs/AgegroupDialog";

//Images
import Themencover from "../../../images/insightsCovers/topic-cover.jpg";
import DistrictsCover from "../../../images/insightsCovers/districts-cover.jpg";
import KeywordsCover from "../../../images/insightsCovers/keywords-cover.jpg";
import AgegroupsCover from "../../../images/insightsCovers/agegroups-cover.jpg";

import firebase from "firebase/app";
import "firebase/firestore";
import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import { Wrapper } from "./styles/sharedStyles";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { StyledH2 } from "../../../styles/GlobalStyle";
import Tabs from "../../atoms/Tabs/Tabs";
import { MenuData } from "../../../data/MenuData";

const CoverWrapper = styled.div`
  margin-left: 2.5%;
  width: 95%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px 10px;
  grid-template-areas:
    ". ."
    ". .";
`;
const Covers = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9;
  float: left;
  position: relative;
  animation: ${(props) => props.animation};
  overflow: hidden;
  border-radius: 25px;
  background-color: white;
  margin: 0;
  padding: 0;
`;
const CoverImg = styled.img`
  width: 100%;
  height: 100%;
`;
const CoverTitle = styled.div`
  width: 100%;
  position: absolute;
  top: 30px;
`;

const InsightsPage = ({ handleClick }) => {
  const { t } = useTranslation();
  const db = firebase.firestore();

  const [screams, setScreams] = useState("");
  const [likes, setLikes] = useState("");
  const [likesLength, setLikesLength] = useState("");
  const [commentsLength, setCommentsLength] = useState("");

  //const mapViewport = useSelector((state) => state.data.mapViewport);
  const fetchDataScreams = async () => {
    const ref = await db
      .collection("screams")
      /*   .where("lat", "<", Number(mapViewport.latitude) + 1)
      .where("lat", ">", Number(mapViewport.latitude) - 1) */

      .get();

    const screams = [];
    ref.docs.forEach((doc) => {
      const docData = {
        likeCount: doc.data().likeCount,
        Thema: doc.data().Thema,
        Stadtteil: doc.data().Stadtteil,
        age: doc.data().age,
      };
      screams.push(docData);
    });

    setScreams(screams);
  };

  const fetchDataLikes = async () => {
    const ref = await db.collection("likes").orderBy("createdAt", "desc").get();
    const likesLength = ref.size;
    setLikesLength(likesLength);

    const likes = [];
    ref.docs.forEach((doc) => {
      const docData = {
        age: doc.data().age,
        Thema: doc.data().Thema,
      };
      likes.push(docData);
    });
    setLikes(likes);
  };

  const fetchDataComments = async () => {
    const ref = await db
      .collection("comments")
      .orderBy("createdAt", "desc")
      .get();
    const commentsLength = ref.size;
    setCommentsLength(commentsLength);
  };

  useEffect(() => {
    fetchDataScreams();
    fetchDataLikes();
    fetchDataComments();
  }, []);

  const handleLink = () => {
    window.open("https://wiki.agorakoeln.de/", "_blank");
  };
  return (
    <Wrapper>
      {isMobileCustom && (
        <CustomIconButton
          name="ArrowLeft"
          position="relative"
          margin="10px"
          backgroundColor="#FFF0BC"
          handleButtonClick={() => handleClick(2)}
        />
      )}

      <Tabs
        loading={false}
        handleClick={handleClick}
        order={1}
        tabLabels={MenuData.map((item) => item.text).slice(3, 4)}
        marginTop={"20px"}
        marginBottom={"0px"}
      />
      <MainAnimations transition="0.5s" display="block" paddingBottom="2em">
        <Keyindicators
          screams={screams}
          likesLength={likesLength}
          commentslength={commentsLength}
        />
        <CoverWrapper>
          <Covers animation="coverAnimation 0.5s ease-in-out">
            <CoverTitle>
              <StyledH2 fontWeight="900" textAlign="center">
                {t("topics")}
              </StyledH2>
            </CoverTitle>
            <CoverImg src={Themencover} alt="insights-topic-cover" />
            <ThemenDialog screams={screams} />
          </Covers>

          <Covers animation="coverAnimation 0.75s ease-in-out">
            <CoverTitle>
              <StyledH2 fontWeight="900" textAlign="center">
                {t("districts")}
              </StyledH2>
            </CoverTitle>
            <CoverImg src={DistrictsCover} alt="insights-districts-cover" />
            <DistrictsDialog screams={screams} />
          </Covers>

          <Covers animation="coverAnimation 1.25s ease-in-out">
            <CoverTitle>
              <StyledH2 fontWeight="900" textAlign="center">
                {t("agegroups")}
              </StyledH2>
            </CoverTitle>
            <CoverImg src={AgegroupsCover} alt="insights-agegroups-cover" />
            <AgegroupDialog screams={screams} likes={likes} />
          </Covers>
          <Covers animation="coverAnimation 1s ease-in-out">
            <CoverTitle>
              <StyledH2 fontWeight="900" textAlign="center">
                {t("toolbox")}
              </StyledH2>
            </CoverTitle>
            <CoverImg src={KeywordsCover} alt="insights-keywords-cover" />
            <ExpandButton handleButtonClick={() => handleLink()} />
            {/* <WordcloudDialog /> */}
          </Covers>
        </CoverWrapper>
      </MainAnimations>
    </Wrapper>
  );
};

export default memo(InsightsPage);
