import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../Utils/Input'
import Select from '../Utils/Select'
import Button from '../Utils/Button'
import FilterComponents from './FilterComponents'
import { searchPoll } from '../../actions'

class SearchPoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      term: '',
      age_group_ids: [],
      category_ids: [],
      submitEnabled: false
    };
  }

  searchPollHandler = () => {
    const params = {
      type: this.props.tab,
      terms: {
        term: this.state.term,
        category_ids: this.state.category_ids,
        age_group_ids: this.state.age_group_ids
      }
    }
    this.props.searchPoll(params)
  }

  questionChangeHandler = (event) => {
    const term = event.target.value
    let attrs = {term: term}
    attrs.submitEnabled = ((term.length > 0) || (this.state.age_group_ids.length > 0) || (this.state.category_ids.length > 0))
    this.setState(attrs)
  }

  categoryChangeHandler = (event) => {
    const selected_values = [...event.target.options].reduce((vals, opt) => {
      if(opt.selected){
        vals.push(opt.value)
      }; return vals
    }, [])

    let attrs = {category_ids: selected_values}
    attrs.submitEnabled = ((selected_values.length > 0) || (this.state.age_group_ids.length > 0) || (this.state.term.length > 0))
    this.setState(attrs)
  }

  ageGroupChangeHandler = (event) => {
    const selected_values = [...event.target.options].reduce((vals, opt) => {
      if(opt.selected){
        vals.push(opt.value)
      }; return vals
    }, [])

    let attrs = {age_group_ids: selected_values}
    attrs.submitEnabled = ((selected_values.length > 0) || (this.state.category_ids.length > 0) || (this.state.term.length > 0))
    this.setState(attrs)
  }

  render() {
    return (
      <div className="search-poll">

        {/* <Input classes="poll-location" placeholder="Location" /> */ }

        <Input classes="poll-search" placeholder={this.props.translations.search_placeholder} onChange={this.questionChangeHandler}/>

        <FilterComponents categories={this.props.categories} categoryChangeHandler={this.categoryChangeHandler} ageGroupChangeHandler={this.ageGroupChangeHandler} />

        <Button classes="btn__inner" text={this.props.translations.search} clickHandler={this.searchPollHandler} disabled={!this.state.submitEnabled}/>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    translations: state.translations,
    tab: state.tab.selectedTab
  }
}

export default connect(mapStateToProps, { searchPoll })(SearchPoll)
