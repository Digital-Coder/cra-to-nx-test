import React from "react";
import styled from "styled-components";

const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 40px;
  height: 20px;
  border-radius: 50px;
  border: 2px solid gray;
  position: relative;
  transition: background-color 0.2s;
`;

const SwitchButton = styled.span`
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 22.5px;
  transition: 0.2s;
  background: grey;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  ${SwitchInput}:checked + ${SwitchLabel} & {
    left: calc(100% - 1px);
    transform: translateX(-100%);
  }

  ${SwitchLabel}:active & {
    width: 22.5px;
  }
`;

const Switch = ({ id, toggled, onChange }) => {
  return (
    <>
      <SwitchInput
        className="switch-checkbox"
        id={id}
        type="checkbox"
        checked={toggled}
        onChange={onChange}
      />
      <SwitchLabel className="switch-label" htmlFor={id}>
        <SwitchButton className="switch-button" />
      </SwitchLabel>
    </>
  );
};

export default Switch;