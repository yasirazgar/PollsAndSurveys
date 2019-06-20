import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPolls, fetchUserPolls, fetchRespondedPolls } from '../../actions'

import Button from '../Utils/Button'
import Polls from './Polls'
import UserPolls from './UserPolls'
import RespondedPolls from './RespondedPolls'
import {POLLS_TAB, USER_POLLS_TAB, RESPONDED_POLLS_TAB, TAB_CLASS, TAB_ACTIVE_CLASS} from '../constants.js'

import './Tabs.scss'

class Tabs extends Component {
  render() {
    let tabs = [<Button classes={this.props.pollsClass} clickHandler={this.props.fetchPolls} text={POLLS_TAB} />]

    if (this.props.user){
      tabs.push(<Button classes={this.props.userPollsClass} clickHandler={this.props.fetchUserPolls} text={USER_POLLS_TAB} />)
      tabs.push(<Button classes={this.props.respondedPollsClass} clickHandler={this.props.fetchRespondedPolls} text={RESPONDED_POLLS_TAB} />)
    }

    return (
     <div className="tabs">
       {tabs}
     </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedTab: state.selectedTab,
    pollsClass: state.tab.pollsClass,
    userPollsClass: state.tab.userPollsClass,
    respondedPollsClass: state.tab.respondedPollsClass
  }
}

export default connect(mapStateToProps, {fetchPolls, fetchUserPolls, fetchRespondedPolls})(Tabs)
