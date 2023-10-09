import { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
    // const errors = {};
    // const {data} = this.state
    // console.log(data)
    // if(data.username.trim() === ''){
    //   errors.username = 'Usernane is Required'
    // }
    // if(data.password.trim() === ''){
    //   errors.password = 'Password is Required'
    // }

    // return Object.keys(errors).length === 0 ? null : errors
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;

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
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} }); //note
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    //note

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    const data = { ...this.state.data };
    data[input.name] = input.value; // replace = e.cuttentTarget.value

    this.setState({ data, errors });
  };

  renderButton = (label) => {
    return (
      <div className="pt-2">
        <button disabled={this.validate()} className="btn btn-primary">
          {label}
        </button>
      </div>
    );
  };

  renderInput = (name, label, type="text") => {
    const {data, errors} = this.state
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
