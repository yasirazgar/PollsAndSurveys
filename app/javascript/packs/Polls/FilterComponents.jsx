import React,{ Fragment } from 'react';

import Select from '../Utils/Select'
import { AGE_SELECT_OPTIONS } from '../constants.js'

const FilterComponents = props => {
  let categories = props.categories.slice(0)
  categories.unshift([0, 'CATEGORIES'])
  let ageGroups = AGE_SELECT_OPTIONS

  return (
    <Fragment>
      <Select multiple={true} classes="categories" options={categories} onChange={props.categoryChangeHandler}/>

      <Select multiple={true} classes="agegroup" options={ageGroups} onChange={props.ageGroupChangeHandler}/>
    </Fragment>
  );
}

export default FilterComponents;
