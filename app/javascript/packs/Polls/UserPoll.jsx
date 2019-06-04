import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OptionWithAnswer from './Options/OptionWithAnswer'
import Input from '../Utils/Input'

import './UserPoll.scss'


// Analyse whether this should be functional and class components
// <div style="height:26px;width:40%;background:red;border solid #ddd"></div>
class UserPoll extends Component {
  answerPoll = () => {
    let alreadySelected = event.target.parentElement.getElementsByClassName("checked");
    if (alreadySelected.length > 0) {
      alreadySelected[0].classList.remove("checked");
    }
    event.target.classList.add('checked');
  }

  buildOptionsList = () => {
    const optionsHash = this.props.options;
    const options = Object.keys(optionsHash);

    const optionsList = options.map((option) => {
      return (<OptionWithAnswer option={optionsHash[option]} name={option} clickHandler={this.answerPoll}/>)
    });

    return optionsList;
  }

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

    return (
      <div className="poll">
        <span className="delete" onClick={this.deletePoll.bind(this, this.props.pollId)}>×</span>
        <div className="poll__question">
          <h2>{this.props.question}</h2>
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
