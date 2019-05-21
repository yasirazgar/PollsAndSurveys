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
      let index = 0
      polls = data.polls.map((poll) => {
        return (<Poll key={index += 1} question={poll.question} categories={poll.categories} options={poll.options} />)
      });
      this.setState({polls: polls})
    });
  }

  render() {
    return this.state.polls;
  }
}

export default Polls
