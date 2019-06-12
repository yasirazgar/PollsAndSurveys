import React, { Component } from 'react';

import Button from '../Utils/Button'
import Polls from './Polls'
import UserPolls from './UserPolls'
import RespondedPolls from './RespondedPolls'
import {pollsTxt, myPollsTxt, respondedPollsTxt} from '../constants.js'

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.pollsClass = 'tablinks active'
    this.myPollsClass = 'tablinks'
    this.respondedPollsClass = 'tablinks'

    this.state = {
      tab: pollsTxt,
    };
  }

  pollsHandler = () => {
    this.pollsClass = 'tablinks active'
    this.myPollsClass = 'tablinks'
    this.respondedPollsClass = 'tablinks'
    this.props.callback(pollsTxt, <Polls />)
  }

  myPollsHandler = () => {
    this.pollsClass = 'tablinks'
    this.myPollsClass = 'tablinks active'
    this.respondedPollsClass = 'tablinks'
    this.props.callback(myPollsTxt, <UserPolls />)
  }

  respondedPollsHandler = () => {
    this.pollsClass = 'tablinks'
    this.myPollsClass = 'tablinks'
    this.respondedPollsClass = 'tablinks active'
    this.props.callback(respondedPollsTxt, <RespondedPolls />)
  }

  render() {
    let tabs = [<Button classes={this.pollsClass} clickHandler={this.pollsHandler} text={pollsTxt} />]

    if (this.props.user){
      tabs.push(<Button classes={this.myPollsClass} clickHandler={this.myPollsHandler} text={myPollsTxt} />)
      tabs.push(<Button classes={this.respondedPollsClass} clickHandler={this.respondedPollsHandler} text={respondedPollsTxt} />)
    }

    return (
     <div className="tab">
       {tabs}
     </div>
    );
  }
}

export default Tabs
