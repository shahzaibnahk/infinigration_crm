import { createReducer } from "@reduxjs/toolkit";

export const programReducer = createReducer(
  {},
  {
    getProgramAsOptionsRequest: (state) => {
      state.loading = true;
    },

    getProgramAsOptionsSuccess: (state, action) => {
      state.loading = true;
      state.programOptions = action.payload.programOptions;
    },

    getProgramAsOptionsFail: (state, action) => {
      state.loading = true;
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
