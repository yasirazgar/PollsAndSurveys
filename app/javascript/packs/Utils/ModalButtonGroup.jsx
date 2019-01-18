import React from 'react';
import Button from './Button';

import './ModalButtonGroup.scss';

const ModalButtonGroup = props => {
  let prim_text = props.prim_text || "Ok";
  let sec_text = props.sec_text || "Cancel";

  return (
    <div className="btn-group">
      <Button classes="primary" text={prim_text} clickHandler={props.submitHandler} disabled/>
      <Button classes="secondary" text={sec_text} clickHandler={props.closeModalHandler} />
    </div>
  )
};

export default ModalButtonGroup;
