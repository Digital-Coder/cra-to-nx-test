/** @format */

import React from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { likeScream, unlikeScream } from "../../../redux/actions/likeActions";

//Components
import LoginRegistration from "../../organisms/Auth/LoginRegistration";

import { CustomIconButton } from "./CustomButton";

const LikeButton = ({ screamId }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const likedScream = () => {
    if (user.likes && user.likes.find((like) => like.screamId === screamId))
      return true;
    else return false;
  };

  const likeButton = !user.authenticated ? (
    <CustomIconButton
      name="Handsnoclap"
      iconWidth="25px"
      position="relative"
      margin="0"
      left="0"
      top="-3px"
      shadow={false}
      backgroundColor={"transparent"}
      handleButtonClick={() => console.log("not logged in")}
    >
      <LoginRegistration />
    </CustomIconButton>
  ) : likedScream() ? (
    <CustomIconButton
      name="HandsFull"
      iconWidth="25px"
      position="relative"
      margin="0"
      left="0"
      top="-3px"
      shadow={false}
      backgroundColor={"transparent"}
      handleButtonClick={() => dispatch(unlikeScream(screamId, user))}
    />
  ) : (
    <CustomIconButton
      name="Handsnoclap"
      iconWidth="25px"
      position="relative"
      margin="0"
      left="0"
      top="-3px"
      shadow={false}
      backgroundColor={"transparent"}
      handleButtonClick={() => dispatch(likeScream(screamId, user))}
    />
  );
  return likeButton;
};

export default LikeButton;
