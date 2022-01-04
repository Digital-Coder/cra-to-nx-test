/** @format */

import React from "react";

//Icons
import CircularProgress from "@material-ui/core/CircularProgress";
import lamploader from "../../../images/lamp.png";
import ChatBorder from "../../../images/icons/chat.png";
import HandFull from "../../../images/icons/handsFull.png";
import { useTranslation } from "react-i18next";

const Keyindicators = ({ screams, likesLength, commentslength }) => {
  const { t } = useTranslation();

  const Wishlength =
    screams.length === 0 ? (
      <div className="keyindicatorcard">
        <CircularProgress size={12} thickness={2} />
      </div>
    ) : (
      <div className="keyindicatorcard">
        <img
          src={lamploader}
          width="35px"
          style={{
            transform: "rotate(35deg) translateY(-1px)",
            paddingBottom: "10px",
          }}
          alt="lamploader"
        ></img>
        {screams.length} {screams.length === 1 ? t("idea") : t("ideas")}
      </div>
    );

  const Likeslength =
    likesLength === 0 ? (
      <div className="keyindicatorcard">
        <CircularProgress size={12} thickness={2} />
      </div>
    ) : (
      <div className="keyindicatorcard">
        <img
          src={HandFull}
          width="25px"
          alt="lamploader"
          style={{ paddingBottom: "10px" }}
        ></img>
        {"  "}
        {likesLength} Votes
      </div>
    );

  return (
    <div className="keyindicatorswrapper">
      {Wishlength}
      {Likeslength}

      {commentslength === 0 ? (
        <div className="keyindicatorcard">
          <CircularProgress size={12} thickness={2} />
        </div>
      ) : (
        <div className="keyindicatorcard">
          <img
            src={ChatBorder}
            width="25px"
            alt="lamploader"
            style={{ paddingBottom: "10px" }}
          ></img>
          {commentslength} {commentslength === 1 ? t("comment") : t("comments")}
        </div>
      )}
    </div>
  );
};

export default Keyindicators;
