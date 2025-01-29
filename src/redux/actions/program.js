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

export const createProgram =
  (
    country,
    title,
    durationOfWorkPermit,
    currency,
    totalCost,
    deduction,
    processDuration,
    jobs,
    documents,
    requirements,
    benefits,
    timelineProcess,
    date
  ) =>
  async (dispatch) => {
    dispatch({ type: "createProgramRequest" });
    try {
      let { data } = await axios.post(
        `${server}/program`,
        {
          country,
          title,
          durationOfWorkPermit,
          currency,
          totalCost,
          deduction,
          processDuration,
          jobs,
          documents,
          requirements,
          benefits,
          timelineProcess,
          date,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch({ type: "createProgramSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "createProgramFail",
        payload: error.response.data.message,
      });
    }
  };

export const getAllPrograms = () => async (dispatch) => {
  dispatch({ type: "getAllProgramsRequest" });
  try {
    let { data } = await axios.get(`${server}/programs`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({ type: "getAllProgramsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllProgramsFail",
      payload: error.response.data.message,
    });
  }
};

export const getProgramById = (id) => async (dispatch) => {
  dispatch({ type: "getProgramByIdRequest" });
  try {
    let { data } = await axios.get(`${server}/program/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({ type: "getProgramByIdSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getProgramByIdFail",
      payload: error.response.data.message,
    });
  }
};

export const updateProgram =
  (
    id,
    country,
    title,
    durationOfWorkPermit,
    currency,
    totalCost,
    deduction,
    processDuration,
    jobs,
    documents,
    requirements,
    benefits,
    timelineProcess,
    date
  ) =>
  async (dispatch) => {
    dispatch({ type: "updateProgramRequest" });
    try {
      let { data } = await axios.put(
        `${server}/program/${id}`,
        {
          country,
          title,
          durationOfWorkPermit,
          currency,
          totalCost,
          deduction,
          processDuration,
          jobs,
          documents,
          requirements,
          benefits,
          timelineProcess,
          date,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch({ type: "updateProgramSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "updateProgramFail",
        payload: error.response.data.message,
      });
    }
  };

export const changeProgramStatus = (id, date) => async (dispatch) => {
  dispatch({ type: "changeProgramRequest" });
  try {
    let { data } = await axios.put(
      `${server}/program/${id}/change-status`,
      { date },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "changeProgramSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "changeProgramFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteProgram = (id, date) => async (dispatch) => {
  dispatch({ type: "deleteProgramRequest" });
  try {
    let { data } = await axios.delete(`${server}/program/${id}?date=${date}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({ type: "deleteProgramSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteProgramFail",
      payload: error.response.data.message,
    });
  }
};
