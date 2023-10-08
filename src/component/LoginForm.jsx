import React, { Component } from "react";
// import {NavLink} from 'react-router-dom';
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  validate = () => {
    const errors = {};
    const {account} = this.state
    console.log(account)
    if(account.username.trim() === ''){
      errors.username = 'Usernane is Required' 
    }
    if(account.password.trim() === ''){
      errors.password = 'Password is Required' 
    }
    
    return Object.keys(errors).length === 0 ? null : errors
  }
  handleSubmit = (e) => {
    e.preventDefault();
 
    const errors = this.validate();
    this.setState({errors: errors || {}})  //note
    if (errors) return ;

  };
  handleChange = ({currentTarget: input}) => {  //note
    const account = { ...this.state.account };
    account[input.name] = input.value;   // replace = e.cuttentTarget.value
    this.setState({ account });

  };

  render() {
    const {account, errors} = this.state
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
         
          
            <Input
              name="username"
              value={account.username}
              label="username"
              onChange={this.handleChange}
              type='text'
              error={errors.username}
            />
            <Input
              name="password"
              value={account.password}
              label="Password"
              onChange={this.handleChange}
              type='password'
              error={errors.password}
            />
          <div className="pt-2">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
