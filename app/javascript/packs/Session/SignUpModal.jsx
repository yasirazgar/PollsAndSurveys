import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../Utils/Modal';
import SignUpForm from './SignUpForm'
import ModalButtonGroup from '../Utils/ModalButtonGroup';
import { SIGNUP_MODAL, SIGNUP_FORM, SIGNUP_BUTTON } from '../constants';
import { toggleSignUpButton, signup, toggleSignUpModal } from '../../actions';

class SignUpModal extends Component {
  constructor(props){
      super(props)

      this.email = null
      this.password = null
      this.confirmPassword = null
      this.name = null
      this.nickName = null
      this.emailValid = false
      this.passwordValid = false
      this.confirmPasswordValid = false
      this.setFormValidity = this.setFormValidity.bind(this)
    }

    setFormValidity = (key, value, isValid) => {
      this[key+'Valid'] = isValid;
      this[key] = value;

      const formValid = this.emailValid && this.passwordValid && this.passwordsMatch();
      this.props.toggleSignUpButton(formValid)
    }

    passwordsMatch = () => {
      return (this.confirmPassword == this.password);
    }

    signUpHandler = () => {
      this.props.signup({
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        name: this.name,
        nickName: this.nickName
      })
    }

    signUpHandler2 = () => {
      document.getElementById(SIGNUP_FORM).submit();
      return false;
    }

    closeHandler = () => {
      this.props.toggleSignUpModal(false);
    }

  render() {
    if (this.props.modal != SIGNUP_MODAL){
      return null;
    }

    let modalBody = <div className="form sign-in">
      <SignUpForm setFormValidity={this.setFormValidity} />
    </div>;

    let modalFooter = <ModalButtonGroup
      form={SIGNUP_FORM}
      submitEnabled={true}
      closeModalHandler={this.closeHandler}
       />
       // submitHandler={this.signUpHandler2}

    return (
      <Modal
        closeModalHandler={this.closeHandler}
        modalHeader={this.props.translations.signup}
        modalBody={modalBody}
        modalFooter={modalFooter}
      />
    )
  }
};

SignUpModal.propTypes = {
  enableSubmitButton: PropTypes.func
}
const mapStateToProps = state => {
  return {
    enabledModalButton: state.enabledModalButton,
    modal: state.modal,
    translations: state.translations
  };
}

export default connect(mapStateToProps, {toggleSignUpModal, toggleSignUpButton, signup})(SignUpModal);
