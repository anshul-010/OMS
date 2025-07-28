// actions.js
import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from "./actionType";

export const login = (loginObj) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  return axios
    .post("https://oms-9hsb.onrender.com/api/login", loginObj)
    .then((res) => {
      const { token, isStaff } = res.data;

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, isStaff },
      });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILED });
    });
};
