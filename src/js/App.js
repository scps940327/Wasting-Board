import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import BoardBodyData from './components/containers/BoardBodyData.js';
import PolicyDetail from './components/presentational/PolicyDetail.js';
import LoginData from './components/containers/LoginData.js';
import HeaderData from './components/containers/HeaderData.js';

function App() {
  return (
    <div>
      <Router>
        <HeaderData />
        <div className="py-3 px-sm-4 px-3 content-wrapper">
          <div className="max_width">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/Wasting-Board/Login' component={LoginPage} />
              <Route exact path='/Wasting-Board/Policy' component={Policy} />
            </Switch>
          </div>
        </div>
        <div className="border-top p-3">
          <div className="max_width">
            <ul className="row justify-content-sm-end justify-content-center">
              <li className="col-auto">
                <Link to="/Wasting-Board/Policy">隱私權政策</Link>
              </li>
            </ul>
            <div className="text-sm-right text-center">Copyright &copy; Wasting-Board All rights reserved.</div>
          </div>
        </div>
      </Router>
    </div>
  ); 
}

function Home(){
  return (
    <BoardBodyData />
  );
}

function LoginPage() {
  return (
  <LoginData />
  );
}

function Policy() {
  return (
    <PolicyDetail />
  )
}

function TermsOfService(){
  return(
    <div></div>
  )
}
export default App;