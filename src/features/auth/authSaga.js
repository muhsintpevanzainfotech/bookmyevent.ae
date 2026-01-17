import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../app/api";
import {
    loginSuccess,
    loginFailure,
    registerSuccess,
    registerFailure,
    updateProfileSuccess, updateProfileFailure
} from "./authSlice";
import { LOGIN_REQUEST, REGISTER_REQUEST, UPDATE_PROFILE_REQUEST } from "./authTypes";

function* loginWorker(action) {
    try {
        const res = yield call(api.post, "/auth/login", action.payload);

        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        yield put(loginSuccess(res));
    } catch (err) {
        yield put(
            loginFailure(err.response?.data?.message || "Login failed")
        );
    }
}

function* registerWorker(action) {
    try {
        const res = yield call(api.post, "/auth/register", action.payload);

        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        yield put(registerSuccess(res));
    } catch (err) {
        yield put(
            registerFailure(err.response?.data?.message || "Register failed")
        );
    }
}

function* updateProfileWorker(action) {
    try {
        const res = yield call(api.put, "/auth/profile", action.payload);
        localStorage.setItem("user", JSON.stringify(res.user));
        yield put(updateProfileSuccess(res.user));
    } catch (err) {
        yield put(updateProfileFailure("Update failed"));
    }
}

export default function* authSaga() {
    yield takeLatest(LOGIN_REQUEST, loginWorker);
    yield takeLatest(REGISTER_REQUEST, registerWorker);
    yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfileWorker);

}
