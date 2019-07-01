import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../Utils/Input'
import { optionsList, optionsListWithAnswer } from '../Helpers/polls_helper'

import './Poll.scss'

class Poll extends Component {
  constructor(props){
    super(props)
    this.state = {
      poll: this.props.poll,
      isWithAnswer: false
    }
    this.setAnswers = this.setAnswers.bind(this);
    this.buildOptionsList = this.buildOptionsList.bind(this);
  }

  setAnswers = (poll, isWithAnswer) => {
    this.setState({poll: poll, isWithAnswer: isWithAnswer})
  }

  buildOptionsList = () => {
    let options;
    if(this.state.isWithAnswer){
      options = optionsListWithAnswer(this.state.poll, this.setAnswers);
    }
    else {
      options = optionsList(this.state.poll, this.setAnswers);
    }
    return options;
  }

  render() {
    return (
      <div className="poll">
        <div className="poll__question">
          <h2>{this.props.poll.question}</h2>
        </div>

        <ul className="poll__options">
          {this.buildOptionsList()}
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
