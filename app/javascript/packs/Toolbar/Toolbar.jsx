import React from 'react';

import ToggleButton from '../SideDrawer/ToggleButton'

import './Toolbar.scss';

import ProfileIcon from 'profile_icon.png'

const Toolbar = props => {
  let loginOrLogout;
  if (props.signedIn){
    loginOrLogout = <li className="links" onClick={props.logoutHandler}>Logout</li>
  }
  else {
    loginOrLogout = [
      <li key="0" className="links" onClick={props.openSigninModal}>Singin</li>,
      <li key="1" className="links" onClick={props.openSignupModal}>Signup</li>
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
            {loginOrLogout}
            <li><img className="avatar" src={ProfileIcon} onClick={props.openProfileModal}></img></li>
          </ul>
        </div>
      </nav>
    </header>
  )
};

export default Toolbar;
