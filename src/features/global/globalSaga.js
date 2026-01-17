import { call, put, all, takeLatest } from "redux-saga/effects";
import { api } from "../../app/api";
import {
  loadDataSuccess,
  loadDataFailure,
} from "./globalSlice";

function* loadAllData() {
  try {
    const [
      zone,
      modules,
      secondarymodules,
      venues,
      categories,
      banners,
      vehicles,
      catering,
      cateringVendor,
      makeupPackages,
      makeupVendors,
      photographyPackages,
      photographyVendorPackages,
    ] = yield all([
      call(api.get, "/zones"),
      call(api.get, "/modules"),
      call(api.get, "/secondary-modules"),
      call(api.get, "/venues"),
      call(api.get, "/categories"),
      call(api.get, "/banners"),
      call(api.get, "/vehicles"),
      call(api.get, "/catering"),
      call(api.get, "/catering/vendors/68e5fbe75b67b5f4ce8b5ed7"),
      call(api.get, "/makeup-packages"),
      call(api.get, "/makeup-packages/vendors/68e5fbc33a5a05dde7500c89"),
      call(api.get, "/photography-packages"),
      call(api.get, "/photography-packages/vendors/68e5fb0fa4b2718b6cbf64e9"),
    ]);

    yield put(loadDataSuccess({
      zones: zone.data || zone,
      modules: modules.data || modules,
      secondarymodules: secondarymodules.data || secondarymodules,
      venues: venues.data || [],
      categories: categories.data || [],
      banners: banners?.data?.banners || [],
      vehicles: vehicles.data || [],
      catering: catering.data || [],
      cateringVendor: cateringVendor.data || [],
      makeupPackages: makeupPackages.data || [],
      makeupVendors: makeupVendors.data || [],
      photographyPackages: photographyPackages.data || [],
      photographyVendorPackages: photographyVendorPackages.data || [],
    }));

  } catch (err) {
    yield put(loadDataFailure(err.message));
  }
}

export default function* globalSaga() {
  yield takeLatest("global/loadDataRequest", loadAllData);
}
