import React from 'react';
import Modal from '../Utils/Modal';

import ProfileForm from '../Profile/Form';
import ModalButtonGroup from '../Utils/ModalButtonGroup';

const ProfileModal = props => {
  let modalBody = <div className="profile__form">
      <ProfileForm />
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

export default ProfileModal;
