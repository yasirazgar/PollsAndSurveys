// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Input from '../Utils/Input'

class SignUpForm extends Component {
  constructor(props){
    super(props)

    this.email = null
    this.password = null
    this.confirmPassword = null
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
        <Input name="name" type="email" placeholder="name" setFormValidity={this.setFormValidity}/>
        <Input name="email" type="password" placeholder="email" setFormValidity={this.setFormValidity}/>
        <Input name="password" type="password" placeholder="password" setFormValidity={this.setFormValidity}/>
        <Input name="confirmPassword" type="password" placeholder="confirmPassword" setFormValidity={this.setFormValidity}/>

      </Fragment>
    );
  }
}

SignUpForm.propTypes = {
  enableSubmitButton: PropTypes.func
}

export default SignUpForm