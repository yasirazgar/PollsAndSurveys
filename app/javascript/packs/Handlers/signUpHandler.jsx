const signUpHandler = (email, password, confirmPassword) => {
  fetch('/signup', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
    },
    body: JSON.stringify({email: document.querySelector('.sign-in .email').value, password: document.querySelector('.sign-in .password').value})
  }).then(response => {
    return response.json()
  }).then(data => {
    this.props.closeModalHandler();
  });
}

export default signUpHandler;