import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../Utils/Input'

import './Poll.scss'


// Analyse whether this should be functional and class components
class Poll extends Component {
  answerPoll = () => {
    let alreadySelected = event.target.parentElement.getElementsByClassName("checked");
    if (alreadySelected.length > 0) {
      alreadySelected[0].classList.remove("checked");
    }
    event.target.classList.add('checked');
  }

  optionsList = () => {
    let options = []

    for (let i = 0; i < this.props.options.length; i++) {
      options.push(<li key={i.toString()} onClick={this.answerPoll}>{this.props.options[i]} </li>)
    }
    return options
  }

  render() {

    return (
      <div className="poll">
        <div className="poll__question">
          <h2>{this.props.question}</h2>
        </div>

        <ul className="poll__options">
          {this.optionsList()}
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
