import axios from "axios";
import { server } from "../store";

export const createSubAgent = (name, email, date) => async (dispatch) => {
  dispatch({ type: "createSubagentRequest" });
  try {
    let { data } = await axios.post(
      `${server}/subagent`,
      {
        name,
        email,
        date,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "createSubagentSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createSubagentFail",
      payload: error.response.data.message,
    });
  }
};
export const getAllSubagents = () => async (dispatch) => {
  dispatch({ type: "getAllSubagentsRequest" });
  try {
    let { data } = await axios.get(`${server}/subagents`, {
      withCredentials: true,
    });
    dispatch({ type: "getAllSubagentsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllSubagentsFail",
      payload: error.response.data.message,
    });
  }
};
export const getSubagentById = (id) => async (dispatch) => {
  dispatch({ type: "getSubagentByIdRequest" });
  try {
    let { data } = await axios.get(`${server}/subagent/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: "getSubagentByIdSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getSubagentByIdFail",
      payload: error.response.data.message,
    });
  }
};
export const addSubagentPayment = () => async (dispatch) => {
  dispatch({ type: "addSubagentPaymentRequest" });
  try {
    let { data } = await axios.put(`${server}/subagent/payment`, {
      withCredentials: true,
    });
    dispatch({ type: "addSubagentPaymentSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addSubagentPaymentFail",
      payload: error.response.data.message,
    });
  }
};
export const updateSubagent = (id, name, email, date) => async (dispatch) => {
  dispatch({ type: "updateSubagentRequest" });
  try {
    let { data } = await axios.put(
      `${server}/subagent/${id}`,
      {
        name,
        email,
        date,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "updateSubagentSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateSubagentFail",
      payload: error.response.data.message,
    });
  }
};

export const updateSubgent = (id, name, email, date) => async (dispatch) => {
  dispatch({ type: "updateSubagentRequest" });
  try {
    await axios.put(
      `${server}/subagent/${id}`,
      {
        name,
        email,
        date,
      },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: "updateSubagentSuccess" });
  } catch (error) {
    dispatch({
      type: "updateSubagentFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteSubagent = (id) => async (dispatch) => {
  dispatch({ type: "deleteSubagentRequest" });
  try {
    await axios.delete(`${server}/subagent/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: "deleteSubagentSuccess" });
  } catch (error) {
    dispatch({
      type: "deleteSubagentFail",
      payload: error.response.data.message,
    });
  }
};
