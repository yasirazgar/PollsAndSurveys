import React,{ Fragment } from 'react';
import { connect } from 'react-redux';

import Select from '../Utils/Select'
import { AGE_SELECT_OPTIONS } from '../constants.js'

const FilterComponents = props => {
  let categories = [[-1, props.translations.categories]]
  props.categories.forEach((category) => {
    categories.push([category[0], props.translations[category[1]]])
  })

  let ageGroups = [...AGE_SELECT_OPTIONS]
  ageGroups[0] = [-1, props.translations.age_group]
  ageGroups[1] = [0, props.translations.all]

  return (
    <Fragment>
      <Select multiple={true} classes="categories" options={categories} onChange={props.categoryChangeHandler}/>

      <Select multiple={true} classes="agegroup" options={ageGroups} onChange={props.ageGroupChangeHandler}/>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    translations: state.translations
  }
}

export default connect(mapStateToProps)(FilterComponents);
