import React from 'react';
import PropTypes from 'prop-types';

import './ToggleButton.scss';

const ToggleButton = props => (
  <button className="toggle-button" onClick={props.clickHandler}>
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
  </button>

);

ToggleButton.propTypes = {
  clickHandler: PropTypes.func
}

export default ToggleButton;
