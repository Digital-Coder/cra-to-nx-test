/** @format */

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI Stuff
import Button from "@material-ui/core/Button";

// REDUX Stuff

import { TextField } from "@material-ui/core";
import MainModal from "../../../atoms/Layout/MainModal";

const styles = {
  paper: {
    borderRadius: "20px",

    // width: "95%",
    margin: "2.5%",
    maxWidth: "400px",
  },

  button: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70px",
  },
};

const Contact = ({
  classes,
  contact,
  contactTitle,
  setContact,
  setContactTitle,
  setContactOpen,
  handleCloseContact,
  handleSaveContact,
}) => {
  return (
    <MainModal handleButtonClick={() => setContactOpen(false)} zIndex={999999}>
      <h3 className="modal_title">Kontaktdaten öffentlich zeigen</h3>
      <div className="textFields">
        <TextField
          id="contactTitle"
          name="contactTitle"
          type="text"
          label="Kontakt-Titel"
          placeholder="Mach mit, Kontakt o.ä."
          margin="normal"
          color="transparent"
          variant="outlined"
          className="textField"
          value={contactTitle}
          onChange={(event) => setContactTitle(event.target.value)}
          style={{ marginTop: "5px", marginBottom: "5px" }}
        ></TextField>
        <TextField
          id="contact"
          name="contact"
          type="text"
          label="Kontaktdaten "
          placeholder="max@mail.de"
          margin="normal"
          color="transparent"
          variant="outlined"
          className="textField"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          style={{ marginTop: "5px", marginBottom: "5px" }}
        ></TextField>
      </div>

      <div className="buttons">
        <Button className={classes.button} onClick={handleCloseContact}>
          {contact !== null && contactTitle !== null ? "Löschen" : "Abbrechen"}
        </Button>
        <Button
          className={classes.button}
          onClick={handleSaveContact}
          style={
            contact !== null && contactTitle !== null
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

export default withStyles(styles)(Contact);
