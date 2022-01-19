/** @format */

import React, { useState, Fragment, useEffect, useRef, memo } from "react";
import { useDispatch } from "react-redux";
import { SET_AUTHENTICATED } from "../../../redux/types";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import Swipe from "react-easy-swipe";

import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";

//Icons

//Images
import Wirke_mit from "../../../images/headlines/Wirke_mit.png";

import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import RegistrationFormComponent from "./RegistrationFormComponent";
import LoginFormComponent from "./LoginFormComponent";
import { useTranslation } from "react-i18next";
import { getUserData } from "../../../redux/actions/userActions";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  openButton: {
    zIndex: 999,
    backgroundColor: "rgba(155,109,155,0)",
    position: "absolute",
    left: "0%",
    top: "0",

    width: "100%",
    height: "100%",
    borderRadius: "20px",
  },
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgb(255,255,255,0.1)",
    backgroundImage:
      "linear-gradient(to bottom, rgba(255,209,155,0.9), rgba(255,218,83,0.9), #ffffff)",
    backgroundRepeat: "no-repeat",
    padding: 0,
    top: 0,

    overflow: "hidden",
  },

  paper: {
    width: "100vw",
    height: "100%",
    boxShadow: "none",
    position: "fixed",
    top: 0,
    backgroundColor: "transparent",
    margin: "0",
    paddingBottom: "30vh",
  },

  headline: {
    width: "60%",
    marginTop: "10%",
    marginLeft: "20%",
  },
  textfields: {
    zIndex: 9999,
    maxWidth: "600px",
    position: "relative",
    top: "5vh",
  },

  textField: {
    zIndex: "999",
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "5px",
  },
  textField_hide: {
    zIndex: "999",
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "5px",
    display: "none",
  },

  textFieldAge: {
    zIndex: "999",
    width: "38.75%",
    marginLeft: "10%",
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "5px",
  },
  textFieldAge_hide: {
    zIndex: "999",
    width: "38.75%",
    marginLeft: "10%",
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "5px",
    display: "none",
  },
  textFieldSex: {
    zIndex: "999",
    width: "38.75%",
    marginLeft: "2.5%",
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "5px",
  },

  textFieldSex_hide: {
    zIndex: "999",
    width: "38.75%",
    marginLeft: "2.5%",
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "5px",
    display: "none",
  },
  checkField: {
    zIndex: "999",
    width: "90vw",
    marginLeft: "10vw",
  },

  smallText: {
    width: "100%",
    fontSize: "14pt",
    position: "relative",
    top: "0",
    marginBottom: "20px",
    zIndex: "999",
    maxWidth: "600px",
    textAlign: "center",
    cursor: "pointer",
  },

  smallText_fixed: {
    width: "100%",
    fontSize: "14pt",
    position: "fixed",
    bottom: "10px",
    zIndex: "999",
    maxWidth: "600px",
    textAlign: "center",
    cursor: "pointer",
  },

  smallText_fixed_android: {
    width: "100%",
    fontSize: "14pt",
    position: "fixed",
    bottom: "40px",
    marginTop: "20px",
    zIndex: "999",
    maxWidth: "600px",
    textAlign: "center",
  },
  customError: {
    zIndex: "999",
    marginTop: "1em",
    textAlign: "center",
    width: "100%",
    fontSize: "12pt",
    color: "red",
  },

  progress: {
    position: "absolute",
    left: "50%",
    marginLeft: "-15px",
    marginTop: "-4px",
    zIndex: "9999",
  },
  TermsWrapper: {
    whiteSpace: "nowrap",
  },

  data: {
    marginTop: "0.5em",
    marginLeft: "10%",
    width: "80%",
    fontSize: "11pt",
    textAlign: "center",
  },

  forgotWrapper: {
    position: "relative",
    marginTop: "2em",
    textAlign: "center",
    width: "100vw",
    height: "1em",
    fontSize: "12pt",
    backgroundColor: "green",
  },
  forgot: {
    position: "relative",
    marginTop: "1em",
    textAlign: "center",
    width: "100%",
    fontSize: "12pt",
  },
};

