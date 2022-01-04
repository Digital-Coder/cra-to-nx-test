/** @format */

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI Stuff
import Button from "@material-ui/core/Button";

import { TextField } from "@material-ui/core";
import MainModal from "../../../atoms/Layout/MainModal";

const styles = {
  root: {
    zIndex: 99999,
  },
  paper: {
    borderRadius: "20px",

    // width: "95%",
    margin: "2.5%",
    maxWidth: "400px",
    zIndex: 99999,
  },

  button: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70px",
  },
};

const Weblink = ({
  classes,
  weblink,
  weblinkTitle,
  setWeblink,
  setWeblinkTitle,
  setWeblinkOpen,
  handleCloseWeblink,
  handleSaveWeblink,
}) => {
  return (
    <MainModal handleButtonClick={() => setWeblinkOpen(false)} zIndex={999}>
      <h3 className="modal_title">Link hinzufügen</h3>
      <div className="textFields">
        <TextField
          id="weblinkTitle"
          name="weblinkTitle"
          type="text"
          label="Link-Titel"
          placeholder="Mehr Infos, Programm o.ä."
          margin="normal"
          color="transparent"
          variant="outlined"
          className="textField"
          value={weblinkTitle}
          onChange={(event) => setWeblinkTitle(event.target.value)}
          style={{ marginTop: "5px", marginBottom: "5px" }}
        ></TextField>
        <TextField
          id="weblink"
          name="weblink"
          type="text"
          label="Link "
          placeholder="https://www..."
          margin="normal"
          color="transparent"
          variant="outlined"
          className="textField"
          value={weblink}
          onChange={(event) => setWeblink(event.target.value)}
          style={{ marginTop: "5px", marginBottom: "5px" }}
        ></TextField>
      </div>

      <div className="buttons">
        <Button className={classes.button} onClick={handleCloseWeblink}>
          {weblink !== null && weblinkTitle !== null ? "Löschen" : "Abbrechen"}
        </Button>
        <Button
          className={classes.button}
          onClick={handleSaveWeblink}
          style={
            weblink !== null && weblinkTitle !== null
              ? {}
              : { pointerEvents: "none", opacity: 0.6 }
          }
        >
          Speichern
        </Button>
      </div>
    </MainModal>
  );
};

export default withStyles(styles)(Weblink);
