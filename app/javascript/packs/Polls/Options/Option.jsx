import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Option = props => (
  <li className={props.option.klass} option_id={props.option.id} onClick={props.clickHandler}> {props.name} </li>
)

Option.propTypes = {
  id: PropTypes.function,
  option: PropTypes.object
}

export default Option
