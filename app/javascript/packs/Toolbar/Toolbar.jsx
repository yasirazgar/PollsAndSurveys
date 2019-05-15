import React from 'react';
import PropTypes from 'prop-types';

import ToggleButton from '../SideDrawer/ToggleButton'

import './Toolbar.scss';

import ProfileIcon from 'user__anonymous.svg'

const Toolbar = props => {
  let navItems;

  if (props.user){
    navItems = [
      <li key="0" className="links" onClick={props.togglePollMode}>My Polls</li>,
      <li key="1" className="links" onClick={props.logoutHandler}>Logout</li>,
      <li key="2"><img className="avatar" src={ProfileIcon} onClick={props.openProfileModal}></img></li>
    ]
  }
  else {
    navItems = [
      <li key="1" className="links" onClick={props.openSignInModal}>Sign in</li>,
      <li key="2" className="links" onClick={props.openSignUpModal}>Sign up</li>
    ]
  }

  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <ToggleButton clickHandler={props.sideDrawerToggleClickHandler} />
        </div>
        <div className="toolbar__logo"><a href="/">Logo</a></div>
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

export default Toolbar;
