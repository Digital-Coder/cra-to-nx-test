/** @format */

import React from "react";
import styled from "styled-components";

const Input = styled.input`
  -webkit-appearance: none;
  display: block;
  width: 100%;
  padding: 14px 14px 12px;
  height: 26px;
  font-family: Futura PT W01 Book;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;
  color: #353535;
  border: 1px solid white;

  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "white"};

  border-radius: 20px;
  margin-top: 0px;
  transition: all 0.15s ease;
  pointer-events: all;

  &:hover {
    border-color: black;
    background-color: white;
  }

  &:focus {
    outline: none;
    border-color: black;
    background-color: white;
  }
`;

const Searchbar = ({
  placeholder,
  searchTerm,
  setSearchTerm,
  handleSearch,
  backgroundColor,
}) => {
  return (
    <Input
      type="text"
      value={searchTerm}
      placeholder={placeholder}
      onChange={(event) => setSearchTerm(event.target.value)}
      onKeyPress={handleSearch}
      backgroundColor={backgroundColor}
    />
  );
};

export default Searchbar;