const LoginRegistration = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const [toggleSignup, setToggleSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const [outsideClick, setOutsideClick] = useState(false);

  const outerRef = useRef();
  useOnClickOutside(outerRef, () => {
    setOutsideClick(true);

    setTimeout(() => {
      setOutsideClick(false);
    }, 10000);
  });

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.UI.errors) {
  //     setState({ errors: nextProps.UI.errors });
  //   }
  // }

  const loginValidationSchema = yup.object({
    email: yup
      .string()
      .required(t("enter_email"))
      .email(t("enter_valid_email")),

    password: yup.string().required(t("enter_password")),
  });
  const registerValidationSchema = yup.object({
    email: yup
      .string()
      .required(t("enter_email"))
      .email(t("enter_valid_email")),

    password: yup
      .string()
      .required(t("enter_password"))
      .min(8, t("password_8characters"))
      .matches(/\d+/, t("password_with_number")),

    confirmPassword: yup
      .string()
      .required(t("confirmPassword"))
      .oneOf([yup.ref("password"), null], t("passwords_must_match")),
    username: yup
      .string()
      .required(t("enter_username"))
      .min(3, t("username_too_short"))
      .max(20, t("username_too_long"))
      .matches(/^\S*$/, t("spaces_username"))
      .matches(/^[a-zA-Z0-9\-\_\.]*$/, t("username_latin_only")),
  });

  const formikLoginStore = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    validateOnMount: true,
  });

  const formikRegisterStore = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      age: "",
      sex: "",
    },
    validationSchema: registerValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const userInfo = await firebase
      .auth()
      .signInWithEmailAndPassword(
        formikLoginStore.values.email,
        formikLoginStore.values.password
      )

      .then((user) => {
        if (user.user.emailVerified) {
          console.log(user.user.uid);
          setLoading(false);
          dispatch({ type: SET_AUTHENTICATED });
          dispatch(getUserData(user.user.uid));
          console.log(window.location);
          if (window.location.pathname === "/verify") {
            history.push("/");
          }

          setOpen(false);
        } else {
          setLoading(false);
          setErrorMessage(
            "Du hast dedine Email-Adresse noch nicht verifiziert!"
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err.message);
      });

    // dispatch(loginUser(userData, props.history))
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();

    const db = firebase.firestore();
    const usersRef = db.collection("users");
    usersRef
      .where("handle", "==", formikRegisterStore.values.username)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(
              formikRegisterStore.values.email,
              formikRegisterStore.values.password
            );
        } else {
          throw new Error(t("username_taken"));
        }
      })

      .then(async (userCredential) => {
        if (userCredential) {
          await db.collection("users").doc(userCredential.user.uid).set({
            handle: formikRegisterStore.values.username,
            email: formikRegisterStore.values.email,
            age: formikRegisterStore.values.age,
            sex: formikRegisterStore.values.sex,
            createdAt: new Date().toISOString(),
            userId: userCredential.user.uid,
          });
        }
      })
      .then(async () => {
        const user = firebase.auth().currentUser;
        await user.sendEmailVerification();
      })
      .then(async () => {
        const emailWrapper = {
          email: formikRegisterStore.values.email,
        };
        history.push("/verify", emailWrapper);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const handleToggle = () => {
    setToggleSignup(!toggleSignup);
    setErrorMessage("");
  };

  const onSwipeMove = (position) => {
    if (`${position.x}` > 150) {
      setOpen(false);
    }
    if (`${position.y}` > 200) {
      setOpen(false);
    }
  };

  const keySubmitRef = useRef(null);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        // callMyFunction();
        keySubmitRef.current?.click();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <Fragment>
      <ExpandButton
        handleButtonClick={() => setOpen(true)}
        data-cy="open-RegistrationAndLogin"
      ></ExpandButton>

      <Dialog
        open={open}
        width="md"
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
        TransitionComponent={Transition}
      >
        <div ref={outerRef}>
          <CustomIconButton
            name="Close"
            position="fixed"
            margin={document.body.clientWidth > 768 ? "40px" : "10px"}
            left="0"
            handleButtonClick={() => setOpen(false)}
          />

          <Swipe onSwipeMove={onSwipeMove.bind(this)}>
            <img
              src={Wirke_mit}
              className={classes.headline}
              alt="wirke_mit_headline"
            />
            {!toggleSignup ? (
              <LoginFormComponent
                classes={classes}
                loading={loading}
                errorMessage={errorMessage}
                handleToggle={handleToggle}
                handleSubmitLogin={handleSubmitLogin}
                formik={formikLoginStore}
                outsideClick={outsideClick}
                keySubmitRef={keySubmitRef}
              />
            ) : (
              <RegistrationFormComponent
                classes={classes}
                loading={loading}
                errorMessage={errorMessage}
                handleToggle={handleToggle}
                handleSubmitRegister={handleSubmitRegister}
                formik={formikRegisterStore}
                outsideClick={outsideClick}
                keySubmitRef={keySubmitRef}
              />
            )}
          </Swipe>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default memo(withStyles(styles)(LoginRegistration));
