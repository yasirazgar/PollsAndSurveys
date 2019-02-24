// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import Input from '../Utils/Input'

class SignInForm extends Component {
  constructor(props){
    super(props)

    this.email = null
    this.password = null
    this.emailValid = false
    this.passwordValid = false
  }

  setFormValidity = (key, isValid, value) => {
    this[key + "Valid"] = isValid;
    this[key] = value;
    console.log(this)

    if (this.props.enableSubmitButton){
      if (this.emailValid && this.passwordValid) {
        this.props.enableSubmitButton(true);
      }
      else {
        this.props.enableSubmitButton(false);
      }
    }
  }

  render() {
    return (
      <Fragment>
        <Input type="email" placeholder={this.props.name} setFormValidity={this.setFormValidity} />
        <Input type="password" placeholder={this.props.name} setFormValidity={this.setFormValidity} />
      </Fragment>
    );
  }
}

export default SignInForm