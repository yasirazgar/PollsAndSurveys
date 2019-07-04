import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { answerPoll } from '../../../actions'

const OptionWithAnswer = props => {
  const answerPercentage = props.option.percentage;
  const option_id = props.option.option_id;
  const selected = props.option.selected;
  let klass;
  if (selected){
    klass = 'checked';
  }
  const liProps = {
    className: klass,
    style: {width: answerPercentage + 10 + '%'},
    onClick: props.answerPoll.bind(this, props.pollId, option_id, props.callback)
  }

  return (
    <li {...liProps}>
      {props.name}
      <span className='percentage'> {answerPercentage + '%'} </span>
    </li>
  )
}

OptionWithAnswer.propTypes = {
  option: PropTypes.object,
  name: PropTypes.string,
}

export default connect(null, { answerPoll })(OptionWithAnswer)
