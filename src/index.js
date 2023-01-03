import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'
import { extendedAdapterSlice } from './features/api/extendedAdapterSlice';

//import { ApiProvider } from "@reduxjs/toolkit/query/react";
//import { apiSlice } from "./features/api/apiSlice";

store.dispatch(extendedAdapterSlice.endpoints.getTodos.initiate());

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
    </React.StrictMode>
  );