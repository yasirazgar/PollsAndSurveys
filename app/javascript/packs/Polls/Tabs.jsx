import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPolls, fetchUserPolls, fetchRespondedPolls } from '../../actions'
import Button from '../Utils/Button'
import {POLLS_TAB, USER_POLLS_TAB, RESPONDED_POLLS_TAB, TAB_CLASS, TAB_ACTIVE_CLASS} from '../constants.js'

import './Tabs.scss'

const Tabs = (props) =>  {
  let tabs = [<Button classes={props.pollsClass} clickHandler={props.fetchPolls} text={props.translations[POLLS_TAB]} />]

  if (props.user){
    tabs.push(<Button classes={props.userPollsClass} clickHandler={props.fetchUserPolls} text={props.translations[USER_POLLS_TAB]} />)
    tabs.push(<Button classes={props.respondedPollsClass} clickHandler={props.fetchRespondedPolls} text={props.translations[RESPONDED_POLLS_TAB]} />)
  }

  return (
   <div className="tabs">
     {tabs}
   </div>
  );
}

const mapStateToProps = state => {
  return {
    selectedTab: state.selectedTab,
    pollsClass: state.tab.pollsClass,
    userPollsClass: state.tab.userPollsClass,
    respondedPollsClass: state.tab.respondedPollsClass,
    translations: state.translations,
    user: state.user
  }
}

export default connect(mapStateToProps, {fetchPolls, fetchUserPolls, fetchRespondedPolls})(Tabs)
