import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Get } from 'react-axios';

import BoardBodyData from './components/containers/BoardBodyData.js';
import PolicyDetail from './components/presentational/PolicyDetail.js';

function App() {
  return (
    <div>
      <Router>
        <div className="px-4 py-2">
          <div className="max_width">
            <div className="row">
              <div className="col-auto">
                <img src="./img/logo.png" width="150px"/>
              </div>
              <div className="col">
                 <ul className="row justify-content-md-end">
                 		<li className="col-auto px-2">
                      <Link to="/Wasting-Board/">Home</Link>
                    </li>
                    <li className="col-auto px-2">
                      <Link to={'/Wasting-Board/Login'}>Login</Link>
                    </li>
                 </ul>
              </div>
            </div>
            <Switch>
              <Route exact path='/Wasting-Board' component={Home} />
              <Route exact path='/Wasting-Board/Login' component={Login} />
              <Route exact path='/Wasting-Board/Policy' component={Policy} />
            </Switch>
          </div>
        </div>
        <div className="border-top p-3">
          <div className="max_width">
            <ul className="row justify-content-sm-end justify-content-center">
              <li>
                <Link to="/Wasting-Board/Policy">隱私權政策</Link>
              </li>
            </ul>
            <div className="text-sm-right text-center pt-2">Copyright &copy; Wasting-Board All rights reserved.</div>
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

function Login() {
  return (
  <div>
    <h2>Get Something Test</h2>
  </div>
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