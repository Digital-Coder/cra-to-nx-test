import React, { useEffect, memo } from "react";
import i18n from "i18next";
import styled from "styled-components";
import Cookies from "universal-cookie";
//MUI

import { MenuItem, FormControl, Select } from "@material-ui/core/";

const Wrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 15px;
  z-index: 99999;
`;

function SelectLanguageButtons() {
  const cookies = new Cookies();
  const langFromCookie = cookies.get("language");
  const [language, setLanguage] = React.useState("");

  setTimeout(() => {
    setLanguage(langFromCookie);
  }, 2000);

  const handleChange = (event) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
    cookies.set("language", event.target.value);
  };

  return (
    <Wrapper>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <Select
          value={language || ""}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={"en"}>EN</MenuItem>
          <MenuItem value={"de"}>DE</MenuItem>
        </Select>
      </FormControl>
    </Wrapper>
  );
}
export default memo(SelectLanguageButtons);
