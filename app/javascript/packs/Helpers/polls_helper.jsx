import React from 'react';
import Option from '../Polls/Options/Option'
import OptionWithAnswer from '../Polls/Options/OptionWithAnswer'

const optionsList = (optionsHash, names, poll_id, callback) => {
  const list = names.map((name, i) => {
    const optionProps = commonOptionsProp(optionsHash, name, poll_id, callback)
    return(<Option {...optionProps} />)
  })
  return(list);
}

const optionsListWithAnswer = (optionsHash, names, poll_id, callback) => {
  const list = names.map((name, i) => {
    const owaProps = commonOptionsProp(optionsHash, name, poll_id, callback)
    return(<OptionWithAnswer {...owaProps}/>)
  })
  return(list);
}

const commonOptionsProp = (optionsHash, name, poll_id, callback) => {
  const option = optionsHash[name]
  return {
    pollId: poll_id,
    option: option,
    key: option.option_id,
    name: name,
    callback: callback
  }
}

export {optionsList, optionsListWithAnswer}