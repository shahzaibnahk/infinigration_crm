import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  {},
  {
    loginRequest: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    logoutRequest: (state) => {
      state.loading = true;
    },

    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload.message;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = action.payload;
    },

    loadUserRequest: (state) => {
      state.loading = true;
    },

    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loadUserFail: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },

    getMyLogsRequest: (state) => {
      state.loading = true;
    },

    getMyLogsSuccess: (state, action) => {
      state.loading = false;
      state.logs = action.payload.logs;
    },
    
    getMyLogsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getMyAttendanceRequest: (state) => {
      state.loading = true;
    },

    getMyAttendanceSuccess: (state, action) => {
      state.loading = false;
      state.attendance = action.payload.attendance;
    },

    getMyAttendanceFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    markAttendanceRequest: (state) => {
      state.loading = true;
    },

    markAttendanceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    markAttendanceFail: (state, action) => {
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
