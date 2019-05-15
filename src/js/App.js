import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Get } from 'react-axios';

import BoardBodyData from './components/containers/BoardBodyData.js';
import PolicyDetail from './components/presentational/PolicyDetail.js';
import LoginData from './components/containers/LoginData.js';

function App() {
  return (
    <div>
      <Router>
        <div className="px-4 py-2 border-bottom">
          <div className="max_width">
            <div className="row align-items-center">
              <div className="col-auto">
                <img src="./img/logo.png" width="150px"/>
              </div>
              <div className="col">
                 <ul className="row justify-content-end text-secondary" style={{fontSize: '20px'}}>
                 		<li className="col-auto px-2">
                      <Link to="/Wasting-Board/">
                        <i className="fas fa-home"></i>
                      </Link>
                    </li>
                    <li className="col-auto px-2">
                      <Link to={'/Wasting-Board/Login'}>
                        <i className="fas fa-user-circle"></i>
                      </Link>
                    </li>
                 </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 px-sm-4 px-3 content-wrapper">
          <div className="max_width">
            <Switch>
              <Route exact path='/Wasting-Board' component={Home} />
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
    <div>
      <BoardBodyData />
    </div>
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