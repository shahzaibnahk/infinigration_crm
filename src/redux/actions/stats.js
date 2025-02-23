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

export const getOperationsStats = (date) => async (dispatch) => {
  dispatch({ type: "getOperationsStatsRequest" });
  try {
    let { data } = await axios.get(`${server}/operation/stats?date=${date}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getOperationsStatsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getOperationsStatsFail",
      payload: error.response.data.message,
    });
  }
};

export const getFinanceStats = (date) => async (dispatch) => {
  dispatch({ type: "getFinanceStatsRequest" });
  try {
    let { data } = await axios.get(`${server}/finance/stats?date=${date}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getFinanceStatsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getFinanceStatsFail",
      payload: error.response.data.message,
    });
  }
};
