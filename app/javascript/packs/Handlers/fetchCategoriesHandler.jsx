const fetchCategoriesHandler = (callback) => {
    fetch('/categories', {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      }
    }).then(response => {
      return response.json()
    }).then(data => {
      let categories = data.categories;
      window.localStorage.setItem('categories', JSON.stringify(categories))
      callback(categories)
    });
  };

export default fetchCategoriesHandler;