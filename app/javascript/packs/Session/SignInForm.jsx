
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Input from '../Utils/Input'

const SignInForm = props => (
  <Fragment>
    <Input name="email" type="email" placeholder="Email" setFormValidity={props.setFormValidity} />
    <Input name="password" type="password" placeholder="Password" setFormValidity={props.setFormValidity} />
  </Fragment>
);

SignInForm.propsType = {
  setFormValidity: PropTypes.func
}

export default SignInForm