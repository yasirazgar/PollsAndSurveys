const answerPoll = (poll_id, option_id, callback) => {
  const url = "/polls/" + poll_id + "/" + option_id + "/answer"
  fetch(url, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
    },
    body: null
  })
  .then(response => {
    return response.json()
  }).then(data => {
    callback(data.poll.options)
  })
}

export default answerPoll;