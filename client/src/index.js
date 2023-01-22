import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
//The reason you don't need "./state" is because in the jsconfig.json the base url is set to "src"
import globalReducer from "./state";
import { Provider } from "react-redux";
import {setupListeners} from "@reduxjs/toolkit/query";
import { api } from "./state/api";

//From reduxjs toolkit
const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefault) => getDefault().concat(api.middleware)
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>
);



