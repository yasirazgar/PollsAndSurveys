
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer'
import Backdrop from './Backdrop/Backdrop'
import MainWrapper from './MainWrapper'
import Footer from './Footer/Footer'
import ProfileModal from './Profile/ProfileModal'
import SignUpModal from './Session/SignUpModal'
import SignInModal from './Session/SignInModal'

import './Tooltip.scss'
import './Common.scss'

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      sideDrawerOpen: false,
      showLoader: false,
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

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop backdropClickHandler={this.backdropClickHandler} />;
    };

    return (
      <div style={{height: '100%'}}>

        <Toolbar sideDrawerToggleClickHandler={this.sideDrawerToggleClickHandler} />

        <SideDrawer open={this.state.sideDrawerOpen} user={this.state.user}/>

        <MainWrapper user={this.state.user} />

        {backdrop}

        <Footer classes="normal"/>

        <SignInModal />
        <SignUpModal />
        <ProfileModal />
      </div>
    );
  }
}

export default Home
