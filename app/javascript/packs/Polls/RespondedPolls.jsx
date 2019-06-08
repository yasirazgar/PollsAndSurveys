import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserPoll from './UserPoll'

// Analyse whether this should be functional and class components
class RespondedPolls extends Component {
  state = {
    polls: []
  };

  buildUserPolls = (polls) => {
    let pollsList = polls.map((poll, i) => {
      return (<UserPoll key={i} poll={poll} />)
    });
    return pollsList;
  }

  componentDidMount() {
    let polls;
    fetch('user/responded_polls', {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      }
    }).then(response => {
      return response.json()
    }).then(data => {
      polls = this.buildUserPolls(data.polls)
      window.localStorage.setItem('categories', JSON.stringify(data.categories))
      this.setState({polls: polls})
    });
  }

  render() {
    return this.state.polls;
  }
}

export default RespondedPolls