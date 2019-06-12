import React, { Component } from 'react';

import Poll from './Polls/Poll'
import Polls from './Polls/Polls'
import NewPoll from './Polls/NewPoll'
import SearchPoll from './Polls/SearchPoll'
import Tabs from './Polls/Tabs'
import Button from './Utils/Button'
import Select from './Utils/Select'
import fetchCategoriesHandler from './Handlers/fetchCategoriesHandler'
import {pollsTxt} from './constants'

import './MainWrapper.scss'

class MainWrapper extends Component {

  constructor(props){
    super(props)

    this.state = {
      createPollMode: false,
      categories: [],
      tab: pollsTxt,
      polls: []
    };

    this.hideCreatePollForm = this.hideCreatePollForm.bind(this)
    this.setCategories = this.setCategories.bind(this)
    this.searchPollCallback = this.searchPollCallback.bind(this)
    this.tabsCallback = this.tabsCallback.bind(this)
  }

  setCategories = (categories) => {
    this.setState({categories: categories})
  }

  tabsCallback = (tab, polls) => {
    this.setState({polls: polls, tab: tab})
  }

  searchPollCallback = (polls) => {
    this.setState({polls: polls})
  }

  componentWillMount() {
    /* Fetch categories first */
    fetchCategoriesHandler(this.setCategories)
  }

  componentDidMount() {
    this.setState({polls: <Polls />})
  }

  hideCreatePollForm() {
    this.setState({createPollMode: false})
  }

  setCreatePollView = () => {
    this.setState({createPollMode: true});
    setTimeout(function(){
      document.getElementById("new-poll").scrollIntoView({
        behavior: 'smooth'
      });
    }, 400);
  }

  render() {
    let newPollForm;
    const ageSelectOptions = [[0,'AGE GROUP'], [1,'1-10'], [2,'10-17'], [3,'18-29'], [4,'30-40'], [5,'41-50'], [6,'50+']]
    let categories = this.state.categories.slice(0)
    categories.unshift([0, 'CATEGORIES'])

    if (this.state.createPollMode){
      newPollForm = <NewPoll hideCreatePollForm={this.hideCreatePollForm}/>
    }

    return (
      <div className="main-wrapper">
        <div className="main-wrapper-header">
          <div className="main-wrapper-header-content">
            <SearchPoll tab={this.state.tab} callback={this.searchPollCallback}/>
          </div>
          <span>
            <Button classes="btn__outer" text="Add new poll" clickHandler={this.setCreatePollView} />
          </span>

        </div>
        <div className="tab">
          <Tabs user={this.props.user} callback={this.tabsCallback}/>
        </div>
        <div className="main-wrapper__content">
          {newPollForm}
          {this.state.polls}
        </div>
      </div>
    );
  }
}

export default MainWrapper