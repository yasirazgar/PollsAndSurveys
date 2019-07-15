import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../Utils/Modal';
import ModalButtonGroup from '../Utils/ModalButtonGroup';
import SignInForm from './SignInForm';

import { login } from '../../actions'

const SignInModal = props => {
  let modalBody = <div className="form sign-in">
    <SignInForm setFormValidity={props.setFormValidity}/>
  </div>;

  let modalFooter = <ModalButtonGroup
    submitEnabled={props.submitEnabled}
    closeModalHandler={props.closeModalHandler}
    submitHandler={props.login}/>

  return (
    <Modal
      closeModalHandler={props.closeModalHandler}
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

const mapStateToProps = {}

export default connect(mapStateToProps, { login })(SignInModal);
