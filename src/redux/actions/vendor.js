import axios from "axios";
import { server } from "../store";

export const createVendor =
  (name, email, country, programs, date) => async (dispatch) => {
    dispatch({ type: "createVendorRequest" });
    try {
      let { data } = await axios.post(
        `${server}/vendor`,
        { name, email, country, programs, date },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "createVendorSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "createVendorFail",
        payload: error.response.data.message,
      });
    }
  };
export const getAllVendors = () => async (dispatch) => {
  dispatch({ type: "getAllVendorsRequest" });
  try {
    let { data } = await axios.get(`${server}/vendors`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "getAllVendorsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllVendorsFail",
      payload: error.response.data.message,
    });
  }
};

export const getVendorById = (id) => async (dispatch) => {
  dispatch({ type: "getVendorByIdRequest" });
  try {
    let { data } = await axios.get(`${server}/vendor/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "getVendorByIdSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getVendorByIdFail",
      payload: error.response.data.message,
    });
  }
};

export const updateVendor =
  (id, name, email, country, currency, programs, date) => async (dispatch) => {
    dispatch({ type: "updateVendorRequest" });
    try {
      let { data } = await axios.put(
        `${server}/vendor/${id}?date=${date}`,
        { name, email, country, currency, programs },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "updateVendorSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "updateVendorFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteVendor = (id, date) => async (dispatch) => {
  dispatch({ type: "deleteVendorRequest" });
  try {
    await axios.delete(`${server}/vendor/${id}?date=${date}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "deleteVendorSuccess" });
  } catch (error) {
    dispatch({
      type: "deleteVendorFail",
      payload: error.response.data.message,
    });
  }
};

export const addVendorPayment = (formdata, date) => async (dispatch) => {
  dispatch({ type: "addVendorPaymentRequest" });
  try {
    let { data } = await axios.put(
      `${server}/vendor/payment?date=${date}`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "addVendorPaymentSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addVendorPaymentFail",
      payload: error.response.data.message,
    });
  }
};
