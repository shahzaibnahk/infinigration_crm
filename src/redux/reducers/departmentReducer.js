import { createReducer } from "@reduxjs/toolkit";

export const departmentsReducer = createReducer(
  {},
  {
    getDepartmentRequest: (state) => {
      state.loading = true;
    },
    getDepartmentSuccess: (state, action) => {
      state.loading = false;
      state.department = action.payload.department;
    },
    getDepartmentFail: (state) => {
      state.loading = false;
      state.department = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);
