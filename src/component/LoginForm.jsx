import React from "react";
// import Joi from "joi";
import Joi from "joi-browser";
import Input from "./common/input";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = { 
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
}
doSubmit = () => {
  console.log("Submitted")
}


  render() {
    const {data, errors} = this.state
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
         
          
            <Input
              name="username"
              value={data.username}
              label="username"
              onChange={this.handleChange}
              type='text'
              error={errors.username}
            />
            <Input
              name="password"
              value={data.password}
              label="Password"
              onChange={this.handleChange}
              type='password'
              error={errors.password}
            />
          <div className="pt-2">
            <button 
            disabled={this.validate()}
            className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
