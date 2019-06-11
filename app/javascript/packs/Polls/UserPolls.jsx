import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserPoll from './UserPoll'

// Analyse whether this should be functional and class components
class UserPolls extends Component {
  state = {
    polls: []
  };

  buildUserPolls = () => {
    const pollsList = this.state.polls.map((poll, i) => {
      return (<UserPoll key={i} poll={poll} />)
    });
    return pollsList;
  }

  componentWillReceiveProps(nextProps){
    this.setState({polls: nextProps.polls})
  }

  componentDidMount() {
    if (this.props.polls){
      return
    }

    fetch('user/polls', {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      }
    }).then(response => {
      return response.json()
    }).then(data => {
      this.setState({polls: data.polls})
      polls = this.buildUserPolls(data.polls)
    });
  }

  render() {
    return this.buildUserPolls();
  }
}

export default UserPolls
