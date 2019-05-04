import React from 'react';
import PropTypes from 'prop-types';

import './Select.scss'

const Select = props => {
  let options = []
  options = props.options.map((object, i) => <option key={i} value={object[0]}> {object[1]} </option>)

  return (
    <select multiple onChange={props.onChange} className="theme-construction">
      {options}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.object
}

export default Select;
