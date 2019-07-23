import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import Input from '../Utils/Input'

import { toggleSignInButton, login } from '../../actions'
import { SIGN_IN_FORM } from '../constants'
import { required, email, maxLength15, minLength2 } from '../Helpers/validation_helper'
import renderField from '../Helpers/renderField'

let SignInForm = props => {
  const { handleSubmit, login, pristine, reset, submitting } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="email"
        type="email"
        component={renderField}
        validate={[required, email]}
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        validate={[required, maxLength15, minLength2]}
      />
    </form>
  )
}

SignInForm.propsType = {
  setFormValidity: PropTypes.func
}

const mapStateToProps = state => {
  return {
    translations: state.translations
  }
}

SignInForm = connect(mapStateToProps)(SignInForm)
export default reduxForm({
  form: SIGN_IN_FORM // a unique identifier for this form
})(SignInForm)
