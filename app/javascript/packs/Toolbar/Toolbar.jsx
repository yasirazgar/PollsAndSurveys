import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToggleButton from '../SideDrawer/ToggleButton'

import ProfileIcon from 'user__anonymous.svg'
import MegaphoneIcon from 'megaphone.svg'

import './Toolbar.scss';

const Toolbar = props => {
  let navItems;

  if (props.user){
    navItems = [
      <li key="1" className="links" onClick={props.logoutHandler}>{props.translations.logout}</li>,
      <li key="2"><img className="avatar" src={ProfileIcon} onClick={props.openProfileModal}></img></li>
    ]
  }
  else {
    navItems = [
      <li key="1" className="links signin" onClick={props.openSignInModal}>{props.translations.signin}</li>,
      <li key="2" className="links signup" onClick={props.openSignUpModal}>{props.translations.signup}</li>
    ]
  }

  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <ToggleButton clickHandler={props.sideDrawerToggleClickHandler} />
        </div>
        <div className="toolbar__logo">
          <a href="/">
            <img style={{ width: '5%', height: 'auto' }} className="logo" src={MegaphoneIcon} ></img>
          </a>
        </div>
        <div className="spacer"> </div>
        <div className="toolbar_navigation-items">
          <ul>
            {navItems}
          </ul>
        </div>
      </nav>
    </header>
  )
};

Toolbar.propTypes = {
  user: PropTypes.object,
  openSignInModal: PropTypes.func,
  openSignUpModal: PropTypes.func,
  logoutHandler: PropTypes.func,
  sideDrawerToggleClickHandler: PropTypes.func,
  togglePollMode: PropTypes.func
}

const mapStateToProps = state => {
  return {
    translations: state.translations
  }
}

export default connect(mapStateToProps)(Toolbar)
