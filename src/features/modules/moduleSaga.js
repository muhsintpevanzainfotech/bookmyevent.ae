import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../app/api";
import {
  loadModulesSuccess,
  loadModulesFailure,
} from "./moduleSlice";

function* loadModulesSaga() {
  try {
    const res = yield call(api.get, "/modules");

    yield put(loadModulesSuccess(res.data || res));
  } catch (error) {
    yield put(loadModulesFailure(error.message));
  }
}

export default function* moduleSaga() {
  yield takeLatest("modules/loadModulesRequest", loadModulesSaga);
}
