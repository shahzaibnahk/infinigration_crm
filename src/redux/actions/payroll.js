import axios from "axios";
import { server } from "../store";

export const getAllPayrolls = (date) => async (dispatch) => {
  dispatch({ type: "getAllPayrollRequest" });
  try {
    let { data } = await axios.get(`${server}/payrolls?date=${date}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({ type: "getAllPayrollSuccess", payload: data });
  } catch (err) {
    dispatch({
      type: "getAllPayrollFail",
      payload: err.response.data.message,
    });
  }
};

export const getPayrollById = (id) => async (dispatch) => {
  dispatch({ type: "getPayrollByIdRequest" });
  try {
    let { data } = await axios.get(`${server}/payroll/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({ type: "getPayrollByIdSuccess", payload: data });
  } catch (err) {
    dispatch({
      type: "getPayrollByIdFail",
      payload: err.response.data.message,
    });
  }
};

export const getPayrollByEmployee = (id) => async (dispatch) => {
  dispatch({ type: "getPayrollByEmployeeRequest" });
  try {
    let { data } = await axios.get(`${server}/payroll/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({ type: "getPayrollByEmployeeSuccess", payload: data });
  } catch (err) {
    dispatch({
      type: "getPayrollByEmployeeFail",
      payload: err.response.data.message,
    });
  }
};

export const markPayrollPaid = (id) => async (dispatch) => {
  dispatch({ type: "markPayrollPaidRequest" });
  try {
    let { data } = await axios.put(
      `${server}/payroll/${id}`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "markPayrollPaidSuccess", payload: data });
  } catch (err) {
    dispatch({
      type: "markPayrollPaidFail",
      payload: err.response.data.message,
    });
  }
};
