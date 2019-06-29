
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Home from './Home.jsx'
import reducers from '../reducers'
import { buildTranslations } from '../actions'

const store = createStore(reducers, applyMiddleware(thunk));
store.dispatch(buildTranslations())

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('.app'))
})

export default App