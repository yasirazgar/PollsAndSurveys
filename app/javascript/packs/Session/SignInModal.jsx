import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isValid, isPristine, isSubmitting } from 'redux-form';

import Modal from '../Utils/Modal';
import ModalButtonGroup from '../Utils/ModalButtonGroup';
import SignInForm from './SignInForm';

import { login, toggleSignInModal } from '../../actions'
import { SIGNIN_MODAL, SIGNIN_BUTTON, SIGNIN_FORM } from '../constants'

const SignInModal = props => {
  if (props.modal != SIGNIN_MODAL){
    return null;
  }
  const close = () => props.dispatch(toggleSignInModal(false));

  const modalBody = <div className="form sign-in">
    <SignInForm />
  </div>;

  const modalFooter = <ModalButtonGroup
    form={SIGNIN_FORM}
    submitEnabled={true}
    closeModalHandler={close}
    />

  return (
    <Modal
      closeModalHandler={close}
      modalHeader={props.translations.signin}
      modalBody={modalBody}
      modalFooter={modalFooter}
    />
  )
};

const mapStateToProps = state => {
  return {
    enabledModalButton: state.enabledModalButton,
    modal: state.modal,
    translations: state.translations
  };
}

export default connect(mapStateToProps)(SignInModal);
