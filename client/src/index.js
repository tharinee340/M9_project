import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { ContextCallProvider } from './ContextCall'

ReactDOM.render(
      <BrowserRouter>
        <ContextCallProvider>
          <App />
        </ContextCallProvider>
      </BrowserRouter>
  ,
  document.getElementById('root')
);
