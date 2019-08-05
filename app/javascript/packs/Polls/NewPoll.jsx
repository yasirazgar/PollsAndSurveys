import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../Utils/Input'
import Select from '../Utils/Select'
import ModalButtonGroup from '../Utils/ModalButtonGroup'
import FilterComponents from './FilterComponents'

import { createPoll, toggleLoader } from '../../actions'

import './NewPoll.scss'

class NewPoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      options: [],
      category_ids: [],
      age_group_ids: [],
      submitEnabled: false,
    };

    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
  }

  categoryChangeHandler = (event) => {
    let selected_values = [...event.target.options].reduce((vals, opt) => {
      if(opt.selected){
        vals.push(opt.value)
      }; return vals
    }, [])

    this.setState({category_ids: selected_values})
  }

  createPollHandler = (poll, callback) => {
    this.props.toggleLoader(true);

    let data =  {
      poll: {
        question: this.state.question,
        options: this.state.options,
        category_ids: this.state.category_ids,
        age_group_ids: this.state.age_group_ids
      }
    }

    this.props.createPoll(data);
  };


  ageGroupChangeHandler = (event) => {
    let selected_values = [...event.target.options].reduce((vals, opt) => {
      if(opt.selected){
        vals.push(opt.value)
      }; return vals
    }, [])

    this.setState({age_group_ids: selected_values})
  }

  enableSubmitButton = (question, options) => {
    if(question && options.length > 0){
      this.setState({submitEnabled: true});
    }
    else {
      this.setState({submitEnabled: false});
    }
  }

  buildOptionsList = () => {
    let optionsList = []

    for (let i = 0; i < this.state.options.length; i++) {
      optionsList.push(<li key={i.toString()} >{this.state.options[i]} <span className="close" onClick={this.removeOption.bind(this, i)}>×</span></li>)
    }
    optionsList.push(<li key={this.state.options.length.toString()}> <input className="poll-option__new" placeholder={this.props.translations.options_placeholder} /> <span className="add" onClick={this.addOption.bind(this)}>+</span></li>)
    return optionsList;
  };

  setQuestion = (event) => {
    let question = event.target.value
    this.setState({question: question})
    this.enableSubmitButton(question, this.state.options);
  }

  removeOption = (i) => {
    let options = [...this.state.options];
    options.splice(i, 1);

    this.setState({options: options});
    this.enableSubmitButton(this.state.question, options);
  };

  addOption = () => {
    let options = this.state.options;
    let option = event.target.parentNode.getElementsByClassName('poll-option__new')[0].value;

    options.push(option);
    this.setState({options: options});
    this.enableSubmitButton(this.state.question, options);
  }

  render() {
    return (
      <div className="poll" id="new-poll">
        <div className="poll-question">
          <Input type="text" className="poll-question-input" placeholder={this.props.translations.question_placeholder} onChange={this.setQuestion}/>

          {/* <Input className="poll-location" placeholder="Location" /> */}
          <FilterComponents categories={this.props.categories} categoryChangeHandler={this.categoryChangeHandler} ageGroupChangeHandler={this.ageGroupChangeHandler} />
        </div>

        <ul >
          {this.buildOptionsList()}
        </ul>

        <ModalButtonGroup primaryText={this.props.translations.create} submitHandler={this.createPollHandler} closeModalHandler={this.props.hideCreatePollForm} submitEnabled={this.state.submitEnabled}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    translations: state.translations
  }
}

export default connect(mapStateToProps, { createPoll, toggleLoader })(NewPoll)
