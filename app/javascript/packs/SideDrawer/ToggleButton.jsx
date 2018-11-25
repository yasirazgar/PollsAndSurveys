import React from 'react';

import './ToggleButton.scss';

const ToggleButton = props => (
  <button className="toggle-button" onClick={props.clickHandler}>
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
  </button>

);

export default ToggleButton;
