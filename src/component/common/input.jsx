import React from 'react'

const Input = ({ name, label, error, ...rest}) => {  // rest replace const Input = ({type, name, label, value, error, onChange}) => {
    return (
      <div> 

        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <input
            {...rest}
            name={name}
            id={name}
            className="form-control"
            // type={type}
            // value={value}
            // onChange={onChange}
            // id={name}
          />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>



      </div>
    );
}

export default Input
