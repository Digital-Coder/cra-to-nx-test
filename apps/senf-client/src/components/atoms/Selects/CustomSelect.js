/** @format */

import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

//Images
import Arrow from "../../../images/icons/arrow.png";

//Components
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { StyledH3, StyledLi } from "../../../styles/GlobalStyle";

const DropDownButton = styled.button`
  color: #353535;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  /* border: 0.5px solid #353535; */
  background-color: transparent;
`;

const DropDownListContainer = styled.div`
  display: block;
  background-color: white;
  box-shadow: rgb(38, 57, 77, 0.7) 0px 20px 30px -15px;

  border: 1px solid #e5e5e5;

  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 95%;
  max-width: 400px;
  height: auto;
  max-height: 80vh;
  overflow: scroll;
  box-sizing: border-box;
  z-index: 99999;
  border-radius: 20px;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 99998;
  background-color: rgb(0, 0, 0, 0.6);
`;

const DropDownList = styled.ul`
  margin: 0;
  padding: 0;
  overflow: hidden;
  border-radius: 10px;
  width: 100%;
`;

const ListItem = styled("li")`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
  text-align: left;
  color: #353535;
  height: 30px;
  padding: 10px;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const ColorDot = styled.div`
  width: 16px;
  position: relative;
  height: 16px;
  border-radius: 15px;
  background-color: ${(props) => props.color};
  opacity: 1;

  margin-right: 10px;
`;
const Img = styled.img`
  width: 40px;
  position: relative;
  height: 40px;
  border-radius: 15px;
  margin-right: 10px;
`;

const Span = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CustomSelect = ({ value, initialValue, options, handleDropdown }) => {
  const [open, setOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState(
    value === "" ? initialValue : value
  );
  const [selectedLabel, setSelectedLabel] = useState(initialValue);
  const [dropDownButtonAmount, setDropDownButtonAmount] = useState(28);

  useEffect(() => {
    if (document.body.clientWidth < 350) {
      setDropDownButtonAmount(18);
    } else if (document.body.clientWidth < 400) {
      setDropDownButtonAmount(25);
    }
  }, []);

  useEffect(() => {
    for (const option of options) {
      if (option.name === value) {
        setSelectedLabel(option.label);
      }
    }
  }, [value]);

  const outerRef = useRef();
  useOnClickOutside(outerRef, () => setOpen(false));

  const handleToggle = (event) => {
    event.preventDefault();

    setOpen(!open);
  };

  const onOptionClicked = (value, label) => () => {
    setSelectedOption(value);
    setSelectedLabel(label);
    handleDropdown(value);
    setOpen(false);
  };

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }
  return (
    <React.Fragment>
      <DropDownButton
        onClick={handleToggle}
        class="dropbtn"
        style={{ zIndex: 999 }}
        id="dropDownButton"
      >
        <StyledH3>
          {truncateString(selectedLabel, dropDownButtonAmount)}
        </StyledH3>

        <img
          src={Arrow}
          width="20px"
          style={{
            paddingLeft: "10px",
            transition: "0.5s",
            transform: open && "scaleY(-1)",
          }}
        />
      </DropDownButton>

      {ReactDOM.createPortal(
        open && (
          <React.Fragment>
            <DropDownListContainer id="container">
              <DropDownList>
                {options.map((option) => (
                  <ListItem
                    onClick={onOptionClicked(option.name, option.label)}
                    key={Math.random()}
                  >
                    {option.name === selectedOption ||
                    option.label === selectedOption ? (
                      <StyledLi fontWeight="900">
                        {option.color && <ColorDot color={option.color} />}
                        {option.img && <Img src={option.img} />}
                        {truncateString(
                          option.label,
                          dropDownButtonAmount * 0.9
                        )}
                      </StyledLi>
                    ) : (
                      <React.Fragment>
                        {" "}
                        {option.color && <ColorDot color={option.color} />}
                        {option.img && <Img src={option.img} />}
                        {truncateString(
                          option.label,
                          dropDownButtonAmount * 1.2
                        )}
                      </React.Fragment>
                    )}
                  </ListItem>
                ))}
              </DropDownList>
            </DropDownListContainer>

            <Background onClick={() => setOpen(false)} />
          </React.Fragment>
        ),
        document.getElementById("portal-root-modal")
      )}
    </React.Fragment>
  );
};

export default CustomSelect;
