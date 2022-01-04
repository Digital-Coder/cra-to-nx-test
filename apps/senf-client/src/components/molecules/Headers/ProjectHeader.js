/** @format */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import ShareModal from "../../molecules/Modals/ShareModal";
import Tabs from "../../atoms/Tabs/Tabs";
import { ProjectTabData } from "../../../data/ProjectTabData";
import {
  FixedWrapper,
  FlexWrapper,
  TitleWrapper,
  ImgWrapperMobile,
} from "./styles/sharedStyles";

const ProjectHeader = ({
  imgUrl,
  title,
  loading,
  calendar,
  order,
  handleClose,
  handleClick,
  path,
  project,
}) => {
  const { openScream } = useSelector((state) => state.UI);
  const [shareOpen, setShareOpen] = useState(false);
  const [amount, setAmount] = useState(18);

  useEffect(() => {
    const amount = document.getElementById("wrapper").offsetWidth / 17;
    setAmount(amount);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Senf.koeln – ${title}`,
          url: path,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      setShareOpen(true);
    }
  };

  return (
    <React.Fragment>
      {shareOpen && (
        <ShareModal
          screamId={project}
          title={title}
          path={path}
          setShareOpen={setShareOpen}
        />
      )}

      <FixedWrapper moveUp={openScream} id="wrapper">
        <FlexWrapper>
          <CustomIconButton
            name="ArrowLeft"
            top="10px"
            shadow={false}
            handleButtonClick={handleClose}
          />

          <TitleWrapper>{title}</TitleWrapper>

          <ImgWrapperMobile>
            <img src={imgUrl} width="100%" alt="project-thumbnail" />
          </ImgWrapperMobile>
        </FlexWrapper>
        {/* <div style={{ position: "absolute", top: "20px", right: "10px" }}>
          <CustomIconButton
            name="Share"
            margin="0px"
            left="calc(100% - 50px)"
            position="relative"
            handleButtonClick={handleShare}
          />
        </div> */}

        {/* <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <ShareModal screamId={project} title={title} path={path} />
      </div> */}

        <Tabs
          loading={loading}
          handleClick={handleClick}
          order={order}
          tabLabels={
            calendar
              ? ProjectTabData.map((item) => item.text)
              : ProjectTabData.map((item) => item.text).slice(0, 2)
          }
          marginTop={"0px"}
          marginBottom={"0px"}
          lineColor={"#cecece"}
        ></Tabs>
      </FixedWrapper>
    </React.Fragment>
  );
};

export default ProjectHeader;
