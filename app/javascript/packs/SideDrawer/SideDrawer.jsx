import React from 'react';

import Button from '../Utils/Button'
import ProfileForm from '../Profile/form'

import './SideDrawer.scss';

import ProfileIcon from 'profile_icon.png'

// let isFormVisible = false;
// const showForm = () => {
//   let profileForm = document.getElementsByClassName("profile-form")[0];
//   profileForm.classList.add("show");
// }
const SideDrawer = props => {
  let classes = 'side-drawer';
  if (props.open) {
    classes = classes + ' open';
  }


  return (
    <nav className={classes}>
      <div className="wrapper">
        <Button classes="delete" text="Logout/Login" />
        <img className="avatar" src={ProfileIcon}></img>

        <div className="profile-form">
          <ProfileForm />
          <Button text="Submit"/>
        </div>
      </div>
    </nav>
  );
}

export default SideDrawer;
