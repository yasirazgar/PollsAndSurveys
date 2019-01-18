import React, { Component } from 'react';

import Input from '../Utils/Input'

import './Poll.scss'

class NewPoll extends Component {
  state = {
    options: ["asdfasf"]
  };

  createOptions = () => {
    let options = []

    for (let i = 0; i < this.state.options.length; i++) {
      options.push(<li key={i.toString()} >{this.state.options[i]} <span className="close" onClick={this.removeOption.bind(this, i)}>×</span></li>)
    }
    options.push(<li key={this.state.options.length.toString()}> <input classes="poll-option__new" placeholder="Options for you question" /> <span className="add" onClick={this.addOption.bind(this)}>+</span></li>)
    return options
  };

  removeOption = (i) => {
    let options = this.state.options;
    this.setState({options: options.splice(i, 1)});
  };

  addOption = () => {
    let options = this.state.options;
    let option = event.target.parentNode.getElementsByClassName('poll-option__new')[0].value;
    options.push(option);
    this.setState({options: options});
  };

  render() {

    return (
      <div className="poll" id="new-poll">
        <div className="poll-question">
          <input type="text" className="poll-question-input" placeholder="Ask your question..." />
        </div>

        <ul >
          {this.createOptions()}
        </ul>
      </div>

    );
  }
}

export default NewPoll
