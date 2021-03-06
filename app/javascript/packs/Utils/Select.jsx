import React from 'react';
import PropTypes from 'prop-types';

// import './Select.scss'

const Select = props => {
  let options = []
  options = props.options.map((object, i) => {
    let disabled;
    if (object[0] == -1){
      disabled = 'disabled'
    }

    return (<option key={i} value={object[0]} disabled={disabled}> {object[1]} </option>);
  })
  let classes = props.classes
  classes = classes + ' theme-construction'
  return (
    <select multiple={props.multiple} onChange={props.onChange} className={classes} value={props.selectedValue} size='1'>
      {options}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.array
}

export default Select;
