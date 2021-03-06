import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '../Utils/Button'
import ProfileForm from '../Profile/ProfileForm'
import SignInForm from '../Session/SignInForm'
import SignUpForm from '../Session/SignUpForm'
import Footer from '../Footer/Footer'

import './SideDrawer.scss';

import ProfileIcon from 'user__anonymous.svg'

// let isFormVisible = false;
// const showForm = () => {
//   let profileForm = document.getElementsByClassName("profile-form")[0];
//   profileForm.classList.add("show");
// }

class SideDrawer extends Component {
  state = {
    signedIn: false,
    showSignInForm: true,
    enable: false
  }

  showSignInForm = () => {
    // let signInForm = document.getElementsByClassName("signin form")[0];
    // let signUpForm = document.getElementsByClassName("signup form")[0];

    // signUpForm.classList.add("hidden");
    // signInForm.classList.remove("hidden");

    this.setState({showSignInForm: true})
  }

  showSignUpForm = () => {
    // let signUpForm = document.getElementsByClassName("signup form")[0];
    // let signInForm = document.getElementsByClassName("signin form")[0];

    // signInForm.classList.add("hidden");
    // signUpForm.classList.remove("hidden");

    this.setState({showSignInForm: false})
  }

  render () {
    // !!! disabling for now, sends an login request from somewhere find and fix
    return false;

    let classes = 'side-drawer';
    if (this.props.open) {
      classes = classes + ' open';
    }

    let content, form;
    if (this.state.showSignInForm){
      form = <div className="signin form">
        <SignInForm />
        <Button text="Login" />
      </div>
    }
    else {
      form = <div className="signup form">
        <SignUpForm />
        <Button text="Submit" />
      </div>
    }
    if (this.state.signedIn) {
      content = <Fragment>
        <Button classes="delete" text="Logout" />
        <div className="form">
          <img className="avatar" src={ProfileIcon}></img>
          <ProfileForm />
          <Button text="Submit"/>
        </div>
      </Fragment>
    }
    else {
      content = <Fragment>
        <Button key="0" classes="other" text="SignIn" clickHandler={this.showSignInForm} />,
        <Button key="1" classes="other" text="SignUp" clickHandler={this.showSignUpForm} />
        {form}
      </Fragment>
    }

    return (
      <nav className={classes}>
        <div className="wrapper">
          {content}

          <Footer />
        </div>
      </nav>
    );
  }
}

SideDrawer.propTypes = {
  open: PropTypes.bool
}

export default SideDrawer;
