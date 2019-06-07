import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Poll from './Poll'

// Analyse whether this should be functional and class components
class Polls extends Component {
  state = {
    polls: []
  };

  componentDidMount() {
    let polls;
    fetch('/polls', {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      }
    }).then(response => {
      return response.json()
    }).then(data => {
      polls = data.polls.map((poll, i) => {
        return (<Poll isWithAnswer={false} key={i} poll={poll}/>)
      });
      this.setState({polls: polls})
    });
  }

  render() {
    return this.state.polls;
  }
}

export default Polls
