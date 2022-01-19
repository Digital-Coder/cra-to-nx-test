import React from "react";
import { StyledH2, StyledText } from "../../../styles/GlobalStyle";
import styled from "styled-components";
import { TagsFilter } from "../Filters/TagsFilter";
const Wrapper = styled.div`
  margin-top: 2.5vw;
  top: 0em;
  position: relative;
  width: 100%;
  padding-top: 1em;
  background-color: #f8f8f8;
  height: auto;
  padding-bottom: 1em;
  border-radius: 10px;
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 50px;
  position: relative;
  top: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
`;

const TextWrapper = styled.div`
  width: 90%;
  margin-left: 5%;
`;
const ClickBlocker = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9;
`;

const GraphsWrapper = ({ title, subTitle, plot }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <TextWrapper>
          <StyledH2 fontWeight="900" textAlign="center">
            {title}
          </StyledH2>

          <StyledText textAlign="center">{subTitle}</StyledText>
        </TextWrapper>
        <TagsFilter placing="insights" type="topics" />
      </InnerWrapper>
      <ClickBlocker />
      {plot}
    </Wrapper>
  );
};

export default GraphsWrapper;
