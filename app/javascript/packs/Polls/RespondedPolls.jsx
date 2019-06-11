import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Poll from './Poll'

// Analyse whether this should be functional and class components
class RespondedPolls extends Component {
  state = {
    polls: []
  };

  componentWillReceiveProps(nextProps){
    this.setState({polls: nextProps.polls})
  }

  buildUserPolls = () => {
    let pollsList = this.state.polls.map((poll, i) => {
      return (<Poll isWithAnswer={true} key={i} poll={poll} />)
    });
    return pollsList;
  }

  componentDidMount() {
    if (this.props.polls){
      return
    }

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
      this.setState({polls: data.polls})
    });
  }

  render() {
    return this.buildUserPolls();
  }
}

export default RespondedPolls
