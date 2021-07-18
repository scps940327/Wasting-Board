import React from 'react';
import ReactDOM from 'react-dom';
import "jquery";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import calculatorApp from './reducers/Reducers.js';
import App from "./App.js";

import { CookiesProvider } from 'react-cookie';
import '../scss/style.scss'

let store = createStore(calculatorApp);

ReactDOM.render(
    <Provider store = {store}>
    	<CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>,
    document.getElementById("root")
);