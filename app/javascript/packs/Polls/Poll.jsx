import React, { Component } from 'react';

import Input from '../Utils/Input'

import './Poll.scss'

class Poll extends Component {
  state = {
    options: ["option1", "option2", "option3", "option4", "option5"]
  };

  answerPoll = () => {
    let alreadySelected = event.target.parentElement.getElementsByClassName("checked");
    if (alreadySelected.length > 0) {
      alreadySelected[0].classList.remove("checked");
    }
    event.target.classList.add('checked');
  }

  createOptions = () => {
    let options = []

    for (let i = 0; i < this.state.options.length; i++) {
      options.push(<li key={i.toString()} onClick={this.answerPoll}>{this.state.options[i]} </li>)
    }
    return options
  }

  render() {

    return (
      <div className="poll">
        <div className="poll__question">
          <h2>Your Question</h2>
        </div>

        <ul className="poll__options">
          {this.createOptions()}
        </ul>
      </div>

    );
  }
}

export default Poll
