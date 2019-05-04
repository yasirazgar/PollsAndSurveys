const createPollHandler = (poll, callback) => {
  let data = JSON.stringify({poll: poll})

  fetch('/polls', {
    credentials: 'same-origin',
    body: data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
    }
  }).then(response => {
    if(response.ok){
      alert("Poll created successfully")
    }
    else{
      alert("Error creating Poll")
    }
    callback();
  })
};

export default createPollHandler;