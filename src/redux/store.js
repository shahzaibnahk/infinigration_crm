import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { leadReducer } from "./reducers/leadReducer";
import { statsReducer } from "./reducers/statsReducer";
import { departmentsReducer } from "./reducers/departmentReducer";
import { programReducer } from "./reducers/programReducer";
import { contractTemplateReducer } from "./reducers/contractTemplateReducer";
import { clientReducer } from "./reducers/clientReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    lead: leadReducer,
    stats: statsReducer,
    department: departmentsReducer,
    program: programReducer,
    contractTemplate: contractTemplateReducer,
    client: clientReducer,
  },
});

export const server = import.meta.env.VITE_BACKEND_SERVER_URL;

export default store;
