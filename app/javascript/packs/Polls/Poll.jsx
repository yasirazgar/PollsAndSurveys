import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { optionsList, optionsListWithAnswer } from '../Helpers/polls_helper'

import './Poll.scss'

const Poll = props => {
  let options, poll
  if(props.currentPoll){
    poll = props.currentPoll
    options = optionsListWithAnswer(poll);
  }
  else {
    poll = props.poll
    options = optionsList(poll);
  }
  return (
    <div className="poll">
      <div className="poll__question">
        <h2>{poll.question}</h2>
      </div>

      <ul className="poll__options">
        {options}
      </ul>
    </div>
  );
}

Poll.propTypes = {
  question: PropTypes.string,
  options: PropTypes.array,
  categories: PropTypes.array
}

const mapStateToProps = state => {
  return {
    currentPoll: state.currentPoll
  };
};

export default connect(mapStateToProps)(Poll)
