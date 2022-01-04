/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSwipePositionDown } from "../../../redux/actions/UiActions";

const Container = styled.div`
  position: absolute;
  width: calc(100% - 120px);
  height: 50px;
  z-index: 9;
`;

const MapClickContainer = () => {
  const dispatch = useDispatch();
  const swipePosition = useSelector((state) => state.UI.swipePosition);

  const setSwipeDown = () => {
    dispatch(setSwipePositionDown());
  };

  return swipePosition === "top" && <Container onClick={setSwipeDown} />;
};

export default MapClickContainer;
