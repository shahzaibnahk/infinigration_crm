import axios from "axios";
import { server } from "../store";

export const createEmployee =
  (
    name,
    fatherName,
    cnic,
    mobile,
    email,
    password,
    gender,
    dob,
    maritalStatus,
    religion,
    nationality,
    jobTitle,
    role,
    salary
  ) =>
  async (dispatch) => {
    dispatch({ type: "createEmployeeRequest" });
    try {
      let { data } = await axios.post(
        `${server}/register`,
        {
          name,
          fatherName,
          cnic,
          mobile,
          email,
          password,
          gender,
          dob,
          maritalStatus,
          religion,
          nationality,
          jobTitle,
          role,
          salary,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "createEmployeeSuccess", payload: data });
    } catch (err) {
      dispatch({
        type: "createEmployeeFail",
        payload: err.response.data.message,
      });
    }
  };

export const getAllEmployees = () => async (dispatch) => {
  dispatch({ type: "getAllEmployeesRequest" });
  try {
    let { data } = await axios.get(`${server}/users`, {
      withCredentials: true,
    });
    dispatch({ type: "getAllEmployeesSuccess", payload: data });
  } catch (err) {
    dispatch({
      type: "getAllEmployeesFail",
      payload: err.response.data.message,
    });
  }
};

export const getUserById = (id) => async (dispatch) => {
  dispatch({ type: "getUserByIdRequest" });
  try {
    let { data } = await axios.get(`${server}/user/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: "getUserByIdSuccess", payload: data });
  } catch (err) {
    dispatch({
      type: "getUserByIdFail",
      payload: err.response.data.message,
    });
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  dispatch({ type: "updateEmployeeRequest" });
  try {
    let { data } = await axios.put(`${server}/user/${id}`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "updateEmployeeSuccess", payload: data });
  } catch (err) {
    dispatch({
      type: "updateEmployeeFail",
      payload: err.response?.data?.message || "Something went wrong",
    });
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  dispatch({ type: "deleteEmployeeRequest" });
  try {
    let { data } = await axios.delete(`${server}/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "deleteEmployeeSuccess", payload: data });
  } catch (err) {
    dispatch({
      type: "deleteEmployeeFail",
      payload: err.response?.data?.message || "Something went wrong",
    });
  }
};
