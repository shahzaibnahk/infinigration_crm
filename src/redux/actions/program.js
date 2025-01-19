import axios from "axios";
import { server } from "../store";

export const getProgramAsOptions = () => async (dispatch) => {
  dispatch({ type: "getProgramAsOptionsRequest" });
  try {
    let { data } = await axios.get(`${server}/program-options`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({ type: "getProgramAsOptionsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getProgramAsOptionsFail",
      payload: error.response.data.message,
    });
  }
};
