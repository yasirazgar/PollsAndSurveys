
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Input from '../Utils/Input'

import { SIGNUP_FAILURE, SIGNUP_FORM, EMAIL_REGEX, PASSWORD_REGEX } from '../constants'


class SignUpForm extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 handleSubmit(event) {
    event.preventDefault();
    alert('A name was submitted: ' );
  }
  render(){
    const { errors, translations, setFormValidity } = this.props

    return (

      <form onSubmit={this.handleSubmit} id={SIGNUP_FORM}>

        <input
          name="name" type="text" placeholder={translations.name} required/>
        <input
          name="nickName" type="text" placeholder={translations.name} required/>
        <input
          name="email" type="email" placeholder={translations.email} setFormValidity={setFormValidity}
          required />
        <input
          name="password" type="password" placeholder={translations.password} setFormValidity={setFormValidity}
          required pattern={PASSWORD_REGEX}/>
        <input
          name="confirmPassword" type="password" placeholder={translations.confirm_password} setFormValidity={setFormValidity}
          required pattern={PASSWORD_REGEX}/>
      </form>
    );

  }
}

SignUpForm.propTypes = {
  enableSubmitButton: PropTypes.func
}

const mapStateToProps = state => {
  return {
    translations: state.translations,
    errors: state.errors
  }
}
export default connect(mapStateToProps)(SignUpForm)
