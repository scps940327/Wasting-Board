import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FacebookProvider, LoginButton} from 'react-facebook';
import { ToastContainer, toast } from 'react-toastify';

import LoginModal from './LoginModal.js';

function Header({data, setFbMemberInfo}){
  const [loginModal, setLoginModal] = useState({show: false});
  const testData = {
    profile:{
      name: 'Lauren Chen', 
      picture: {
        data:{
          url: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2422504531117147&height=50&width=50&ext=1560587977&hash=AeTlnA8glgijcHo_"
        }
      }
    }
  };

  function modalHandleClose(){
    var state = !loginModal.show;
    setLoginModal({show: state});
  }

  return (
    <div>
      <ToastContainer />
      <div className="px-4 py-2 border-bottom">
        <div className="max_width">
          <div className="row align-items-center">
            <div className="col-auto">
              <Link to="/Wasting-Board">
                <img src="./img/logo.png" width="150px"/>
              </Link>
            </div>
            <div className="col">
               <ul className="row justify-content-end text-secondary">
                  <li className="col-auto px-2">
                    {(data.status.indexOf('new') === 0 || data.status.indexOf('visitor') === 0)
                      ? (<button type="button" className="btn btn-link p-0" onClick={modalHandleClose} style={{fontSize: '20px'}}>
                          <i className="fas fa-user-circle"></i>
                        </button>)
                      : (<Link to="/Wasting-Board/Login">
                          <i className="fas fa-user-circle" style={{fontSize: '20px'}}></i>
                        </Link>)
                    }
                  </li>
               </ul>
            </div>
          </div>
        </div>
      </div>
      <LoginModal show={loginModal.show} modalHandleClose={modalHandleClose} setFbMemberInfo={setFbMemberInfo}/>
      <div className="pt-3 px-4">
        <div className="max_width">
          {(data.status.indexOf('new') === 0)
            ? <div className="text-right pb-3">您好，歡迎登入帳戶</div>
            : (<div className="pb-3 row align-items-center justify-content-end">
                <div className="col text-right">您好，{data.name}</div>
                <div className="col-auto">
                  <div className="rounded-circle bg-secondary" style={{height: '30px', width: '30px', background: 'url("' + data.picture + '") center / cover no-repeat',}} ></div>
                </div>
              </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default Header;