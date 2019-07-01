import React from 'react';
import Option from '../Polls/Options/Option'
import OptionWithAnswer from '../Polls/Options/OptionWithAnswer'

const optionsList = (poll, callback) => {
  const [options, names, pollId] = getPollAttrs(poll);

  const list = names.map((name, i) => {
    const optionProps = commonOptionsProp(options, name, pollId, callback)
    return(<Option {...optionProps} />)
  })
  return(list);
}

const optionsListWithAnswer = (poll, callback) => {
  const [options, names, pollId] = getPollAttrs(poll);

  const list = names.map((name, i) => {
    const owaProps = commonOptionsProp(options, name, pollId, callback)
    return(<OptionWithAnswer {...owaProps}/>)
  })
  return(list);
}

const commonOptionsProp = (options, name, pollId, callback) => {
  const option = options[name]
  return {
    pollId: pollId,
    option: option,
    key: option.option_id,
    name: name,
    callback: callback
  }
}

const getPollAttrs = (poll) => {
  const options = poll.options;
  const names = Object.keys(options);
  const pollId = poll.poll_id;

  return [options, names, pollId]
}

export {optionsList, optionsListWithAnswer}