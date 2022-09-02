import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import "antd/dist/antd.min.css";
import { BookingContext } from "./context/BookingContext";
import { createBrowserHistory } from "history";
const root = ReactDOM.createRoot(document.getElementById("root"));

const history = createBrowserHistory();

root.render(
  <HistoryRouter history={history}>
    <BookingContext>
      <App />
    </BookingContext>
  </HistoryRouter>
);
