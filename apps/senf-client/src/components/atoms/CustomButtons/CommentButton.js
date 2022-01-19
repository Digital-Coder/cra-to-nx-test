/** @format */

import React from "react";

//Redux
import { useSelector } from "react-redux";

//Components
import LoginRegistration from "../../organisms/Auth/LoginRegistration";

//Images
import { CustomIconButton } from "./CustomButton";

const CommentButton = ({ handleButtonClick }) => {
  const user = useSelector((state) => state.user);

  const commentButton = !user.authenticated ? (
    <CustomIconButton
      name="Chat"
      iconWidth="23px"
      position="relative"
      margin="0"
      left="0"
      shadow={false}
      backgroundColor={"transparent"}
      handleButtonClick={() => console.log("not logged in")}
    >
      <LoginRegistration />
    </CustomIconButton>
  ) : (
    <CustomIconButton
      name="Chat"
      iconWidth="23px"
      position="relative"
      margin="0"
      left="0"
      shadow={false}
      backgroundColor={"transparent"}
      handleButtonClick={handleButtonClick}
    />
  );
  return commentButton;
};

export default CommentButton;
