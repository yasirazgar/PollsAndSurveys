// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer'
import Backdrop from './Backdrop/Backdrop'
import MainWrapper from './MainWrapper'
import Modal from './Utils/Modal'
import Input from './Utils/Input'
import Loader from './Utils/Loader'
import ProfileModal from './Modals/ProfileModal'
import SignInModal from './Modals/SignInModal'
import SignUpModal from './Modals/SignUpModal'
import ModalButtonGroup from './Utils/ModalButtonGroup'

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
      showLoader: false
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
  openSigninModal = () => {
    this.modal = <SignInModal closeModalHandler={this.closeModalHandler} />

    this.setState({modalOpen: true, signInModalOpen: true});
  };
  openSignupModal = () => {
    this.modal = <SignUpModal closeModalHandler={this.closeModalHandler} />

    this.setState({modalOpen: true, signUpModalOpen: true});
  };

  render() {
    let commonModal;

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
          openSigninModal={this.openSigninModal}
          openSignupModal={this.openSignupModal}/>

        <SideDrawer open={this.state.sideDrawerOpen} openProfileModal={this.openProfileModal}/>

        <MainWrapper />

        {this.backdrop}

        {commonModal}

      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Home />, document.querySelector('.app'))
})

export default Home