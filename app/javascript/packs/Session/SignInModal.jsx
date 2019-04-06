import React, {Component, Fragment} from 'react';
import Modal from '../Utils/Modal';
import ModalButtonGroup from '../Utils/ModalButtonGroup';
import SignInForm from './SignInForm';

const SignInModal = props => {
  let modalBody = <div className="form sign-in">
    <SignInForm setFormValidity={props.setFormValidity}/>
  </div>;

  let modalFooter = <ModalButtonGroup
    primaryText='Submit'
    submitEnabled={props.submitEnabled}
    closeModalHandler={props.closeModalHandler}
    submitHandler={props.signInHandler}/>

  return (
    <Modal
      closeModalHandler={props.closeModalHandler}
      modalHeader='Sign in'
      modalBody={modalBody}
      modalFooter={modalFooter}
    />
  )
};

export default SignInModal;
