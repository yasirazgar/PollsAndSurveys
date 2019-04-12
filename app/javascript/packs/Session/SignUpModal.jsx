import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Modal from '../Utils/Modal';
import SignUpForm from './SignUpForm'
import signUpHandler from '../Handlers/signUpHandler';
import ModalButtonGroup from '../Utils/ModalButtonGroup';

class SignUpModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      submitEnabled: false
    }
    this.signUpHandler = signUpHandler
  }

  enableSubmitButton = (enabled, email, password, confirmPassword) => {
    this.signUpHandler.bind(this, email, password, confirmPassword)
    this.setState({submitEnabled: enabled});
  }

  render() {
    let modalBody = <div className="form sign-in">
      <SignUpForm
        enableSubmitButton={this.enableSubmitButton}
        closeModalHandler={this.props.closeModalHandler}
      />
    </div>;
    let modalFooter = <ModalButtonGroup
      primaryText='Submit'
      submitEnabled={this.state.submitEnabled}
      closeModalHandler={this.props.closeModalHandler}
      submitHandler={this.signUpHandler} />

    return (
      <Modal
        closeModalHandler={this.props.closeModalHandler}
        modalHeader="SingUp"
        modalBody={modalBody}
        modalFooter={modalFooter}
      />
    )
  }
};

SignUpModal.propTypes = {
  enableSubmitButton: PropTypes.func
}

export default SignUpModal;
