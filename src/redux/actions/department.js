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
