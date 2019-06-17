import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../Utils/Input'
import { optionsList, optionsListWithAnswer } from '../Helpers/polls_helper'

import './Poll.scss'

// Analyse whether this should be functional and class components
class Poll extends Component {
  constructor(props){
    super(props)
    this.state = {
      options: this.props.poll.options,
      isWithAnswer: this.props.isWithAnswer,
    }
    this.setAnswers = this.setAnswers.bind(this);
    this.buildOptionsList = this.buildOptionsList.bind(this);
  }

  setAnswers = (options) => {
    this.setState({options: options, isWithAnswer: true})
  }

  buildOptionsList = (optionsHash, poll_id) => {
    const names = Object.keys(optionsHash);
    let list;

    if (this.state.isWithAnswer){
      list = optionsListWithAnswer(optionsHash, names, poll_id, this.setAnswers)
    }
    else {
      list = optionsList(optionsHash, names, poll_id, this.setAnswers)
    }
    return list;
  }

  render() {
    const poll = this.props.poll

    return (
      <div className="poll">
        <div className="poll__question">
          <h2>{poll.question}</h2>
        </div>

        <ul className="poll__options">
          {this.buildOptionsList(this.state.options, poll.poll_id)}
        </ul>
      </div>
    );
  }
}

Poll.propTypes = {
  question: PropTypes.string,
  options: PropTypes.array,
  categories: PropTypes.array
}

export default Poll
