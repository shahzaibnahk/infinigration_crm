import axios from "axios";
import { server } from "../store";

export const createLead = (name, city, phone, source, date) => async (dispatch) => {
  dispatch({ type: "createLeadRequest" });
  try {
    let { data } = await axios.post(
      `${server}/create-lead`,
      { name, city, phone, source, date },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "createLeadSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "createLeadFail", payload: error.response.data.message });
  }
};

export const bulkUploadLead = (leads) => async (dispatch) => {
  dispatch({ type: "bulkUploadLeadsRequest" });
  try {
    let { data } = await axios.post(
      `${server}/bulk-upload-leads`,
      { leads },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "bulkUploadLeadsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "bulkUploadLeadsFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllLeads = (date, filter) => async (dispatch) => {
  dispatch({ type: "getAllLeadsRequest" });
  try {
    let { data } = await axios.get(
      `${server}/leads?date=${date}&filter=${filter}`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "getAllLeadsSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "getAllLeadsFail", payload: error.response.data.message });
  }
};

export const getLeadById = (id) => async (dispatch) => {
  dispatch({ type: "getLeadByIdRequest" });
  try {
    let { data } = await axios.get(
      `${server}/lead/${id}`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "getLeadByIdSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "getLeadByIdFail", payload: error.response.data.message });
  }
};

export const updateLead =
  (id, name, city, phone, source) => async (dispatch) => {
    dispatch({ type: "updateLeadRequest" });
    try {
      let { data } = await axios.put(
        `${server}/lead/${id}`,
        { name, city, phone, source },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch({ type: "updateLeadSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "updateLeadFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteLead = (id) => async (dispatch) => {
  dispatch({ type: "deleteLeadRequest" });
  try {
    let { data } = await axios.delete(
      `${server}/lead/${id}`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "deleteLeadSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "deleteLeadFail", payload: error.response.data.message });
  }
};

export const assignLeads = (leads, employee) => async (dispatch) => {
  dispatch({ type: "assignLeadsRequest" });
  try {
    let { data } = await axios.put(
      `${server}/assign-leads`,
      { leads, employee },

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "assignLeadsSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "assignLeadsFail", payload: error.response.data.message });
  }
};
