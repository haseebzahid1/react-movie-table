import React, { Component } from "react";
// import Joi from "joi";
import Joi from "joi-browser";
import Input from "./common/input";


class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  schema = { 
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
}

  validate = () => {
    const options = {abortEarly:false}
    const {error} = Joi.validate(this.state.account,this.schema, options);
     
      if(!error) return null;
      const errors = {};
      for (let item of error.details) errors[item.path[0]] = item.message;
      return errors;
    // const errors = {};
    // const {account} = this.state
    // console.log(account)
    // if(account.username.trim() === ''){
    //   errors.username = 'Usernane is Required' 
    // }
    // if(account.password.trim() === ''){
    //   errors.password = 'Password is Required' 
    // }
    
    // return Object.keys(errors).length === 0 ? null : errors
  }
  handleSubmit = (e) => {
    e.preventDefault();
 
    const errors = this.validate();
    this.setState({errors: errors || {}})  //note
    if (errors) return ;

  };

  validateProperty = ({name, value}) => {
    const obj = {[name]: value};
    const schema = { [name]: this.schema[name] }
    const {error} = Joi.validate(obj, schema)
    return error ? error.details[0].message : null

    // if(name === 'username'){
    //   if(value.trim() === ''){
    //     return 'Username is required.';
    //   }
    // }
    // if(name === 'password'){
    //   if(value.trim() === ''){
    //     return 'Password is required'
    //   }
    // }
  }

  handleChange = ({currentTarget: input}) => {  //note

    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if(errorMessage) {
      errors[input.name] = errorMessage
    }
    else {
      delete errors[input.name]
    }
    const account = { ...this.state.account };
    account[input.name] = input.value;   // replace = e.cuttentTarget.value

    this.setState({ account, errors });

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
