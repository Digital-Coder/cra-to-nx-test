/** @format */

import { SET_COOKIES } from "../types";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const setCookies = (cookie_settings) => (dispatch) => {
  cookies.set("Cookie_settings", cookie_settings, {
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
    // secure: true,
    // sameSite: "none",
  });

  dispatch({
    type: SET_COOKIES,
    payload: cookie_settings,
  });
};
