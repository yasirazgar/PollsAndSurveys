import React from 'react';
import Button from './Button';

import './ModalButtonGroup.scss';

const ModalButtonGroup = props => {
  let primaryText = props.primaryText || "Ok";
  let secondaryText = props.secondaryText || "Cancel";
  let disabled = !props.submitEnabled;

  return (
    <div className="btn-group">
      <Button classes="primary" text={primaryText} clickHandler={props.submitHandler} disabled={disabled}/>
      <Button classes="secondary" text={secondaryText} clickHandler={props.closeModalHandler} />
    </div>
  )
};

export default ModalButtonGroup;
