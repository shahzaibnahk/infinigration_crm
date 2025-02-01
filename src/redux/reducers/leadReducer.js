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

    bulkUploadLeadsRequest: (state) => {
      state.loading = true;
    },
    bulkUploadLeadsSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    bulkUploadLeadsFail: (state, action) => {
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


    deleteBulkLeadRequest: (state) => {
      state.loading = true;
    },
    deleteBulkLeadSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    deleteBulkLeadFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    assignLeadsRequest: (state) => {
      state.loading = true;
    },
    assignLeadsSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    assignLeadsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getSalesAssignedLeadsRequest: (state) => {
      state.loading = true;
    },

    getSalesAssignedLeadsSuccess: (state, action) => {
      state.loading = false;
      state.assignedLeads = action.payload.assignedLeads;
    },

    getSalesAssignedLeadsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getClientProfileRequest: (state) => {
      state.loading = true;
    },

    getClientProfileSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload.profile;
    },

    getClientProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    bulkReturnRequest: (state) => {
      state.loading = true;
    },

    bulkReturnSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    bulkReturnFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    changeLeadStatusBySalesRequest: (state) => {
      state.loading = true;
    },

    changeLeadStatusBySalesSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    changeLeadStatusBySalesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addRemarkRequest: (state) => {
      state.loading = true;
    },

    addRemarkSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    addRemarkFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateClientProfileRequest: (state) => {
      state.loading = true;
    },

    updateClientProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    updateClientProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getProfileRemarksRequest: (state) => {
      state.loading = true;
    },

    getProfileRemarksSuccess: (state, action) => {
      state.loading = false;
      state.remarks = action.payload.remarks;
    },

    getProfileRemarksFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    submitClientDocumentRequest: (state) => {
      state.loading = true;
    },

    submitClientDocumentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },

    submitClientDocumentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getClosedLeadsRequest: (state) => {
      state.loading = true;
    },

    getClosedLeadsSuccess: (state, action) => {
      state.loading = false;
      state.closedLeads = action.payload.closedLeads;
    },

    getClosedLeadsFail: (state, action) => {
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
