import React, { Component } from 'react';

import Input from '../Utils/Input'
import Select from '../Utils/Select'
import Button from '../Utils/Button'
import Polls from './Polls'
import UserPolls from './UserPolls'
import RespondedPolls from './RespondedPolls'

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

  setCategories = (categories) => {
    this.setState({categories: categories})
  }

  componentDidMount() {
    const categories = window.localStorage.getItem('categories')
    if (!categories){
      fetchCategoriesHandler(this.setCategories)
    }
    else {
      this.setCategories(JSON.parse(categories))
    }
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
    const ageSelectOptions = [[0,'AGE GROUP'], [1,'1-10'], [2,'10-17'], [3,'18-29'], [4,'30-40'], [5,'41-50'], [6,'50+']]
    let categories = this.state.categories.slice(0)
    categories.unshift([0, 'CATEGORIES'])

    return (
      <div className="search-poll">

        {/* <Input classes="poll-location" placeholder="Location" /> */ }

        <Input classes="poll-search" placeholder="Search poll" onChange={this.questionChangeHandler}/>

        <Select options={categories} onChange={this.categoryChangeHandler}/>

        <Select options={ageSelectOptions} onChange={this.ageGroupChangeHandler}/>

        <Button classes="btn__inner" text="Search" clickHandler={this.searchPollHandler} disabled={!this.state.submitEnabled}/>
      </div>

    );
  }
}

export default SearchPoll
