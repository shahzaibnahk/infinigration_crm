import axios from "axios";
import { server } from "../store";

export const getMarketingStats = () => async (dispatch) => {
  dispatch({ type: "getMarketingStatsRequest" });
  try {
    let { data } = await axios.get(`${server}/marketing/stats`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getMarketingStatsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getMarketingStatsFail",
      payload: error.response.data.message,
    });
  }
};

export const getSalesStats = (date) => async (dispatch) => {
  dispatch({ type: "getSalesStatsRequest" });
  try {
    let { data } = await axios.get(`${server}/sales/stats?date=${date}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getSalesStatsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getSalesStatsFail",
      payload: error.response.data.message,
    });
  }
};
