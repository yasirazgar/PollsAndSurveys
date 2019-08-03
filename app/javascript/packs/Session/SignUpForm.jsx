import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { signup, raiseModalError, toggleLoader } from '../../actions'

import { SIGNUP_FAILURE, SIGNUP_FORM, EMAIL_REGEX, PASSWORD_REGEX } from '../constants'

class SignUpForm extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: null,
      password: null,
      password_confirmation: null,
      name: null,
      nick_name: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.toggleLoader(true);
    this.props.signup({
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      name: this.state.name,
      nick_name: this.state.nick_name
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render(){
    const { errors, translations, setFormValidity } = this.props

    return (

      <form onSubmit={this.handleSubmit} id={SIGNUP_FORM}>
        <input
          name="name" type="text" placeholder={translations.name} onChange={this.handleChange}
          required />
        <input
          name="nick_name" type="text" placeholder={translations.name} onChange={this.handleChange}
          required />
        <input
          name="email" type="email" placeholder={translations.email} onChange={this.handleChange}
          required />
        <input
          name="password" type="password" placeholder={translations.password} onChange={this.handleChange}
          required pattern ="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
        <input
          name="password_confirmation" type="password" placeholder={translations.confirm_password} onChange={this.handleChange}
          required pattern ="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
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
export default connect(mapStateToProps, {signup, raiseModalError, toggleLoader})(SignUpForm)
