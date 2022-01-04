/** @format */

import React from "react";
import styled from "styled-components";

const MyButtonDesign = styled.div`
  flex: 0 0 auto;
  color: rgba(0, 0, 0, 0.54);
  padding: 12px;
  overflow: visible;
  font-size: 1.5rem;
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;

  border: 0;
  cursor: pointer;
  margin: 0;
  display: inline-flex;
  outline: 0;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const IconButton = styled.span`
  width: 100%;
  display: flex;
`;

const MyButtonStyle = ({ children, onClick, btnClassName }) => {
  return (
    <MyButtonDesign tabindex="0">
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </MyButtonDesign>
  );
};

export default MyButtonStyle;
