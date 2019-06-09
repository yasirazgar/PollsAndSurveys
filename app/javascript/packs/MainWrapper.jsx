import React, { Component } from 'react';

import Polls from './Polls/Polls'
import UserPolls from './Polls/UserPolls'
import RespondedPolls from './Polls/RespondedPolls'
import NewPoll from './Polls/NewPoll'
import Button from './Utils/Button'
import Input from './Utils/Input'
import ToggleSwitch from './Utils/ToggleSwitch'
import Select from './Utils/Select'
import fetchCategoriesHandler from './Handlers/fetchCategoriesHandler'

import './MainWrapper.scss'

class MainWrapper extends Component {

  constructor(props){
    super(props)

    this.polls = 'Polls'
    this.pollsClass = 'tablinks active'
    this.myPolls = 'MyPolls'
    this.myPollsClass = 'tablinks'
    this.respondedPolls = 'RespondedPolls'
    this.respondedPollsClass = 'tablinks'
    this.term = null;
    this.categories = null;
    this.ageGroup = null;

    this.state = {
      createPollMode: false,
      categories: [],
      tab: this.polls,
      polls: []
    };

    this.hideCreatePollForm = this.hideCreatePollForm.bind(this)
    this.setCategories = this.setCategories.bind(this)
  }

  setCategories = (categories) => {
    this.setState({categories: categories})
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

  searchPollHandler = () => {
    alert("Poll searching comming soon")
  }

  setCreatePollView = () => {
    this.setState({createPollMode: true});
    setTimeout(function(){
      document.getElementById("new-poll").scrollIntoView({
        behavior: 'smooth'
      });
    }, 400);
  }

  pollsHandler = () => {
    this.pollsClass = 'tablinks active'
    this.myPollsClass = 'tablinks'
    this.respondedPollsClass = 'tablinks'
    this.setState({polls: <Polls />})
  }

  myPollsHandler = () => {
    this.pollsClass = 'tablinks'
    this.myPollsClass = 'tablinks active'
    this.respondedPollsClass = 'tablinks'
    this.setState({polls: <UserPolls />})
  }

  respondedPollsHandler = () => {
    this.pollsClass = 'tablinks'
    this.myPollsClass = 'tablinks'
    this.respondedPollsClass = 'tablinks active'
    this.setState({polls: <RespondedPolls />})
  }

  render() {
    let newPollForm;
    const ageSelectOptions = [[0,'AGE GROUP'], [1,'1-10'], [2,'10-17'], [3,'18-29'], [4,'30-40'], [5,'41-50'], [6,'50+']]
    let categories = this.state.categories.slice(0)
    categories.unshift([0, 'CATEGORIES'])

    if (this.state.createPollMode){
      newPollForm = <NewPoll hideCreatePollForm={this.hideCreatePollForm}/>
    }

    let tabs = [<Button classes={this.pollsClass} clickHandler={this.pollsHandler} text={this.polls} />]
    if (this.props.user){
      tabs.push(<Button classes={this.myPollsClass} clickHandler={this.myPollsHandler} text={this.myPolls} />)
      tabs.push(<Button classes={this.respondedPollsClass} clickHandler={this.respondedPollsHandler} text={this.respondedPolls} />)
    }
    return (
      <div className="main-wrapper">
        <div className="main-wrapper-header">
          <div className="main-wrapper-header-content">
            <div className="search-poll">

              {/* <Input classes="poll-location" placeholder="Location" /> */ }

              <Input classes="poll-search" placeholder="Search poll" />

              <Select options={categories}/>

              <Select options={ageSelectOptions}/>

              <Button classes="btn__inner" text="Search" clickHandler={this.searchPollHandler} />
            </div>
          </div>
          <span>
            <Button classes="btn__outer" text="Add new poll" clickHandler={this.setCreatePollView} />
          </span>

        </div>
        <div class="tab">
          {tabs}
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