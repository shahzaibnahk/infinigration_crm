import { createReducer } from "@reduxjs/toolkit";

export const vendorReducer = createReducer(
  {},
  {
    createVendorRequest: (state) => {
      state.loading = true;
    },
    createVendorSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createVendorFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllVendorsRequest: (state) => {
      state.loading = true;
    },
    getAllVendorsSuccess: (state, action) => {
      state.loading = false;
      state.vendors = action.payload.vendors;
    },

    getAllVendorsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getVendorByIdRequest: (state) => {
      state.loading = true;
    },
    getVendorByIdSuccess: (state, action) => {
      state.loading = false;
      state.vendor = action.payload.vendor;
    },
    getVendorByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateVendorRequest: (state) => {
      state.loading = true;
    },

    updateVendorSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    updateVendorFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteVendorRequest: (state) => {
      state.loading = true;
    },
    deleteVendorSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteVendorFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addVendorPaymentRequest: (state) => {
      state.loading = true;
    },
    addVendorPaymentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    addVendorPaymentFail: (state, action) => {
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
