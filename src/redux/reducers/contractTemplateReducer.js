import { createReducer } from "@reduxjs/toolkit";

export const contractTemplateReducer = createReducer(
  {},
  {
    createContractTemplateRequest: (state) => {
      state.loading = true;
    },

    createContractTemplateSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    createContractTemplateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllContractTemplatesRequest: (state) => {
      state.loading = true;
    },

    getAllContractTemplatesSuccess: (state, action) => {
      state.loading = false;
      state.templates = action.payload.templates;
    },

    getAllContractTemplatesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getContractTemplateByIdRequest: (state) => {
      state.loading = true;
    },

    getContractTemplateByIdSuccess: (state, action) => {
      state.loading = false;
      state.template = action.payload.template;
    },

    getContractTemplateByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateContractTemplateRequest: (state) => {
      state.loading = true;
    },

    updateContractTemplateSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    updateContractTemplateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteContractTemplateRequest: (state) => {
      state.loading = true;
    },

    deleteContractTemplateSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    deleteContractTemplateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getContractTemplateOptionsRequest: (state) => {
      state.loading = true;
    },

    getContractTemplateOptionsSuccess: (state, action) => {
      state.loading = false;
      state.templateOptions = action.payload.templateOptions;
    },

    getContractTemplateOptionsFail: (state, action) => {
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
