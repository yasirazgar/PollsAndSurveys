import React, { Component } from 'react';

import Polls from './Polls/Polls'
import UserPolls from './Polls/UserPolls'
import RespondedPolls from './Polls/RespondedPolls'
import NewPoll from './Polls/NewPoll'
import SearchPoll from './Polls/SearchPoll'
import Tabs from './Polls/Tabs'
import Button from './Utils/Button'
import Select from './Utils/Select'
import { fetchCategories } from '../actions'
import { POLLS_TAB, USER_POLLS_TAB, RESPONDED_POLLS_TAB } from './constants'
import { connect } from 'react-redux';

import './MainWrapper.scss'

class MainWrapper extends Component {

  constructor(props){
    super(props)

    this.searchPollCallback = this.searchPollCallback.bind(this)
  }

  componentDidMount(){
    this.props.fetchCategories();
  }

  searchPollCallback = (polls) => {
    this.setState({polls: polls})
  }

  hideCreatePollForm() {
    this.setState({createPollMode: false})
  }

  setCreatePollView = () => {
    setTimeout(function(){
      document.getElementById("new-poll").scrollIntoView({
        behavior: 'smooth'
      });
    }, 400);
  }

  render() {
    return (
      <div className="main-wrapper">
        <div className="main-wrapper-header">
          <div className="main-wrapper-header-content">
            <SearchPoll categories={this.props.categories} tab={this.props.tab} callback={this.searchPollCallback}/>
          </div>
          <span>
            <Button classes="btn__outer" text={this.props.translations.add_new_poll} clickHandler={this.setCreatePollView} />
          </span>

        </div>
        <div className="tab">
          <Tabs user={this.props.user} />
        </div>
        <div className="main-wrapper__content">
          <NewPoll categories={this.props.categories}/>
          {this.props.polls}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let polls = <Polls />;
  let tab = state.tab.selectedTab;

  switch (tab){
    case USER_POLLS_TAB:
      polls = <UserPolls polls={state.userPolls} />
      break
    case RESPONDED_POLLS_TAB:
      polls = <RespondedPolls polls={state.respondedPolls} />
      break
    case POLLS_TAB:
      polls = <Polls polls={state.polls} />
      break
    default:
      polls
  }

  return { translations: state.translations, polls: polls, tab: tab, categories: state.categories };
};

export default connect(mapStateToProps, { fetchCategories })(MainWrapper)
