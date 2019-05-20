const logoutHandler = () => {
    window.localStorage.clear();

    fetch('/logout', {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      }
    }).then(response => {
      return response
    }).then(response => {
      this.setState({
        signedIn: false,
        signInModalOpen: false,
        modalOpen: false,
        user: null,
      })
    });
  };

export default logoutHandler;