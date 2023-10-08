import React, { Component } from "react";
// import {NavLink} from 'react-router-dom';
class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    // errors: {}
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // call the server
    console.log("Submmitted ");
  };
  handleChange = ({currentTarget: input}) => {  //note
    const account = { ...this.state.account };
    account[input.name] = input.value;   // replace = e.cuttentTarget.value
    this.setState({ account });
    console.log(this.state.account.username,this.state.account.password);
  };

  render() {
    const {account} = this.state
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={account.username}
              onChange={this.handleChange}
              id="username"
              name="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              onChange={this.handleChange}
              id="password"
              name="password"
              type="text"
              className="form-control"
            />
          </div>
          <div className="pt-2">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
