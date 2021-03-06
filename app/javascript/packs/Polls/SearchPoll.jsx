import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../Utils/Input'
import Button from '../Utils/Button'
import FilterComponents from './FilterComponents'
import { searchPoll, fetchPolls, toggleLoader } from '../../actions'

class SearchPoll extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
    this.clearSearch = this.clearSearch.bind(this);
  }

  getInitialState = () => {
    return {
      categories: [],
      term: '',
      age_group_ids: [],
      category_ids: [],
      submitEnabled: false
    };
  }

  searchPollHandler = () => {
    this.props.toggleLoader(true);

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

  clearSearch = () => {
    this.props.fetchPolls();
    this.setState(this.getInitialState());
  }

  render() {
    return (
      <React.Fragment >

        {/* <Input classes="poll-location" placeholder="Location" /> */ }

        <span class="text-input-wrapper">
          <input className="poll-search" name="term" placeholder={this.props.translations.search_placeholder} onChange={this.questionChangeHandler} value={this.state.term}/>
          <span title="clear" onClick={this.clearSearch}>&times;</span>
        </span>

        <FilterComponents categories={this.props.categories} categoryChangeHandler={this.categoryChangeHandler} ageGroupChangeHandler={this.ageGroupChangeHandler} />

        <Button classes="btn__inner" text={this.props.translations.search} clickHandler={this.searchPollHandler} disabled={!this.state.submitEnabled}/>
      </React.Fragment>

    );
  }
}

const mapStateToProps = state => {
  return {
    translations: state.translations,
    tab: state.tab.selectedTab
  }
}

export default connect(mapStateToProps, { searchPoll, fetchPolls, toggleLoader })(SearchPoll)
