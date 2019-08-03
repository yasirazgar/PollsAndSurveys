import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { login } from '../../actions'
import { SIGNIN_FORM, PASSWORD_REGEX } from '../constants'

class SignInForm extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: null,
      password: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login({email: this.state.email, password: this.state.password});
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render(){
    const { translations } = this.props

    return (
      <form onSubmit={this.handleSubmit} id={SIGNIN_FORM}>
        <input
          name="email" type="email" placeholder={translations.email}
          onChange={this.handleChange}
          required />
        <input
          name="password" type="password" placeholder={translations.password}
          onChange={this.handleChange}
          required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"/>
      </form>
    )
  }

}

SignInForm.propsType = {
  setFormValidity: PropTypes.func
}

const mapStateToProps = state => {
  return {
    translations: state.translations
  }
}

export default SignInForm = connect(mapStateToProps, { login })(SignInForm)
