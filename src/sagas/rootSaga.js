import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import globalSaga from "../features/global/globalSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    globalSaga(),
  ]);
}
