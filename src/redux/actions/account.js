import axios from "axios";
import { server } from "../store";

export const createAccount =
  (title, type, currency, date) => async (dispatch) => {
    dispatch({ type: "createAccountRequest" });
    try {
      let { data } = await axios.post(
        `${server}/account`,
        {
          title,
          type,
          currency,
          date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({ type: "createAccountSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "createAccountFail",
        payload: error.response.data.message,
      });
    }
  };

export const getAllAccounts = () => async (dispatch) => {
  dispatch({ type: "getAllAccountsRequest" });
  try {
    let { data } = await axios.get(`${server}/accounts`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getAllAccountsSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllAccountsFail",
      payload: error.response.data.message,
    });
  }
};

export const getAccountById = (id, date) => async (dispatch) => {
  dispatch({ type: "getAccountByIdRequest" });
  try {
    let { data } = await axios.get(`${server}/account/${id}?date=${date}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getAccountByIdSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAccountByIdFail",
      payload: error.response.data.message,
    });
  }
};

export const updateAccount =
  (id, title, type, currency, date) => async (dispatch) => {
    dispatch({ type: "updateAccountRequest" });
    try {
      let { data } = await axios.put(
        `${server}/account/${id}`,
        {
          title,
          type,
          currency,
          date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "updateAccountSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "updateAccountFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteAccount = (id, date) => async (dispatch) => {
  dispatch({ type: "deleteAccountRequest" });
  try {
    let { data } = await axios.delete(`${server}/account/${id}?date=${date}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: "deleteAccountSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteAccountFail",
      payload: error.response.data.message,
    });
  }
};

export const addOwnerCapital = (id, formdata) => async (dispatch) => {
  dispatch({ type: "addOwnerCapitalRequest" });
  try {
    let { data } = await axios.put(
      `${server}/account/${id}/add-balance`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch({ type: "addOwnerCapitalSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addOwnerCapitalFail",
      payload: error.response.data.message,
    });
  }
};

export const getTransactionsByType = (filter, date) => async (dispatch) => {
  dispatch({ type: "getTransactionsByTypeRequest" });
  try {
    let { data } = await axios.get(
      `${server}/transaction-by-type?filter=${filter}&date=${date}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "getTransactionsByTypeSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getTransactionsByTypeFail",
      payload: error.response.data.message,
    });
  }
};

export const getTransactionsByCategory = (filter, date) => async (dispatch) => {
  dispatch({ type: "getTransactionsByCategoryRequest" });
  try {
    let { data } = await axios.get(
      `${server}/transaction-by-category?filter=${filter}&date=${date}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "getTransactionsByCategorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getTransactionsByCategoryFail",
      payload: error.response.data.message,
    });
  }
};

export const addExpense = (formdata) => async (dispatch) => {
  dispatch({ type: "addExpenseRequest" });
  try {
    let { data } = await axios.put(`${server}/add-expense`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch({ type: "addExpenseSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addExpenseFail",
      payload: error.response.data.message,
    });
  }
};
