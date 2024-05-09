import { all, fork } from "redux-saga/effects";
import latest from "./apiCall";

function* watch() {
  yield all([fork(latest)]);
}

export default watch;
