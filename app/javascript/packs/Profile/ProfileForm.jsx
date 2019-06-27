
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Input from '../Utils/Input'

class ProfileForm extends Component {
  constructor(props){
    super(props)

    this.name = null
    this.email = null
    this.password = null
    this.confirm_password = null
    this.location = null
    this.age = null
    this.gender = null
    this.phone = null

    this.emailValid = false
    this.passwordValid = false
    this.confirmPasswordValid = false
  }

  setFormValidity = (key, value, isValid) => {
    this[key+'Valid'] = isValid;
    this[key] = value;

    if (this.emailValid && this.passwordValid && passwordsMatch()) {
      this.props.enableSubmitButton(true);
    }
    else {
      this.props.enableSubmitButton(false);
    }
  }

  passwordsMatch = () => {
    this.confirmPassword == this.password
  }

  render() {
    return (
      <Fragment>
        <Input name="name" type="text" placeholder="name" setFormValidity={this.setFormValidity}/>
        <Input name="email" type="email" placeholder="email" setFormValidity={this.setFormValidity}/>
        <Input name="password" type="password" placeholder="password" setFormValidity={this.setFormValidity}/>
        <Input name="confirmPassword" type="password" placeholder="confirm_password" setFormValidity={this.setFormValidity}/>
        <Input name="location" type="text" placeholder="location" setFormValidity={this.setFormValidity}/>
        <Input name="age" type="text" placeholder="age" setFormValidity={this.setFormValidity}/>
        <Input name="gender" type="text" placeholder="gender" setFormValidity={this.setFormValidity}/>
        <Input name="phone" type="text" placeholder="gender" setFormValidity={this.setFormValidity}/>

      </Fragment>
    );
  }
}

ProfileForm.propTypes = {
  enableSubmitButton: PropTypes.func
}

export default ProfileForm