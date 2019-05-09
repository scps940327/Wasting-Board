import React from 'react';
import ReactDOM from 'react-dom';
import "jquery";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import calculatorApp from './reducers/Reducers.js';
import App from "./App.js";

import {
  male,
  female
} from './actions/action.js';
import '../scss/style.scss'

let store = createStore(calculatorApp);
//console.log(store.getState());

var xhr = new XMLHttpRequest();

// xhr.open("get", 'https://spreadsheets.google.com/feeds/cells/1aqHAAD-qbaC5XO8hwS2eio33PE030-KabKS-8v9CCsk/1/public/values?alt=json', true);
// xhr.send(parameter);

// xhr.onload = () => {
// 	var data = JSON.parse(xhr.responseText);
// 	console.log(data);
// }

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById("root")
);