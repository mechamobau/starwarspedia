import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import FilterTableContext from './context/useFilterTable';
import PaginationContext from './context/usePagination';
import PlanetsContext from './context/usePlanets';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <FilterTableContext>
      <PaginationContext>
        <PlanetsContext>
          <App />
        </PlanetsContext>
      </PaginationContext>
    </FilterTableContext>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
