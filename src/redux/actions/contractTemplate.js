import axios from "axios";
import { server } from "../store";

export const getContractTemplateOptions = (id) => async (dispatch) => {
  dispatch({ type: "getContractTemplateOptionsRequest" });
  try {
    let { data } = await axios.get(
      `${server}/contract-template-by-program/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({ type: "getContractTemplateOptionsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getContractTemplateOptionsFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllContractTemplates = () => async (dispatch) => {
  dispatch({ type: "getAllContractTemplatesRequest" });
  try {
    let { data } = await axios.get(`${server}/contract-templates`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getAllContractTemplatesSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllContractTemplatesFail",
      payload: error.response.data.message,
    });
  }
};

export const getContractTemplateById = (id) => async (dispatch) => {
  dispatch({ type: "getContractTemplateByIdRequest" });
  try {
    let { data } = await axios.get(`${server}/contract-template/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getContractTemplateByIdSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getContractTemplateByIdFail",
      payload: error.response.data.message,
    });
  }
};

export const createContractTemplate =
  (
    program,
    description,
    dutiesOfConsultant,
    dutiesOfClient,
    agreementByClient,
    consultancyFeeAndSchedule,
    otherFees,
    note,
    refundPolicies,
    consent,
    date
  ) =>
  async (dispatch) => {
    dispatch({ type: "createContractTemplateRequest" });
    try {
      let { data } = await axios.post(
        `${server}/contract-template`,
        {
          program,
          description,
          dutiesOfConsultant,
          dutiesOfClient,
          agreementByClient,
          consultancyFeeAndSchedule,
          otherFees,
          note,
          refundPolicies,
          consent,
          date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({ type: "createContractTemplateSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "createContractTemplateFail",
        payload: error.response.data.message,
      });
    }
  };

export const updateContractTemplate =
  (
    id,
    program,
    description,
    dutiesOfConsultant,
    dutiesOfClient,
    agreementByClient,
    consultancyFeeAndSchedule,
    otherFees,
    note,
    refundPolicies,
    consent,
    date
  ) =>
  async (dispatch) => {
    dispatch({ type: "updateContractTemplateRequest" });
    try {
      let { data } = await axios.put(
        `${server}/contract-template/${id}`,
        {
          program,
          description,
          dutiesOfConsultant,
          dutiesOfClient,
          agreementByClient,
          consultancyFeeAndSchedule,
          otherFees,
          note,
          refundPolicies,
          consent,
          date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({ type: "updateContractTemplateSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "updateContractTemplateFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteContractTemplate = (id, date) => async (dispatch) => {
  dispatch({ type: "deleteContractTemplateRequest" });
  try {
    let { data } = await axios.delete(
      `${server}/contract-template/${id}?date=${date}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({ type: "deleteContractTemplateSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteContractTemplateFail",
      payload: error.response.data.message,
    });
  }
};
