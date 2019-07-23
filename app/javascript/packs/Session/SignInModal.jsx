import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submit, isValid, isPristine, isSubmitting } from 'redux-form';

import Modal from '../Utils/Modal';
import ModalButtonGroup from '../Utils/ModalButtonGroup';
import SignInForm from './SignInForm';

import { login, toggleSignInModal } from '../../actions'
import { SIGN_IN_MODAL, SIGN_IN_BUTTON, SIGN_IN_FORM } from '../constants'

const SignInModal = props => {
  if (props.modal != SIGN_IN_MODAL){
    return null;
  }
  let modalBody = <div className="form sign-in">
    <SignInForm onSubmit={(values) => props.dispatch(login(values))}/>
  </div>;

  let modalFooter = <ModalButtonGroup
    submitEnabled={props.valid}
    closeModalHandler={() => props.dispatch(toggleSignInModal(false))}
    submitHandler={() => props.dispatch(submit(SIGN_IN_FORM))}/>

  return (
    <Modal
      closeModalHandler={() => props.dispatch(toggleSignInModal(false))}
      modalHeader='Sign in'
      modalBody={modalBody}
      modalFooter={modalFooter}
    />
  )
};

SignInModal.propTypes = {
  setFormValidity: PropTypes.func,
  submitEnabled: PropTypes.func,
  signInHandler: PropTypes.func,
  closeModalHandler: PropTypes.func
}

const mapStateToProps = state => {
  return {
    enabledModalButton: state.enabledModalButton,
    modal: state.modal,
    valid: isValid(SIGN_IN_FORM)(state),
    submitting: isSubmitting(SIGN_IN_FORM)(state),
    pristine: isPristine(SIGN_IN_FORM)(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      toggleSignInModal
    }, dispatch)
  };
}

export default connect(mapStateToProps)(SignInModal);
