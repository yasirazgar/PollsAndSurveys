import React, { Component } from 'react';

import Polls from './Polls/Polls'
import NewPoll from './Polls/NewPoll'
import SearchPoll from './Polls/SearchPoll'
import Tabs from './Polls/Tabs'
import Button from './Utils/Button'
import Loader from './Utils/Loader'
import { fetchCategories } from '../actions'
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
    const { showLoader, categories, translations, user } = this.props;
    let loader;
    if(showLoader){
      loader = <Loader />
    }
    return (
      <div className="main-wrapper">
        {loader}
        <div className="main-wrapper-header">
          <div className="main-wrapper-header-content">
            <SearchPoll categories={categories} callback={this.searchPollCallback}/>
          </div>
          <span>
            <Button classes="btn__outer" text={translations.add_new_poll} clickHandler={this.setCreatePollView} />
          </span>

        </div>
        <div className="tab">
          <Tabs user={user} />
        </div>
        <div className="main-wrapper__content">
          <NewPoll categories={categories}/>
          <Polls />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    translations: state.translations,
    categories: state.categories,
    showLoader: state.showLoader
  };
};

export default connect(mapStateToProps, { fetchCategories })(MainWrapper)
