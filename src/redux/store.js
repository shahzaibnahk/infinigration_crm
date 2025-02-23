import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { leadReducer } from "./reducers/leadReducer";
import { statsReducer } from "./reducers/statsReducer";
import { departmentsReducer } from "./reducers/departmentReducer";
import { programReducer } from "./reducers/programReducer";
import { contractTemplateReducer } from "./reducers/contractTemplateReducer";
import { clientReducer } from "./reducers/clientReducer";
import { accountReducer } from "./reducers/accountReducer";
import { invoiceReducer } from "./reducers/invoiceReducer";
import { vendorReducer } from "./reducers/vendorReducer";
import { subAgentReducer } from "./reducers/subagentReducer";
import { payrollReducer } from "./reducers/payrollReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    lead: leadReducer,
    stats: statsReducer,
    department: departmentsReducer,
    program: programReducer,
    contractTemplate: contractTemplateReducer,
    client: clientReducer,
    account: accountReducer,
    invoice: invoiceReducer,
    vendor: vendorReducer,
    subagent: subAgentReducer,
    payroll: payrollReducer,
  },
});

export const server = import.meta.env.VITE_BACKEND_SERVER_URL;

export default store;
