
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer'
import Backdrop from './Backdrop/Backdrop'
import MainWrapper from './MainWrapper'
import Footer from './Footer/Footer'
import Modal from './Utils/Modal'
import Input from './Utils/Input'
import Loader from './Utils/Loader'
import ProfileModal from './Profile/ProfileModal'
import SignUpModal from './Session/SignUpModal'
import SignInModal from './Session/SignInModal'

import signUpHandler from './Handlers/signUpHandler';
import logoutHandler from './Handlers/logoutHandler';

import './Tooltip.scss'
import './Common.scss'

class Home extends Component {
  constructor(props){
    super(props);

    this.setLoginFormValidity = this.setLoginFormValidity.bind(this);
    // this.signInHandler = signInHandler.bind(this);
    this.modal = null;
    this.email = null;
    this.emailValid = false;
    this.password = null;
    this.passwordValid = false;
    this.formValid = false;

    this.state = {
      sideDrawerOpen: false,
      modalOpen: false,
      showLoader: false,
      signedIn: false,
      user: null,
      loginButtonEnabled: false
    };

  }

  loginSucessCallback = (data) => {
    if(data.user) {
      this.setState({
        signedIn: true,
        modalOpen: false,
        user: data.user
      })

      window.localStorage.setItem('user', JSON.stringify({name: (data.user.name || data.user.email)}))
    }
    else{
      this.setState({
        modalOpen: false,
      })
      alert("Invalid");
    }
  };

  componentDidMount() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user){
      this.setState({signedIn: true, user: user})
    }
  }

  setLoginFormValidity = (key, Input_value, isValid) => {
    this[key] = Input_value;
    this[key + "Valid"] = isValid;
    this.formValid = this.emailValid && this.passwordValid
    if (this.formValid != this.state.loginButtonEnabled){
      this.setState({loginButtonEnabled: this.formValid});
    }
  }

  sideDrawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  closeModalHandler = () => {
    this.modal = null;
    this.setState({modalOpen: false});
  };

  setProfileModal = () => {
    return <ProfileModal closeModalHandler={this.closeModalHandler} />
  }
  openModal = (name) => {
    this.modal = name
    this.setState({modalOpen: true});
  };

  setSignUpModal = () => {
    return null
  }

  render() {
    let modal, backdrop, loader;

    // if(this.modal && this.state.modalOpen){
    //   modal = this["set"+this.modal+"Modal"]()
    // }

    if (this.state.sideDrawerOpen) {
      this.backdrop = <Backdrop backdropClickHandler={this.backdropClickHandler} />;
    };

    if (this.state.showLoader) {
      this.loader = <Loader />
    }

    return (
      <div style={{height: '100%'}}>

        <SignInModal />

        {loader}

        <Toolbar
          sideDrawerToggleClickHandler={this.sideDrawerToggleClickHandler}
          openProfileModal={this.openModal.bind(this, 'Profile')}
          logoutHandler={this.logoutHandler}
          openSignUpModal={this.openModal.bind(this, 'SignUp')}
          user={this.state.user}/>

        <SideDrawer open={this.state.sideDrawerOpen} user={this.state.user}/>

        <MainWrapper user={this.state.user} />

        {backdrop}

        {modal}

        <Footer classes="normal"/>

      </div>
    );
  }
}
const mapStateToProps = () => {
  return {};
}
export default Home
