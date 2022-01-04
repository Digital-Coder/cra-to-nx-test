/** @format */

import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useDispatch } from "react-redux";
import { openMonitoringScream } from "../../../redux/actions/monitoringScreamActions";

//TIMESTAMP
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Icons
import menuIcon from "../../../images/icons/menu.png";
import statusIcon from "../../../images/icons/flag.png";

const styles = {
  gradient: {
    width: "100%",
    height: "70px",
    position: "absolute",
    bottom: 0,

    background:
      "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%)",
  },

  card: {
    position: "relative",
    display: "flex",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",

    maxWidth: "95%",
    borderRadius: 20,
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
    height: "100px",
  },

  content: {
    padding: 0,
    color: "rgb(87, 87, 87)",
    width: "100%",

    objectFit: "cover",
    display: "flex",
    justifyContent: "space-between",
  },
};

const IdeaCardMonitoring = ({
  classes,
  projectsData,

  title,
  screamId,
  likeCount,
  commentCount,
  Stadtteil,
  project,
  status,
  createdAt,
  userHandle,
  color,
}) => {
  const ideaCardProject = project;
  const dispatch = useDispatch();

  const handleExpand = (screamId) => {
    dispatch(openMonitoringScream(screamId));
  };

  const handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  dayjs.extend(relativeTime);

  const projectsDataFinal = [];
  if (projectsData) {
    projectsData.forEach(({ project, imgUrl }) => {
      if (ideaCardProject === project) {
        projectsDataFinal.push(imgUrl);
      }
    });
  }

  return (
    <button className="monitoringCard" onClick={() => handleExpand(screamId)}>
      <div>
        <div className={classes.content}>
          <div style={{ width: "20px", margin: "10px" }}>
            <div
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "100%",
                border: "0.5px white solid",
                backgroundColor: color,
              }}
            />
          </div>
          <div style={{ width: "300px", margin: "10px" }}>{title} </div>
          <div style={{ width: "110px", margin: "10px" }}>{Stadtteil}</div>
          <div style={{ width: "110px", margin: "10px" }}>{userHandle}</div>

          <div style={{ width: "20px", margin: "10px" }}>{likeCount}</div>
          <div style={{ width: "20px", margin: "10px" }}>{commentCount}</div>

          <div style={{ width: "40px", margin: "10px" }}>
            {dayjs(createdAt).format("DD.MM.")}
          </div>
          <div style={{ width: "30px", margin: "10px" }}>
            {projectsDataFinal.length > 0 && (
              <img
                src={projectsDataFinal}
                width="30px"
                alt="project-thumbnail"
                style={{ borderRadius: "10px", overflow: "hidden" }}
              />
            )}
          </div>
          <div style={{ width: "20px", margin: "10px" }}>
            {" "}
            {status === "None" ? (
              <img src={statusIcon} width="22" alt="status-icon" />
            ) : null}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 0,
          zIndex: 999,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: "20px",
        }}
        className="hoverIcon"
      >
        <div style={{ width: "50px", margin: "10px" }}>
          {" "}
          <img
            className="hoverIcon"
            src={menuIcon}
            style={{ paddingTop: "5px" }}
            width="30"
            alt="WeblinkIcon"
          />
        </div>
      </div>
    </button>
  );
};

export default withStyles(styles)(IdeaCardMonitoring);
