import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Home from './Home'
import styles from './css/Login.module.css'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    let self = this;
    axios
      .post("/api/v1/players/login", {
          email: document.getElementById("email-input").value,
          password: document.getElementById("password-input").value
      })
      .then(function(response) {
        localStorage.setItem('jwtToken', response.data.jwt_token)
        localStorage.setItem('user_id', parseInt(response.data.user_id))
      })
      .then(function() {
        self.setState(prevState => {
          return {isLoggedIn: !prevState.isLoggedIn}
        })
      })
      .then(this.props.handleLogIn())
      .catch(function(error) {
        console.log(error)
        alert(error.response.data.error);
      });
    }

  render() {
    if (localStorage.getItem('jwtToken')) {
      return <Home />;
    } else {
      return (
        <div className={`container ${styles.myContainer}`}>
          <div className={`row ${styles.myRow}`}>
            <div className={`col-4 ${styles.myCol}`} id="login_form">
              <div className="form-container">
                <img className={styles.mainLogo} src="../../sportsmatchlogo.png" alt='SportsMatch'/>
                <h5 className={styles.heading}>Welcome Back, Please Login to Your Account</h5>
                <form onSubmit={e => {e.preventDefault();}} className="form-login">
                  <div>
                    <label>email</label><br/>
                    <input
                      id="email-input"
                      name="email"
                      type="text"
                      required="required"
                      className={styles.inputField}
                    />
                  </div>
                  <div>
                    <label>password</label><br/>
                    <input
                      id="password-input"
                      name="password"
                      type="password"
                      required="required"
                      className={styles.inputField}
                    />
                  </div>
                  <div className="form-group" style={{textAlign: 'center'}}>
                    <button
                      name="login"
                      type="submit"
                      className="login-button"
                      onClick={this.handleLogin}>
                      Login
                    </button>
                  </div>
                </form>
                <div style={{textAlign: 'center'}}>
                  <NavLink to='/signup'>Sign Up</NavLink>
                </div>
                </div>
              </div>
              <div className="col-8" id={styles.rightColumn}></div>
            </div>
          </div>
      );
    }
  }
}
export default Login;
