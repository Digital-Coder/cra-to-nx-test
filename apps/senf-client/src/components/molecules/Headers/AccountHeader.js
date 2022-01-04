/** @format */

import React, { useState, useEffect } from "react";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import Tabs from "../../atoms/Tabs/Tabs";
import { AccountTabData } from "../../../data/AccountTabData";
import { useSelector } from "react-redux";

import {
  FixedWrapper,
  FlexWrapper,
  TitleWrapper,
  ImgWrapperMobile,
} from "./styles/sharedStyles";

const ProjectHeader = ({ loading, order, handleClose, handleClick }) => {
  const handle = useSelector((state) => state.user.handle);
  const openScream = useSelector((state) => state.UI.openScream);
  const [amount, setAmount] = useState(18);

  const userHandle = handle ? handle : "...";

  useEffect(() => {
    const amount = document.getElementById("wrapper").offsetWidth / 17;
    setAmount(amount);
  }, []);

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }
  return (
    <FixedWrapper moveUp={openScream} id="wrapper">
      <FlexWrapper>
        <CustomIconButton
          name="ArrowLeft"
          top="10px"
          shadow={false}
          handleButtonClick={handleClose}
        />

        <TitleWrapper data-cy="hey-user">
          {truncateString("Hey " + userHandle, amount)}
        </TitleWrapper>
        <ImgWrapperMobile style={{ opacity: "0" }}></ImgWrapperMobile>
      </FlexWrapper>

      <Tabs
        loading={loading}
        handleClick={handleClick}
        order={order}
        tabLabels={AccountTabData.map((item) => item.text)}
        marginTop={"0px"}
        marginBottom={"0px"}
        lineColor={"#cecece"}
      ></Tabs>
    </FixedWrapper>
  );
};

export default ProjectHeader;
