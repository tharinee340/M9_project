import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import allReducer from './reducers'
import { ContextCallProvider } from './ContextCall'


const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
)

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ContextCallProvider>
          <App />
        </ContextCallProvider>
      </BrowserRouter>
    </Provider>
  ,
  document.getElementById('root')
);
