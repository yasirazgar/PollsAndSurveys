import React from 'react';
import PropTypes from 'prop-types';

import './Select.scss'

const Select = props => {
  let options = []

  Object.keys(props.options).forEach(key => {
    let option = props.options[key];

    options.push(<option key={key} value={key}> {option} </option>)
  });

  return (
    <select className="theme-construction">
      {options}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.object
}

export default Select;
