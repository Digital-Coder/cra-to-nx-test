/** @format */

import React from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../atoms/Selects/CustomSelect";
import { TextField } from "@material-ui/core";
import { OptionsStatus } from "../../../../data/OptionsStatus";

const AdminEditModalMainFields = ({ status, setStatus, notes, setNotes }) => {
  const scream_user = useSelector((state) => state.data.scream_user);
  console.log(scream_user);
  return (
    <div className="textFields">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          fontFamily: "Futura PT W01-Bold",
          marginTop: "20px",
        }}
      >
        Email:
        {scream_user && (
          <a
            href={"mailto:" + scream_user.email}
            style={{
              fontFamily: "Futura PT W01 Book",
              textDecoration: "underline",
            }}
          >
            {scream_user.email}
          </a>
        )}
      </div>{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "Futura PT W01-Bold",
        }}
      >
        <span> Status:</span>

        <CustomSelect
          name={"status"}
          value={status}
          initialValue={"Status ändern"}
          options={OptionsStatus()}
          handleDropdown={(value) => setStatus(value)}
        />
      </div>
      <TextField
        id="notes"
        name="notes"
        type="text"
        label="Notizen"
        placeholder="Füge Notizen hinzu..."
        margin="normal"
        color="transparent"
        variant="outlined"
        className="textField"
        multiline
        maxRows="12"
        // error={errors.body ? true : false}
        // helperText={errors.body}
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        style={{ marginTop: "5px", marginBottom: "5px" }}
      />
    </div>
  );
};

export default AdminEditModalMainFields;
