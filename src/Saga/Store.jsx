import { configureStore } from "@reduxjs/toolkit";
import { SliceReducer } from "./slice";
import createSagaMiddleware from "redux-saga";
import watch from "./fork";
const sagaMiddleware = createSagaMiddleware();
const Store = configureStore({
  reducer: {
    SliceReducer,
  },
  middleware: (getdefault) => getdefault().concat(sagaMiddleware),
});
sagaMiddleware.run(watch);

export default Store;
