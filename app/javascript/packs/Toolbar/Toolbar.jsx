import React from 'react';

import ToggleButton from '../SideDrawer/ToggleButton'

import './Toolbar.scss';

import ProfileIcon from 'profile_icon.png'

const Toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div className="toolbar__toggle-button">
        <ToggleButton clickHandler={props.sideDrawerToggleClickHandler} />
      </div>
      <div className="toolbar__logo"><a href="/">Logo</a></div>
      <div className="spacer"> </div>
      <div className="toolbar_navigation-items">
        <ul>
          <li><a href="/">Logout/Login</a></li>
          <li><img className="avatar" src={ProfileIcon} onClick={props.openModalHandler}></img></li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Toolbar;
