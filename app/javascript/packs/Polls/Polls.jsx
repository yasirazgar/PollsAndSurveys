import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Poll from './Poll'

// Analyse whether this should be functional and class components
class Polls extends Component {
  state = {
    polls: []
  };

  buildPolls = () => {
    const polls = this.state.polls.map((poll, i) => {
      return (<Poll isWithAnswer={false} key={i} poll={poll}/>)
    });
    return polls
  }

  componentWillReceiveProps(nextProps){
    this.setState({polls: nextProps.polls})
  }

  componentDidMount() {
    /* Dont check state here, as we are setting empty array
    and if search results send empty array then this condition will fails*/
    if (this.props.polls){
      return
    }
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
      this.setState({polls: data.polls})
    });
  }

  render() {
    return this.buildPolls();
  }
}

export default Polls
