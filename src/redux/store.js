import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { leadReducer } from "./reducers/leadReducer";
import { statsReducer } from "./reducers/statsReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    lead: leadReducer,
    stats: statsReducer,
  },
});

// export const server = "http://localhost:4000/api/v1";
export const server = "http://31.220.18.246:5000/api/v1";

export default store;
