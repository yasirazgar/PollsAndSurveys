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
import ProfileModal from './Modals/Profile'
import SignInModal from './Modals/SignIn'
import SignUpModal from './Modals/SignUp'
import ModalButtonGroup from './Utils/ModalButtonGroup'

import './Tooltip.scss'
import './Common.scss'

import 'whatwg-fetch'

class Home extends Component {
  constructor(){
    super();
    this.backdrop = null;
    this.modal = null;
    this.modalBody = null;
    this.modalFooter = null;
    this.loader = null;

    this.state = {
      sideDrawerOpen: false,
      modalOpen: false,
      profileModalOpen: false,
      signInModalOpen: false,
      signUpModalOpen: false,
      showLoader: false,
      signedIn: false,
      user: null
    };
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
    this.setState({modalOpen: false});
  };
  openProfileModal = () => {

    this.modal = <ProfileModal closeModalHandler={this.closeModalHandler} />

    this.setState({modalOpen: true, profileModalOpen: true});
  };
  logoutHandler = () => {

  };
  signInHandler = () => {
    fetch('/login', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      },
      body: JSON.stringify({email: document.querySelector('.sign-in .email').value, password: document.querySelector('.sign-in .password').value})
    }).then(response => {
      return response.json()
    }).then(data => {
      if(data.user){
        this.setState({
          signedIn: true,
          signInModalOpen: false,
          modalOpen: false,
          user: data.user
        })
      }
    });
  }
  openSignInModal = () => {
    this.modal = <SignInModal closeModalHandler={this.closeModalHandler} signInHandler={this.signInHandler}/>

    this.setState({modalOpen: true, signInModalOpen: true});
  };
  signUpHandler = () => {
    fetch('/signup', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      },
      body: JSON.stringify({email: document.querySelector('.sign-in .email').value, password: document.querySelector('.sign-in .password').value})
    }).then(response => {
      return response.json()
    }).then(data => {
      if(data.user){
        this.setState({
          signedIn: true,
          signInModalOpen: false,
          modalOpen: false,
          user: data.user
        })
      }
    });
  }
  openSignUpModal = () => {
    this.modal = <SignUpModal closeModalHandler={this.closeModalHandler} signUnHandler={this.signInHandler}/>

    this.setState({modalOpen: true, signUpModalOpen: true});
  };

  render() {
    let commonModal;
    this.backdrop = null;
    this.loader = null;


    if (this.state.sideDrawerOpen) {
      this.backdrop = <Backdrop backdropClickHandler={this.backdropClickHandler} />;
    };

    if (this.state.modalOpen) {
      commonModal = this.modal;
    };

    if (this.state.showLoader) {
      this.loader = <Loader />
    }

    return (
      <div style={{height: '100%'}}>

        {this.loader}

        <Toolbar
          sideDrawerToggleClickHandler={this.sideDrawerToggleClickHandler}
          openProfileModal={this.openProfileModal}
          logoutHandler={this.logoutHandler}
          openSignInModal={this.openSignInModal}
          openSignUpModal={this.openSignUpModal}
          user={this.state.user}/>

        <SideDrawer open={this.state.sideDrawerOpen} openProfileModal={this.openProfileModal} user={this.state.user}/>

        <MainWrapper user={this.state.user}/>

        {this.backdrop}

        {commonModal}

        <Footer classes="normal"/>

      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Home />, document.querySelector('.app'))
})

export default Home