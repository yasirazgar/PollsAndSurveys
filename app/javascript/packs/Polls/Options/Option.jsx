import React, { Component } from 'react';
import PropTypes from 'prop-types';
import answerPoll from '../../Handlers/answerPollHandler';

class Option extends Component {

  flashSignInButton = () => {
    const button = document.getElementsByClassName("signin")[0]
    button.focus()
    button.classList.add("flash")
    setTimeout(() => { button.classList.remove("flash"); }, 3000);
  }

  render(){
    const option_id = this.props.option.option_id;
    const user = JSON.parse(window.localStorage.getItem('user'));
    let clickHandler
    if (user){
      clickHandler = answerPoll.bind(this, this.props.pollId, option_id, this.props.callback);
    }
    else{
      clickHandler = this.flashSignInButton
    }

    return (
      <li onClick={clickHandler}> {this.props.name} </li>
    )
  }
}

Option.propTypes = {
  name: PropTypes.string,
  option: PropTypes.object,
  callback: PropTypes.function
}

export default Option
