import React from 'react';

import './SideDrawer.scss';

import ProfileIcon from 'profile_icon.png'

const SideDrawer = props => {
  let classes = 'side-drawer';
  if (props.open) {
    classes = classes + ' open';
  }

  return (
    <nav className={classes}>
      <ul>
        <li><img className="avatar" src={ProfileIcon}></img></li>
        <li><a href="/">Logout/Login</a></li>
      </ul>
    </nav>
  );
}

export default SideDrawer;
