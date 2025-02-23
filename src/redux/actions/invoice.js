import axios from "axios";
import { server } from "../store";

export const getInstallmentsByClient = (id) => async (dispatch) => {
  dispatch({ type: "getInstallmentsByClientRequest" });
  try {
    let { data } = await axios.get(`${server}/client/${id}/installments`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getInstallmentsByClientSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getInstallmentsByClientFail",
      payload: error.response.data.message,
    });
  }
};

export const createInvoice =
  (
    client,
    currency,
    invoiceItem,
    date,
    salesCommission,
    operationsHeadCommission,
    operationsSubordinateCommission
  ) =>
  async (dispatch) => {
    dispatch({ type: "createInvoiceRequest" });
    try {
      let { data } = await axios.post(
        `${server}/invoice`,
        {
          client,
          currency,
          invoiceItem,
          date,
          salesCommission,
          operationsHeadCommission,
          operationsSubordinateCommission,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "createInvoiceSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "createInvoiceFail",
        payload: error.response.data.message,
      });
    }
  };
export const getAllInvoices = (date) => async (dispatch) => {
  dispatch({ type: "getAllInvoicesRequest" });
  try {
    let { data } = await axios.get(`${server}/invoices?date=${date}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "getAllInvoicesSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllInvoicesFail",
      payload: error.response.data.message,
    });
  }
};

export const getInvoiceById = (id) => async (dispatch) => {
  dispatch({ type: "getInvoiceByIdRequest" });
  try {
    let { data } = await axios.get(`${server}/invoice/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "getInvoiceByIdSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getInvoiceByIdFail",
      payload: error.response.data.message,
    });
  }
};

export const updateInvoice =
  (
    id,
    date,
    client,
    currency,
    invoiceItem,
    salesCommission,
    operationsHeadCommission,
    operationsSubordinateCommission
  ) =>
  async (dispatch) => {
    dispatch({ type: "updateInvoiceRequest" });
    try {
      let { data } = await axios.put(
        `${server}/invoice/${id}?date=${date}`,
        {
          client,
          currency,
          invoiceItem,
          salesCommission,
          operationsHeadCommission,
          operationsSubordinateCommission,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "updateInvoiceSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "updateInvoiceFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteInvoice = (id, date) => async (dispatch) => {
  dispatch({ type: "deleteInvoiceRequest" });
  try {
    let { data } = await axios.delete(`${server}/invoice/${id}?date=${date}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "deleteInvoiceSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteInvoiceFail",
      payload: error.response.data.message,
    });
  }
};

export const markInvoicePaid = (id, formdata) => async (dispatch) => {
  dispatch({ type: "markInvoicePaidRequest" });
  try {
    let { data } = await axios.put(
      `${server}/invoice/${id}/mark-paid`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "markInvoicePaidSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "markInvoicePaidFail",
      payload: error.response.data.message,
    });
  }
};
