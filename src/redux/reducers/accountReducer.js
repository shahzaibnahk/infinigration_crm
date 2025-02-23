import { createReducer } from "@reduxjs/toolkit";
import { getAccountById, getAllAccounts } from "../actions/account";

export const accountReducer = createReducer(
  {},
  {
    createAccountRequest: (state) => {
      state.loading = true;
    },

    createAccountSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    createAccountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllAccountsRequest: (state) => {
      state.loading = true;
    },

    getAllAccountsSuccess: (state, action) => {
      state.loading = false;
      state.accounts = action.payload.accounts;
    },

    getAllAccountsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAccountByIdRequest: (state) => {
      state.loading = true;
    },

    getAccountByIdSuccess: (state, action) => {
      state.loading = false;
      state.account = action.payload.account;
    },

    getAccountByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateAccountRequest: (state) => {
      state.loading = true;
    },

    updateAccountSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    updateAccountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addOwnerCapitalRequest: (state) => {
      state.loading = true;
    },

    addOwnerCapitalSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    addOwnerCapitalFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addExpenseRequest: (state) => {
      state.loading = true;
    },

    addExpenseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    addExpenseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteAccountRequest: (state) => {
      state.loading = true;
    },
    deleteAccountSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteAccountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getTransactionsByTypeRequest: (state) => {
      state.loading = true;
    },
    getTransactionsByTypeSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload.transactions;
    },

    getTransactionsByTypeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getTransactionsByCategoryRequest: (state) => {
      state.loading = true;
    },
    getTransactionsByCategorySuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload.transactions;
    },

    getTransactionsByCategoryFail: (state, action) => {
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
