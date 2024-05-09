import { configureStore } from "@reduxjs/toolkit";
import { SliceReducer, failure, success } from "./slice";
import createSagaMiddleware from "redux-saga";
import watch from "./fork";
import axios from "axios";
const sagaMiddleware = createSagaMiddleware();
// function customMiddleware(store) {
//   return function (next) {
//     return function (action) {
//       console.log(action, store, next);
//       apiCall(action, store);
//       next(action);
//     };
//   };
// }
const Store = configureStore({
  reducer: {
    SliceReducer,
  },
  //   middleware: (getdefault) => getdefault().concat(customMiddleware),
  middleware: (defMiddleware) => defMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(watch);

async function apiCall(action, store) {
  try {
    if (action.type.includes("pending")) {
      let result = await axios.get("https://fakestoreapi.com/products");
      store.dispatch(success(result.data));
    }
  } catch {
    store.dispatch(failure());
  }
}

export default Store;
