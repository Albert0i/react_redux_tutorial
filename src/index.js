import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { store } from './app/store'
// import { Provider } from 'react-redux'

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./features/api/apiSlice";

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <ApiProvider api={apiSlice}>
          <App />
      </ApiProvider>
    </React.StrictMode>
  );