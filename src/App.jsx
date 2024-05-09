import React from "react";
import Homepage from "./Components/Homepage";
import { Provider } from "react-redux";
import Store from "./Saga/Store";
import View from "./Saga/View";

function App() {
  // return <Homepage />;
  return (
    <Provider store={Store}>
      <View />
    </Provider>
  );
}

export default App;
