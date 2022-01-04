/** @format */

import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";

import Weblink from "../../molecules/Modals/Post_Edit_ModalComponents/Weblink";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import imageCompression from "browser-image-compression";

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

  const [weblinkOpen, setWeblinkOpen] = useState(false);
  const [weblink, setWeblink] = useState(null);
  const [weblinkTitle, setWeblinkTitle] = useState(null);

  const handleCloseWeblink = () => {
    setWeblinkOpen(false);
    setWeblink(null);
    setWeblinkTitle(null);
  };
  const handleSaveWeblink = () => {
    setWeblinkOpen(false);
  };

  const [fileUrl, setFileUrl] = useState(null);

  async function handleImageUpload(event) {
    const imageFile = event.target.files[0];
    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 0.03,
      maxWidthOrHeight: 700,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(compressedFile.name);
      await fileRef.put(compressedFile);
      setFileUrl(await fileRef.getDownloadURL());
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!fileUrl) {
      return;
    }

    // await db.collection("users").doc(username).set({
    //   name: username,
    //   avatar: fileUrl,
    // });
  };

  return (
    <div>
      <Title>Weitere Informationen für {formik.values.projectRoom_name}</Title>

      <form onSubmit={onSubmit}>
        <input type="file" onChange={(event) => handleImageUpload(event)} />
        <button>Submit</button>
      </form>
      {/* <TextField
        id="outlined-name"
        name="one"
        type="one"
        label={t("projectRoom_name")}
        margin="normal"
        variant="outlined"
        multiline
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          width: "80%",
        }}
        value={formik.values.one}
        onChange={formik.handleChange}
        error={outsideClick && Boolean(formik.errors.one)}
        helperText={outsideClick && formik.errors.one}
      /> */}

      <CustomIconButton
        name="Weblink"
        position="relative"
        top="20px"
        marginLeft="10%"
        iconWidth="80%"
        backgroundColor={
          weblink !== null && weblinkTitle !== null ? "#fed957" : "white"
        }
        handleButtonClick={() => setWeblinkOpen(true)}
      />

      {weblinkOpen && (
        <Weblink
          handleCloseWeblink={handleCloseWeblink}
          handleSaveWeblink={handleSaveWeblink}
          weblinkTitle={weblinkTitle}
          weblink={weblink}
          setWeblinkTitle={setWeblinkTitle}
          setWeblink={setWeblink}
          setWeblinkOpen={setWeblinkOpen}
        />
      )}
    </div>
  );
};

export default CreateProjectPage1;
