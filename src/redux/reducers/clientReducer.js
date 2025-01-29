import { createReducer } from "@reduxjs/toolkit";

export const clientReducer = createReducer(
  {},
  {
    createClientRequest: (state) => {
      state.loading = true;
    },

    createClientSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    createClientFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllClientsRequest: (state) => {
      state.loading = true;
    },

    getAllClientsSuccess: (state, action) => {
      state.loading = false;
      state.clients = action.payload.clients;
    },

    getAllClientsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getClientByIdRequest: (state) => {
      state.loading = true;
    },

    getClientByIdSuccess: (state, action) => {
      state.loading = false;
      state.client = action.payload.client;
    },

    getClientByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    markStageRequest: (state) => {
      state.loading = true;
    },

    markStageSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    markStageFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateClientRequest: (state) => {
      state.loading = true;
    },

    updateClientSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    updateClientFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteClientRequest: (state) => {
      state.loading = true;
    },

    deleteClientSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    deleteClientFail: (state, action) => {
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
