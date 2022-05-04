import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import hotelReducer from "../features/hotel/hotelSlice";

// Create redux store
export default configureStore({
  reducer: {
    auth: authReducer,
    hotel: hotelReducer,
  },
});
