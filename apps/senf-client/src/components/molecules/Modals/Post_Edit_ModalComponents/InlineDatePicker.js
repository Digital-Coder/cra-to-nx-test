/** @format */
import React from "react";

import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import withStyles from "@material-ui/core/styles/withStyles";

// MUI Stuff
import Button from "@material-ui/core/Button";
import MainModal from "../../../atoms/Layout/MainModal";

const styles = {
  paper: {
    borderRadius: "20px",

    // width: "95%",
    margin: "2.5%",
    maxWidth: "400px",
    width: "95%",
  },
  confirmButton: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70%",
    clear: "both",
    color: "red",
  },
  line: {
    height: 1,
    width: "100%",

    backgroundColor: "grey",
  },
  button: {
    fontSize: 20,

    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70px",
  },
};

const InlineDatePicker = ({
  classes,

  setCalendarOpen,
  handleChangeCalendar,
  handleCloseCalendar,
  handleSaveCalendar,
  selectedDays,
}) => {
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <MainModal handleButtonClick={() => setCalendarOpen(false)} zIndex={999}>
      <h3 className="modal_title">Datum hinzufügen:</h3>

      <p style={{ widthh: "100%", textAlign: "center" }}>
        Zuerst Datum, dann Zeit auswählen.
      </p>

      <div className="textFields">
        <Calendar
          weekStartDayIndex={1}
          weekDays={["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]}
          months={[
            "Januar",
            "Februar",
            "März",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Dezember",
          ]}
          value={selectedDays}
          onChange={handleChangeCalendar}
          format="D. MMMM HH:mm"
          sort
          shadow={false}
          plugins={[
            <DatePanel
              header="Ausgewählte Daten"
              position="bottom"
              markFocused
            />,
            <TimePicker
              position="right"
              hideSeconds
              timeFormat="HH:mm"
              showTimeInput
              style={{ minWidth: "100px" }}
            />,
          ]}
        ></Calendar>
      </div>

      <div className="buttons">
        <Button className={classes.button} onClick={handleCloseCalendar}>
          {selectedDays !== [] ? "Löschen" : "Abbrechen"}
        </Button>
        <Button
          className={classes.button}
          onClick={handleSaveCalendar}
          style={
            selectedDays !== [] ? {} : { pointerEvents: "none", opacity: 0.6 }
          }
        >
          Speichern
        </Button>
      </div>
    </MainModal>
  );
};

export default withStyles(styles)(InlineDatePicker);
