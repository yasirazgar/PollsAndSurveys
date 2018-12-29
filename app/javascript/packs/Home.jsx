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
import ModalButtonGroup from './Utils/ModalButtonGroup'
import ProfileForm from './Profile/form'

class Home extends Component {
  state = {
    sideDrawerOpen: false,
    modalOpen: false
  };

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
  openModalHandler = () => {
    this.setState({modalOpen: true});
  };

  render() {
    let backdrop, modal, modalBody, modalFooter;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop backdropClickHandler={this.backdropClickHandler} />;
    };

    if (this.state.modalOpen) {
      modalBody = <div className="profile__form">
        <ProfileForm />
      </div>
      modalFooter = <ModalButtonGroup />
      modal = <Modal
        closeModalHandler={this.closeModalHandler}
        modalHeader="Profile"
        modalBody={modalBody}
        modalFooter={modalFooter}
      />;
    };

    return (
      <div style={{height: '100%'}}>
        <Toolbar sideDrawerToggleClickHandler={this.sideDrawerToggleClickHandler} openModalHandler={this.openModalHandler}/>

        <SideDrawer open={this.state.sideDrawerOpen} openModalHandler={this.openModalHandler}/>;

        <MainWrapper />

        {backdrop}

        {modal}

      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Home />, document.querySelector('.app'))
})

export default Home