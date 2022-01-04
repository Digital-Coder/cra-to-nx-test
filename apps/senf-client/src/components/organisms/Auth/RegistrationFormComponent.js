/** @format */

import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";

const RegistrationFormComponent = ({
  loading,
  classes,
  errorMessage,
  handleToggle,
  handleSubmitRegister,
  formik,
  outsideClick,
}) => {
  const { t } = useTranslation();

  return (
    <form noValidate>
      <div className={classes.textfields}>
        <div className={classes.smallText} onClick={() => handleToggle()}>
          {t("alreadyMember")}{" "}
          <span className="Terms" data-cy="login">
            {t("login")}
          </span>
        </div>
        <TextField
          id="email"
          name="email"
          type="email"
          label="E-Mail"
          margin="dense"
          variant="outlined"
          className={classes.textField}
          helperText={outsideClick && formik.errors.email}
          error={outsideClick && Boolean(formik.errors.email)}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
        ></TextField>
        <TextField
          id="password"
          name="password"
          type="password"
          label={t("password")}
          margin="dense"
          variant="outlined"
          className={classes.textField}
          helperText={outsideClick && formik.errors.password}
          error={outsideClick && Boolean(formik.errors.password)}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
        ></TextField>
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label={t("confirmPassword")}
          margin="dense"
          variant="outlined"
          className={classes.textField}
          helperText={outsideClick && formik.errors.confirmPassword}
          error={outsideClick && Boolean(formik.errors.confirmPassword)}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
        ></TextField>
        <TextField
          id="handle"
          name="username"
          type="text"
          label={t("username")}
          margin="dense"
          variant="outlined"
          className={
            formik.values.confirmPassword === ""
              ? classes.textField_hide
              : classes.textField
          }
          helperText={outsideClick && formik.errors.username}
          error={outsideClick && Boolean(formik.errors.username)}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
        ></TextField>

        <FormControl
          variant="outlined"
          className={
            formik.values.username === ""
              ? classes.textFieldAge_hide
              : classes.textFieldAge
          }
        >
          <InputLabel margin="dense" htmlFor="outlined-age-native-simple">
            {t("birthyear")}
          </InputLabel>
          <Select
            native
            margin="dense"
            value={formik.values.age}
            onChange={formik.handleChange}
            label={t("gender")}
            id="standard-textarea"
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple",
            }}
          >
            <option aria-label="None" value="" />
            <option value={"2004"}>2004</option>
            <option value={"2003"}>2003</option>
            <option value={"2002"}>2002</option>
            <option value={"2001"}>2001</option>
            <option value={"2000"}>2000</option>
            <option value={"1999"}>1999</option>
            <option value={"1998"}>1998</option>
            <option value={"1997"}>1997</option>
            <option value={"1996"}>1996</option>
            <option value={"1995"}>1995</option>
            <option value={"1994"}>1994</option>
            <option value={"1993"}>1993</option>
            <option value={"1992"}>1992</option>
            <option value={"1991"}>1991</option>
            <option value={"1990"}>1990</option>
            <option value={"1989"}>1989</option>
            <option value={"1988"}>1988</option>
            <option value={"1987"}>1987</option>
            <option value={"1986"}>1986</option>
            <option value={"1985"}>1985</option>
            <option value={"1984"}>1984</option>
            <option value={"1983"}>1983</option>
            <option value={"1982"}>1982</option>
            <option value={"1981"}>1981</option>
            <option value={"1980"}>1980</option>
            <option value={"1979"}>1979</option>
            <option value={"1978"}>1978</option>
            <option value={"1977"}>1977</option>
            <option value={"1976"}>1976</option>
            <option value={"1975"}>1975</option>
            <option value={"1974"}>1974</option>
            <option value={"1973"}>1973</option>
            <option value={"1972"}>1972</option>
            <option value={"1971"}>1971</option>
            <option value={"1970"}>1970</option>
            <option value={"1969"}>1969</option>
            <option value={"1968"}>1968</option>
            <option value={"1967"}>1967</option>
            <option value={"1966"}>1966</option>
            <option value={"1965"}>1965</option>
            <option value={"1964"}>1964</option>
            <option value={"1963"}>1963</option>
            <option value={"1962"}>1962</option>
            <option value={"1961"}>1961</option>
            <option value={"1960"}>1960</option>
            <option value={"1959"}>1959</option>
            <option value={"1958"}>1958</option>
            <option value={"1957"}>1957</option>
            <option value={"1956"}>1956</option>
            <option value={"1955"}>1955</option>
            <option value={"1954"}>1954</option>
            <option value={"1953"}>1953</option>
            <option value={"1952"}>1952</option>
            <option value={"1951"}>1951</option>
            <option value={"1950"}>1950</option>
            <option value={"1949"}>1949</option>
            <option value={"1948"}>1948</option>
            <option value={"1947"}>1947</option>
            <option value={"1946"}>1946</option>
            <option value={"1945"}>1945</option>
            <option value={"1944"}>1944</option>
            <option value={"1943"}>1943</option>
            <option value={"1942"}>1942</option>
            <option value={"1941"}>1941</option>
            <option value={"1940"}>1940</option>
            <option value={"1939"}>1939</option>
            <option value={"1938"}>1938</option>
            <option value={"1937"}>1937</option>
            <option value={"1936"}>1936</option>
            <option value={"1935"}>1935</option>
            <option value={"1934"}>1934</option>
            <option value={"1933"}>1933</option>
            <option value={"1932"}>1932</option>
            <option value={"1931"}>1931</option>
            <option value={"1930"}>1930</option>
            <option value={"1929"}>1929</option>
            <option value={"1928"}>1928</option>
            <option value={"1927"}>1927</option>
            <option value={"1926"}>1926</option>
            <option value={"1925"}>1925</option>
            <option value={"1924"}>1924</option>
            <option value={"1923"}>1923</option>
            <option value={"1922"}>1922</option>
            <option value={"1921"}>1921</option>
            <option value={"1920"}>1920</option>
            <option value={"1919"}>1919</option>
            <option value={"1918"}>1918</option>
            <option value={"1917"}>1917</option>
            <option value={"1916"}>1916</option>
            <option value={"1915"}>1915</option>
            <option value={"1914"}>1914</option>
            <option value={"1913"}>1913</option>
            <option value={"1912"}>1912</option>
            <option value={"1911"}>1911</option>
            <option value={"1910"}>1910</option>
            <option value={"1909"}>1909</option>
            <option value={"1908"}>1908</option>
            <option value={"1907"}>1907</option>
            <option value={"1906"}>1906</option>
            <option value={"1905"}>1905</option>
            <option value={"1904"}>1904</option>
            <option value={"1903"}>1903</option>
            <option value={"1902"}>1902</option>
            <option value={"1901"}>1901</option>
            <option value={"1900"}>1900</option>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          className={
            formik.values.username === ""
              ? classes.textFieldSex_hide
              : classes.textFieldSex
          }
        >
          <InputLabel margin="dense" htmlFor="outlined-age-native-simple">
            {t("gender")}
          </InputLabel>
          <Select
            native
            margin="dense"
            value={formik.values.sex}
            onChange={formik.handleChange}
            label={t("gender")}
            id="standard-textarea"
            inputProps={{
              name: "sex",
              id: "outlined-age-native-simple",
            }}
          >
            <option aria-label="None" value="" />
            <option value={"female"}>{t("female")}</option>
            <option value={"male"}>{t("male")}</option>
            <option value={"diverse"}>{t("diverse")}</option>
          </Select>
        </FormControl>
        {errorMessage && (
          <Typography className={classes.customError}>
            {errorMessage}
          </Typography>
        )}
        <div className={classes.data}>
          {t("terms_understood")} &nbsp;
          <a className="Terms" href="/agb" target="_blank">
            {t("termsAndConditions")}
          </a>
          &nbsp; {t("andThe")} &nbsp;
          <a className="Terms" href="/datenschutz" target="_blank">
            {t("dataPrivacy")}
          </a>
          &nbsp; {t("terms_agreed")}
          {/* Ich bestätige außerdem, dass ich mindestens 18 Jahre alt bin */}
        </div>
      </div>
      <div style={loading || !formik.isValid ? { pointerEvents: "none" } : {}}>
        <SubmitButton
          text={t("register")}
          zIndex="9"
          backgroundColor="white"
          textColor="#353535"
          position="relative"
          top={document.body.clientWidth > 768 ? "100px" : "50px"}
          left="0"
          loading={loading}
          handleButtonClick={handleSubmitRegister}
          disabled={loading || !formik.isValid}
        />
      </div>
      {/* <div
        className={
          isAndroid ? classes.smallText_fixed_android : classes.smallText_fixed
        }
        onClick={() => handleToggle()}
      >
        {t('alreadyMember')} <span className="Terms"> {t('login')}</span>
      </div> */}
    </form>
  );
};

export default RegistrationFormComponent;
