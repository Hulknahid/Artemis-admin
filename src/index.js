import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.scss";
import "../node_modules/@mdi/font/css/materialdesignicons.min.css";

import store from "./reducers";

import App from "./App";
// import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

//header
//candidate page scroll
// endpoint check
