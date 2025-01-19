import axios from "axios";
import { server } from "../store";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: "loginRequest" });
  try {
    let { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};

export const getMyProfile = () => async (dispatch) => {
  dispatch({ type: "loadUserRequest" });
  try {
    let { data } = await axios.get(`${server}/me`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFail", payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "logoutRequest" });
  try {
    let { data } = await axios.get(`${server}/logout`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    dispatch({ type: "logoutSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response.data.message });
  }
};

export const getMyLogs = (date) => async (dispatch) => {
  dispatch({ type: "getMyLogsRequest" });
  try {
    let { data } = await axios.get(`${server}/my-logs?date=${date}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    dispatch({ type: "getMyLogsSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "getMyLogsFail", payload: error.response.data.message });
  }
};

export const getMyAttendance = (date) => async (dispatch) => {
  dispatch({ type: "getMyAttendanceRequest" });
  try {
    let { data } = await axios.get(`${server}/my-attendance?date=${date}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    dispatch({ type: "getMyAttendanceSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getMyAttendanceFail",
      payload: error.response.data.message,
    });
  }
};

export const markAttendance = (id, date) => async (dispatch) => {
  dispatch({ type: "markAttendanceRequest" });
  try {
    let { data } = await axios.put(
      `${server}/mark-attendance/${id}?date=${date}`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: "markAttendanceSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "markAttendanceFail",
      payload: error.response.data.message,
    });
  }
};
