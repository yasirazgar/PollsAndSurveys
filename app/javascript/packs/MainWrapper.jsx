import React, { Component } from 'react';

import Poll from './Polls/Poll'
import Polls from './Polls/Polls'
import UserPolls from './Polls/UserPolls'
import RespondedPolls from './Polls/RespondedPolls'
import NewPoll from './Polls/NewPoll'
import SearchPoll from './Polls/SearchPoll'
import Button from './Utils/Button'
import Input from './Utils/Input'
import ToggleSwitch from './Utils/ToggleSwitch'
import Select from './Utils/Select'
import fetchCategoriesHandler from './Handlers/fetchCategoriesHandler'

import './MainWrapper.scss'

class MainWrapper extends Component {

  constructor(props){
    super(props)

    this.pollsTxt = 'polls'
    this.pollsClass = 'tablinks active'
    this.myPollsTxt = 'users_polls'
    this.myPollsClass = 'tablinks'
    this.respondedPollsTxt = 'user_responded_polls'
    this.respondedPollsClass = 'tablinks'

    this.state = {
      createPollMode: false,
      categories: [],
      tab: this.pollsTxt,
      polls: []
    };

    this.hideCreatePollForm = this.hideCreatePollForm.bind(this)
    this.setCategories = this.setCategories.bind(this)
    this.setPolls = this.setPolls.bind(this)
  }

  setCategories = (categories) => {
    this.setState({categories: categories})
  }

  setPolls = (polls) => {
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

  pollsHandler = () => {
    this.pollsClass = 'tablinks active'
    this.myPollsClass = 'tablinks'
    this.respondedPollsClass = 'tablinks'
    this.setState({tab: this.pollsTxt, polls: <Polls />})
  }

  myPollsHandler = () => {
    this.pollsClass = 'tablinks'
    this.myPollsClass = 'tablinks active'
    this.respondedPollsClass = 'tablinks'
    this.setState({tab: this.myPollsTxt, polls: <UserPolls />})
  }

  respondedPollsHandler = () => {
    this.pollsClass = 'tablinks'
    this.myPollsClass = 'tablinks'
    this.respondedPollsClass = 'tablinks active'
    this.setState({tab: this.respondedPollsTxt, polls: <RespondedPolls />})
  }

  render() {
    let newPollForm;
    const ageSelectOptions = [[0,'AGE GROUP'], [1,'1-10'], [2,'10-17'], [3,'18-29'], [4,'30-40'], [5,'41-50'], [6,'50+']]
    let categories = this.state.categories.slice(0)
    categories.unshift([0, 'CATEGORIES'])

    if (this.state.createPollMode){
      newPollForm = <NewPoll hideCreatePollForm={this.hideCreatePollForm}/>
    }

    let tabs = [<Button classes={this.pollsClass} clickHandler={this.pollsHandler} text={this.pollsTxt} />]
    if (this.props.user){
      tabs.push(<Button classes={this.myPollsClass} clickHandler={this.myPollsHandler} text={this.myPollsTxt} />)
      tabs.push(<Button classes={this.respondedPollsClass} clickHandler={this.respondedPollsHandler} text={this.respondedPollsTxt} />)
    }
    return (
      <div className="main-wrapper">
        <div className="main-wrapper-header">
          <div className="main-wrapper-header-content">
            <SearchPoll tab={this.state.tab} callback={this.setPolls}/>
          </div>
          <span>
            <Button classes="btn__outer" text="Add new poll" clickHandler={this.setCreatePollView} />
          </span>

        </div>
        <div className="tab">
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