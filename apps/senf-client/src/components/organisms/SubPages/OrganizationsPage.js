/** @format */

import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import firebase from "firebase/app";
import "firebase/firestore";
import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import { OrganizationCard } from "../../molecules/Cards/OrganizationCard";
import { openOrganizationFunc } from "../../../redux/actions/organizationActions";
import InfiniteScroll from "react-infinite-scroller";
import Toolbar from "../../molecules/Toolbar/Toolbar";
import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { Wrapper } from "./styles/sharedStyles";
import { TagsFilter } from "../../molecules/Filters/TagsFilter";
import { MenuData } from "../../../data/MenuData";
import { StyledH2 } from "../../../styles/GlobalStyle";
import Tabs from "../../atoms/Tabs/Tabs";

const InnerWrapper = styled.div`
  overflow-y: scroll;
  pointer-events: all;
  height: calc(100% - 120px);
  width: 100%;
  margin-top: ${(props) => (props.isMobileCustom ? "120px" : "120px")};
  overflow: scroll;
`;

const TitleWrapper = styled.div`
  position: fixed;
  width: 100%;
  background-color: #fed957;
  z-index: 10;
  height: 100px;
  @media (min-width: 768px) {
    width: 400px;
  }
`;
const NoIdeasYet = styled.div`
  position: relative;
  font-size: 15pt;
  color: #414345;
  width: 80%;
  margin-left: 10%;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 100;
  color: #353535;
  align-self: center;
  margin-top: 20px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const OrganizationsPage = ({ handleClick, order, loading }) => {
  const { t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const selectedOrganizationTypes = useSelector(
    (state) => state.data.organizationTypes
  );

  const organizations = useSelector((state) => state.data.organizations);
  // const user = useSelector((state) => state.user);
  const loadingOrganizations = useSelector(
    (state) => state.data.loadingOrganizations
  );

  // const prevdataFinalLength = usePrevious({ dataFinalLength });
  // const prevDropdown = usePrevious({ dropdown });

  const [dropdown, setDropdown] = useState("newest");

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const organizationsSearched = organizations?.filter((val) => {
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

  const sortedOrganizations =
    dropdown === "newest"
      ? _.orderBy(organizationsSearched, "createdAt", "desc")
      : dropdown === "aToZ"
      ? _.orderBy(
          organizationsSearched,
          [(pr) => pr.title.toLowerCase()],
          ["asc"]
        )
      : _.orderBy(
          organizationsSearched,
          [(pr) => pr.title.toLowerCase()],
          ["desc"]
        );

  const dataFinal = useMemo(() => {
    return sortedOrganizations.filter(({ organizationType }) =>
      selectedOrganizationTypes.includes(organizationType)
    );
  }, [selectedOrganizationTypes, dropdown, organizationsSearched]);

  const dataFinalLength = dataFinal.length;

  useEffect(() => {
    if (!loadingOrganizations) {
      const element = document.getElementById("List");
      element?.scrollTo({
        top: 0,
        left: 0,
      });

      setListItems(1);
      sethasMoreItems(true);
    }
  }, [loadingOrganizations]);
  const itemsPerPage = 1;
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [listItems, setListItems] = useState(itemsPerPage);

  const showItems = (organizations) => {
    var items = [];
    if (organizations.length !== 0) {
      for (var i = 0; i < listItems; i++) {
        items.push(
          organizations[i]?.organizationId && (
            <OrganizationCard
              key={organizations[i]?.organizationId}
              organization={organizations[i]}
            />
          )
        );
      }
      return items;
    }
  };

  const loadMore = () => {
    if (!loadingOrganizations && dataFinal.length === 0) {
      sethasMoreItems(false);
    }

    if (listItems === dataFinal.length) {
      sethasMoreItems(false);
    } else {
      setTimeout(() => {
        setListItems(listItems + itemsPerPage);
      }, 100);
    }
  };

  return (
    <Wrapper>
      {isMobileCustom && (
        <CustomIconButton
          name="ArrowLeft"
          position="fixed"
          margin="10px"
          backgroundColor="#FFF0BC"
          handleButtonClick={() => handleClick(2)}
          zIndex={99}
        />
      )}
      <TitleWrapper>
        <Tabs
          loading={false}
          handleClick={handleClick}
          order={1}
          tabLabels={MenuData.map((item) => item.text).slice(2, 3)}
          marginTop={"20px"}
          marginBottom={"20px"}
        />

        {isMobileCustom && (
          <TagsFilter
            placing="list"
            type={order === 1 ? "topics" : "organizationType"}
          />
        )}
      </TitleWrapper>
      <InnerWrapper isMobileCustom={isMobileCustom}>
        <Toolbar
          swipeListType="organizationOverview"
          type="standalone"
          loading={loadingOrganizations}
          handleDropdown={handleDropdown}
          dataFinalLength={dataFinalLength}
          setSearchOpen={setSearchOpen}
          searchOpen={searchOpen}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />

        {!loadingOrganizations ? (
          <InfiniteScroll
            loadMore={() => loadMore()}
            hasMore={hasMoreItems}
            useWindow={false}
          >
            {showItems(dataFinal)}
          </InfiniteScroll>
        ) : (
          <NoIdeasYet>{t("projectrooms_loader")}</NoIdeasYet>
        )}
      </InnerWrapper>
    </Wrapper>
  );
};

export default OrganizationsPage;
