// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import Input from '../Utils/Input'

const SignInForm = props => (
  <Fragment>
    <Input name="email" type="email" placeholder="Email" setFormValidity={props.setFormValidity} />
    <Input name="password" type="password" placeholder="Password" setFormValidity={props.setFormValidity} />
  </Fragment>
);

export default SignInForm