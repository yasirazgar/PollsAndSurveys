const signInHandler = (email, password, callback) => {
  var that = this;
  let fetchPromise = function(response) {
    return response.json()
  }

  fetch('/login', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
    },
    body: JSON.stringify({email: email, password: password})
  }).then(fetchPromise).then(callback)
}

export default signInHandler;