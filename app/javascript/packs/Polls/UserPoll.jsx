import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { optionsListWithAnswer } from '../Helpers/polls_helper'
import Input from '../Utils/Input'

import './UserPoll.scss'


// Analyse whether this should be functional and class components
// <div style="height:26px;width:40%;background:red;border solid #ddd"></div>
class UserPoll extends Component {
  constructor(props){
    super(props)
    this.state = {
      poll: this.props.poll,
    }
    this.setAnswers = this.setAnswers.bind(this);
  }

  setAnswers = (options) => {
    this.setState({options: options})
  }

  buildOptionsList = () => optionsListWithAnswer(this.state.poll, this.setAnswers);

  deletePoll = (pollId) => {
    url = '/polls/' + pollId
    fetch('/polls', {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      }
    }).then(response => {
      if (response.ok){
        alert("Your poll was deleted successfully");
        this.props.fetchUserPolls();
      }
      else{
        alert("Error deleting Poll");
      }
    })
  }

  render() {
    let deleteButton = (<span className="delete" onClick={this.deletePoll.bind(this, this.props.pollId)}>×</span>)
    let poll = this.props.poll

    return (
      <div className="poll">
        <span className="delete" onClick={this.deletePoll.bind(this, poll.poll_id)}>×</span>
        <div className="poll__question">
          <h2>{poll.question}</h2>
        </div>

        <ul className="poll__options">
          {this.buildOptionsList()}
        </ul>
      </div>

    );
  }
}

UserPoll.propTypes = {
  question: PropTypes.string,
  options: PropTypes.array,
  categories: PropTypes.array
}

export default UserPoll
