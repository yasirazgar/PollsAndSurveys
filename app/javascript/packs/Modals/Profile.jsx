import React, { Component } from 'react';
import Modal from '../Utils/Modal';

import ModalButtonGroup from '../Utils/ModalButtonGroup';

class Profile extends Component {
  state = {

  };

  render() {
    let modalBody = <div className="form profile">
      <input placeholder={this.props.name} />
      <input placeholder={this.props.name} />
      <input placeholder={this.props.name} />
      <input placeholder={this.props.name} />
    </div>
    let modalFooter = <ModalButtonGroup prim_text="Submit"/>

    return (
      <Modal
        closeModalHandler={this.props.closeModalHandler}
        modalHeader="Profile"
        modalBody={modalBody}
        modalFooter={modalFooter}
      />
    )
  }
};

export default Profile;
