import React from 'react';
import PropTypes from 'prop-types';

import './Backdrop.scss';

const Backdrop = props => (
  <div className="backdrop" onClick={props.backdropClickHandler}/>

);

Backdrop.propTypes = {
  backdropClickHandler: PropTypes.func
}

export default Backdrop;
