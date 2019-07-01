import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../Utils/Input'
import Select from '../Utils/Select'
import Button from '../Utils/Button'
import Polls from './Polls'
import UserPolls from './UserPolls'
import RespondedPolls from './RespondedPolls'
import fetchCategoriesHandler from '../Handlers/fetchCategoriesHandler'
import { AGE_SELECT_OPTIONS } from '../constants'
import FilterComponents from './FilterComponents'

class SearchPoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      term: '',
      age_group: [],
      category_ids: [],
      submitEnabled: false
    };
  }

  searchPollHandler = () => {
    let params = ['type='+this.props.tab]
    if(this.state.category_ids.length > 0){
      const cat_params = Object.keys(this.state.category_ids)
          .map(c => 'terms[category_ids][]=' + c)
          .join('&');

      params.push(cat_params)
    }

    if(this.state.age_group.length > 0){
      const age_params = Object.keys(this.state.age_group)
          .map(ag => 'terms[age_group][]=' + ag)
          .join('&');

      params.push(cat_params)
    }

    if(this.state.term.length > 0){
      const term_params = 'terms[term]=' + this.state.term

      params.push(term_params)
    }

    // const url = '/polls/search' + '?type=polls&terms[category_ids][]=1&terms[category_ids][]=2&terms[age_group][]=1&terms[age_group][]=2&terms[term]=fav';
    const url = '/polls/search?' + params.join('&')

    fetch(url, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      }
    }).then(response => {
      return response.json()
    }).then(data => {
      this.buildPolls(data.polls)
    });
  }

  questionChangeHandler = (event) => {
    const term = event.target.value
    let attrs = {term: term}
    attrs.submitEnabled = ((term.length > 0) || (this.state.age_group.length > 0) || (this.state.category_ids.length > 0))
    this.setState(attrs)
  }

  categoryChangeHandler = (event) => {
    const selected_values = [...event.target.options].reduce((vals, opt) => {
      if(opt.selected){
        vals.push(opt.value)
      }; return vals
    }, [])

    let attrs = {category_ids: selected_values}
    attrs.submitEnabled = ((selected_values.length > 0) || (this.state.age_group.length > 0) || (this.state.term.length > 0))
    this.setState(attrs)
  }

  ageGroupChangeHandler = (event) => {
    const selected_values = [...event.target.options].reduce((vals, opt) => {
      if(opt.selected){
        vals.push(opt.value)
      }; return vals
    }, [])

    let attrs = {age_group: selected_values}
    attrs.submitEnabled = ((selected_values.length > 0) || (this.state.category_ids.length > 0) || (this.state.term.length > 0))
    this.setState(attrs)
  }

  pollsBuilder = (polls) => {
    this.props.callback(<Polls polls={polls} />)
  }
  user_pollsBuilder = (polls) => {
    this.props.callback(<UserPolls polls={polls} />)
  }
  user_responded_pollsBuilder = (polls) => {
    this.props.callback(<RespondedPolls polls={polls} />)
  }

  buildPolls = (polls) => {
    this[this.props.tab+'Builder'](polls)
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

export default connect(mapStateToProps)(SearchPoll)
