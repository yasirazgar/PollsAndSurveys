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
    this.toggleCreatePollForm = this.toggleCreatePollForm.bind(this)
    this.state = {
      newPollMode: false
    }
  }

  componentDidMount(){
    this.props.fetchCategories();
  }

  searchPollCallback = (polls) => {
    this.setState({polls: polls})
  }

  toggleCreatePollForm() {
    this.setState((state, props) => ({
      newPollMode: !state.newPollMode
    }));
    document.getElementById("main-wrapper").scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { showLoader, categories, translations, user } = this.props;
    let loader;
    if(showLoader){
      loader = <Loader />
    }
    return (
      <div className="main-wrapper" id="main-wrapper">
        {loader}
        <div className="main-wrapper-header">
          <div className="main-wrapper-header-content">
            <div className="search-poll">
            <Button classes="btn__inner" text={translations.new_poll} clickHandler={this.toggleCreatePollForm} />
            <SearchPoll categories={categories} callback={this.searchPollCallback}/>
            </div>
          </div>

        </div>

        <Tabs />
        <div className="main-wrapper__content">
          {this.state.newPollMode && (<NewPoll categories={categories} hideCreatePollForm={this.toggleCreatePollForm}/>)}
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
