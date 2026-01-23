import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import globalSaga from "../features/global/globalSaga";
import moduleSaga from "../features/modules/moduleSaga";
import secondaryModuleSaga from "../features/secondaryModules/secondaryModuleSaga";


export default function* rootSaga() {
  yield all([
    authSaga(),
    globalSaga(),
    moduleSaga(),
    secondaryModuleSaga(),
  ]);
}
