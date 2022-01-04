/** @format */

import React, { memo } from "react";
import { useDispatch } from "react-redux";

import SortingSelect from "../../atoms/Selects/SortingSelect";
import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { useTranslation } from "react-i18next";

//Icons
import SearchIcon from "../../../images/icons/search.png";
import { setSwipePositionUp } from "../../../redux/actions/UiActions";
import Searchbar from "../../atoms/Searchbar/Searchbar";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  transition: height 0.5s;
  padding: 0px 2.5% 10px 2.5%;

  animation: ToolbarAnimation 0.7s;
  pointer-events: none;
  flex-flow: wrap;
  @media (min-width: 768px) {
    position: fixed;
    top: ${(props) => (props.type === "allIdeas" ? "30px" : "100px")};
    z-index: 99;
    width: 380px;
    padding: 10px 10px 20px 10px;
  }

  @keyframes ToolbarAnimation {
    0% {
      opacity: 0;
      transform: translateY(10%);
    }
    20% {
      opacity: 0;
      transform: translateY(10%);
    }

    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const Bar = styled.div`
  position: absolute;
  width: 40px;
  height: 4px;
  border-radius: 10px;
  margin-left: calc(47.5% - 20px);
  background-color: white;
  top: 10px;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  z-index: -1;
  pointer-events: auto;
`;

const Title = styled.h2`
  font-family: PlayfairDisplay-Bold;
  font-size: 22px;
  font-weight: 100;
  margin-left: 2.5%;
  color: white;
  align-self: center;
`;

const SearchIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  background-color: #f6cb2f;
  pointer-events: auto;
  margin-left: auto;
  margin-right: 10px;
  border: ${(props) =>
    props.searchTerm !== "" && !props.searchOpen
      ? "1px solid white"
      : "none"}; ;
`;

const Toolbar = ({
  loading,
  type,
  handleDropdown,
  handleClickSwipe,
  dataFinalLength,
  setSearchOpen,
  searchOpen,
  setSearchTerm,
  searchTerm,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const setSearch = () => {
    setSearchOpen(!searchOpen);

    if (isMobileCustom) {
      dispatch(setSwipePositionUp());
    }
  };
  return (
    !loading && (
      <Wrapper type={type} searchOpen={searchOpen}>
        {isMobileCustom && <Bar />}
        <Title>
          {dataFinalLength} {dataFinalLength === 1 ? t("idea") : t("ideas")}
        </Title>
        <SearchIconButton
          onClick={setSearch}
          searchTerm={searchTerm}
          searchOpen={searchOpen}
        >
          <img
            src={SearchIcon}
            width="20px"
            style={{ marginLeft: "auto" }}
            alt=""
          />
        </SearchIconButton>
        <SortingSelect handleDropdown={handleDropdown} />{" "}
        {isMobileCustom && <Background onClick={handleClickSwipe} />}
        {searchOpen && (
          <Searchbar
            placeholder={t("searchBar")}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />
        )}
      </Wrapper>
    )
  );
};

export default memo(Toolbar);
