import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../Utils/Modal';
import ProfileForm from './ProfileForm'

import ModalButtonGroup from '../Utils/ModalButtonGroup';

import { PROFILE_MODAL, PROFILE_BUTTON, } from '../constants';

const ProfileModal = (props) => {
  if (props.modal != PROFILE_MODAL){
    return null;
  }
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

const mapStateToProps = state => {
  return {
    enabledModalButton: state.enabledModalButton,
    modal: state.modal,
  };
}

export default connect(mapStateToProps)(ProfileModal);
