import React from 'react';
import Modal from '../Utils/Modal';

import SignInForm from '../Session/SignInForm';
import ModalButtonGroup from '../Utils/ModalButtonGroup';

const SignInModal = props => {
  let modalBody = <div className="profile__form">
      <SignInForm />
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

export default SignInModal;
