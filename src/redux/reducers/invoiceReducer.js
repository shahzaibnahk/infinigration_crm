import { createReducer } from "@reduxjs/toolkit";

export const invoiceReducer = createReducer(
  {},
  {
    getInstallmentsByClientRequest: (state) => {
      state.loading = true;
    },

    getInstallmentsByClientSuccess: (state, action) => {
      state.loading = false;
      state.installments = action.payload.installments;
    },
    getInstallmentsByClientFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createInvoiceRequest: (state) => {
      state.loading = true;
    },
    createInvoiceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createInvoiceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllInvoicesRequest: (state) => {
      state.loading = true;
    },

    getAllInvoicesSuccess: (state, action) => {
      state.loading = false;
      state.invoices = action.payload.invoices;
    },

    getAllInvoicesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getInvoiceByIdRequest: (state) => {
      state.loading = true;
    },

    getInvoiceByIdSuccess: (state, action) => {
      state.loading = false;
      state.invoice = action.payload.invoice;
    },

    getInvoiceByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    markInvoicePaidRequest: (state) => {
      state.loading = true;
    },

    markInvoicePaidSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    markInvoicePaidFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateInvoiceRequest: (state) => {
      state.loading = true;
    },
    updateInvoiceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateInvoiceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteInvoiceRequest: (state) => {
      state.loading = true;
    },
    deleteInvoiceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteInvoiceFail: (state, action) => {
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
