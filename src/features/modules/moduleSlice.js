import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  modules: [],
};

const moduleSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    loadModulesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loadModulesSuccess(state, action) {
      state.loading = false;
      state.modules = action.payload;
    },
    loadModulesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loadModulesRequest,
  loadModulesSuccess,
  loadModulesFailure,
} = moduleSlice.actions;

export default moduleSlice.reducer;
