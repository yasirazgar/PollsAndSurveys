import React from 'react';

import './Button.scss'

const Button = props => {
  let classes = 'btn ';
  if (props.classes) {
    classes += props.classes
  }

  return (
    <button className={classes} onClick={props.clickHandler} disabled={true}>{props.text} </button>
  )
};

export default Button;
