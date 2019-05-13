import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Get } from 'react-axios';

import BoardBodyData from './components/containers/BoardBodyData.js'

function App() {
  return (
    <Router>
      <div className="px-4 py-2">
        <div className="max_width">
          <div className="row">
            <div className="col-auto">
              <img src="../../docs/img/logo.png" width="150px"/>
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
          </Switch>
        </div>
      </div>
    </Router>
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

export default App;