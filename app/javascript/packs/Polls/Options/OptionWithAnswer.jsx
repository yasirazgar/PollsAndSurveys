import React, { Component } from 'react';
import PropTypes from 'prop-types';

const OptionWithAnswer = (props) => {
    const answerPercentage = props.option['percentage'];
    const userSelected = props.option['selected'];
    const option_id = props.option['option_id'];
    let klass;
    if (userSelected){
      klass = 'checked';
    }

  return (
    <li className={klass} style={{width: answerPercentage + '%'}} option_id={option_id} onClick={props.clickHandler}>
      {props.name}
      <span className='percentage'> {answerPercentage + '%'} </span>
    </li>
  )
}

OptionWithAnswer.propTypes = {
  id: PropTypes.string,
  option: PropTypes.string
}

export default OptionWithAnswer
