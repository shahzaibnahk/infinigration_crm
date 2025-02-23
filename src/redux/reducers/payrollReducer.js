import { createReducer } from "@reduxjs/toolkit";

export const payrollReducer = createReducer(
  {},
  {
    createPayrollRequest: (state) => {
      state.loading = true;
    },
    createPayrollSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createPayrollFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllPayrollRequest: (state) => {
      state.loading = true;
    },
    getAllPayrollSuccess: (state, action) => {
      state.loading = false;
      state.payrolls = action.payload.payrolls;
    },
    getAllPayrollFail: (state) => {
      state.loading = false;
    },

    getPayrollByEmployeeRequest: (state) => {
      state.loading = true;
    },
    getPayrollByEmployeeSuccess: (state, action) => {
      state.loading = false;
      state.payrollByEmployee = action.payload.payroll;
    },
    getPayrollByEmployeeFail: (state) => {
      state.loading = false;
      state.payrollByEmployee = null
    },

    markPayrollAsPaidRequest: (state) => {
      state.loading = true;
    },
    markPayrollAsPaidSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    markPayrollAsPaidFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);
