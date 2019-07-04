import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPolls, fetchUserPolls, fetchRespondedPolls } from '../../actions'
import Button from '../Utils/Button'
import {POLLS_TAB, USER_POLLS_TAB, RESPONDED_POLLS_TAB, TAB_CLASS, TAB_ACTIVE_CLASS} from '../constants.js'

import './Tabs.scss'

class Tabs extends Component {
  render() {
    let tabs = [<Button classes={this.props.pollsClass} clickHandler={this.props.fetchPolls} text={this.props.translations[POLLS_TAB]} />]

    if (this.props.user){
      tabs.push(<Button classes={this.props.userPollsClass} clickHandler={this.props.fetchUserPolls} text={this.props.translations[USER_POLLS_TAB]} />)
      tabs.push(<Button classes={this.props.respondedPollsClass} clickHandler={this.props.fetchRespondedPolls} text={this.props.translations[RESPONDED_POLLS_TAB]} />)
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
    respondedPollsClass: state.tab.respondedPollsClass,
    translations: state.translations
  }
}

export default connect(mapStateToProps, {fetchPolls, fetchUserPolls, fetchRespondedPolls})(Tabs)
