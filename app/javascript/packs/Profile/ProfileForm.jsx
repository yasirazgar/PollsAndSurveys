// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import Input from '../Utils/Input'

class ProfileForm extends Component {
  constructor(props){
    super(props)

    this.email = null
    this.password = null
    this.confirmPassword = null
    this.phone = null
    this.address = null
    this.confirmPassword = null

    this.emailValid = false
    this.passwordValid = false
    this.confirmPasswordValid = false
  }

  setFormValidity = (key, isValid, value) => {
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
        <Input placeholder={this.props.name} />
        <Input placeholder={this.props.name} />
        <Input placeholder={this.props.name} />
        <Input placeholder={this.props.name} />
        <Input placeholder={this.props.name} />

      </Fragment>
    );
  }
}

export default ProfileForm