import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Utils/Modal';
import ProfileForm from './ProfileForm'

import ModalButtonGroup from '../Utils/ModalButtonGroup';

const ProfileModal = () => {
  let modalBody = <div className="form profile">
    <ProfileForm />
  </div>
  let modalFooter = <ModalButtonGroup closeModalHandler={props.closeModalHandler} />

  return (
    <Modal
      closeModalHandler={props.closeModalHandler}
      modalHeader="Profile"
      modalBody={modalBody}
      modalFooter={modalFooter}
    />
  )
};

ProfileModal.propTypes = {
  closeModalHandler: PropTypes.func
}

export default ProfileModal;
