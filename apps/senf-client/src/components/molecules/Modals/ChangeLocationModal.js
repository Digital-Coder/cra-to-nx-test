/** @format */

import React, { useState } from "react";
import { setViewport } from "../../../MapAnimations";
import MainModal from "../../atoms/Layout/MainModal";
import Geolocate from "../../../images/icons/geolocate.png";
import styled from "styled-components";
import axios from "axios";
import Searchbar from "../../atoms/Searchbar/Searchbar";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "f33a484cf794d08d0148764789aaba32";

const InnerTopWrapper = styled.div`
  width: 95%;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
`;
const InnerTopLeftWrapper = styled.div`
  width: 70%;
`;
const SearchWrapper = styled.div`
  width: 80%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
`;
const InnerBottomWrapper = styled.div`
  width: 93%;
  padding-left: 7%;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
`;
const LocationButton = styled.button`
  position: relative;
  z-index: 9999;
  top: 2.5%;

  margin: auto;
  height: 50px;
  width: 50px;
  border-radius: 15px;
  box-shadow: 0 8px 30px -12px rgba(0, 0, 0, 0.5);
  background-color: #fed957;
  display: "flex";

  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 0;
`;

const ChangeLocationModal = ({ setChangeLocationModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleLocationC = () => {
    // Check browser support
    if (typeof Storage !== "undefined") {
      // Store
      localStorage.setItem("latitude", 50.93864020643174);
      localStorage.setItem("longitude", 6.958725744885521);

      setViewport();
      setChangeLocationModalOpen(false);
    }
  };

  const handleLocationCurrent = () => {
    fetch("https://ctp-zip-api.herokuapp.com/city/" + "hamburg").then(
      (response) => {
        let result = response.data;
        console.log(result);
      }
    );

    // Check browser support
    if (typeof Storage !== "undefined") {
      // Store

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, options);

        var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };

        function success(pos) {
          localStorage.setItem("latitude", pos.coords.latitude);
          localStorage.setItem("longitude", pos.coords.longitude);

          setViewport();
        }

        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
      }
    }
  };

  const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
      params: {
        q: query,
        units: "metric",
        APPID: API_KEY,
      },
    });

    localStorage.setItem("latitude", data.coord.lat);
    localStorage.setItem("longitude", data.coord.lon);

    setViewport();
  };

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(searchTerm);

      setSearchTerm("");
      setChangeLocationModalOpen(false);
    }
  };

  return (
    <MainModal handleButtonClick={() => setChangeLocationModalOpen(false)}>
      <InnerTopWrapper>
        <InnerTopLeftWrapper>
          <h1>Wähle deinen Standort </h1>
        </InnerTopLeftWrapper>
        <LocationButton onClick={handleLocationCurrent}>
          <img src={Geolocate} width="50" alt="Geolocate" />
        </LocationButton>
      </InnerTopWrapper>
      <SearchWrapper>
        <Searchbar
          placeholder="Suche weltweit..."
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          handleSearch={search}
          backgroundColor="#f8f8f8"
        />
      </SearchWrapper>
      <br />
      <InnerBottomWrapper>
        <h3 style={{ color: "#353535" }}> Kreativste Städte: </h3>
        <p onClick={handleLocationC}>Köln (300)</p>
      </InnerBottomWrapper>
    </MainModal>
  );
};

export default ChangeLocationModal;
