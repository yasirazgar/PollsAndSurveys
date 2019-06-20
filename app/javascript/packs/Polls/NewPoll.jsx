import React, { Component } from 'react';

import Input from '../Utils/Input'
import Select from '../Utils/Select'
import ModalButtonGroup from '../Utils/ModalButtonGroup'
import createPollHandler from '../Handlers/createPollHandler'
import fetchCategoriesHandler from '../Handlers/fetchCategoriesHandler'

import './Poll.scss'

class NewPoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      options: [],
      category_ids: [],
      age_group: [],
      submitEnabled: false,
      categories: []
    };

    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
    this.setPollHandler = this.setPollHandler.bind(this);
    this.setCategories = this.setCategories.bind(this);
  }

  setCategories = (categories) => {
    this.setState({categories: categories})
  }

  componentDidMount() {
    let categories = window.localStorage.getItem('categories')
    if (!categories){
      fetchCategoriesHandler(this.setCategories)
    }
    else {
      this.setCategories(JSON.parse(categories))
    }
  }

  categoryChangeHandler = (event) => {
    let selected_values = [...event.target.options].reduce((vals, opt) => {
      if(opt.selected){
        vals.push(opt.value)
      }; return vals
    }, [])

    this.setState({category_ids: selected_values})
    this.setPollHandler({
      question: this.state.question,
      options: this.state.options,
      category_ids: selected_values,
      age_group: this.state.age_group
    })
  }

  ageGroupChangeHandler = (event) => {
    let selected_values = [...event.target.options].reduce((vals, opt) => {
      if(opt.selected){
        vals.push(opt.value)
      }; return vals
    }, [])

    this.setState({age_group: selected_values})
    this.setPollHandler({
      question: this.state.question,
      options: this.state.options,
      category_ids: this.state.category_ids,
      age_group: selected_values
    })
  }

  setPollHandler = (poll) => {
    this.createPollHandler = createPollHandler.bind(this, poll, this.props.hideCreatePollForm)
  }

  enableSubmitButton = (question, options) => {
    let poll = {}
    if(question && options.length > 0){
      poll = {
        question: question,
        options: options,
        category_ids: this.state.category_ids,
        age_group: this.state.age_group
      }
      this.setState({submitEnabled: true});
    }
    else {
      this.setState({submitEnabled: false});
    }
    this.setPollHandler(poll);
  }

  buildOptionsList = () => {
    let optionsList = []

    for (let i = 0; i < this.state.options.length; i++) {
      optionsList.push(<li key={i.toString()} >{this.state.options[i]} <span className="close" onClick={this.removeOption.bind(this, i)}>×</span></li>)
    }
    optionsList.push(<li key={this.state.options.length.toString()}> <input className="poll-option__new" placeholder="Options for you question" /> <span className="add" onClick={this.addOption.bind(this)}>+</span></li>)
    return optionsList;
  };

  setQuestion = (event) => {
    let question = event.target.value
    this.setState({question: question})
    // this.props.setPoll(question, this.state.options)
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
    // this.props.setPoll(this.state.question, options)
  }

  render() {
    const ageSelectOptions = [[0,'AGE GROUP'], [1,'1-10'], [2,'10-17'], [3,'18-29'], [4,'30-40'], [5,'41-50'], [6,'50+']]
    let categories = this.state.categories.slice(0)
    categories.unshift([0, 'CATEGORIES'])

    return (
      <div className="poll" id="new-poll">
        <div className="poll-question">
          <Input type="text" className="poll-question-input" placeholder="Ask your question..." onChange={this.setQuestion}/>

          {/* <Input className="poll-location" placeholder="Location" /> */}
          <div>
            <Select multiple={true} classes='categories' options={categories} onChange={this.categoryChangeHandler}/>

            <Select multiple={true} classes='agegroup' options={ageSelectOptions} onChange={this.ageGroupChangeHandler}/>
          </div>
        </div>

        <ul >
          {this.buildOptionsList()}
        </ul>

        <ModalButtonGroup primaryText="Create" submitHandler={this.createPollHandler} closeModalHandler={this.props.hideCreatePollForm} submitEnabled={this.state.submitEnabled}/>
      </div>

    );
  }
}

export default NewPoll
