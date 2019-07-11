
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Home from './Home.jsx'
import reducers from '../reducers'
import { buildTranslations } from '../actions'
import { LANG_OPTIONS, DEFAULT_LOCALE } from './constants.js'

const store = createStore(reducers, applyMiddleware(thunk));

const availableLocales = LANG_OPTIONS.map(lang_option => lang_option[0])
let locale = window.localStorage.getItem('locale')
    locale = availableLocales.includes(locale) ? locale : DEFAULT_LOCALE
store.dispatch(buildTranslations(locale))

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