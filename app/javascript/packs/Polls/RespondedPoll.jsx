import React, { Component  } from 'react';
import PropTypes from 'prop-types';

import Input from '../Utils/Input'
import { optionsListWithAnswer } from '../Helpers/polls_helper'

import './Poll.scss'

// Analyse whether this should be functional and class components
class RespondedPoll extends Component {
  constructor(props){
    super(props)
    this.state = {
      poll: this.props.poll,
    }
    this.setAnswers = this.setAnswers.bind(this);
    this.buildOptionsList = this.buildOptionsList.bind(this);
  }

  setAnswers = (poll) => {
    this.setState({poll: poll})
  }

  buildOptionsList = () => optionsListWithAnswer(this.state.poll, this.setAnswers);

  render() {
    return (
      <div className="poll">
        <div className="poll__question">
          <h2>{this.state.poll.question}</h2>
        </div>

        <ul className="poll__options">
          {this.buildOptionsList()}
        </ul>
      </div>
    );
  }
}

RespondedPoll.propTypes = {
  question: PropTypes.string,
  options: PropTypes.array,
  categories: PropTypes.array
}

export default RespondedPoll
