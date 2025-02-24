import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer(
  {},
  {
    createEmployeeRequest: (state) => {
      state.loading = true;
    },
    createEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createEmployeeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllEmployeesRequest: (state) => {
      state.loading = true;
    },
    getAllEmployeesSuccess: (state, action) => {
      state.loading = false;
      state.employees = action.payload.users;
    },
    getAllEmployeesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getUserByIdRequest: (state) => {
      state.loading = true;
    },

    getUserByIdSuccess: (state, action) => {
      state.loading = false;
      state.employee = action.payload.user;
    },

    getUserByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateEmployeeRequest: (state) => {
      state.loading = true;
    },
    updateEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateEmployeeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteEmployeeRequest: (state) => {
      state.loading = true;
    },
    deleteEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteEmployeeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
