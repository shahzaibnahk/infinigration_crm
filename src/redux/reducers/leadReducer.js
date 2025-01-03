import { createReducer } from "@reduxjs/toolkit";

export const leadReducer = createReducer(
  {},
  {
    createLeadRequest: (state) => {
      state.loading = true;
    },
    createLeadSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    createLeadFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      },
    
    getAllLeadsRequest: (state) => {
      state.loading = true;
    },
    getAllLeadsSuccess: (state, action) => {
      state.loading = false;
      state.leads = action.payload.leads;
    },

    getAllLeadsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getLeadByIdRequest: (state) => {
      state.loading = true;
    },
    getLeadByIdSuccess: (state, action) => {
      state.loading = false;
      state.lead = action.payload.lead;
    },

    getLeadByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateLeadRequest: (state) => {
      state.loading = true;
    },
    updateLeadSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    updateLeadFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteLeadRequest: (state) => {
      state.loading = true;
    },
    deleteLeadSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    deleteLeadFail: (state, action) => {
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
