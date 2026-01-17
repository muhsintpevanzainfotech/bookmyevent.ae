import { createSlice } from "@reduxjs/toolkit";
import { LOGIN_REQUEST, REGISTER_REQUEST } from "./authTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    registerRequest(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateProfileSuccess(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    updateProfileFailure(state, action) {
      state.error = action.payload;
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  updateProfileSuccess,
  updateProfileFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
