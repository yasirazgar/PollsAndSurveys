import React from 'react';

import './ToggleSwitch.scss'

const ToggleSwitch = props => (
  <label className="switch">
    <input type="checkbox" />
    <span className="slider round" />
  </label>
);

export default ToggleSwitch;
