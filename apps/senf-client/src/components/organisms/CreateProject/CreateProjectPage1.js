/** @format */

import React from "react";
import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";

const Title = styled.h2`
  font-family: PlayfairDisplay-Bold;
  font-size: 22px;
  font-weight: 100;
  color: #353535;
  align-self: center;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const CreateProjectPage1 = ({ outsideClick }) => {
  const { t } = useTranslation();

  const createProjectValidationSchema = yup.object({
    projectRoom_name: yup
      .string()
      .required(t("enter_email"))
      .min(3, t("username_too_short"))
      .max(20, t("username_too_long")),

    projectRoom_description: yup
      .string()
      .required(t("enter_email"))
      .min(100, t("username_too_short"))
      .max(1000, t("username_too_long")),
  });

  const formik = useFormik({
    initialValues: {
      projectRoom_name: "",
      password: "",
      one: "",
      two: "",
      three: "",
      four: "",
    },
    validationSchema: createProjectValidationSchema,
    isInitialValid: false,
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <div>
      <Title>
        Erstelle deinen <br />
        Projektraum
      </Title>
      <TextField
        id="outlined-name"
        name="projectRoom_name"
        type="projectRoom_name"
        label={t("projectRoom_name")}
        margin="normal"
        variant="outlined"
        multiline
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          width: "80%",
        }}
        value={formik.values.projectRoom_name}
        onChange={formik.handleChange}
        error={outsideClick && Boolean(formik.errors.projectRoom_name)}
        helperText={outsideClick && formik.errors.projectRoom_name}
      />
      <TextField
        id="outlined-name"
        name="projectRoom_description"
        type="projectRoom_description"
        label={t("projectRoom_description")}
        margin="normal"
        multiline
        minRows="10"
        maxRows="12"
        variant="outlined"
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          width: "80%",
        }}
        value={formik.values.projectRoom_description}
        onChange={formik.handleChange}
        error={outsideClick && Boolean(formik.errors.projectRoom_description)}
        helperText={outsideClick && formik.errors.projectRoom_description}
      />
    </div>
  );
};

export default CreateProjectPage1;
