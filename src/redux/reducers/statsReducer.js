import { createReducer } from "@reduxjs/toolkit";

export const statsReducer = createReducer(
  {},
  {
    getMarketingStatsRequest: (state) => {
      state.loading = true;
    },

    getMarketingStatsSuccess: (state, action) => {
      state.loading = false;
      state.marketingStats = action.payload.marketingStats;
    },

    getMarketingStatsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getSalesStatsRequest: (state) => {
      state.loading = true;
    },

    getSalesStatsSuccess: (state, action) => {
      state.loading = false;
      state.salesStats = action.payload.salesStats;
    },

    getSalesStatsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getOperationsStatsRequest: (state) => {
      state.loading = true;
    },

    getOperationsStatsSuccess: (state, action) => {
      state.loading = false;
      state.operationStats = action.payload.operationStats;
    },

    getOperationsStatsFail: (state, action) => {
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
