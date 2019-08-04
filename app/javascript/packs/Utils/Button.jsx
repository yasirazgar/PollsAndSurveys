import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss'

const Button = props => {
  let classes = 'btn ';
  if (props.classes) {
    classes += props.classes
  }

  let buttonProps = {
    disabled: props.disabled,
    clickHandler: props.submitHandler,
    className: classes,
    onClick: props.clickHandler
  }
  if (props.form){
    buttonProps['form'] = props.form
    buttonProps['type'] = 'submit'
  }

  return (
    <button { ...buttonProps }>{props.text} </button>
  )
};

Button.propTypes = {
  classes: PropTypes.string
}

export default Button;

