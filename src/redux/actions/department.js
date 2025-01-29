import axios from "axios";
import { server } from "../store";

export const getDepartment = (id) => async (dispatch) => {
  dispatch({ type: "getDepartmentRequest" });
  try {
    let { data } = await axios.get(`${server}/department/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getDepartmentSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getDepartmentFail",
      payload: error.response.data.message,
    });
  }
};

export const getSignatory = (id) => async (dispatch) => {
  dispatch({ type: "getSignatoryRequest" });
  try {
    let { data } = await axios.get(`${server}/department/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getSignatorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getSignatoryFail",
      payload: error.response.data.message,
    });
  }
};
