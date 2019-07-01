import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPolls } from '../../actions'
import {POLLS_TAB, USER_POLLS_TAB, RESPONDED_POLLS_TAB, POLLS_MAP} from '../constants.js'

import Poll from './Poll'
import UserPoll from './UserPoll'
import RespondedPoll from './RespondedPoll'

const pollsComponentsMap = {
  [POLLS_TAB]: Poll,
  [USER_POLLS_TAB]: UserPoll,
  [RESPONDED_POLLS_TAB]: RespondedPoll
}
class Polls extends Component {
  componentDidMount = () =>  this.props.fetchPolls();

  render() {
    const polls = this.props[POLLS_MAP[this.props.selectedTab]]
    const PollsComponent = pollsComponentsMap[this.props.selectedTab]

    return (
      polls.map((poll, index) => {
        return(<PollsComponent key={index} poll={poll}/>);
      })
    )
  }
}

const mapStateToProps = state => {
  return {
    polls: state.polls,
    userPolls: state.userPolls,
    respondedPolls: state.respondedPolls,
    selectedTab: state.tab.selectedTab
  };
};

export default connect(mapStateToProps, { fetchPolls })(Polls)
