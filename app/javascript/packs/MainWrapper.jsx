import React, { Component } from 'react';

import Polls from './Polls/Polls'
import UserPolls from './Polls/UserPolls'
import NewPoll from './Polls/NewPoll'
import Button from './Utils/Button'
import Input from './Utils/Input'
import ToggleSwitch from './Utils/ToggleSwitch'
import Select from './Utils/Select'

import './MainWrapper.scss'

class MainWrapper extends Component {
  constructor(props){
    super(props)

    this.state = {
      createPollMode: false,
    };

    this.question = null
    this.options = null
    this.hideCreatePollForm = this.hideCreatePollForm.bind(this)
    this.categories = []
  }

  setPoll(question, options) {
    this.question = question
    this.options = options
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

  render() {
    let newPollForm, polls;
    if (this.state.createPollMode){
      newPollForm = <NewPoll hideCreatePollForm={this.hideCreatePollForm}/>
    }

    if (this.props.userPollMode){
      polls = <UserPolls />
    }
    else{
      polls = <Polls />
    }

    return (
      <div className="main-wrapper">
        <div className="main-wrapper-header">
          <div className="main-wrapper-header-content">
            <div className="add-poll">

              <Input classes="poll-location" placeholder="Location" />

              <Input classes="poll-search" placeholder="Search poll" />

              <Select options={this.categories}/>

              <Select options={[[0,'Age group'], [1,'1-10'], [2,'10-17'], [3,'18+'], [4,'30+'], [5,'40+'], [6,'50+']]}/>

              <Button classes="btn__inner" text="Search" clickHandler={this.searchPollHandler} />
            </div>

            <div className="search-poll">
            </div>
          </div>
          <span>
            <Button classes="btn__outer" text="Add new poll" clickHandler={this.setCreatePollView} />
          </span>
        </div>

        <div className="main-wrapper__content">
          {newPollForm}
          {polls}
        </div>
      </div>
    );
  }
}

export default MainWrapper