import React, { Component } from 'react';

import Poll from './Polls/Poll'
import NewPoll from './Polls/NewPoll'
import Button from './Utils/Button'
import Input from './Utils/Input'
import ToggleSwitch from './Utils/ToggleSwitch'
import Select from './Utils/Select'
import createPollHandler from './Handlers/createPollHandler'

import './MainWrapper.scss'

class MainWrapper extends Component {
  constructor(props){
    super(props)

    this.state = {
      createPollMode: false,
      polls: []
    };

    this.question = null
    this.options = null
    this.hideCreatePollForm = this.hideCreatePollForm.bind(this)
    this.createPollHandler = this.createPollHandler.bind(this)
    this.categories = []
  }

  setPoll(question, options) {
    this.question = question
    this.options = options
  }

  hideCreatePollForm() {
    this.setState({createPollMode: false})
  }

  componentDidMount() {
    let polls;
    fetch('/polls', {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      }
    }).then(response => {
      return response.json()
    }).then(data => {
      let index = 0
      polls = data.polls.map((poll) => {
        return (<Poll key={index += 1} question={poll.question} categories={poll.categories} options={poll.options} />)
      });
      window.localStorage.setItem('categories', JSON.stringify(data.categories))
      this.categories = data.categories
      this.setState({polls: polls})
    });
  }

  createPollHandler = () => {

    alert("Poll creating comming soon")

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

  setSearchPollView = () => {
    this.setState({createPollMode: false});
  }

  render() {
    let pollSearchInput, newPollForm, innerButton, outerButton;
    if (this.state.createPollMode){
      newPollForm = <NewPoll hideCreatePollForm={this.hideCreatePollForm}/>
      innerButton = <Button classes="btn__inner" text="Create poll" clickHandler={this.createPollHandler} />
      outerButton = <Button classes="btn__outer" text="Search poll" clickHandler={this.setSearchPollView} />
    }
    else {
      pollSearchInput = <Input classes="poll-search" placeholder="Search poll" />
      innerButton = <Button classes="btn__inner" text="Search" clickHandler={this.searchPollHandler} />
      outerButton = <Button classes="btn__outer" text="Add new poll" clickHandler={this.setCreatePollView} />
    }

    return (
      <div className="main-wrapper">
        <div className="main-wrapper-header">
          <div className="main-wrapper-header-content">
            <div className="add-poll">

              <Input classes="poll-location" placeholder="Location" />

              {pollSearchInput}

              <Select options={this.categories}/>

              <Select options={[[0,'Age group'], [1,'1-10'], [2,'10-17'], [3,'18+'], [4,'30+'], [5,'40+'], [6,'50+']]}/>

              {innerButton}
            </div>

            <div className="search-poll">
            </div>

          </div>
          <span>

            {outerButton}
          </span>
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