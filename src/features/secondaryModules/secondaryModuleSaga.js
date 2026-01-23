import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../app/api";
import {
  loadSecondaryModulesSuccess,
  loadSecondaryModulesFailure,
} from "./secondaryModuleSlice";

function* loadSecondaryModulesSaga() {
  try {
    const res = yield call(api.get, "/secondary-modules");

    yield put(loadSecondaryModulesSuccess(res.data || res));
  } catch (error) {
    yield put(loadSecondaryModulesFailure(error.message));
  }
}

export default function* secondaryModuleSaga() {
  yield takeLatest(
    "secondaryModules/loadSecondaryModulesRequest",
    loadSecondaryModulesSaga
  );
}
