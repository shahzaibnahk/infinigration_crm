import { createReducer } from "@reduxjs/toolkit";

export const subAgentReducer = createReducer(
  {},
  {
    createSubagentRequest: (state) => {
      state.loading = true;
    },
    createSubagentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createSubagentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllSubagentsRequest: (state) => {
      state.loading = true;
    },
    getAllSubagentsSuccess: (state, action) => {
      state.loading = false;
      state.subagents = action.payload.subagents;
    },
    getAllSubagentsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getSubagentByIdRequest: (state) => {
      state.loading = true;
    },
    getSubagentByIdSuccess: (state, action) => {
      state.loading = false;
      state.subagent = action.payload.subagent;
    },
    getSubagentByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSubagentPaymentRequest: (state) => {
      state.loading = true;
    },
    addSubagentPaymentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    addSubagentPaymentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSubagentPaymentRequest: (state) => {
      state.loading = true;
    },
    updateSubagentPaymentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateSubagentPaymentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteSubagentPaymentRequest: (state) => {
      state.loading = true;
    },
    deleteSubagentPaymentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteSubagentPaymentFail: (state, action) => {
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
