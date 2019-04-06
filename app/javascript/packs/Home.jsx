// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer'
import Backdrop from './Backdrop/Backdrop'
import MainWrapper from './MainWrapper'
import Footer from './Footer/Footer'
import Modal from './Utils/Modal'
import Input from './Utils/Input'
import Loader from './Utils/Loader'
import ProfileModal from './Profile/ProfileModal'
import SignInModal from './Session/SignInModal'
import SignUpModal from './Session/SignUpModal'
import ModalButtonGroup from './Utils/ModalButtonGroup'

import signUpHandler from './Handlers/signUpHandler';
import signInHandler from './Handlers/signInHandler';
import logoutHandler from './Handlers/logoutHandler';

import './Tooltip.scss'
import './Common.scss'

import 'whatwg-fetch'

class Home extends Component {
  constructor(){
    super();

    this.setLoginFormValidity = this.setLoginFormValidity.bind(this);
    this.signInHandler = signInHandler;
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

  componentDidMount() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user){
      this.setState({signedIn: true, user: user})
    }
  }

  setLoginFormValidity = (key, Input_value, isValid) => {
    this[key + "Valid"] = isValid;
    this[key] = Input_value;

    this.formValid = this.emailValid && this.passwordValid
    if (this.formValid != this.state.loginButtonEnabled){
      this.signInHandler = this.signInHandler.bind(this, this.email, this.password)
      this.setSignInModal()
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

  setSignInModal = () => {
    return <SignInModal submitEnabled={this.state.loginButtonEnabled} closeModalHandler={this.closeModalHandler} signInHandler={this.signInHandler} setFormValidity={this.setLoginFormValidity}/>
  }

  setSignUpModal = () => {
    return <SignUpModal closeModalHandler={this.closeModalHandler} signUnHandler={this.signInHandler}/>
  }


  render() {
    let modal, backdrop, loader;

    if(this.modal && this.state.modalOpen){
      modal = this["set"+this.modal+"Modal"]()
    }

    if (this.state.sideDrawerOpen) {
      this.backdrop = <Backdrop backdropClickHandler={this.backdropClickHandler} />;
    };

    if (this.state.showLoader) {
      this.loader = <Loader />
    }

    return (
      <div style={{height: '100%'}}>

        {loader}

        <Toolbar
          sideDrawerToggleClickHandler={this.sideDrawerToggleClickHandler}
          openProfileModal={this.openModal.bind(this, 'Profile')}
          logoutHandler={this.logoutHandler}
          openSignInModal={this.openModal.bind(this, 'SignIn')}
          openSignUpModal={this.openModal.bind(this, 'SignUp')}
          user={this.state.user}/>

        <SideDrawer open={this.state.sideDrawerOpen} user={this.state.user}/>

        <MainWrapper user={this.state.user}/>

        {backdrop}

        {modal}

        <Footer classes="normal"/>

      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Home />, document.querySelector('.app'))
})

export default Home