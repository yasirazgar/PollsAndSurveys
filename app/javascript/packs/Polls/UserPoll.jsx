import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { optionsListWithAnswer } from '../Helpers/polls_helper'
import { deletePoll } from '../../actions'

import './UserPoll.scss'


// Analyse whether this should be functional and class components
// <div style="height:26px;width:40%;background:red;border solid #ddd"></div>
const UserPoll = ({poll, deletePoll}) => {
  const buildOptionsList = () => optionsListWithAnswer(poll);

  const deletePollHandler = () => deletePoll(poll.poll_id);

  return (
    <div className="poll">
      <span className="delete" onClick={deletePollHandler}>×</span>
      <div className="poll__question">
        <h2>{poll.question}</h2>
      </div>

      <ul className="poll__options">
        {buildOptionsList()}
      </ul>
    </div>
  );
}

UserPoll.propTypes = {
  question: PropTypes.string,
  options: PropTypes.array,
  categories: PropTypes.array
}

const mapStateToProps = state => {
  return { };
};

export default connect(mapStateToProps, { deletePoll })(UserPoll)
