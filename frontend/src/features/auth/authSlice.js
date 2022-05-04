import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import Cookies from "js-cookie";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  errors: [],
  loading: false,
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("user");
      Cookies.remove("session");

      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    console.error(error);
    localStorage.removeItem("user");
    Cookies.remove("session");
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Get current User
export const get_current_user = createAsyncThunk(
  "auth/get_current_user",
  async (_, thunkAPI) => {
    try {
      return await authService.get_current_user();
    } catch (error) {
      console.error(error);
      localStorage.removeItem("user");
      Cookies.remove("session");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.errors = [];
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.errors = [];
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(get_current_user.fulfilled, (state, action) => {
        state.user = action.payload;
        state.errors = [];
      })
      .addCase(get_current_user.rejected, (state, action) => {
        state.errors = action.payload;
        state.user = null;
      });
  },
});

const { reducer } = authSlice;

export default reducer;
