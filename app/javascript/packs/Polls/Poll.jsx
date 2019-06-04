import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../Utils/Input'
import Option from './Options/Option'

import './Poll.scss'


// Analyse whether this should be functional and class components
class Poll extends Component {
  answerPoll = () => {
    let alreadySelected = event.target.parentElement.getElementsByClassName("checked");
    if (alreadySelected.length > 0) {
      alreadySelected[0].classList.remove("checked");
    }
    event.target.classList.add('checked');

    const option_id = event.target.attr('option_id');
    const url = "/polls/" + props.id + "/" + option_id + "/answer"
    fetch(url, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      },
      body: null
    }).then(fetchPromise).then(callback)
  }

  buildOptionsList = () => {
    const optionsHash = this.props.options;
    const options = Object.keys(optionsHash);

    const optionsList = options.map((option) => {
      return (<Option option={optionsHash[option]} name={option} clickHandler={this.answerPoll}/>)
    });

    return optionsList;
  }

  render() {
    return (
      <div className="poll">
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

Poll.propTypes = {
  question: PropTypes.string,
  options: PropTypes.array,
  categories: PropTypes.array
}

export default Poll
