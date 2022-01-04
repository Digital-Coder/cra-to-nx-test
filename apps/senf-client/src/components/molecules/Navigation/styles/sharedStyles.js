/** @format */

import styled from "styled-components";

export const Logo = styled.div`
  position: fixed;
  width: 180px;
  z-index: 99999;

  padding-bottom: 10;
  font-size: 40;
  margin-left: 20px;
  padding-top: 35px;
  margin-top: 0;
  /* animation: logoAnimation 2.5s; */
  background-color: #f8f8f8;
`;

export const Tabs = styled.div`
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;

  width: 160px;
  height: 35px;
  left: 20px;
  top: 80px;
  font-size: 14pt;
  line-height: 14pt;
  color: #353535;

  margin-bottom: 10px;
  border-radius: 17.5px;
`;
