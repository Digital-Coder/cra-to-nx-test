/** @format */

import React from "react";
import IconButton from "@material-ui/core/IconButton";

export default ({ children, onClick, btnClassName }) => (
  <IconButton onClick={onClick} className={btnClassName}>
    {children}
  </IconButton>
);
