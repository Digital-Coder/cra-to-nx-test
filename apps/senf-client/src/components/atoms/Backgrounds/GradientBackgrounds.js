/** @format */

import styled from "styled-components";

export const Background = styled.div`
  position: absolute;
  margin-top: -10px;
  height: 110%;
  width: 100vw;
  border-radius: 20px 20px 0 0;
  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(254, 217, 87, 1) 6%,
    rgba(255, 218, 83, 1) 41%,
    rgba(255, 255, 255, 1) 100%
  );
  z-index: 0;
  box-shadow: 0 8px 20px 12px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    position: fixed;
    margin-top: 0px;
    top: 0;
    height: 100%;
    width: 400px;
    border-radius: 0px 0px 0 0;
    z-index: 0;
    box-shadow: none;
  }
`;
