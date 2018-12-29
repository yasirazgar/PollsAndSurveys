import React from 'react';
import Button from './Button';

import './ModalButtonGroup.scss';

const ModalButtonGroup = props => (
  <div className="btn-group">
    <Button classes="primary" text="Ok" />
    <Button classes="secondary" text="cancel" />
  </div>
);

export default ModalButtonGroup;
