import React, {Component} from 'react';
import Modal from '../Utils/Modal';

import ModalButtonGroup from '../Utils/ModalButtonGroup';

class SignUp extends Component {
  state = {
    emailError: null,
    passwordError: null
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
      <input placeholder={this.props.name} classes="email" onChange={this.validateEmail} />
      <span className='error-message'> {this.state.emailError} </span>
      <input placeholder={this.props.name} classes="password" onChange={this.validatePassword}/>
      <span className='error-message'> {this.state.passwordError} </span>
      <input placeholder={this.props.name} classes="confirm-password" onChange={this.validatePassword}/>
      <span className='error-message'> {this.state.passwordError} </span>
      <input placeholder={this.props.name} classes="name" onChange={this.validatePassword}/>
      <span className='error-message'> {this.state.passwordError} </span>
    </div>;
    let modalFooter = <ModalButtonGroup prim_text="Submit"/>

    return (
      <Modal
        closeModalHandler={props.closeModalHandler}
        modalHeader="Profile"
        modalBody={modalBody}
        modalFooter={modalFooter}
      />
    )
  }
};

export default SignUp;
