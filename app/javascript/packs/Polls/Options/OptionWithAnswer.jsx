import React, { Component } from 'react';
import PropTypes from 'prop-types';
import answerPoll from '../../Handlers/answerPollHandler';

class OptionWithAnswer extends Component {
  render(){
    const answerPercentage = this.props.option.percentage;
    const option_id = this.props.option.option_id;
    const selected = this.props.option.selected;
    let klass;
    if (selected){
      klass = 'checked';
    }
    let liProps = {
      className: klass,
      style: {width: answerPercentage + 10 + '%'},
    }
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user){
      liProps.onClick = answerPoll.bind(this, this.props.pollId, option_id, this.props.callback)
    }
    return (
      <li {...liProps}>
        {this.props.name}
        <span className='percentage'> {answerPercentage + '%'} </span>
      </li>
    )
  }
}

OptionWithAnswer.propTypes = {
  option: PropTypes.object,
  name: PropTypes.string,
}

export default OptionWithAnswer
