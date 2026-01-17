import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,

  zones: [],
  modules: [],
  secondarymodules: [],
  venues: [],
  categories: [],
  banners: [],
  vehicles: [],
  catering: [],
  cateringVendor: [],
  makeupPackages: [],
  makeupVendors: [],
  photographyPackages: [],
  photographyVendorPackages: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    loadDataRequest(state) {
      state.loading = true;
    },
    loadDataSuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    loadDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loadDataRequest,
  loadDataSuccess,
  loadDataFailure,
} = globalSlice.actions;

export default globalSlice.reducer;
