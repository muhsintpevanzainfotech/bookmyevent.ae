import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  secondaryModules: [],
};

const secondaryModuleSlice = createSlice({
  name: "secondaryModules",
  initialState,
  reducers: {
    loadSecondaryModulesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loadSecondaryModulesSuccess(state, action) {
      state.loading = false;
      state.secondaryModules = action.payload;
    },
    loadSecondaryModulesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loadSecondaryModulesRequest,
  loadSecondaryModulesSuccess,
  loadSecondaryModulesFailure,
} = secondaryModuleSlice.actions;

export default secondaryModuleSlice.reducer;
