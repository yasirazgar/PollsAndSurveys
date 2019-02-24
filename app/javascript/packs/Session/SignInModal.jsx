import React, {Component, Fragment} from 'react';
import Modal from '../Utils/Modal';
import ModalButtonGroup from '../Utils/ModalButtonGroup';
import SignInForm from './SignInForm'
import Input from '../Utils/Input'

class SignInModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      submitEnabled: false
    }
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
  }

  enableSubmitButton = (enabled) => {
    this.setState({submitEnabled: enabled});
  }

  render() {
    let modalBody = <div className="form sign-in">
      <SignInForm enableSubmitButton={this.enableSubmitButton}/>
    </div>;

    let modalFooter = <ModalButtonGroup
      primaryText='Submit'
      submitEnabled={this.state.submitEnabled}
      closeModalHandler={this.props.closeModalHandler}
      submitHandler={this.props.signInHandler}/>

    return (
      <Modal
        closeModalHandler={this.props.closeModalHandler}
        modalHeader='Sign in'
        modalBody={modalBody}
        modalFooter={modalFooter}
      />
    )
  }
};

export default SignInModal;
