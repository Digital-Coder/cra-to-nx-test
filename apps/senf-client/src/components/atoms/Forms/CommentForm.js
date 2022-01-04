/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
// Redux stuff
import { submitComment } from "../../../redux/actions/commentActions";
import { SubmitButton } from "../CustomButtons/SubmitButton";

const Wrapper = styled.div`
  z-index: 100;
  height: auto;
  margin-left: 10px;
  width: calc(100% - 20px);
  display: flex;
  flex-direction: column;
`;

const styles = {
  textField: {
    width: "100%",
    color: "white",
    marginTop: "20px",
    backgroundColor: "rgb(250,250,250,0.9)",
    marginBottom: "20px",
  },
};

const CommentForm = ({ classes, screamId, clicked }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const authenticated = user.authenticated;

  useEffect(() => {
    if (!clicked) return;
    document.getElementById("outlined-name").focus();
  }, [clicked]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    dispatch(submitComment(screamId, { body: body }, user)).then(() => {
      setLoading(false);
      setBody("");
    });
  };

  return (
    authenticated && (
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <TextField
            name="body"
            type="text"
            label={t("opinion")}
            id="outlined-name"
            variant="outlined"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            multiline
            fullWidth
            className={classes.textField}
          />
          <SubmitButton
            text={t("send")}
            zIndex="999"
            backgroundColor="#fed957"
            width="50px"
            textColor="#353535"
            loading={loading}
            disabled={body === "" || loading}
          />
        </form>
      </Wrapper>
    )
  );
};

export default withStyles(styles)(CommentForm);
