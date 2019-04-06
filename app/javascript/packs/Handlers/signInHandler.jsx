const signInHandler = (email, password) => {
  fetch('/login', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
    },
    body: JSON.stringify({email: email, password: password})
  }).then(response => {
    return response.json()
  }).then(data => {
    if(data.user){
      this.setState({
        signedIn: true,
        signInModalOpen: false,
        modalOpen: false,
        user: data.user
      })

      window.localStorage.setItem('user', {name: (data.user.name || data.user.email), })
    }
    else{
      this.setState({
        signInModalOpen: false,
        modalOpen: false,
      })
      alert("Invalid");
    }
  });
}

export default signInHandler;