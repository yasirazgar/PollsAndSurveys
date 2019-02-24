import React, {Component} from 'react';
import Modal from '../Utils/Modal';
import SignUpForm from './SignUpForm'

import ModalButtonGroup from '../Utils/ModalButtonGroup';

class SignUpModal extends Component {
  state = {
    emailError: null,
    passwordError: null,
    submitEnabled: false
  }

  enableSubmitButton = (enabled) => {
    this.setState({submitEnabled: enabled});
  }

  validateEmail = (event) => {
    let validEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value));
    if (!validEmail) {
      this.setState({emailError: "Invalid email."});
    }
  };

  validatePassword = (event) => {
    let validPassword = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(event.target.value));

    if (!validPassword) {
      this.setState({emailError: "Invalid password, should have 1 small case, 1 upper case, and 1 numeric character."});
    }
  };

  render() {
    let modalBody = <div className="form sign-in">
      <SignUpForm enableSubmitButton={this.enableSubmitButton}/>
    </div>;
    let modalFooter = <ModalButtonGroup prim_text="Submit"
      submitEnabled={this.state.submitEnabled}
      closeModalHandler={this.props.closeModalHandler}
      submitHandler={this.props.signInHandler}
    />

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

export default SignUpModal;
