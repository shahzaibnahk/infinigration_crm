import { createReducer } from "@reduxjs/toolkit";

export const programReducer = createReducer(
  {},
  {
    getProgramAsOptionsRequest: (state) => {
      state.loading = true;
    },

    getProgramAsOptionsSuccess: (state, action) => {
      state.loading = false;
      state.programOptions = action.payload.programOptions;
    },

    getProgramAsOptionsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllProgramsRequest: (state) => {
      state.loading = true;
    },

    getAllProgramsSuccess: (state, action) => {
      state.loading = false;
      state.programs = action.payload.programs;
    },

    getAllProgramsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getProgramByIdRequest: (state) => {
      state.loading = true;
    },

    getProgramByIdSuccess: (state, action) => {
      state.loading = false;
      state.program = action.payload.program;
    },

    getProgramByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createProgramRequest: (state) => {
      state.loading = true;
    },

    createProgramSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    createProgramFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateProgramRequest: (state) => {
      state.loading = true;
    },

    updateProgramSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    updateProgramFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    changeProgramRequest: (state) => {
      state.loading = true;
    },

    changeProgramSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    changeProgramFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteProgramRequest: (state) => {
      state.loading = true;
    },

    deleteProgramSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    deleteProgramFail: (state, action) => {
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
