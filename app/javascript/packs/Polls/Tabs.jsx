import React, { Component } from 'react';

import Button from '../Utils/Button'
import Polls from './Polls'
import UserPolls from './UserPolls'
import RespondedPolls from './RespondedPolls'
import {pollsTxt, myPollsTxt, respondedPollsTxt, tabClass, tabActiveClass} from '../constants.js'

import './Tabs.scss'

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.pollsClass = tabActiveClass
    this.myPollsClass = tabClass
    this.respondedPollsClass = tabClass

    this.state = {
      tab: pollsTxt,
    };
  }

  pollsHandler = () => {
    if (this.pollsClass == tabActiveClass){
      return
    }

    this.pollsClass = tabActiveClass
    this.myPollsClass = tabClass
    this.respondedPollsClass = tabClass
    this.props.callback(pollsTxt, <Polls />)
  }

  myPollsHandler = () => {
    if (this.myPollsClass == tabActiveClass){
      return
    }

    this.pollsClass = tabClass
    this.myPollsClass = tabActiveClass
    this.respondedPollsClass = tabClass
    this.props.callback(myPollsTxt, <UserPolls />)
  }

  respondedPollsHandler = () => {
    if (this.respondedPollsClass == tabActiveClass){
      return
    }

    this.pollsClass = tabClass
    this.myPollsClass = tabClass
    this.respondedPollsClass = tabActiveClass
    this.props.callback(respondedPollsTxt, <RespondedPolls />)
  }

  render() {
    let tabs = [<Button classes={this.pollsClass} clickHandler={this.pollsHandler} text={pollsTxt} />]

    if (this.props.user){
      tabs.push(<Button classes={this.myPollsClass} clickHandler={this.myPollsHandler} text={myPollsTxt} />)
      tabs.push(<Button classes={this.respondedPollsClass} clickHandler={this.respondedPollsHandler} text={respondedPollsTxt} />)
    }

    return (
     <div className="tabs">
       {tabs}
     </div>
    );
  }
}

export default Tabs
