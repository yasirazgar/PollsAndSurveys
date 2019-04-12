import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss'

const Button = props => {
  let classes = 'btn ';
  if (props.classes) {
    classes += props.classes
  }

  return (
    <button className={classes} onClick={props.clickHandler} disabled={props.disabled}>{props.text} </button>
  )
};

Button.propTypes = {
  classes: PropTypes.string
}

export default Button;
