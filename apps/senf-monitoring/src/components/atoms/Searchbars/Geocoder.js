import React from "react";
import styled from "styled-components";
import useGeocoder from "../../../hooks/useGeocoder";

const Wrapper = styled.div`
  margin: 0 auto;
`;

const Input = styled.input`
  width: 95%;
  position: relative;
  top: 2.5%;
  border-radius: 5px;
  border: none;
  height: 50px !important;
  padding: 0;
  left: 0%;
  padding-left: 15px;
  font-family: "Futura PT W01 Book", sans-serif;
  font-size: 12pt;
  box-shadow: 0 8px 30px -12px rgba(0, 0, 0, 0);
  border: 1px solid #cecece;
  margin-bottom: 5px;
`;

const SuggestionWrapper = styled.div`
  position: relative;
  top: 10px;
  left: 0%;
  z-index: 1;
  background-color: white;
  border: 1px solid white;
  border-radius: 5px;
  width: 95%;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2);
`;

const Suggestion = styled.p`
  cursor: pointer;
  position: relative;
  max-width: 300px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 0px 0px,
    rgba(27, 31, 35, 0.15) 0px 1px 0px 0px;
  padding-bottom: 5px;
  left: 20px;
  font-family: "Futura PT W01 Book", sans-serif;
`;

const Geocoder = ({ scream }) => {
  const address = useGeocoder();

  return (
    <Wrapper>
      <Input
        placeholder={scream.locationHeader}
        {...address}
        isTyping={address.value !== ""}
      />
      {address.suggestions?.length > 0 && (
        <SuggestionWrapper>
          {address.suggestions.map((suggestion, index) => {
            return (
              <Suggestion
                key={index}
                onClick={() => {
                  address.setValue(suggestion.place_name);
                  address.setSuggestions([]);
                }}
              >
                {suggestion.place_name}
              </Suggestion>
            );
          })}
        </SuggestionWrapper>
      )}
    </Wrapper>
  );
};

export default Geocoder;
