import axios from "axios";
import { server } from "../store";

export const createLead =
  (name, city, phone, source, date) => async (dispatch) => {
    dispatch({ type: "createLeadRequest" });
    try {
      let { data } = await axios.post(
        `${server}/create-lead`,
        { name, city, phone, source, date },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch({ type: "createLeadSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "createLeadFail",
        payload: error.response.data.message,
      });
    }
  };

export const bulkUploadLead = (leads) => async (dispatch) => {
  dispatch({ type: "bulkUploadLeadsRequest" });
  try {
    let { data } = await axios.post(
      `${server}/bulk-upload-leads`,
      { leads },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "bulkUploadLeadsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "bulkUploadLeadsFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllLeads = (date, filter) => async (dispatch) => {
  dispatch({ type: "getAllLeadsRequest" });
  try {
    let { data } = await axios.get(
      `${server}/leads?date=${date}&filter=${filter}`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "getAllLeadsSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "getAllLeadsFail", payload: error.response.data.message });
  }
};

export const getLeadById = (id) => async (dispatch) => {
  dispatch({ type: "getLeadByIdRequest" });
  try {
    let { data } = await axios.get(
      `${server}/lead/${id}`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "getLeadByIdSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "getLeadByIdFail", payload: error.response.data.message });
  }
};

export const updateLead =
  (id, name, city, phone, source) => async (dispatch) => {
    dispatch({ type: "updateLeadRequest" });
    try {
      let { data } = await axios.put(
        `${server}/lead/${id}`,
        { name, city, phone, source },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch({ type: "updateLeadSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "updateLeadFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteLead = (id) => async (dispatch) => {
  dispatch({ type: "deleteLeadRequest" });
  try {
    let { data } = await axios.delete(
      `${server}/lead/${id}`,

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "deleteLeadSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "deleteLeadFail", payload: error.response.data.message });
  }
};

export const assignLeads = (leads, employee, date) => async (dispatch) => {
  dispatch({ type: "assignLeadsRequest" });
  try {
    let { data } = await axios.put(
      `${server}/assign-leads`,
      { leads, employee, date },

      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "assignLeadsSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "assignLeadsFail", payload: error.response.data.message });
  }
};

export const getSalesAssignedLeads =
  (id, date, category) => async (dispatch) => {
    console.log(category);
    dispatch({ type: "getSalesAssignedLeadsRequest" });
    try {
      let { data } = await axios.get(
        `${server}/sales/${id}/assigned-leads?date=${date}&category=${category}`,

        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch({ type: "getSalesAssignedLeadsSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "getSalesAssignedLeadsFail",
        payload: error.response.data.message,
      });
    }
  };

export const updateClientProfile =
  (
    id,
    name,
    email,
    city,
    phone,
    cnic,
    age,
    education,
    experience,
    travelHistory,
    address,
    dob,
    passport,
    program,
    date
  ) =>
  async (dispatch) => {
    dispatch({ type: "updateClientProfileRequest" });
    try {
      let { data } = await axios.put(
        `${server}/client/${id}`,
        {
          name,
          email,
          city,
          phone,
          cnic,
          age,
          education,
          experience,
          travelHistory,
          address,
          dob,
          passport,
          program,
          date,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch({ type: "updateClientProfileSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "updateClientProfileFail",
        payload: error.response.data.message,
      });
    }
  };

export const getClientProfile = (id) => async (dispatch) => {
  dispatch({ type: "getClientProfileRequest" });
  try {
    let { data } = await axios.get(`${server}/client/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({ type: "getClientProfileSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getClientProfileFail",
      payload: error.response.data.message,
    });
  }
};

export const bulkReturnLeads =
  (leads, reason, description, date) => async (dispatch) => {
    dispatch({ type: "bulkReturnRequest" });
    try {
      let { data } = await axios.put(
        `${server}/sales/return-leads`,
        { leads, reason, description, date },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch({ type: "bulkReturnSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "bulkReturnFail",
        payload: error.response.data.message,
      });
    }
  };

export const changeLeadStatusBySales =
  (id, status, date) => async (dispatch) => {
    dispatch({ type: "changeLeadStatusBySalesRequest" });
    try {
      let { data } = await axios.put(
        `${server}/sales/lead/${id}/update-status`,
        { status, date },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch({ type: "changeLeadStatusBySalesSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "changeLeadStatusBySalesFail",
        payload: error.response.data.message,
      });
    }
  };

export const addRemark = (lead, subject, remark, date) => async (dispatch) => {
  dispatch({ type: "addRemarkRequest" });
  try {
    let { data } = await axios.post(
      `${server}/client/remarks/add`,
      { lead, subject, remark, date },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "addRemarkSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addRemarkFail",
      payload: error.response.data.message,
    });
  }
};

export const submitClientDocument =
  (id, profile, formdata) => async (dispatch) => {
    dispatch({ type: "submitClientDocumentRequest" });
    try {
      let { data } = await axios.put(
        `${server}/client/${profile}/document/${id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      dispatch({ type: "submitClientDocumentSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "submitClientDocumentFail",
        payload: error.response.data.message,
      });
    }
  };

export const getProfileRemarks = (id) => async (dispatch) => {
  dispatch({ type: "getProfileRemarksRequest" });
  try {
    let { data } = await axios.get(`${server}/client/${id}/remarks`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    dispatch({ type: "getProfileRemarksSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getProfileRemarksFail",
      payload: error.response.data.message,
    });
  }
};

export const getClosedLeads = (filter, date) => async (dispatch) => {
  dispatch({ type: "getClosedLeadsRequest" });
  try {
    let { data } = await axios.get(
      `${server}/get-closed-leads?filter=${filter}&date=${date}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: "getClosedLeadsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getClosedLeadsFail",
      payload: error.response.data.message,
    });
  }
};
