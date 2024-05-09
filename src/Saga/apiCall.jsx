import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { failure, pending, success } from "./slice";

function* apiCall() {
  try {
    let result = yield call(axios.get, "https://fakestoreapi.com/products");
    console.log(result);
    if (result) {
      yield put(success(result.data));
    }
  } catch (error) {
    yield put(failure());
  }
}

function* latest() {
  yield takeLatest(pending, apiCall);
}

export default latest;
