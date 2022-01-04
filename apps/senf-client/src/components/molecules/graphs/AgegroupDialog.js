/** @format */

import React, { useState, Fragment, useEffect } from "react";
import { isMobileOnly } from "react-device-detect";
// Icons
import CloseIcon from "../../../images/icons/close.png";

//Components

import MyButton from "../../../util/MyButton";

// MUI Stuff
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AgegroupGraph = React.lazy(() =>
  import(/* webpackChunkName: "Agegroup-Graph" */ "./AgegroupGraph")
);
const styles = {
  root: {
    //backgroundColor: "rgb(0,0,0,0.5)",
    padding: "0",
    overflow: "hidden",
  },

  paper: {
    //backgroundColor: "rgb(0,0,0,0.5)",
    boxShadow: "none",
    overflow: "hidden",
    padding: "0",
    top: "8em",
    overflow: "hidden",
    borderRadius: "10px",
  },
  paperWeb: {
    borderRadius: "20px",
    width: "1000px",
    height: "auto",
    maxHeight: "calc(100vh - 80px)",
    overflowX: "hidden",
  },
  card: {
    marginTop: "2.5vw",
    top: "0em",
    position: "relative",
    width: "100%",
    paddingTop: "1em",
    backgroundColor: "white",
    height: "auto",
    paddingBottom: "1em",
    borderRadius: "10px",
    overflow: "hidden",
  },

  closeButton: {
    position: "absolute",
    top: "2.5vw",
    left: "2.5vw",
    color: "black",
    zIndex: "990",
    padding: 10,
  },

  expandButton: {
    position: "absolute",
    left: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    borderRadius: 0,
    zIndex: 9,
  },
  dialogcontent: {
    position: "relative",
    marginLeft: "2.5vw",

    width: "95vw",
    height: "auto",
  },

  card: {
    marginTop: "0",
    top: "0em",
    position: "relative",
    overflow: "hidden",
    paddingTop: "1em",
    backgroundColor: "white",
    height: "auto",
    paddingBottom: "0em",
    borderRadius: "10px",
  },
  title: {
    fontFamily: "Futura PT W01-Bold",
    position: "relative",
    height: "2em",
    width: "100%",
    fontSize: "28",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Futura PT W01 Book",
    position: "relative",
    height: "auto",
    width: "100%",
    maxWidth: "500px",
    marginLeft: "50%",
    transform: "translateX(-50%)",
    fontSize: "20",
    textAlign: "center",
  },
  plot: {
    position: "relative",
    width: "100%",
  },
  clickblocker: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "9",
  },
  legendwrapper: {
    color: "black",
    zIndex: "1",
    position: "relative",
    width: "100%",

    borderRadius: "10px",
    top: "2vh",
    transform: "scale(0.8)",
    marginLeft: "7px",
    paddingLeft: "20px",

    marginBottom: "20px",
    maxWidth: "500px",
    marginLeft: "50%",
    transform: "translateX(-50%)",
  },
};

const AgegroupDialog = ({ classes, data, screams, likes }) => {
  const [open, setOpen] = useState(false);

  const dialogComponent = isMobileOnly ? (
    <Dialog
      scroll={"body"}
      open={open}
      onClose={() => setOpen(false)}
      BackdropProps={{ classes: { root: classes.root } }}
      PaperProps={{ classes: { root: classes.paper } }}
      TransitionComponent={Transition}
      fullScreen
      className="dialogOverlayContent"
      maxWidth={"lg"}
    >
      <MyButton
        onClick={() => setOpen(false)}
        btnClassName={classes.closeButton}
      >
        <img src={CloseIcon} width="20px" />
      </MyButton>

      <DialogContent>
        <React.Suspense fallback={<CircularProgress size={50} thickness={2} />}>
          <AgegroupGraph
            data={data}
            classes={classes}
            screams={screams}
            likes={likes}
          />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  ) : (
    <Dialog
      scroll={"body"}
      open={open}
      onClose={() => setOpen(false)}
      BackdropProps={{ classes: { root: classes.root } }}
      PaperProps={{ classes: { root: classes.paperWeb } }}
      TransitionComponent={Transition}
      fullScreen
      className="dialogOverlayContent"
      maxWidth={"lg"}
    >
      <MyButton
        onClick={() => setOpen(false)}
        btnClassName={classes.closeButton}
      >
        <img src={CloseIcon} width="20px" />
      </MyButton>

      <DialogContent>
        <React.Suspense fallback={<CircularProgress size={50} thickness={2} />}>
          <AgegroupGraph
            data={data}
            screams={screams}
            likes={likes}
            classes={classes}
          />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );

  return (
    <Fragment>
      <MyButton
        onClick={() => setOpen(true)}
        btnClassName={classes.expandButton}
      ></MyButton>

      {dialogComponent}
    </Fragment>
  );
};

export default withStyles(styles)(AgegroupDialog);
