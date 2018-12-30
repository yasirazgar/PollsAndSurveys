import React from 'react';
import Modal from '../Utils/Modal';

import SignUpForm from '../Session/SignUpForm';
import ModalButtonGroup from '../Utils/ModalButtonGroup';

const SignUpModal = props => {
  let modalBody = <div className="profile__form">
      <SignUpForm />
    </div>
  let modalFooter = <ModalButtonGroup prim_text="Submit"/>

  return (
    <Modal
      closeModalHandler={props.closeModalHandler}
      modalHeader="Profile"
      modalBody={modalBody}
      modalFooter={modalFooter}
    />
  )
};

export default SignUpModal;
