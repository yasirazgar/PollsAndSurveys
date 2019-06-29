
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
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
        <Input name="name" type="text" placeholder={this.props.translations.name} setFormValidity={this.setFormValidity}/>
        <Input name="email" type="email" placeholder={this.props.translations.email} setFormValidity={this.setFormValidity}/>
        <Input name="password" type="password" placeholder={this.props.translations.password} setFormValidity={this.setFormValidity}/>
        <Input name="confirmPassword" type="password" placeholder={this.props.translations.confirm_password} setFormValidity={this.setFormValidity}/>
        <Input name="location" type="text" placeholder={this.props.translations.location} setFormValidity={this.setFormValidity}/>
        <Input name="age" type="text" placeholder={this.props.translations.age} setFormValidity={this.setFormValidity}/>
        <Input name="gender" type="text" placeholder={this.props.translations.gender} setFormValidity={this.setFormValidity}/>
        <Input name="phone" type="text" placeholder={this.props.translations.gender} setFormValidity={this.setFormValidity}/>

      </Fragment>
    );
  }
}

ProfileForm.propTypes = {
  enableSubmitButton: PropTypes.func
}

const mapStateToProps = state => {
  return {
    translations: state.translations
  }
}
export default connect(mapStateToProps)(ProfileForm)
