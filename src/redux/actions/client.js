import axios from "axios";
import { server } from "../store";

export const createClient =
  (
    lead,
    contractTemplate,
    installments,
    operationsHead,
    operationsSubordinate,
    discount,
    signatory,
    date
  ) =>
  async (dispatch) => {
    dispatch({ type: "createClientRequest" });
    try {
      let { data } = await axios.post(
        `${server}/client`,
        {
          lead,
          contractTemplate,
          installments,
          operationsHead,
          operationsSubordinate,
          discount,
          signatory,
          date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({ type: "createClientSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "createClientFail",
        payload: error.response.data.message,
      });
    }
  };

export const getAllClients = () => async (dispatch) => {
  dispatch({ type: "getAllClientsRequest" });
  try {
    let { data } = await axios.get(`${server}/clients`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getAllClientsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllClientsFail",
      payload: error.response.data.message,
    });
  }
};

export const getClientAsOptions = () => async (dispatch) => {
  dispatch({ type: "getClientAsOptionsRequest" });
  try {
    let { data } = await axios.get(`${server}/clients-options`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getClientAsOptionsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getClientAsOptionsFail",
      payload: error.response.data.message,
    });
  }
};

export const getClientById = (id) => async (dispatch) => {
  dispatch({ type: "getClientByIdRequest" });
  try {
    let { data } = await axios.get(`${server}/operation/client/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getClientByIdSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getClientByIdFail",
      payload: error.response.data.message,
    });
  }
};

export const markStageCompleted =
  (id, date, tId, status) => async (dispatch) => {
    dispatch({ type: "markStageRequest" });
    try {
      let { data } = await axios.put(
        `${server}/client/${id}/mark-stage-complete?date=${date}&tId=${tId}&status=${status}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({ type: "markStageSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "markStageFail",
        payload: error.response.data.message,
      });
    }
  };

export const updateClient =
  (
    id,
    contractTemplate,
    installments,
    operationsHead,
    operationsSubordinate,
    signatory,
    discount,
    date
  ) =>
  async (dispatch) => {
    console.log(id);
    dispatch({ type: "updateClientRequest" });
    try {
      let { data } = await axios.put(
        `${server}/operations/client/${id}`,
        {
          id,
          contractTemplate,
          installments,
          operationsHead,
          operationsSubordinate,
          signatory,
          discount,
          date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({ type: "updateClientSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "updateClientFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteClient = (id, date) => async (dispatch) => {
  dispatch({ type: "deleteClientRequest" });
  try {
    let { data } = await axios.delete(
      `${server}/client/${id}?date=${date}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({ type: "deleteClientSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteClientFail",
      payload: error.response.data.message,
    });
  }
};
